import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" ref={dropdownRef} style={{ zIndex: 9999 }}>
      <button
        onClick={toggleDropdown}
        className="text-gray-700 hover:text-pinkc px-4 py-2"
      >
        Products <i className="fa-solid fa-angle-down"></i>
      </button>
      {isOpen && (
        <div className="absolute bg-white shadow-lg  mt-2 w-48 z-10 overflow-hidden">
          <ul className="py-2">
            <li>
              <Link
                to="/search?query=&category=All%20Products"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                onClick={() => setIsOpen(false)} // Close dropdown on link click
              >
                All Products
              </Link>
            </li>
            <li>
              <Link
                to="/search?query=&category=Sale"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                onClick={() => setIsOpen(false)} // Close dropdown on link click
              >
                Sale
              </Link>
            </li>
            <li>
              <Link
                to="/search?query=&category=Suits"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                onClick={() => setIsOpen(false)} // Close dropdown on link click
              >
                Suits
              </Link>
            </li>
            <li>
              <Link
                to="/search?query=&category=Loungewear"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                onClick={() => setIsOpen(false)} // Close dropdown on link click
              >
                Loungewear
              </Link>
            </li>
            <li>
              <Link
                to="/search?query=&category=Co-ords"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                onClick={() => setIsOpen(false)} // Close dropdown on link click
              >
                Co-Ords
              </Link>
            </li>
            <li>
              <Link
                to="/search?query=&category=Dresses"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                onClick={() => setIsOpen(false)} // Close dropdown on link click
              >
                Dresses
              </Link>
            </li>
            <li>
              <Link
                to="/search?query=&category=Saree"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                onClick={() => setIsOpen(false)} // Close dropdown on link click
              >
                Saree
              </Link>
            </li>
            <li>
              <Link
                to="/search?query=&category=Kurtas"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                onClick={() => setIsOpen(false)} // Close dropdown on link click
              >
                Kurtas
              </Link>
            </li>
            <li>
              <Link
                to="/search?query=&category=Tops"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                onClick={() => setIsOpen(false)} // Close dropdown on link click
              >
                Tops
              </Link>
            </li>
            <li>
              <Link
                to="/search?query=&category=Blazer"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                onClick={() => setIsOpen(false)} // Close dropdown on link click
              >
                Blazer
              </Link>
            </li>
            <li>
              <Link
                to="/search?query=&category=Skirt%20Sets"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                onClick={() => setIsOpen(false)} // Close dropdown on link click
              >
                Skirt Sets
              </Link>
            </li>
            <li>
              <Link
                to="/search?query=&category=Shirts"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                onClick={() => setIsOpen(false)} // Close dropdown on link click
              >
                Shirts
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
