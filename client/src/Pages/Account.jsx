// src/Account.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const Account = () => {
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);
      fetchAddresses(decoded.id);
      fetchUserDetails(decoded.id);
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
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Account</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Welcome, {user.firstName}</h2>
        <p>User ID: {user._id}</p><span><p>Email : {user.email}</p></span>
      </div>
      <button
        onClick={handleLogout}
        className="mb-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Orders History</h2>
          <ul>
            {/* Replace with dynamic content */}
            <li>Order #1</li>
            <li>Order #2</li>
            <li>Order #3</li>
          </ul>
        </div>
        <div className="p-4 border rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Addresses</h2>
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
          <button
            onClick={handleAddAddress}
            className="mt-4 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
          >
            Add New Address
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
