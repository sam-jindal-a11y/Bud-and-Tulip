import React, { useState } from "react";
import { Link } from "react-router-dom";

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="text-gray-700 hover:text-pinkc px-4 py-2"
      >
        Products
      </button>
      {isOpen && (
        <div className="absolute bg-white shadow-lg rounded-md mt-2 w-48 z-10 overflow-hidden">
          <ul className="py-2">
            <li>
              <Link
                to="/search?query=&category=All%20Products"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
              >
                All Products
              </Link>
            </li>
            <li>
              <Link
                to="/search?query=&category=Sale"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
              >
                Sale
              </Link>
            </li>
            <li>
              <Link
                to="/search?query=&category=Suits"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
              >
                Suits
              </Link>
            </li>
            <li>
              <Link
                to="/search?query=&category=Loungewear"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
              >
                Loungewear
              </Link>
            </li>
            <li>
              <Link
                to="/search?query=&category=Co-ords"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
              >
                Co-Ords
              </Link>
            </li>
            <li>
              <Link
                to="/search?query=&category=Dresses"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
              >
                Dresses
              </Link>
            </li>
            <li>
              <Link
                to="/search?query=&category=Saree"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
              >
                Saree
              </Link>
            </li>
            <li>
              <Link
                to="/search?query=&category=Kurtas"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
              >
                Kurtas
              </Link>
            </li>
            <li>
              <Link
                to="/search?query=&category=Tops"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
              >
                Tops
              </Link>
            </li>
            <li>
              <Link
                to="/search?query=&category=Blazer"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
              >
                Blazer
              </Link>
            </li>
            <li>
              <Link
                to="/search?query=&category=Skirt%20Sets"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
              >
                Skirt Sets
              </Link>
            </li>
            <li>
              <Link
                to="/search?query=&category=Shirts"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
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
