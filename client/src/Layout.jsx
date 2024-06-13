import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Products from "./Pages/Products";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import Terms from "./Pages/Terms";
import ShippingPolicy from "./Pages/ShippingPolicy";
import RefundPolicy from "./Pages/RefundPolicy";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Account from "./Pages/Account";
import ShoppingCart from "./Pages/ShoppingCart";
import Wishlist from "./Pages/Wishlist";

const Layout = () => {
  return (
    <div className="layout">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<Products />} />
          <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/shippingPolicy" element={<ShippingPolicy />} />
          <Route path="/Refund" element={<RefundPolicy />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Account" element={<Account />} />
          <Route path="/ShoppingCart" element={<ShoppingCart />} />
          <Route path="/Wishlist" element={<Wishlist />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default Layout;
