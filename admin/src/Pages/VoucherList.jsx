// src/components/VoucherList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VoucherList = () => {
  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    fetchVouchers();
  }, []);

  const fetchVouchers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/vouchers');
      setVouchers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteVoucher = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/api/vouchers/${id}`);
      setVouchers(vouchers.filter((voucher) => voucher._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-full mx-auto p-5 mt-10">
      <h2 className="text-2xl font-bold mb-4">Ongoing Vouchers</h2>

      {/* Table for larger screens */}
      <div className="hidden md:block">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Code</th>
              <th className="py-2 px-4 border-b">Discount</th>
              <th className="py-2 px-4 border-b">Start Date</th>
              <th className="py-2 px-4 border-b">End Date</th>
              <th className="py-2 px-4 border-b">Max Per Use</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vouchers.map((voucher) => (
              <tr key={voucher._id} className="text-center">
                <td className="py-2 px-4 border-b">{voucher.code}</td>
                <td className="py-2 px-4 border-b">{voucher.discount}</td>
                <td className="py-2 px-4 border-b">{new Date(voucher.startDate).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">{new Date(voucher.endDate).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">{voucher.maxPerUse}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => deleteVoucher(voucher._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card view for smaller screens */}
      <div className="md:hidden">
        {vouchers.map((voucher) => (
          <div key={voucher._id} className="bg-white shadow-md rounded p-4 mb-4">
            <h3 className="text-xl font-bold mb-2">Voucher Code: {voucher.code}</h3>
            <p><strong>Discount:</strong> {voucher.discount}</p>
            <p><strong>Start Date:</strong> {new Date(voucher.startDate).toLocaleDateString()}</p>
            <p><strong>End Date:</strong> {new Date(voucher.endDate).toLocaleDateString()}</p>
            <p><strong>Max Per Use:</strong> {voucher.maxPerUse}</p>
            <button
              onClick={() => deleteVoucher(voucher._id)}
              className="bg-red-500 text-white px-4 py-2 rounded mt-4"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VoucherList;
