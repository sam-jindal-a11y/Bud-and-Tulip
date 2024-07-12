import React, { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
const Account = () => {
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard'); // State to manage active tab
  const [editAddress, setEditAddress] = useState(null);
  const Navigate = useNavigate();
  const  addnewAddress=()=>{
    // Navigate('/addressform');
    console.log("heelo")
  }
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
    defaultAddress: false
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
      window.location.href = '/login'; // Redirect to login if no token
    }
  }, []);

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
    window.location.href = '/login';
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
      const headers = {
        'Authorization': `Bearer ${token}`
      };

      const response = await axios.delete(`https://bud-tulips.onrender.com/api/address/${addressId}`, { headers });

      if (response.status === 200) {
        // Handle success, e.g., update state or show a success message
        console.log('Address deleted successfully');
        window.location.reload();
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
      ...address
    });
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://bud-tulips.onrender.com/api/address/${editAddress._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(form)
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

const Addresses = ({ addresses, onDelete, onUpdate, editAddress, form, onChange, onSubmit }) => (
  <div>
    <h3 className="text-xl font-bold mb-4">Addresses</h3>
    <ul>
      {addresses.length > 0 ? (
        addresses.map((address) => (
          <li key={address._id} className="mb-4 p-4 border rounded-lg shadow">
            <div className="flex flex-col space-y-2">
              <div className="font-semibold text-lg flex flex-row justify-between">
                <div>
                  {address.firstName} {address.lastName}
                </div>
                <div className="flex space-x-4">
                  <button className="text-red-500 hover:text-red-700" onClick={() => onDelete(address._id)}>
                    <i className="fa-regular fa-trash-can"></i>
                  </button>
                  <button className="text-blue-500 hover:text-blue-700" onClick={() => onUpdate(address)}>
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                </div>
              </div>
              <div>{address.address1}</div>
              {address.address2 && <div>{address.address2}</div>}
              <div>
                {address.city}, {address.province}, {address.country}, {address.postalCode}
              </div>
              <div>{address.phone}</div>
            </div>
          </li>
        ))
      ) : (
        <li>No addresses found
          <button onClick={()=>Navigate("/addressform")}>Add New Adress</button>
        </li>
      )}
    </ul>
    {editAddress && (
      <div className="mt-6">
        <h3 className="text-xl font-bold mb-4">Edit Address</h3>
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={onChange}
            placeholder="First Name"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={onChange}
            placeholder="Last Name"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={onChange}
            placeholder="Company"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="address1"
            value={form.address1}
            onChange={onChange}
            placeholder="Address 1"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="address2"
            value={form.address2}
            onChange={onChange}
            placeholder="Address 2"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={onChange}
            placeholder="City"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="country"
            value={form.country}
            onChange={onChange}
            placeholder="Country"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="province"
            value={form.province}
            onChange={onChange}
            placeholder="Province"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="postalCode"
            value={form.postalCode}
            onChange={onChange}
            placeholder="Postal Code"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={onChange}
            placeholder="Phone"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              name="defaultAddress"
              checked={form.defaultAddress}
              // onChange={(e) => setForm({ ...form, defaultAddress: e.target.checked })}
              className="mr-2"
            />
            <label>Default Address</label>
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Save Changes</button>
        </form>
      </div>
    )}
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
