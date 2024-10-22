import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from "../config";

const SalesTablePage = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    // Fetch sales from the backend API
    const fetchSales = async () => {
      try {
        const response = await axios.get(`${config}/sales`); // Update this URL to your backend endpoint
        setSales(response.data);
      } catch (error) {
        console.error('Error fetching sales:', error);
      }
    };

    fetchSales();
  }, []);

  const handleDeleteSale = async (saleId) => {
    try {
      await axios.delete(`${config}/sales/${saleId}`); // Update this URL to your backend endpoint
      setSales(sales.filter(sale => sale._id !== saleId));
    } catch (error) {
      console.error('Error deleting sale:', error);
    }
  };

  const handleReverseSale = async (saleId) => {
    try {
      await axios.put(`${config}/sales/deactivate/${saleId}`); // Call the API to deactivate the sale
      setSales(sales.map(sale =>
        sale._id === saleId ? { ...sale, isActive: false } : sale
      ));
      alert('Sale has been reversed and products have been restored.');
    } catch (error) {
      console.error('Error reversing sale:', error);
    }
  };

  const currentTime = new Date();

  const ongoingSales = sales.filter(sale => new Date(sale.startDate) <= currentTime && new Date(sale.endDate) >= currentTime);
  const upcomingSales = sales.filter(sale => new Date(sale.startDate) > currentTime);
  const finishedSales = sales.filter(sale => new Date(sale.endDate) < currentTime);

  const renderSalesTable = (sales, title) => (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {/* Table for larger screens */}
      <div className="hidden md:block">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-gray-300">
              <tr>
                <th className="p-4 border-b text-left font-medium">Sale Name</th>
                <th className="p-4 border-b text-left font-medium">Start Date</th>
                <th className="p-4 border-b text-left font-medium">End Date</th>
                <th className="p-4 border-b text-left font-medium">Discount (%)</th>
                <th className="p-4 border-b text-left font-medium">Flat Discount (₹)</th>
                <th className="p-4 border-b text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sales.map(sale => (
                <tr key={sale._id} className="hover:bg-gray-100 bg-gray-50">
                  <td className="p-4 border-b text-gray-700">{sale.saleName}</td>
                  <td className="p-4 border-b text-gray-700">{new Date(sale.startDate).toLocaleDateString()}</td>
                  <td className="p-4 border-b text-gray-700">{new Date(sale.endDate).toLocaleDateString()}</td>
                  <td className="p-4 border-b text-gray-700">{sale.discount}</td>
                  <td className="p-4 border-b text-gray-700">{sale.flatDiscount}</td>
                  <td className="p-4 border-b">
                    <button
                      onClick={() => handleDeleteSale(sale._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 mr-2"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleReverseSale(sale._id)}
                      disabled={!sale.isActive} // Disable if sale is already reversed
                      className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                        !sale.isActive ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500'
                      }`}
                    >
                      {!sale.isActive ? 'Reversed' : 'Reverse Sale'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Card view for smaller screens */}
      <div className="md:hidden">
        {sales.map(sale => (
          <div key={sale._id} className="bg-white shadow-md rounded p-4 mb-4">
            <h3 className="text-lg font-bold mb-2">{sale.saleName}</h3>
            <p><strong>Start Date:</strong> {new Date(sale.startDate).toLocaleDateString()}</p>
            <p><strong>End Date:</strong> {new Date(sale.endDate).toLocaleDateString()}</p>
            <p><strong>Discount (%)</strong>: {sale.discount}</p>
            <p><strong>Flat Discount (₹)</strong>: {sale.flatDiscount}</p>
            <button
              onClick={() => handleDeleteSale(sale._id)}
              className="bg-red-500 text-white px-4 py-2 rounded mt-4 w-full"
            >
              Delete
            </button>
            <button
              onClick={() => handleReverseSale(sale._id)}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full"
            >
              Reverse Sale
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen text-start mt-5">
      <div className="max-w-6xl mx-auto bg-white  rounded-lg ">
        {renderSalesTable(ongoingSales, 'Ongoing Sales')}
        {renderSalesTable(upcomingSales, 'Upcoming Sales')}
        {renderSalesTable(finishedSales, 'Finished Sales')}
      </div>
    </div>
  );
};

export default SalesTablePage;
