// src/components/VoucherForm.js
import React, { useState } from 'react';
import axios from 'axios';
import VoucherList from './VoucherList';

const VoucherForm = () => {
  const [voucher, setVoucher] = useState({
    code: '',
    discount: '',
    startDate: '',
    endDate: '',
    maxPerUse: '', // Added new field for maxPerUse
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVoucher((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:5000/api/vouchers', voucher);
      alert('Voucher created successfully!');
      // window.location.reload();
    } catch (error) {
      console.error(error);
      alert('Failed to create voucher');
    }
  };

  return (
    <div className="max-w-full bg-white p-5 rounded-md shadow-sm">
      <h2 className="text-2xl font-bold mb-4">Create Voucher</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Voucher Code</label>
          <input
            type="text"
            name="code"
            value={voucher.code}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Discount</label>
          <input
            type="number"
            name="discount"
            value={voucher.discount}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={voucher.startDate}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">End Date</label>
          <input
            type="date"
            name="endDate"
            value={voucher.endDate}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Max Per Use</label>
          <input
            type="number"
            name="maxPerUse"
            value={voucher.maxPerUse}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">
          Create Voucher
        </button>
      </form>
      <VoucherList />
    </div>
  );
};

export default VoucherForm;
