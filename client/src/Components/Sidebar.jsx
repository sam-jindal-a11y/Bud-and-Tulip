import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, toggleMenu }) => {
  const closeMenu = () => {
    if (isOpen) {
      toggleMenu(); // Close the sidebar if it's open
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token from localStorage
    // Optionally, you can perform additional logout actions here (e.g., redirect, clear user state)
  };

  const isLoggedIn = localStorage.getItem("token");

  return (
    <div
      className={`fixed inset-0 bg-white z-50 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="p-4">
        <button
          className="text-gray-700 hover:text-pinkc focus:outline-none"
          onClick={toggleMenu}
        >
          <i className="fas fa-times text-2xl"></i>
        </button>
        <div className="mt-4">
          <Link
            to="/search?query=&category=All%20Products"
            className="block text-gray-700 hover:text-pinkc py-2"
            onClick={closeMenu} // Close sidebar when this link is clicked
          >
            ALL PRODUCTS
          </Link>
          <Link
            to="/search?query=&category=Sale"
            className="block text-gray-700 hover:text-pinkc py-2"
            onClick={closeMenu} // Close sidebar when this link is clicked
          >
            SALE
          </Link>
          <Link
            to="/search?query=&category=Blazer"
            className="block text-gray-700 hover:text-pinkc py-2"
            onClick={closeMenu} // Close sidebar when this link is clicked
          >
            BLAZER
          </Link>
          <Link
            to="/search?query=&category=Suits"
            className="block text-gray-700 hover:text-pinkc py-2"
            onClick={closeMenu} // Close sidebar when this link is clicked
          >
            SUITS
          </Link>
          <Link
            to="/search?query=&category=Dresses"
            className="block text-gray-700 hover:text-pinkc py-2"
            onClick={closeMenu} // Close sidebar when this link is clicked
          >
            DRESSES
          </Link>
          <Link
            to="/search?query=&category=Co-ords"
            className="block text-gray-700 hover:text-pinkc py-2"
            onClick={closeMenu} // Close sidebar when this link is clicked
          >
            CO-ORDS
          </Link>
          <Link
            to="/search?query=&category=Loungewear"
            className="block text-gray-700 hover:text-pinkc py-2"
            onClick={closeMenu} // Close sidebar when this link is clicked
          >
            LOUNGEWEAR
          </Link>
          <Link
            to="/search?query=&category=Kurtas"
            className="block text-gray-700 hover:text-pinkc py-2"
            onClick={closeMenu} // Close sidebar when this link is clicked
          >
            KURTAS
          </Link>
          <Link
            to="/search?query=&category=Tops"
            className="block text-gray-700 hover:text-pinkc py-2"
            onClick={closeMenu} // Close sidebar when this link is clicked
          >
            TOPS
          </Link>
          <Link
            to="/search?query=&category=Saree"
            className="block text-gray-700 hover:text-pinkc py-2"
            onClick={closeMenu} // Close sidebar when this link is clicked
          >
            SAREE
          </Link>
          <Link
            to="/search?query=&category=Shirts"
            className="block text-gray-700 hover:text-pinkc py-2"
            onClick={closeMenu} // Close sidebar when this link is clicked
          >
            SHIRTS
          </Link>
          {isLoggedIn ? (
            <button
              className="block text-gray-700 hover:text-pinkc py-2"
              onClick={() => {
                handleLogout();
                closeMenu();
              }}
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="block text-gray-700 hover:text-pinkc py-2"
              onClick={closeMenu} // Close sidebar when this link is clicked
            >
              Login / Register
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
