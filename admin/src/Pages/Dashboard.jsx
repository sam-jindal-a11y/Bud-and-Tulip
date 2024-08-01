import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../config";
const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [todayOrders, setTodayOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [confirmedOrders, setConfirmedOrders] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [todayCODOrders, setTodayCODOrders] = useState(0);
  const [totalCODOrders, setTotalCODOrders] = useState(0);
  const [totalRegistrations, setTotalRegistrations] = useState(0);
  const Navigate = useNavigate();
  function ordersSection() {
    Navigate("/orders");
  }
  function usersSection() {
    Navigate("/users");
  }
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${config}/api/orderHistory/orders`);
        setOrders(response.data);
        console.log(response.data);
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
    const todayOrdersCount = orders.filter(
      (order) => order.createdAt.split("T")[0] === today
    ).length;
    const pendingOrdersCount = orders.filter(
      (order) => order.status === "Pending"
    ).length;
    const confirmedOrdersCount = orders.filter(
      (order) => order.status === "Confirmed"
    ).length;
    const totalOrdersCount = orders.length;
    const todayCODOrdersCount = orders.filter(
      (order) =>
        order.paymentMethod === "cod" && order.createdAt.split("T")[0] === today
    ).length;
    const totalCODOrdersCount = orders.filter(
      (order) => order.paymentMethod === "cod"
    ).length;

    setTodayOrders(todayOrdersCount);
    setPendingOrders(pendingOrdersCount);
    setConfirmedOrders(confirmedOrdersCount);
    setTotalOrders(totalOrdersCount);
    setTodayCODOrders(todayCODOrdersCount);
    setTotalCODOrders(totalCODOrdersCount);
    setTotalRegistrations(users.length);
  }, [orders, users]);

  return (
    <div className="p-4">
      <h1 className="my-5 text-xl bg-gray-800 text-white  font-semibold py-2">
      &nbsp; &nbsp;Online Orders
      </h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="text-black p-4 rounded-md shadow-md border">
          <h2 className="text-lg font-semibold">Today Orders</h2>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-2xl font-bold">{todayOrders}</span>
          
          </div>
        </div>
        <div className="text-black p-4 rounded-md shadow-md border">
          <h2 className="text-lg font-semibold">Pending Orders</h2>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-2xl font-bold">{pendingOrders}</span>
         
          </div>
        </div>
        <div className="text-black p-4 rounded-md shadow-md border">
          <h2 className="text-lg font-semibold">Confirm Orders</h2>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-2xl font-bold">{confirmedOrders}</span>
           
          </div>
        </div>
        <div className="text-black p-4 rounded-md shadow-md border">
          <h2 className="text-lg font-semibold">Total Orders</h2>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-2xl font-bold">{totalOrders}</span>
            <button className="bg-blue-500 text-white py-1 px-3 rounded"  onClick={ordersSection}>
            <i class="fa-solid fa-list"></i>
            </button>
          </div>
        </div>
      </div>

      <h1 className="my-5 text-xl bg-gray-800 text-white  font-semibold py-2">
      &nbsp; &nbsp;COD Orders
      </h1>
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="text-black p-4 rounded-md shadow-md border">
          <h2 className="text-lg font-semibold">Today COD Orders</h2>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-2xl font-bold">{todayCODOrders}</span>
          
          </div>
        </div>
        <div className="text-black p-4 rounded-md shadow-md border">
          <h2 className="text-lg font-semibold">Total COD Orders</h2>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-2xl font-bold">{totalCODOrders}</span>
          
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
            <button className="bg-blue-500 text-white py-1 px-3 rounded" onClick={usersSection}>
            <i class="fa-solid fa-list"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
