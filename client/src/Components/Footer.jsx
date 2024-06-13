import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-full h-screen px-20 flex bg-greyc text-white flex-col py-10 min-h-full">
      <div className="flex flex-row  mx-auto justify-between">
        <div className="about w-1/2 min-h-full ">
          <h3 className="font-semibold text-lg	">About Us</h3>
          <br />
          <p>
            Bud & Tulip is an everyday easy breezy, fuss free clothing<br/>  label
            having it’s manufacturing rooted in and inspired<br/> from Jaipur. We at
            Bud & Tulip believe in providing best <br/> fabrics, unique prints and
            beautiful hand embroidered details.<br/> Our team creates silhouettes
            that can be worn by XXS to<br/> 5XL Hope you love your Bud & Tulip
            garments.<br/> Happy Shopping!
          </p>
          
        </div>
        <div className="account flex flex-col">
            <h3 className="font-semibold text-lg">My Account</h3>
            <br />
            <Link to="/Account" className=" hover:text-pinkc">My Account</Link>
            <Link to="/ShoppingCart"className=" hover:text-pinkc">Shopping Cart</Link>
            <Link to="/Wishlist"className=" hover:text-pinkc">Wishlist</Link>
            <Link to="/Login"className=" hover:text-pinkc">Login</Link>
            <Link to="/privacyPolicy"className=" hover:text-pinkc">Privacy Policy</Link>
            <Link to="/shippingPolicy"className=" hover:text-pinkc">Shipping Policy</Link>
            <Link to="/Refund"className=" hover:text-pinkc">Refund Policy</Link>
            <Link to="/terms"className=" hover:text-pinkc">Terms & Conditions</Link>
        </div>
        <div className="categories"></div>
        <div className="insta"></div>
      </div>
      <div className="nav2">
        <p className="font-semibold my-5">
          Copyright © 2022 Bud & Tulip . All Rights Reserved.Developed by Soft
          Coders
        </p>
      </div>
    </div>
  );
};

export default Footer;
