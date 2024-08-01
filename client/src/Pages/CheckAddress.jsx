import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const CheckAddress = () => {
  const [address, setAddress] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAddress = async () => {
      const token = localStorage.getItem('token');
      const decoded = jwtDecode(token);
      const userId = decoded.id;

      try {
        const response = await fetch(`http://127.0.0.1:5000/api/address/?userId=${userId}`, {
          headers: {
            'Authorization': token
          }
        });
        const result = await response.json();
        if (response.ok) {
          setAddress(result[0]);
        } else {
          alert('Error: ' + result.message);
        }
      } catch (error) {
        alert('Error: ' + error.message);
      }
    };

    fetchAddress();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formData = new FormData(e.target);

    const addressData = {
      firstName: formData.get('first-name') || '',
      lastName: formData.get('last-name') || '',
      company: formData.get('company') || '',
      address1: formData.get('address1') || '',
      address2: formData.get('address2') || '',
      city: formData.get('city') || '',
      country: formData.get('country') || '',
      province: formData.get('province') || '',
      postalCode: formData.get('postal-code') || '',
      phone: formData.get('phone') || '',
      defaultAddress: formData.get('default-address') === 'on',
    };

    try {
      const addressId = address ? address._id : '';
      const method = address ? 'PUT' : 'POST';
      const url = address ? `http://127.0.0.1:5000/api/address/${addressId}` : 'http://127.0.0.1:5000/api/address';
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(addressData)
      });
      const result = await response.json();
      if (response.ok) {
        // alert('Address ' + (address ? 'updated' : 'added') + ' successfully');
        navigate('/CheckoutPage');
      } else {
        alert('Error: ' + result.error);
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="addressform flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col max-w-lg w-full bg-white p-8 shadow-md rounded-lg my-20">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          {address ? 'Update Address' : 'Add New Address'}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {['firstName', 'lastName', 'company', 'address1', 'address2', 'city', 'country', 'province', 'postalCode', 'phone'].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block text-sm font-medium text-gray-700 capitalize">
                {field.replace(/([A-Z])/g, ' $1').toUpperCase()}
              </label>
              <input
                type="text"
                id={field}
                name={field.replace(/[A-Z]/g, match => '-' + match.toLowerCase())}
                defaultValue={address ? address[field] : ''}
                placeholder={field.replace(/([A-Z])/g, ' $1').toUpperCase()}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          ))}

          <div className="flex items-center">
            <input
              type="checkbox"
              id="default-address"
              name="default-address"
              defaultChecked={address ? address.defaultAddress : false}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="default-address" className="ml-2 block text-sm text-gray-900">
              Set as default address
            </label>
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              {address ? 'Update Address' : 'Add Address'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckAddress;
