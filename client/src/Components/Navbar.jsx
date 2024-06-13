import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto  py-4 flex items-center justify-between">
        <Link to="/" className="text-5xl font-bold text-pinkc">Bud & Tulip</Link>
        <div className="w-full max-w-md">
          <input
            type="text"
            placeholder="Product Name..."
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex space-x-4">
        <Link to="/Account" className="text-gray-700 hover:text-pinkc text-center	text-base"> <i class="fa-regular fa-user"></i><br />My Account</Link>
        <Link to="/Wishlist" className="text-gray-700 hover:text-pinkc text-center text-base	"><i class="fa-regular fa-heart"></i><br />Wishlist</Link>
        <Link to="/ShoppingCart" className="text-gray-700 hover:text-pinkc text-center text-base	"><i class="fa-solid fa-cart-shopping"></i><br />My Cart</Link>
        </div>
      </div>

      <div className="bg-white py-5 border-solid border-2 border-grey">
        <div className="container mx-auto  flex justify-between font-normal opacity-90">
          <div className="flex space-x-4">
         
            <Link to="/" className="text-gray-700 hover:text-pinkc">Home</Link>
            <Link to="/products" className="text-gray-700 hover:text-pinkc">Products</Link>
            <Link to="/about" className="text-gray-700 hover:text-pinkc">About US</Link>
            <Link to="/contact" className="text-gray-700 hover:text-pinkc">Contact</Link>
        
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
