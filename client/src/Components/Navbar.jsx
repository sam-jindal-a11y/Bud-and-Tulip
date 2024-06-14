import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DropdownMenu from './DropdownMenu';

const Navbar = () => {
  const [productName, setProductName] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setProductName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Redirect to the SearchSection page with the product name
    navigate(`/search?query=${encodeURIComponent(productName)}`);
  };
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto  py-4 flex items-center justify-between">
        <Link to="/" className="text-5xl font-bold text-pinkc">Bud & Tulip</Link>
        <div className="w-full max-w-md">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name..."
          value={productName}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />  
      </form>
    </div>

        <div className="flex space-x-4">
        <Link to="/Register" className="text-gray-700 hover:text-pinkc text-center	text-base"> <i class="fa-regular fa-user"></i><br />My Account</Link>
        <Link to="/Wishlist" className="text-gray-700 hover:text-pinkc text-center text-base	"><i class="fa-regular fa-heart"></i><br />Wishlist</Link>
        <Link to="/ShoppingCart" className="text-gray-700 hover:text-pinkc text-center text-base	"><i class="fa-solid fa-cart-shopping"></i><br />My Cart</Link>
        </div>
      </div>

      <div className="bg-white py-5 border-solid border-2 border-grey">
        <div className="container mx-auto  flex justify-between font-normal opacity-90">
          <div className="flex space-x-4">
         
            <Link to="/" className="text-gray-700 hover:text-pinkc">Home</Link>
            <DropdownMenu />
            <Link to="/about" className="text-gray-700 hover:text-pinkc">About US</Link>
            <Link to="/contact" className="text-gray-700 hover:text-pinkc">Contact</Link>
        
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
