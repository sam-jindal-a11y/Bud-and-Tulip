import React from 'react';
import {useNavigate } from 'react-router-dom';

const Addressform = () => {
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const addressData = {
      firstName: e.target['first-name'].value,
      lastName: e.target['last-name'].value,
      company: e.target['company'].value,
      address1: e.target['address1'].value,
      address2: e.target['address2'].value,
      city: e.target['city'].value,
      country: e.target['country'].value,
      province: e.target['province'].value,
      postalCode: e.target['postal-code'].value,
      phone: e.target['phone'].value,
      defaultAddress: e.target['default-address'].checked,
    };

    try {
      const response = await fetch('http://localhost:5000/api/address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(addressData)
      });
      const result = await response.json();
      if (response.ok) {
        // alert('Address added successfully');
        history(-1); // Navigate back to the previous page
      } else {
        alert('Error: ' + result.error);
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const handleCancel = () => {
    history(-1); // Navigate back to the previous page
  };

  return (
    <div className="addressform flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col max-w-lg w-full bg-white p-8 shadow-md rounded-lg my-20">
        <h1 className="text-2xl font-semibold mb-6 text-center">Add New Address</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">First Name</label>
            <input type="text" id="first-name" placeholder="First Name" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
          </div>

          <div>
            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Last Name</label>
            <input type="text" id="last-name" placeholder="Last Name" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company</label>
            <input type="text" id="company" placeholder="Company" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
          </div>

          <div>
            <label htmlFor="address1" className="block text-sm font-medium text-gray-700">Address 1</label>
            <input type="text" id="address1" placeholder="Address 1" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
          </div>

          <div>
            <label htmlFor="address2" className="block text-sm font-medium text-gray-700">Address 2</label>
            <input type="text" id="address2" placeholder="Address 2" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
            <input type="text" id="city" placeholder="City" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
          </div>

          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
            <input type="text" id="country" placeholder="Country" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
          </div>

          <div>
            <label htmlFor="province" className="block text-sm font-medium text-gray-700">Province</label>
            <input type="text" id="province" placeholder="Province" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
          </div>

          <div>
            <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">Postal/Zip Code</label>
            <input type="text" id="postal-code" placeholder="Postal/Zip Code" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input type="text" id="phone" placeholder="Phone" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
          </div>

          <div className="flex items-center">
            <input type="checkbox" id="default-address" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
            <label htmlFor="default-address" className="ml-2 block text-sm text-gray-900">Set as default address</label>
          </div>

          <div className="flex justify-between">
            <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
              Add Address
            </button>
            <button type="button" onClick={handleCancel} className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Addressform;
