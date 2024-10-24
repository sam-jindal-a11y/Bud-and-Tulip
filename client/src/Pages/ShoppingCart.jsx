import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import config from "../config";
import { CartContext } from '../Components/CartContext';
import axios from "axios";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { tempCart, setTempCart } = useContext(CartContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch product details by ID and remove inactive or out-of-stock items
  const fetchCartItems = async () => {
    const storedItems = JSON.parse(localStorage.getItem("tempCart")) || [];

    const updatedCart = [];

    // Fetch product details for each item in the cart
    for (const item of storedItems) {
      try {
        const response = await axios.get(`${config}/products/${item.productId}`);
        const productData = response.data;

        // Check if the product is active and the size is available
        const isSizeAvailable = productData.size.some(size => size.size !== "OUT OF STOCK");

        if (productData.isActive && isSizeAvailable) {
          // Check if the product has an offer and set the price accordingly
        const price = productData.hasOffer ? productData.offerPrice : productData.price;

        updatedCart.push({
          ...item,
          price: price, // Set price based on offer availability
        });
        }
      } catch (error) {
        console.error(`Failed to fetch product ${item.productId}:`, error);
      }
    }

    // Update cart state and localStorage
    setCartItems(updatedCart);
    setTempCart(updatedCart);
    localStorage.setItem("tempCart", JSON.stringify(updatedCart));
    setLoading(false);
  };

  const updateCartItemQuantity = (itemId, quantity) => {
    const updatedCart = cartItems.map((item) =>
      item.productId === itemId ? { ...item, quantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("tempCart", JSON.stringify(updatedCart));
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleQuantityChange = (itemId, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === itemId ? { ...item, quantity } : item
      )
    );
    updateCartItemQuantity(itemId, quantity);
  };

  const handleDelete = (itemId) => {
    const updatedCart = tempCart.filter((item) => item.timestamp !== itemId);
    setTempCart(updatedCart);
    localStorage.setItem("tempCart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const handleContinueShopping = () => {
    navigate("/"); // Adjust to your products page route
  };

  const handleCheckout = () => {
    navigate("/CheckoutPage");
  };

  const handleIncrementQuantity = (itemId, currentQuantity) => {
    const newQuantity = currentQuantity + 1;
    handleQuantityChange(itemId, newQuantity);
  };

  const handleDecrementQuantity = (itemId, currentQuantity) => {
    const newQuantity = Math.max(1, currentQuantity - 1);
    handleQuantityChange(itemId, newQuantity);
  };

  const calculateTotalPrice = (items) => {
    return items.reduce((acc, item) => {
      const price = parseFloat(item.price);
      const quantity = parseInt(item.quantity, 10);

      if (isNaN(price) || isNaN(quantity)) {
        console.error(`Invalid price or quantity for item: ${item.productName}`);
        return acc;
      }

      return acc + price * quantity;
    }, 0);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl md:text-2xl font-bold mb-4 text-center">
        Shopping Cart
      </h1>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-4">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-600">Your cart is empty.
              <br />
              <br />
              <button
                className="bg-pinkc text-white px-4 py-2 rounded-sm hover:bg-blue-950"
                onClick={handleContinueShopping}
              >
                Continue Shopping
              </button>
            </p>
          ) : (
            <>
              {cartItems.map((item) => (
                <div
                  key={item.productId}
                  className="flex flex-col md:flex-row justify-between items-center border-b py-4 space-y-4 md:space-y-0"
                >
                  <div className="flex flex-col md:flex-row items-center w-full">
                    <Link to={`/product/${item.productId}`} className="flex flex-col md:flex-row items-center w-full">
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg mb-4 md:mb-0 md:mr-4"
                      />
                      <div className="flex-1 text-center md:text-left">
                        <h2 className="text-lg md:text-xl font-semibold">
                          {item.productName}
                        </h2>
                      </div>
                    </Link>
                    <div className="flex flex-row my-5 md:flex-row items-center w-full">
                      <div className="flex items-center mr-2 md:mr-4">
                        <p className="text-gray-600 mr-2">Size:</p>
                        <span className="border rounded px-2 py-1">
                          {item.size}
                        </span>
                      </div>
                      <div className="flex items-center mr-2 md:mr-4">
                        <p className="text-gray-600 mr-2">Quantity:</p>
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button
                            onClick={() =>
                              handleDecrementQuantity(item.productId, item.quantity)
                            }
                            className="bg-pinkc text-white px-2 py-1 rounded-sm hover:bg-blue-950 focus:outline-none"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            readOnly
                            className="w-8 text-center focus:outline-none"
                          />
                          <button
                            onClick={() =>
                              handleIncrementQuantity(item.productId, item.quantity)
                            }
                            className="bg-pinkc text-white px-2 py-1 rounded-sm hover:bg-blue-950 focus:outline-none"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete(item.timestamp)}
                        className="bg-pinkc text-white px-4 py-1 rounded-sm hover:bg-blue-950  sm:mt-0"
                      >
                        Delete
                      </button>
                    </div>
                    <div className="flex items-center">
                      <p className="text-lg md:text-xl mr-0 md:mr-4 mb-2 md:mb-0">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex flex-col md:flex-row justify-between mt-4">
                <h2 className="text-lg md:text-xl font-bold mr-0 md:mr-2">
                  Total Price:
                </h2>
                <p className="text-lg md:text-xl font-bold">
                  ₹ {calculateTotalPrice(cartItems).toFixed(2)}
                </p>
              </div>
              <div className="flex flex-col md:flex-row justify-center mt-4 space-y-4 md:space-y-0 md:space-x-4">
                <button
                  className="bg-pinkc text-white px-4 py-2 rounded-sm hover:bg-blue-950 "
                  onClick={handleContinueShopping}
                >
                  Continue Shopping
                </button>
                <button
                  className="bg-pinkc text-white px-4 py-2 rounded-sm hover:bg-blue-950 "
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
