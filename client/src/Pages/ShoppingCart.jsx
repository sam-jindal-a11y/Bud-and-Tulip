import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // corrected import statement

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const getUserFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUser(decodedToken);
      } catch (error) {
        console.error("Failed to decode token", error);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const fetchCartItems = async (userId) => {
    if (!userId) {
      console.error("User ID not available.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/cart?userId=${userId}`);
      setCartItems(response.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateCartItemQuantity = async (itemId, quantity) => {
    try {
      await axios.patch(`http://localhost:5000/api/cart/${itemId}`, { quantity });
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
    }
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

  useEffect(() => {
    getUserFromToken();
  }, []);

  useEffect(() => {
    if (user && user.id) {
      fetchCartItems(user.id);
    }
  }, [user]);

  const handleQuantityChange = (itemId, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === itemId ? { ...item, quantity } : item
      )
    );
    updateCartItemQuantity(itemId, quantity);
  };

  const handleSizeChange = (itemId, size) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === itemId ? { ...item, size } : item
      )
    );
  };

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${itemId}`);
      setCartItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-4">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-600">Your cart is empty.</p>
          ) : (
            <>
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center border-b py-4"
                >
                  <div className="flex items-center">
                    <img
                      src={item.imageUrl}
                      alt={item.productName}
                      className="w-20 h-20 object-cover rounded-lg mr-4"
                    />
                    <div>
                      <h2 className="text-xl font-semibold">{item.productName}</h2>
                      <div className="flex items-center">
                        <p className="text-gray-600 mr-4">Size:</p>
                        <select
                          value={item.size}
                          onChange={(e) => handleSizeChange(item._id, e.target.value)}
                          className="border rounded px-2 py-1"
                        >
                          <option value="S">S</option>
                          <option value="M">M</option>
                          <option value="L">L</option>
                          <option value="XL">XL</option>
                        </select>
                      </div>
                      <div className="flex items-center mt-2">
                        <p className="text-gray-600 mr-4">Quantity:</p>
                        <div className="flex items-center">
                          <button
                            onClick={() => handleDecrementQuantity(item._id, item.quantity)}
                            className="bg-gray-300 text-gray-700 py-1 px-3 rounded-l-lg hover:bg-gray-400"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            readOnly
                            className="border-t border-b w-12 text-center"
                          />
                          <button
                            onClick={() => handleIncrementQuantity(item._id, item.quantity)}
                            className="bg-gray-300 text-gray-700 py-1 px-3 rounded-r-lg hover:bg-gray-400"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <p className="text-xl mr-4">₹{(item.price * item.quantity).toFixed(2)}</p>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-pink-600 text-white py-1 px-3 rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              <div className="flex justify-end items-center mt-4">
                <h2 className="text-xl font-bold mr-2">Total Price : </h2>
                <p className="text-xl font-bold">₹ {calculateTotalPrice(cartItems).toFixed(2)}</p>
              </div>
              <div className="flex justify-center mt-4">
                <button
                  className="bg-blue-500 text-white py-2 px-4 mr-2 rounded-lg hover:bg-blue-600 w-96"
                  onClick={handleContinueShopping}
                >
                  Continue Shopping
                </button>
                <button
                  className="bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 w-96"
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
