import React, { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Account = () => {
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard'); // State to manage active tab
  const [editAddress, setEditAddress] = useState(null);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    company: '',
    address1: '',
    address2: '',
    city: '',
    country: '',
    province: '',
    postalCode: '',
    phone: '',
    defaultAddress: false,
  });

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
      const response = await fetch(`https://bud-tulips.onrender.com/api/address?userId=${userId}`);
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
      const response = await fetch(`https://bud-tulips.onrender.com/api/auth/users/${userId}`);
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
      const response = await fetch(`https://bud-tulips.onrender.com/api/orderHistory/orders/user/${userId}`);
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
      const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
      const headers = {
        'Authorization': `Bearer ${token}`,
      };

      const response = await axios.delete(`https://bud-tulips.onrender.com/api/address/${addressId}`, { headers });

      if (response.status === 200) {
        // Handle success, e.g., update state or show a success message
        console.log('Address deleted successfully');
        setAddresses(addresses.filter((address) => address._id !== addressId));
      } else {
        // Handle other status codes if needed
        console.error('Failed to delete address');
      }
    } catch (error) {
      // Handle errors
      console.error('Error deleting address:', error);
    }
  };

  const handleUpdateAddress = (address) => {
    setEditAddress(address);
    setForm({
      ...address,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://bud-tulips.onrender.com/api/address/${editAddress._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        const updatedAddress = await response.json();
        setAddresses(addresses.map((address) => (address._id === updatedAddress._id ? updatedAddress : address)));
        setEditAddress(null);
      } else {
        console.error('Failed to update address');
      }
    } catch (error) {
      console.error('Error updating address:', error);
    }
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
            editAddress={editAddress}
            form={form}
            onChange={handleChange}
            onSubmit={handleSubmit}
            addNewAddress={() => navigate('/addressform')} // Passing the addNewAddress function as prop
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

const Addresses = ({ addresses, onDelete, onUpdate, editAddress, form, onChange, onSubmit, addNewAddress }) => (
  <div>
    <h3 className="text-xl font-bold mb-4">Addresses</h3>
    <ul>
      {addresses.map((address) => (
        <li key={address._id} className="border p-4 mb-2">
          <p>
            {address.firstName} {address.lastName}
          </p>
          <p>{address.company}</p>
          <p>{address.address1}</p>
          <p>{address.address2}</p>
          <p>{address.city}, {address.province}, {address.country}</p>
          <p>{address.postalCode}</p>
          <p>{address.phone}</p>
          <button
            onClick={() => onDelete(address._id)}
            className="mt-2 px-4 py-2 border border-black rounded"
          >
            Delete
          </button>
          <button
            onClick={() => onUpdate(address)}
            className="mt-2 px-4 py-2 border border-black rounded ml-2"
          >
            Edit
          </button>
        </li>
      ))}
    </ul>
    <button onClick={addNewAddress} className="mt-4 px-4 py-2 border border-black rounded">
      Add New Address
    </button>
    {editAddress && (
      <form onSubmit={onSubmit} className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={form.firstName}
              onChange={onChange}
              className="border rounded w-full py-2 px-3 mt-1"
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={form.lastName}
              onChange={onChange}
              className="border rounded w-full py-2 px-3 mt-1"
            />
          </div>
          <div>
            <label htmlFor="company">Company</label>
            <input
              type="text"
              id="company"
              name="company"
              value={form.company}
              onChange={onChange}
              className="border rounded w-full py-2 px-3 mt-1"
            />
          </div>
          <div>
            <label htmlFor="address1">Address 1</label>
            <input
              type="text"
              id="address1"
              name="address1"
              value={form.address1}
              onChange={onChange}
              className="border rounded w-full py-2 px-3 mt-1"
            />
          </div>
          <div>
            <label htmlFor="address2">Address 2</label>
            <input
              type="text"
              id="address2"
              name="address2"
              value={form.address2}
              onChange={onChange}
              className="border rounded w-full py-2 px-3 mt-1"
            />
          </div>
          <div>
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={form.city}
              onChange={onChange}
              className="border rounded w-full py-2 px-3 mt-1"
            />
          </div>
          <div>
            <label htmlFor="province">Province</label>
            <input
              type="text"
              id="province"
              name="province"
              value={form.province}
              onChange={onChange}
              className="border rounded w-full py-2 px-3 mt-1"
            />
          </div>
          <div>
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              name="country"
              value={form.country}
              onChange={onChange}
              className="border rounded w-full py-2 px-3 mt-1"
            />
          </div>
          <div>
            <label htmlFor="postalCode">Postal Code</label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={form.postalCode}
              onChange={onChange}
              className="border rounded w-full py-2 px-3 mt-1"
            />
          </div>
          <div>
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={form.phone}
              onChange={onChange}
              className="border rounded w-full py-2 px-3 mt-1"
            />
          </div>
          <div>
            <label htmlFor="defaultAddress">Default Address</label>
            <input
              type="checkbox"
              id="defaultAddress"
              name="defaultAddress"
              checked={form.defaultAddress}
              onChange={onChange}
              className="border rounded mt-1"
            />
          </div>
        </div>
        <button type="submit" className="mt-4 px-4 py-2 border border-black rounded">
          Update Address
        </button>
      </form>
    )}
  </div>
);

const Wishlist = () => (
  <div>
    <h3 className="text-xl font-bold mb-4">Wishlist</h3>
    <p>Your wishlist is empty.</p>
  </div>
);

const Wallet = () => (
  <div>
    <h3 className="text-xl font-bold mb-4">Wallet</h3>
    <p>Your wallet is empty.</p>
  </div>
);

export default Account;
