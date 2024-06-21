import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Function to decode the token and set user
  const getUserIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUser(decodedToken);
      } catch (error) {
        console.error("Failed to decode token", error);
      }
    }
  };

  const handleCheckout = () => {
    navigate("/CheckoutPage");
  };

  useEffect(() => {
    getUserIdFromToken();
  }, []);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!user || !user.id) {
        console.error("User ID not available.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/cart?userId=${user.id}`);
        console.log("Fetched cart items:", response.data); // Debug log
        setCartItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [user]);

  const totalPrice = cartItems.reduce((acc, item) => {
    const price = parseFloat(item.price);
    const quantity = parseInt(item.quantity, 10);

    // Check if price and quantity are valid numbers
    if (isNaN(price) || isNaN(quantity)) {
      console.error(`Invalid price or quantity for item: ${item.productName}`);
      return acc;
    }

    const itemTotal = price * quantity;
    return acc + itemTotal;
  }, 0);

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
                  className="flex justify-between items-center border-b py-2"
                >
                  <div>
                    <h2 className="text-xl font-semibold">{item.productName}</h2>
                    <p className="text-gray-600">
                      Quantity: {item.quantity} - Size: {item.size}
                    </p>
                  </div>
                  <p className="text-xl">₹{item.price * item.quantity}</p>
                </div>
              ))}
              <div className="flex justify-between items-center mt-4">
                <h2 className="text-xl font-bold">Total Price</h2>
                <p className="text-xl font-bold">₹{totalPrice.toFixed(2)}</p>
              </div>
              <button
                className="w-full bg-pink-500 text-white py-2 mt-4 rounded-lg hover:bg-pink-600"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
