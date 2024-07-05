import React, { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';

const Account = () => {
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard'); // State to manage active tab

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
      window.location.href = '/login'; // Redirect to login if no token
    }
  }, []);

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

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard orders={orders} />;
      case 'addresses':
        return <Addresses addresses={addresses} />;
      case 'wishlist':
        return <Wishlist />;
      case 'wallet':
        return <Wallet />;
      default:
        return <Dashboard orders={orders} />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Hello, {user.firstName}! Welcome to your dashboard!</h2>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 p-4 border-r mb-4 md:mb-0">
          <h3 className="text-xl font-bold mb-4">My Profile</h3>
          <ul className="space-y-2">
            <li className={`cursor-pointer ${activeTab === 'dashboard' ? 'text-pink-500' : ''}`} onClick={() => setActiveTab('dashboard')}>Dashboard</li>
            <li className={`cursor-pointer ${activeTab === 'addresses' ? 'text-pink-500' : ''}`} onClick={() => setActiveTab('addresses')}>Addresses</li>
            <li className={`cursor-pointer ${activeTab === 'wishlist' ? 'text-pink-500' : ''}`} onClick={() => setActiveTab('wishlist')}>Wishlist</li>
            <li className={`cursor-pointer ${activeTab === 'wallet' ? 'text-pink-500' : ''}`} onClick={() => setActiveTab('wallet')}>Wallet</li>
          </ul>
          <button
            onClick={handleLogout}
            className="mt-6 px-4 py-2 border border-black rounded"
          >
            Log Out
          </button>
        </div>
        <div className="md:w-2/3 p-4">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

const Dashboard = ({ orders }) => (
  <div>
    <h3 className="text-xl font-bold mb-4">Orders History</h3>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Order ID</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order._id}>
                <td className="py-2 px-4 border-b">{order._id}</td>
                <td className="py-2 px-4 border-b">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">{order.status ? order.status : 'pending'}</td>
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
);

const Addresses = ({ addresses }) => (
  <div>
    <h3 className="text-xl font-bold mb-4">Addresses</h3>
    <ul>
      {addresses.length > 0 ? (
        addresses.map((address) => (
          <li key={address._id} className="mb-4 p-4 border rounded-lg shadow">
            <p className="font-semibold">{address.firstName} {address.lastName}</p>
            <p>{address.address1}</p>
            {address.address2 && <p>{address.address2}</p>}
            <p>{address.city}, {address.province}, {address.country}, {address.postalCode}</p>
            <p>{address.phone}</p>
          </li>
        ))
      ) : (
        <li>No addresses found</li>
      )}
    </ul>
  </div>
);

const Wishlist = () => (
  <div>
    <h3 className="text-xl font-bold mb-4">Wishlist</h3>
    <p>Wishlist content goes here.</p>
  </div>
);

const Wallet = () => (
  <div>
    <h3 className="text-xl font-bold mb-4">Wallet</h3>
    <p>Wallet content goes here.</p>
  </div>
);

export default Account;
