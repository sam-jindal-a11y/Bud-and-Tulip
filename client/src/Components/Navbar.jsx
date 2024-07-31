import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";
import Sidebar from "./Sidebar";
import axios from "axios";
import { CartContext } from "./CartContext";

const Navbar = () => {
  const [productName, setProductName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [upcomingSale, setUpcomingSale] = useState("");
  // const [tempCart, setTempCart] = useState([]);
  const location = useLocation();
  const { tempCart, itemsAdded } = useContext(CartContext);
  const navigate = useNavigate();
  window.scrollTo(0, 0);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("query");
    const category = params.get("category");
    const fetchUpcomingSaleDetails = async () => {
      try {
        const response = await axios.get(
          "http://apex.3axys.com:5000/sales"
        );
        setUpcomingSale(response.data[0]);
        console.log(response.data[0]._id); // Log the actual data received
      } catch (error) {
        console.error("Error fetching upcoming sale details:", error);
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
    <nav className="bg-white shadow-lg navbar">
      <div className="container mx-auto py-2.5 h-12 px-6 md:px-0 flex items-center justify-between">
        <div className="flex items-center justify-around w-full md:w-auto">
          <button
            className="block md:hidden text-gray-700 hover:text-pinkc focus:outline-none"
            onClick={toggleSidebar}
          >
            <i className="fas fa-bars text-2xl"></i>
          </button>
          <Link
            to="/"
            className="text-xl md:text-5xl font-bold text-pinkc md:ml-0 navbar-brand"
          >
            <h1  className=" navbar-brand">Bud&Tulip</h1>
          </Link>
        </div>

        <div className=" md:flex items-center md:mt-0 flex-grow mx-4">
          <div className="relative md:ml-6 flex flex-col md:flex-row items-start md:items-center w-full">
            <form onSubmit={handleSubmit} className="flex w-full mx-2">
              <input
                type="text"
                placeholder="Product name..."
                value={productName}
                onChange={handleInputChange}
                className="w-full px-4 border rounded-l-md focus:outline-none focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 bg-pinkc text-white rounded-r-md"
              >
                <i className="fa fa-search"></i>
              </button>
            </form>
          </div>
        </div>

        <div className="flex items-center md:mt-0">
          <Link
            to="/ShoppingCart"
            className="text-gray-700 hover:text-pinkc text-center text-base mr-2 md:mr-4 flex flex-col items-center relative"
          >
            <i
              className={`fa-solid fa-bag-shopping text-xl ${
                itemsAdded ? "text-gray-700" : ""
              }`}
            ></i>
            {tempCart.length > 0 && (
             <span className="absolute top-0 bottom-1 right-0 left-2 flex items-center justify-center w-4 h-4 bg-pink-400 text-white text-xs font-bold rounded-full shadow-lg">
             {tempCart.length}
           </span>
           
            )}
          </Link>

          <Link
            to="/Account"
            className="text-gray-700 hover:text-pinkc text-center text-base mr-2 md:mr-4 flex flex-col items-center"
          >
            <i className="far fa-user text-xl"></i>
          </Link>
          <Link
            to="/Wishlist"
            className="text-gray-700 hover:text-pinkc text-center text-base mr-2 md:mr-4 flex flex-col items-center"
          >
            <i className="hidden md:inline-block far fa-heart text-xl"></i>
          </Link>
        </div>
      </div>

      <div className="navbar-desktop bg-pinkc py-1 border-t px-6  hidden md:flex md:justify-between md:items-center shadow-sm">
        <div className="container mx-auto">
          <div className="flex justify-center md:justify-center">
            <Link
              to="/"
              className="text-white text-semibold hover:text-pink-500 px-4 py-2"
            >
              Home
            </Link>
            <DropdownMenu />
            <Link
              to="/about"
              className="text-white text-semibold hover:text-pink-500 px-4 py-2"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-white text-semibold hover:text-pink-500 px-4 py-2"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>

      <Sidebar isOpen={isSidebarOpen} toggleMenu={toggleSidebar} />
    </nav>
  );
};

export default Navbar;
