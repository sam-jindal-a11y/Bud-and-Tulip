import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Correct the import statement

const Account = () => {
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);
      fetchAddresses(decoded.id);
      fetchUserDetails(decoded.id);
      fetchOrders(decoded.id); // Fetch orders for the user
      console.log(decoded);
    } else {
      navigate('/login'); // Redirect to login if no token
    }
  }, [navigate]);

  const fetchAddresses = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/address?userId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        setAddresses(data);
      } else {
        console.error('Failed to fetch addresses');
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const fetchUserDetails = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/users/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        console.error('Failed to fetch user details');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const fetchOrders = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orderHistory/orders/user/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        console.error('Failed to fetch orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleAddAddress = () => {
    navigate('/AddressForm');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-2xl font-semibold mb-6">Hello, {user.firstName}! Welcome to your dashboard!</h2>
      <div className="flex">
        <div className="w-1/3 p-4 border-r">
          <h3 className="text-xl font-bold mb-4">My Profile</h3>
          <ul>
            <li className="mb-2"><a href="/dashboard" className="text-pink-500">Dashboard</a></li>
            <li className="mb-2"><a href="/addresses">Addresses</a></li>
            <li className="mb-2"><a href="/wishlist">Wishlist</a></li>
            <li className="mb-2"><a href="/wallet">Wallet</a></li>
          </ul>
          <button
            onClick={handleLogout}
            className="mt-6 px-4 py-2 border border-black rounded"
          >
            Log Out
          </button>
        </div>
        <div className="w-2/3 p-4">
          <h3 className="text-xl font-bold mb-4">Orders History</h3>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Order ID</th>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Payment Status</th>
                <th className="py-2 px-4 border-b">Fulfillment Status</th>
                <th className="py-2 px-4 border-b">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order._id}>
                    <td className="py-2 px-4 border-b">{order._id}</td>
                    <td className="py-2 px-4 border-b">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="py-2 px-4 border-b">{order.paymentStatus}</td>
                    <td className="py-2 px-4 border-b">{order.fulfillmentStatus}</td>
                    <td className="py-2 px-4 border-b">₹ {order.finalAmount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-2 px-4 border-b" colSpan="5">No orders found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Account;
