// src/CheckoutPage.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // Corrected import statement
import axios from "axios"; // Added axios for HTTP requests

const CheckoutPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [voucherCode, setVoucherCode] = useState("");
  const [maxDiscount, setMaxDiscount] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      fetchAddresses(decoded.id);
      fetchCartProducts(decoded.id);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const fetchAddresses = async (userId) => {
    try {
      const response = await fetch(
        `https://bud-tulips.onrender.com/api/address?userId=${userId}`
      );
      if (response.ok) {
        const data = await response.json();
        setAddresses(data);
        if (data.length > 0) {
          setSelectedAddress(data[0]._id);
        }
      } else {
        console.error("Failed to fetch addresses");
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  const fetchCartProducts = async (userId) => {
    try {
      const response = await fetch(
        `https://bud-tulips.onrender.com/api/cart?userId=${userId}`
      );
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error("Failed to fetch cart products");
      }
    } catch (error) {
      console.error("Error fetching cart products:", error);
    }
  };

  const applyVoucher = async () => {
    try {
      // Retrieve the token from local storage
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User not logged in');
      }
  
      // Decode the token to get the user ID
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id; // Adjust this based on your token structure
      // console.log(decodedToken.id);
      // Send the request to validate the voucher
      const response = await axios.post('https://bud-tulips.onrender.com/api/validate', { code: voucherCode, userId });
      const voucher = response.data;
      const discountAmount = (voucher.discount / 100) * totalPrice;
      setMaxDiscount(discountAmount);
  
      // Send a request to apply the voucher and track usage
      await axios.post('https://bud-tulips.onrender.com/api/apply-voucher', { code: voucherCode, userId});
    } catch (error) {
      console.error('Error applying voucher:', error.response ? error.response.data.message : error.message);
      setErrorMessage(error.response ? error.response.data.message : 'An error occurred');
      setMaxDiscount(0); // Reset discount if voucher is invalid
      setTimeout(() => {
        setErrorMessage('');
      }, 1000);
    }
  };
  
  
  const totalPrice = products.reduce((acc, product) => acc + product.price * product.quantity, 0);
  const finalPrice = totalPrice - maxDiscount;

  const handlePayment = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("User not logged in");
      navigate("/login");
      return;
    }
    const decoded = jwtDecode(token);
  
    const orderData = {
      userId: decoded.id,
      ShipDetails: selectedAddress,
      products: products.map(product => ({
        productId: product._id,
        quantity: product.quantity,
        price: product.price,
        size: product.size
      })),
      paymentMethod,
      totalAmount: totalPrice,
      discount: maxDiscount,
      voucherCode: voucherCode || null, // Include voucher code if used
      codCharge: paymentMethod === "cod" ? 300 : 0,
      finalAmount: finalPrice + (paymentMethod === "cod" ? 300 : 0)
    };
  
    try {
      const response = await axios.post("https://bud-tulips.onrender.com/api/orderHistory", orderData);
      if (response.status === 201) {
        alert("Order placed successfully!");
        navigate("/orderSuccess");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      console.log(orderData)
      alert("Failed to place order. Please try again.");
    }
  };
  
  return (
    <div className="container mx-auto p-4 flex flex-wrap">
      <div className="w-full lg:w-2/3 p-4">
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2">Select Address</h2>
          {addresses.length > 0 ? (
            addresses.map((address) => (
              <div key={address._id} className="mb-2">
                <label
                  htmlFor={`address-${address._id}`}
                  className="cursor-pointer flex items-start"
                >
                  <input
                    type="radio"
                    id={`address-${address._id}`}
                    name="address"
                    value={address._id}
                    checked={selectedAddress === address._id}
                    onChange={() => setSelectedAddress(address._id)}
                    className="hidden"
                  />
                  <div className="bg-white border rounded-md p-4 w-full">
                    <div className="flex items-center mb-2">
                      <div className="w-4 h-4 border border-gray-500 rounded-full mr-2">
                        {selectedAddress === address._id && (
                          <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                        )}
                      </div>
                      <p className="font-semibold">
                        {address.firstName} {address.lastName}
                      </p>
                    </div>
                    <p>{address.address1}</p>
                    {address.address2 && <p>{address.address2}</p>}
                    <p>{`${address.city}, ${address.province}, ${address.country}, ${address.postalCode}`}</p>
                    <p>{address.phone}</p>
                  </div>
                </label>
              </div>
            ))
          ) : (
            <p>No addresses found. Please add an address first. <Link to="/AddressForm" className="font-bold bg-pinkc p-2 rounded-sm">Click here.</Link></p>
          )}
        </div>
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2">Select Payment Method</h2>
          <div className="mb-2">
            <label htmlFor="cod" className="cursor-pointer flex items-center">
              <input
                type="radio"
                id="cod"
                name="payment"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
                className="hidden"
              />
              <div className="bg-white border rounded-md p-4 w-full">
                <div className="flex items-center mb-2">
                  <div className="w-4 h-4 border border-gray-500 rounded-full mr-2">
                    {paymentMethod === "cod" && (
                      <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    )}
                  </div>
                  <label htmlFor="cod" className="text-gray-700">
                    Cash on Delivery
                  </label>
                </div>
              </div>
            </label>
          </div>
          <div className="mb-2">
            <label
              htmlFor="razorpay"
              className="cursor-pointer flex items-center"
            >
              <input
                type="radio"
                id="razorpay"
                name="payment"
                value="razorpay"
                checked={paymentMethod === "razorpay"}
                onChange={() => setPaymentMethod("razorpay")}
                className="hidden"
              />
              <div className="bg-white border rounded-md p-4 w-full">
                <div className="flex items-center mb-2">
                  <div className="w-4 h-4 border border-gray-500 rounded-full mr-2">
                    {paymentMethod === "razorpay" && (
                      <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    )}
                  </div>
                  <label htmlFor="razorpay" className="text-gray-700">
                    Razorpay
                  </label>
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/3 p-4 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="flex items-center justify-between border-b-2 border-gray-200 py-4"
            >
              <div>
                <h3 className="text-lg font-semibold">{product.productName}</h3>
                <p className="text-gray-700">
                  <span className="font-bold">Size:</span> {product.size}{" "}
                  &nbsp;|&nbsp;
                  <span className="font-bold">Quantity:</span>{" "}
                  {product.quantity}
                </p>
              </div>
              <div className="flex items-center">
                <p className="text-gray-700 font-bold mr-4">₹ {product.price * product.quantity}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-700 mb-4">No products in cart.</p>
        )}
       <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">
        Apply Gift Card or Voucher
      </h2>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Enter code"
          value={voucherCode}
          onChange={(e) => setVoucherCode(e.target.value)}
          className="w-full p-2 border rounded mt-2 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={applyVoucher}
          className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Apply
        </button>
      </div>
      {maxDiscount > 0 && (
        <div className="mt-4 text-green-500">
          Voucher applied! You get a discount of ₹{maxDiscount.toFixed(2)}.
        </div>
      )}
      {errorMessage && (
        <div className="mt-4 text-red-500">
          {errorMessage}!
        </div>
      )}
  
    
          <div className="flex justify-between items-center font-light mt-2">
            <span>Total Price:</span>
            <span>₹ {totalPrice.toFixed(2)}</span>
          </div>
          {maxDiscount > 0 && (
            <div className="flex justify-between items-center font-light mt-2">
              <span>Discount ( - ) :</span>
              <span>₹ {maxDiscount.toFixed(2)}</span>
            </div>
          )}

          {paymentMethod === "cod" && (
            <div className="flex justify-between items-center font-light mt-2">
              <span>COD Charge ( + ) :</span>
              <span>₹ 300.00</span>
            </div>
          )}
          <div className="flex justify-between items-center font-semibold mt-4">
            <span>Final Price:</span>
            <span>
              ₹ {(finalPrice + (paymentMethod === "cod" ? 300 : 0)).toFixed(2)}
            </span>
          </div>
          <button
            onClick={handlePayment}
            className="w-full bg-pink-500 text-white py-2 rounded-lg mt-4 hover:bg-pink-600 focus:outline-none"
          >
            Pay Now ₹ {(finalPrice + (paymentMethod === "cod" ? 300 : 0)).toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
