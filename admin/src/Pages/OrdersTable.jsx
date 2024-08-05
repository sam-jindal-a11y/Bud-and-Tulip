import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import config from "../config";

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [userEmails, setUserEmails] = useState({});
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState('pending');
  const [paymentMethod, setPaymentMethod] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Fetch the orders from your backend
    axios.get(`${config}/api/orderHistory/orders`)
      .then(async response => {
        const ordersData = response.data;
        setOrders(ordersData);
        const emails = await fetchUserEmails(ordersData);
        setUserEmails(emails);
        // Fetch URL parameters and apply filters
        const queryParams = new URLSearchParams(location.search);
        const status = queryParams.get('status') || 'pending';
        const payment = queryParams.get('paymentMethod') || 'all';
        const date = queryParams.get('date') || 'all';
        setOrderStatus(status);
        setPaymentMethod(payment);
        setDateFilter(date);
        filterOrders(status, payment, date, ordersData);
      })
      .catch(error => {
        console.error("There was an error fetching the orders!", error);
      });
  }, [location.search]);

  useEffect(() => {
    filterOrders(orderStatus, paymentMethod, dateFilter, orders);
  }, [orderStatus, paymentMethod, dateFilter, orders]);

  const fetchUserEmails = async (orders) => {
    const emails = {};
    for (const order of orders) {
      if (!emails[order.userId]) {
        const response = await axios.get(`${config}/api/auth/users/${order.userId}`);
        emails[order.userId] = response.data.email;
      }
    }
    return emails;
  };

  const filterOrders = (status, payment, date, allOrders) => {
    let filtered = [...allOrders];

    // Filter by order status
    if (status !== 'all') {
      filtered = filtered.filter(order => order.status.toLowerCase() === status.toLowerCase());
    }

    // Filter by payment method
    if (payment !== 'all') {
      filtered = filtered.filter(order => order.paymentMethod.toLowerCase() === payment.toLowerCase());
    }

    // Filter by date range
    switch (date) {
      case 'today':
        filtered = filtered.filter(order => isToday(order.createdAt));
        break;
      case 'last_week':
        filtered = filtered.filter(order => isLastWeek(order.createdAt));
        break;
      case 'last_month':
        filtered = filtered.filter(order => isLastMonth(order.createdAt));
        break;
      default:
        // no date filter applied
        break;
    }

    setFilteredOrders(filtered);
  };

  const isToday = (orderDate) => {
    const today = new Date();
    const date = new Date(orderDate);
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isLastWeek = (orderDate) => {
    const today = new Date();
    const date = new Date(orderDate);
    const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    return date >= lastWeek && date <= today;
  };

  const isLastMonth = (orderDate) => {
    const today = new Date();
    const date = new Date(orderDate);
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    return date >= lastMonth && date <= today;
  };

  const viewOrder = (orderId) => {
    navigate(`/orderdetails/${orderId}`);
  };
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order History</h1>
      <div className="flex flex-col sm:flex-row sm:space-x-4 mb-4">
        <div className="mb-4 sm:mb-0">
          <label className="block mb-2">Date Filter:</label>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full sm:w-auto"
          >
            <option value="all">All</option>
            <option value="today">Today</option>
            <option value="last_week">Last Week</option>
            <option value="last_month">Last Month</option>
          </select>
        </div>
        <div className="mb-4 sm:mb-0">
          <label className="block mb-2">Order Status:</label>
          <select
            value={orderStatus}
            onChange={(e) => setOrderStatus(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full sm:w-auto"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
        <div>
          <label className="block mb-2">Payment Method:</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full sm:w-auto"
          >
            <option value="all">All</option>
            <option value="cod">COD</option>
            <option value="razorpay">Razorpay</option>
          </select>
        </div>
      </div>
      <div className="hidden md:block">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Order ID</th>
              <th className="py-2 px-4 border-b">User Email</th>
              <th className="py-2 px-4 border-b">Total Amount</th>
              <th className="py-2 px-4 border-b">Order Date</th>
              <th className="py-2 px-4 border-b">Order Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order._id}>
                <td className="py-2 px-4 border-b">{order._id}</td>
                <td className="py-2 px-4 border-b">{userEmails[order.userId]}</td>
                <td className="py-2 px-4 border-b">₹ {order.finalAmount.toFixed(2)}</td>
                <td className="py-2 px-4 border-b">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">{capitalizeFirstLetter(order.status)}</td>
                <td className="py-2 px-4 border-b">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => viewOrder(order._id)}>View Order</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="md:hidden">
        {filteredOrders.map(order => (
          <div key={order._id} className="bg-white shadow-md rounded p-4 mb-4">
            <h2 className="text-xl font-bold">Order ID: {order._id}</h2>
            <p><strong>User Email:</strong> {userEmails[order.userId]}</p>
            <p><strong>Total Amount:</strong> ₹ {order.finalAmount.toFixed(2)}</p>
            <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
            <p><strong>Order Status:</strong> {order.status}</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2" onClick={() => viewOrder(order._id)}>View Order</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersTable;
