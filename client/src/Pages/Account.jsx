// src/Account.js
import React from 'react';
import { useHistory, useNavigate } from 'react-router-dom';

const Account = () => {
  const history = useNavigate();

  const handleAddAddress = () => {
    history('/AddressForm');
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Account</h1>
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
            {/* Replace with dynamic content */}
            <li>Address 1</li>
            <li>Address 2</li>
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
