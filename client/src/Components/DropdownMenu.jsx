import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="text-gray-700 hover:text-pink-500">
        Products
      </button>
      {isOpen && (
        <div className="absolute bg-white shadow-lg rounded-md mt-2 w-48 z-10">
          <ul className="py-2">
            <li><Link to="Search" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">All Products</Link></li>
            <li><Link to="/products/sale" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Sale</Link></li>
            <li><Link to="/products/suits" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Suits</Link></li>
            <li><Link to="/products/loungewear" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Loungewear</Link></li>
            <li><Link to="/products/co-ords" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Co-Ords</Link></li>
            <li><Link to="/products/dresses" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Dresses</Link></li>
            <li><Link to="/products/saree" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Saree</Link></li>
            <li><Link to="/products/kurtas" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Kurtas</Link></li>
            <li><Link to="/products/tops" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Tops</Link></li>
            <li><Link to="/products/blazer" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Blazer</Link></li>
            <li><Link to="/products/skirt-sets" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Skirt Sets</Link></li>
            <li><Link to="/products/shirts" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Shirts</Link></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
