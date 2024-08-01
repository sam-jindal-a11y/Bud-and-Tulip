import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import config from "../config";
const OrderDetail = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [productsData, setProductsData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`${config}/api/orderHistory/${id}`);
        const fetchedOrder = response.data;
        const user = await fetchUserData(fetchedOrder.userId._id);

        // Fetch product data for all products
        const productsPromises = fetchedOrder.products.map(item =>
          fetchProductData(item.productId)
        );
        const productsData = await Promise.all(productsPromises);

        setOrder({ ...fetchedOrder, user });
        setProductsData(productsData);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const handleStatusChange = async () => {
    try {
      await axios.put(`${config}/api/orderHistory/${id}/status`, {
        status: newStatus,
      });
      alert('Status updated successfully and email sent to the customer');
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`${config}/api/auth/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  };

  const fetchProductData = async (productId) => {
    try {
      const response = await axios.get(`${config}/products/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product data:', error);
      throw error;
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching order details: {error.message}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md text-start">
      <h1 className="text-2xl font-semibold mb-6">
        Order detail of <span className="text-blue-500">{order._id}</span>
      </h1>
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-6">
        <div className="flex-1">
          <p><strong>Name:</strong> {order.user.firstName} {order.user.lastName}</p>
          <p><strong>Mobile:</strong> {order.ShipDetails.phone}</p>
          <p><strong>Email:</strong> {order.user.email}</p>
          <p><strong>City:</strong> {order.ShipDetails.city}</p>
          <p><strong>State:</strong> {order.ShipDetails.province}</p>
          <p><strong>Address:</strong> {order.ShipDetails.address1}</p>
          <p><strong>Country:</strong> {order.ShipDetails.country}</p>
          <p><strong>Postal Code:</strong> {order.ShipDetails.postalCode}</p>
        </div>
        <div className="flex-1">
          <p><strong>Order No:</strong> <span className="text-blue-500">{order._id}</span></p>
          <p><strong>Shipping Charges:</strong> {order.codCharge}</p>
          <p><strong>Final Total:</strong> {order.finalAmount}</p>
          <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          <p><strong>Order Status:</strong> {order.status || 'Payment Pending'}</p>
          <p><strong>Order Type:</strong> {order.paymentMethod.toUpperCase()}</p>
        </div>
      </div>
      <div>
        <table className="w-full border-collapse bg-gray-100">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Product Name</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Quantity</th>
              <th className="p-2 border">Size</th>
              <th className="p-2 border">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {order.products.map((item, index) => (
              <tr key={item.productId._id} className="text-center">
                <td className="p-2 border flex items-center flex-col sm:flex-row sm:items-start">
                  <img
                    src={productsData[index]?.image[0] || '/placeholder-image.jpg'}
                    alt={productsData[index]?.name || 'Product'}
                    className="w-16 h-16 object-cover mb-2 sm:mb-0 sm:mr-4"
                  />
                  {productsData[index]?.name || 'Loading...'}
                </td>
                <td className="p-2 border">{item.price}</td>
                <td className="p-2 border">{item.quantity}</td>
                <td className="p-2 border">{item.size}</td>
                <td className="p-2 border">{item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 text-end">
          <div>
            <p><b>Total Price: </b><span className="text-gray-900">₹ {order.totalAmount}</span></p>
            {order.discount > 0 && (
              <p><b>Max Discount: </b><span className="text-gray-900">₹ {order.discount}</span></p>
            )}
            {order.voucherCode && (
              <p className="text-red-500"><b>Voucher Code Used: </b><span className="text-black">{order.voucherCode}</span></p>
            )}
            <p><b>Shipping Charges: </b><span className="text-gray-900">₹ {order.codCharge}</span></p>
            <p><b>Final Price: </b><span className="text-gray-900">₹ {order.finalAmount}</span></p>
          </div>
        </div>
      </div>
      <div className="mb-6">
        <label htmlFor="statusSelect" className="block font-semibold mb-2">
          Change Status:
        </label>
        <select
          id="statusSelect"
          className="border p-2 rounded w-full md:w-1/3"
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
        >
          <option value="">Select Status</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2 w-full md:w-auto" onClick={handleStatusChange}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;
