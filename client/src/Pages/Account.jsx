import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import EditAddressForm from "./EditAddressForm"; // if unused, you can remove this
import config from "../config";

const Account = () => {
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
        fetchAddresses(decoded.id);
        fetchUserDetails(decoded.id);
        fetchOrders(decoded.id);
      } catch (err) {
        console.error("Invalid token:", err);
        localStorage.removeItem("token");
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const fetchAddresses = async (userId) => {
    try {
      const response = await fetch(`${config}/api/address?userId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        setAddresses(data);
      } else {
        console.error("Failed to fetch addresses:", response.status);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  const fetchUserDetails = async (userId) => {
    try {
      const response = await fetch(`${config}/api/auth/users/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        console.error("Failed to fetch user details:", response.status);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const fetchOrders = async (userId) => {
    try {
      const response = await fetch(
        `${config}/api/orderHistory/orders/user/${userId}`
      );
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        console.error("Failed to fetch orders:", response.status);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.clear();
    navigate("/");
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.delete(
        `${config}/api/address/${addressId}`,
        { headers }
      );

      if (response.status === 200) {
        setAddresses((prev) =>
          prev.filter((address) => address._id !== addressId)
        );
      } else {
        console.error("Failed to delete address:", response.status);
      }
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  const handleUpdateAddress = (address) => {
    navigate("/editaddressform", { state: { address } });
  };

  if (!user) return <div>Loading...</div>;

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard orders={orders} />;
      case "addresses":
        return (
          <Addresses
            addresses={addresses}
            onDelete={handleDeleteAddress}
            onUpdate={handleUpdateAddress}
            addNewAddress={() => navigate("/addressform")}
          />
        );
      case "wishlist":
        return <Wishlist />;
      case "wallet":
        return <Wallet />;
      default:
        return <Dashboard orders={orders} />;
    }
  };

  return (
    <main className="max-w-4xl mx-auto p-4">
      <Helmet>
        <title>{`Account Dashboard - ${user?.firstName || ""}`}</title>
        <meta
          name="description"
          content={`Manage your account, addresses, orders, wishlist, and wallet, ${
            user?.firstName || "user"
          }.`}
        />
      </Helmet>

      <h1 className="text-2xl font-semibold mb-4">
        Hello, {user?.firstName || "User"}! Welcome to your dashboard!
      </h1>

      <div className="flex flex-col md:flex-row">
        <aside className="md:w-1/3 p-4 border-r mb-4 md:mb-0">
          <h2 className="text-xl font-bold mb-4">My Profile</h2>
          <nav>
            <ul className="space-y-2">
              <li
                className={`cursor-pointer ${
                  activeTab === "dashboard" ? "text-pink-500" : ""
                }`}
                onClick={() => setActiveTab("dashboard")}
              >
                Dashboard
              </li>
              <li
                className={`cursor-pointer ${
                  activeTab === "addresses" ? "text-pink-500" : ""
                }`}
                onClick={() => setActiveTab("addresses")}
              >
                Addresses
              </li>
              <li
                className={`cursor-pointer ${
                  activeTab === "wishlist" ? "text-pink-500" : ""
                }`}
                onClick={() => setActiveTab("wishlist")}
              >
                Wishlist
              </li>
              <li
                className={`cursor-pointer ${
                  activeTab === "wallet" ? "text-pink-500" : ""
                }`}
                onClick={() => setActiveTab("wallet")}
              >
                Wallet
              </li>
            </ul>
          </nav>
          <button
            onClick={handleLogout}
            className="mt-6 px-4 py-2 border border-black rounded"
          >
            Log Out
          </button>
        </aside>

        <section className="md:w-2/3 p-4">{renderContent()}</section>
      </div>
    </main>
  );
};

const Dashboard = ({ orders }) => (
  <section>
    <h2 className="text-xl font-bold mb-4">Orders History</h2>
    {orders && orders.length ? (
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Order ID</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="py-2 px-4 border-b">{order._id}</td>
              <td className="py-2 px-4 border-b">
                {new Date(order.createdAt).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border-b">
                {order.status || "pending"}
              </td>
              <td className="py-2 px-4 border-b">₹ {order.finalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p>No orders found</p>
    )}
  </section>
);

const Addresses = ({ addresses, onDelete, onUpdate, addNewAddress }) => (
  <section>
    <h2 className="text-xl font-bold mb-4">My Addresses</h2>
    {addresses && addresses.length ? (
      addresses.map((address) => (
        <article key={address._id} className="border p-4 rounded mb-4">
          <p>
            <strong>
              {address.firstName} {address.lastName}
            </strong>
          </p>
          <p>
            {address.address1}, {address.address2}
          </p>
          <p>
            {address.city}, {address.province}, {address.country} -{" "}
            {address.postalCode}
          </p>
          <p>Phone: {address.phone}</p>
          <p>Company: {address.company}</p>
          <div className="mt-2">
            <button
              onClick={() => onUpdate(address)}
              className="mr-2 px-2 py-1 border rounded"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(address._id)}
              className="px-2 py-1 border rounded"
            >
              Delete
            </button>
          </div>
        </article>
      ))
    ) : (
      <p>No addresses added yet.</p>
    )}
    <button
      onClick={addNewAddress}
      className="mt-4 px-4 py-2 border border-black rounded"
    >
      Add New Address
    </button>
  </section>
);

const Wishlist = () => (
  <section>
    <h2 className="text-xl font-bold mb-4">My Wishlist</h2>
    <p>Your wishlist items will appear here.</p>
  </section>
);

const Wallet = () => (
  <section>
    <h2 className="text-xl font-bold mb-4">My Wallet</h2>
    <p>Wallet summary and transaction history will appear here.</p>
  </section>
);

export default Account;
