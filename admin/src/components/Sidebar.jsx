import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import './Sidebar.css'; // Import your CSS file for styling

const Sidebar = ({ onClose }) => {
  const [dropdownState, setDropdownState] = useState({
    category: false,
    colors: false,
    size: false,
    banner: false,
    products: false,
    orders: false,
  });

  const toggleDropdown = (item) => {
    setDropdownState((prevState) => {
      // Set all other dropdown states to false
      const newState = Object.keys(prevState).reduce((acc, key) => {
        acc[key] = key === item ? !prevState[key] : false;
        return acc;
      }, {});
      return newState;
    });
  };

  // Function to handle link clicks inside dropdowns and close the sidebar
  const handleLinkClick = (event) => {
    // Prevent the click event from bubbling up to parent elements
    event.stopPropagation();
    // Close the sidebar
    if (onClose) onClose();
  };

  return (
    <div className="sidebar bg-gray-900 text-white w-64 flex flex-col h-full">
      {/* Sidebar header */}
      <div className="sidebar-header flex items-center justify-between h-16 bg-gray-800 px-4">
        <span className="text-lg font-semibold">Administrator</span>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-400 focus:outline-none"
        >
          <i className="fas fa-times fa-lg"></i>
        </button>
      </div>

      {/* Sidebar links */}
      <nav className="flex-1 text-start text-lg">
        <ul className="mt-6">
          <li className="px-4 py-2 hover:bg-gray-800 relative">
            <Link to="/" onClick={handleLinkClick}>Dashboard</Link>
          </li>

          <li className="px-4 py-2 hover:bg-gray-800 relative">
            <div
              className="flex justify-between items-center"
              onClick={() => toggleDropdown('category')}
            >
              <span className="block">Category</span>
              <button className="dropdown-btn">▼</button>
            </div>
            {dropdownState.category && (
              <ul className="dropdown-menu">
                <li className="px-4 py-2 hover:bg-gray-700">
                  <Link to="addcategory" onClick={handleLinkClick}>
                    Add Category
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-700">
                  <Link to="updatecategory" onClick={handleLinkClick}>
                    Update Category
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li className="px-4 py-2 hover:bg-gray-800 relative">
            <div
              className="flex justify-between items-center"
              onClick={() => toggleDropdown('colors')}
            >
              <span className="block">Colors</span>
              <button className="dropdown-btn">▼</button>
            </div>
            {dropdownState.colors && (
              <ul className="dropdown-menu">
                <li className="px-4 py-2 hover:bg-gray-700">
                  <Link to="addcolor" onClick={handleLinkClick}>
                    Add Colors
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-700">
                  <Link to="updatecolor" onClick={handleLinkClick}>
                    Update Colors
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li className="px-4 py-2 hover:bg-gray-800 relative">
            <div
              className="flex justify-between items-center"
              onClick={() => toggleDropdown('size')}
            >
              <span className="block">Size</span>
              <button className="dropdown-btn">▼</button>
            </div>
            {dropdownState.size && (
              <ul className="dropdown-menu">
                <li className="px-4 py-2 hover:bg-gray-700">
                  <Link to="/addsize" onClick={handleLinkClick}>
                    Add Size
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-700">
                  <Link to="/updatesize" onClick={handleLinkClick}>
                    Update Size
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li className="px-4 py-2 hover:bg-gray-800 relative">
            <div
              className="flex justify-between items-center"
              onClick={() => toggleDropdown('banner')}
            >
              <span className="block">Banner</span>
              <button className="dropdown-btn">▼</button>
            </div>
            {dropdownState.banner && (
              <ul className="dropdown-menu">
                <li className="px-4 py-2 hover:bg-gray-700">
                  <Link to="/addbanner" onClick={handleLinkClick}>
                    Add Banner
                  </Link>
                </li>
              
              </ul>
            )}
          </li>

          <li className="px-4 py-2 hover:bg-gray-800 relative">
            <div
              className="flex justify-between items-center"
              onClick={() => toggleDropdown('products')}
            >
              <span className="block">Products</span>
              <button className="dropdown-btn">▼</button>
            </div>
            {dropdownState.products && (
              <ul className="dropdown-menu">
                <li className="px-4 py-2 hover:bg-gray-700">
                  <Link to="/addproduct" onClick={handleLinkClick}>
                    Add Product
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li className="px-4 py-2 hover:bg-gray-800 relative">
            <div
              className="flex justify-between items-center"
              onClick={() => toggleDropdown('orders')}
            >
              <span className="block">Orders</span>
              <button className="dropdown-btn">▼</button>
            </div>
            {dropdownState.orders && (
              <ul className="dropdown-menu">
                <li className="px-4 py-2 hover:bg-gray-700">
                  <Link to="/orders" onClick={handleLinkClick}>
                    View Orders
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Static items */}
          <li className="px-4 py-2 hover:bg-gray-800">
            <Link to="/sale" onClick={handleLinkClick}>Sale</Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-800">
            <Link to="/giftcards" onClick={handleLinkClick}>Add Coupons</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
