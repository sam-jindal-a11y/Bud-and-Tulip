import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../config";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [todayOnlineOrders, setTodayOnlineOrders] = useState(0);
  const [pendingOnlineOrders, setPendingOnlineOrders] = useState(0);
  const [totalOnlineOrders, setTotalOnlineOrders] = useState(0);
  const [todayCODOrders, setTodayCODOrders] = useState(0);
  const [pendingCODOrders, setPendingCODOrders] = useState(0);
  const [totalCODOrders, setTotalCODOrders] = useState(0);
  const [totalRegistrations, setTotalRegistrations] = useState(0);
  const navigate = useNavigate();

  const ordersSection = (paymentMethod) => {
    navigate(`/orders?paymentMethod=${paymentMethod}`);
  };

  const usersSection = () => {
    navigate("/users");
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${config}/api/orderHistory/orders`);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${config}/api/auth/users`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchOrders();
    fetchUsers();
  }, []);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const todayOnlineOrdersCount = orders.filter(
      (order) =>
        order.paymentMethod === "razorpay" &&
        order.createdAt.split("T")[0] === today
    ).length;
    const pendingOnlineOrdersCount = orders.filter(
      (order) => order.paymentMethod === "razorpay" && order.status === "pending"
    ).length;
    const totalOnlineOrdersCount = orders.filter(
      (order) => order.paymentMethod === "razorpay"
    ).length;
    const todayCODOrdersCount = orders.filter(
      (order) =>
        order.paymentMethod === "cod" && order.createdAt.split("T")[0] === today
    ).length;
    const pendingCODOrdersCount = orders.filter(
      (order) => order.paymentMethod === "cod" && order.status === "pending"
    ).length;
    const totalCODOrdersCount = orders.filter(
      (order) => order.paymentMethod === "cod"
    ).length;

    setTodayOnlineOrders(todayOnlineOrdersCount);
    setPendingOnlineOrders(pendingOnlineOrdersCount);
    setTotalOnlineOrders(totalOnlineOrdersCount);
    setTodayCODOrders(todayCODOrdersCount);
    setPendingCODOrders(pendingCODOrdersCount);
    setTotalCODOrders(totalCODOrdersCount);
    setTotalRegistrations(users.length);
  }, [orders, users]);

  return (
    <div className="p-4">
      <h1 className="my-5 text-xl bg-gray-800 text-white font-semibold py-2">
        &nbsp; &nbsp;Online Orders
      </h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="text-black p-4 rounded-md shadow-md border">
          <h2 className="text-lg font-semibold">Today Orders</h2>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-2xl font-bold">{todayOnlineOrders}</span>
          </div>
        </div>
        <div className="text-black p-4 rounded-md shadow-md border">
          <h2 className="text-lg font-semibold">Pending Orders</h2>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-2xl font-bold">{pendingOnlineOrders}</span>
          </div>
        </div>
        <div className="text-black p-4 rounded-md shadow-md border">
          <h2 className="text-lg font-semibold">Total Online Orders</h2>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-2xl font-bold">{totalOnlineOrders}</span>
            <button
              className="bg-blue-500 text-white py-1 px-3 rounded"
              onClick={() => ordersSection("razorpay")}
            >
              <i className="fa-solid fa-list"></i>
            </button>
          </div>
        </div>
      </div>

      <h1 className="my-5 text-xl bg-gray-800 text-white font-semibold py-2">
        &nbsp; &nbsp;COD Orders
      </h1>
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="text-black p-4 rounded-md shadow-md border">
          <h2 className="text-lg font-semibold">Today COD Orders</h2>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-2xl font-bold">{todayCODOrders}</span>
          </div>
        </div>
        <div className="text-black p-4 rounded-md shadow-md border">
          <h2 className="text-lg font-semibold">Pending COD Orders</h2>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-2xl font-bold">{pendingCODOrders}</span>
          </div>
        </div>
        <div className="text-black p-4 rounded-md shadow-md border">
          <h2 className="text-lg font-semibold">Total COD Orders</h2>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-2xl font-bold">{totalCODOrders}</span>
            <button
              className="bg-blue-500 text-white py-1 px-3 rounded"
              onClick={() => ordersSection("cod")}
            >
              <i className="fa-solid fa-list"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h1 className="my-5 text-xl bg-gray-800 text-white font-semibold py-2">
          &nbsp; &nbsp;Registrations
        </h1>
        <div className="text-black p-4 rounded-md shadow-md border">
          <h2 className="text-lg font-semibold">Total Registration</h2>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-2xl font-bold">{totalRegistrations}</span>
            <button
              className="bg-blue-500 text-white py-1 px-3 rounded"
              onClick={usersSection}
            >
              <i className="fa-solid fa-list"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
