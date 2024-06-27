import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";

const Navbar = () => {
  const [productName, setProductName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("query");
    const category = params.get("category");

    if (query) {
      setProductName(decodeURIComponent(query));
    }
    if (category) {
      setSelectedCategory(decodeURIComponent(category));
    }
  }, [location.search]);

  const handleInputChange = (event) => {
    setProductName(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const query = encodeURIComponent(productName);
    const category = encodeURIComponent(selectedCategory);
    navigate(`/search?query=${query}&category=${category}`);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto py-4 flex flex-wrap items-center justify-between">
        <div className="flex items-center justify-between w-full md:w-auto">
          <button
            className="block md:hidden text-gray-700 hover:text-pinkc focus:outline-none"
            onClick={toggleMenu}
          >
            <i className="fas fa-bars text-2xl"></i>
          </button>
          <Link
            to="/"
            className="text-3xl md:text-5xl font-bold text-pinkc ml-2 md:ml-0"
          >
            Bud & Tulip
          </Link>
        </div>

        <div
          className={`md:flex items-center mt-4 md:mt-0 ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <div className="relative md:ml-6 flex flex-col md:flex-row items-start md:items-center">
            <select
              className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 md:mb-0 md:mr-2"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option>All Products</option>
              <option>Sale</option>
              <option>Suits</option>
              <option>Loungewear</option>
              <option>Co-ords</option>
              <option>Dresses</option>
              <option>Saree</option>
              <option>Kurtas</option>
              <option>Tops</option>
              <option>Skirt Sets</option>
              <option>Blazer</option>
              <option>Shirts</option>
            </select>
            <form
              onSubmit={handleSubmit}
              className="flex w-full md:w-auto"
            >
              <input
                type="text"
                placeholder="Product name..."
                value={productName}
                onChange={handleInputChange}
                className="w-full md:w-auto px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-pinkc text-white rounded-r-md"
              >
                <i className="fa fa-search"></i>
              </button>
            </form>
          </div>
        </div>

        <div className="flex items-center mt-4 md:mt-0 lg:mt-0">
          <Link
            to="/Account"
            className="text-gray-700 hover:text-pinkc text-center text-base mr-2 md:mr-4"
          >
            <i className="far fa-user"></i>
            <br />
            My Account
          </Link>
          <Link
            to="/Wishlist"
            className="text-gray-700 hover:text-pinkc text-center text-base mr-2 md:mr-4"
          >
            <i className="far fa-heart"></i>
            <br />
            Wish List
          </Link>
          <Link
            to="/ShoppingCart"
            className="text-gray-700 hover:text-pinkc text-center text-base mr-2 md:mr-4"
          >
            <i className="fas fa-shopping-cart"></i>
            <br />
            My cart
          </Link>
        </div>
      </div>

      <div className="bg-white py-5 border-t border-gray-300 hidden md:flex md:justify-between md:items-center">
        <div className="container mx-auto">
          <div className="flex justify-center md:justify-start">
            <Link to="/" className="text-gray-700 hover:text-pinkc px-4 py-2">
              Home
            </Link>
            <DropdownMenu />
            <Link
              to="/about"
              className="text-gray-700 hover:text-pinkc px-4 py-2"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-pinkc px-4 py-2"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
