import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EditAddressForm from './EditAddressForm';

const Account = () => {
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [editAddress, setEditAddress] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);
      fetchAddresses(decoded.id);
      fetchUserDetails(decoded.id);
      fetchOrders(decoded.id);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const fetchAddresses = async (userId) => {
    try {
      const response = await fetch(`http://103.209.144.220:5000/api/address?userId=${userId}`);
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
      const response = await fetch(`http://103.209.144.220:5000/api/auth/users/${userId}`);
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
      const response = await fetch(`http://103.209.144.220:5000/api/orderHistory/orders/user/${userId}`);
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
    localStorage.clear();
    navigate('/');
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.delete(`http://103.209.144.220:5000/api/address/${addressId}`, { headers });

      if (response.status === 200) {
        setAddresses(addresses.filter((address) => address._id !== addressId));
      } else {
        console.error('Failed to delete address');
      }
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  const handleUpdateAddress = (address) => {
    setEditAddress(address);
    navigate('/editaddressform', { state: { address } });
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard orders={orders} />;
      case 'addresses':
        return (
          <Addresses
            addresses={addresses}
            onDelete={handleDeleteAddress}
            onUpdate={handleUpdateAddress}
            addNewAddress={() => navigate('/addressform')}
          />
        );
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
          <button onClick={handleLogout} className="mt-6 px-4 py-2 border border-black rounded">Log Out</button>
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

const Addresses = ({ addresses, onDelete, onUpdate, addNewAddress }) => (
  <div>
    <h3 className="text-xl font-bold mb-4">My Addresses</h3>
    <div className="space-y-4">
      {addresses.map((address) => (
        <div key={address._id} className="border p-4 rounded">
          <p>{address.firstName} {address.lastName}</p>
          <p>{address.address1}, {address.address2}</p>
          <p>{address.city}, {address.province}, {address.country} - {address.postalCode}</p>
          <p>Phone: {address.phone}</p>
          <p>Company: {address.company}</p>
          <div className="mt-2">
            <button onClick={() => onUpdate(address)} className="mr-2 px-2 py-1 border rounded">Edit</button>
            <button onClick={() => onDelete(address._id)} className="px-2 py-1 border rounded">Delete</button>
          </div>
        </div>
      ))}
      <button onClick={addNewAddress} className="mt-4 px-4 py-2 border border-black rounded">Add New Address</button>
    </div>
  </div>
);

const Wishlist = () => (
  <div>
    <h3 className="text-xl font-bold mb-4">My Wishlist</h3>
    {/* Wishlist content */}
  </div>
);

const Wallet = () => (
  <div>
    <h3 className="text-xl font-bold mb-4">My Wallet</h3>
    {/* Wallet content */}
  </div>
);

export default Account;
