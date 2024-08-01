// src/TempCheckoutPage.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import axios from "axios";

const TempCheckoutPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [product, setProduct] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [voucherCode, setVoucherCode] = useState("");
  const [maxDiscount, setMaxDiscount] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  //for razorpay
  const [responseId, setResponseId] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      fetchAddresses(decoded.id);
      fetchTempProduct();
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const fetchAddresses = async (userId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/address?userId=${userId}`
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

  const fetchTempProduct = () => {
    const tempOrder = localStorage.getItem("tempOrder");
    if (tempOrder) {
      setProduct(JSON.parse(tempOrder));
    } else {
      navigate("/"); // Redirect to home if no temp order found
    }
  };

  const applyVoucher = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User not logged in');
      }
  
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
  
      const response = await axios.post('http://127.0.0.1:5000/api/validate', { code: voucherCode, userId });
      const voucher = response.data;
      const discountAmount = (voucher.discount / 100) * totalPrice;
      setMaxDiscount(discountAmount);
  
      await axios.post('http://127.0.0.1:5000/api/apply-voucher', { code: voucherCode, userId });
    } catch (error) {
      console.error('Error applying voucher:', error.response ? error.response.data.message : error.message);
      setErrorMessage(error.response ? error.response.data.message : 'An error occurred');
      setMaxDiscount(0);
      setTimeout(() => {
        setErrorMessage('');
      }, 1000);
    }
  };

  const totalPrice = product ? product.price * product.quantity : 0;
  const finalPrice = totalPrice - maxDiscount;

  
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

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
    products: [
      {
        productId: product.productId,
        quantity: product.quantity,
        price: product.price,
        size: product.size
      }
    ],
    paymentMethod,
    totalAmount: totalPrice,
    discount: maxDiscount,
    voucherCode: voucherCode || null,
    codCharge: paymentMethod === "cod" ? 300 : 0,
    finalAmount: finalPrice + (paymentMethod === "cod" ? 300 : 0)
  };

  if (paymentMethod === "razorpay") {
    try {
      const razorpayResponse = await axios.post("http://127.0.0.1:5000/orders", {
        amount: orderData.finalAmount,
        currency: "INR"
      });

      const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

      if (!res) {
        alert("Failed to load Razorpay SDK. Please check your internet connection.");
        return;
      }

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: razorpayResponse.data.amount,
        currency: razorpayResponse.data.currency,
        order_id: razorpayResponse.data.order_id,
        handler: async (response) => {
          setResponseId(response.razorpay_payment_id);
          setConfirmationMessage("Payment was successful! Payment ID: " + response.razorpay_payment_id);
          orderData.paymentMethod = "razorpay";
          orderData.razorpayPaymentId = response.razorpay_payment_id;
          try {
            const response = await axios.post("http://127.0.0.1:5000/api/orderHistory", orderData);
            if (response.status === 201) {
              alert("Order placed successfully!");
              localStorage.removeItem("tempOrder");
              navigate("/account");
            }
          } catch (error) {
            console.error("Error placing order:", error);
            // console.log(orderData);
            alert("Failed to place order. Please try again.");
          }
        },
        prefill: {
          name: "Harshit"
        },
        theme: {
          color: "#EC4899"
        },
        modal: {
          ondismiss: function () {
            alert("Payment popup closed. Please complete the payment to place your order.");
          }
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error("Error creating Razorpay order:", error);
      alert("Failed to initiate payment. Please try again.");
    }
  } else {
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/orderHistory", orderData);
      if (response.status === 201) {
        alert("Order placed successfully!");
        localStorage.removeItem("tempOrder");
        navigate("/account");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      // console.log(orderData);
      alert("Failed to place order. Please try again.");
    }
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
                name="paymentId"
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
        {product ? (
          <div className="flex items-center justify-between border-b-2 border-gray-200 py-4">
            <div>
              <h3 className="text-lg font-semibold">{product.productName}</h3>
              <p className="text-gray-700">
                <span className="font-bold">Size:</span> {product.size} &nbsp;|&nbsp;
                <span className="font-bold">Quantity:</span> {product.quantity}
              </p>
            </div>
            <p className="text-gray-700 font-bold mr-4">₹ {product.price * product.quantity}</p>
          </div>
        ) : (
          <p>No product details available.</p>
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

export default TempCheckoutPage;
