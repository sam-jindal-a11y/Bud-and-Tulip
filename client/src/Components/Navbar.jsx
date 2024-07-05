import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";
import Sidebar from "./Sidebar";
import axios from 'axios';

const Navbar = () => {
  const [productName, setProductName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [upcomingSale, setUpcomingSale] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("query");
    const category = params.get("category");
    const fetchUpcomingSaleDetails = async () => {
      try {
        const response = await axios.get('http://localhost:5000/sales');
        setUpcomingSale(response.data[0]);
        console.log(response.data[0]._id); // Log the actual data received
      } catch (error) {
        console.error('Error fetching upcoming sale details:', error);
      }
    };
    if (query) {
      setProductName(decodeURIComponent(query));
    }
    if (category) {
      setSelectedCategory(decodeURIComponent(category));
    }
    fetchUpcomingSaleDetails();
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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className="bg-white shadow-md">
       {upcomingSale && (
        <div className="bg-pinkc text-white text-center py-2">
          <p className="text-md text-black font-bold">
            Upcoming Sale: {upcomingSale.saleName} - {upcomingSale.saleDate}
          </p>
        </div>
      )}
      <div className="container mx-auto py-4 px-6 md:px-0 flex items-center justify-between">
        <div className="flex items-center justify-around	 w-full md:w-auto">
          <button
            className="block md:hidden text-gray-700 hover:text-pinkc focus:outline-none"
            onClick={toggleSidebar}
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
          className={`navbar-desktop ${
            isMenuOpen ? "block" : "hidden"
          } md:flex items-center mt-4 md:mt-0`}
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
            <form onSubmit={handleSubmit} className="flex w-full md:w-auto">
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

        <div className="flex items-center mt-4 md:mt-0">
          <Link
            to="/Account"
            className="text-gray-700 hover:text-pinkc text-center text-base mr-2 md:mr-4 flex flex-col items-center"
          >
            <i className="far fa-user text-2xl"></i>
            <span className="hidden md:inline-block">My Account</span>
          </Link>
          <Link
            to="/Wishlist"
            className="text-gray-700 hover:text-pinkc text-center text-base mr-2 md:mr-4 flex flex-col items-center"
          >
            <i className="hidden md:inline-block far fa-heart text-2xl"></i>
            <span className="hidden md:inline-block">Wish List</span>
          </Link>
          <Link
            to="/ShoppingCart"
            className="text-gray-700 hover:text-pinkc text-center text-base mr-2 md:mr-4 flex flex-col items-center"
          >
            <i className="fas fa-shopping-cart text-2xl "></i>
            <span className="hidden md:inline-block">My Cart</span>
          </Link>
        </div>
      </div>

      <div className="navbar-desktop bg-white py-5 border-t border-gray-300 hidden md:flex md:justify-between md:items-center">
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

      <div className="navbar-mobile fixed bottom-0 left-0 right-0 bg-white shadow-md py-2 border-t border-gray-300 z-50">
        <div className="container mx-auto flex justify-around">
          <Link to="/" className="text-gray-700 hover:text-pinkc text-center">
            <i className="fas fa-home text-2xl"></i>
            <br />
            Home
          </Link>
          <Link
            to="/search?query=&category=All%20Products"
            className="text-gray-700 hover:text-pinkc text-center"
          >
            <i className="fas fa-store text-2xl"></i>
            <br />
            Shop
          </Link>
          <Link
            to="/Search"
            className="text-gray-700 hover:text-pinkc text-center"
          >
            <i className="fas fa-search text-2xl"></i>
            <br />
            Search
          </Link>
          <Link
            to="/ShoppingCart"
            className="text-gray-700 hover:text-pinkc text-center"
          >
            <i className="fas fa-shopping-cart text-2xl"></i>
            <br />
            Cart
          </Link>
          <Link
            to="/Wishlist"
            className="text-gray-700 hover:text-pinkc text-center"
          >
            <i className="fas fa-heart text-2xl"></i>
            <br />
            Wishlist
          </Link>
        </div>
      </div>

      <Sidebar isOpen={isSidebarOpen} toggleMenu={toggleSidebar} />
    </nav>
  );
};

export default Navbar;
