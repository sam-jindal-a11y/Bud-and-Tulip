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
import SizeChart from "./Pages/SizeChart";
import ProductView from "./Components/ProductView";
import SearchSection from "./Pages/SearchSection";
import Addressform from "./Components/Addressform";
import CheckoutPage from "./Pages/CheckoutPage";
import OrderDetails from "./Components/OrderDetails";
import ScrollToTop from "./Components/ScrollToTop.jsx";
import EditAddressForm from "./Pages/EditAddressForm.jsx";

const Layout = () => {
  window.scrollTo(0, 0);
  return (
    <div className="layout">
      <Router>
        <ScrollToTop />
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
          <Route path="/product" element={<ProductView />}/>
          <Route path="/product/:id" element={<ProductView />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Account" element={<Account />} />
          <Route path="/ShoppingCart" element={<ShoppingCart />} />
          <Route path="/Search" element={<SearchSection />} />
          <Route path="/Wishlist" element={<Wishlist />} />
          <Route path="/SizeChart" element={<SizeChart />} />
          <Route path="/AddressForm" element={<Addressform />} />
          <Route path="/CheckoutPage" element={<CheckoutPage />} />
          <Route path="/editaddressform" element={<EditAddressForm />} />
          <Route path="/orderDetails" element={<OrderDetails />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default Layout;
