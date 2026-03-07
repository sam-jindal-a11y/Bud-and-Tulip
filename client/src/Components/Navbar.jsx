import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";
import Sidebar from "./Sidebar";
import axios from "axios";
import { CartContext } from "./CartContext";
import config from "../config";

const Navbar = () => {

  const [productName, setProductName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { tempCart } = useContext(CartContext);

  useEffect(() => {

    const params = new URLSearchParams(location.search);
    const query = params.get("query");
    const category = params.get("category");

    if (query) setProductName(decodeURIComponent(query));
    if (category) setSelectedCategory(decodeURIComponent(category));

  }, [location.search]);

  const handleSubmit = (event) => {

    event.preventDefault();

    const query = encodeURIComponent(productName);
    const category = encodeURIComponent(selectedCategory);

    navigate(`/search?query=${query}&category=${category}`);

  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (

    <>
      <nav className="navbar">

        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

          {/* Mobile Menu */}
          <button
            className="md:hidden text-xl text-gray-700"
            onClick={toggleSidebar}
          >
            <i className="fas fa-bars"></i>
          </button>

          {/* Logo */}
          <Link to="/" className="navbar-brand text-3xl md:text-4xl">
            Bud&Tulip
          </Link>

          {/* Search */}
          <form
            onSubmit={handleSubmit}
            className="hidden md:flex items-center w-[40%] relative"
          >

            <input
              type="text"
              placeholder="Search suits, dresses..."
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full px-5 py-2 focus:outline-none"
            />

            <button type="submit" className="search-btn">
              <i className="fa fa-search"></i>
            </button>

          </form>

          {/* Icons */}
          <div className="flex items-center gap-6 text-xl">

            <Link to="/ShoppingCart" className="relative text-gray-700">
              <i className="fa-solid fa-bag-shopping"></i>

              {tempCart.length > 0 && (
                <span className="cart-badge">
                  {tempCart.length}
                </span>
              )}
            </Link>

            <Link to="/Account" className="text-gray-700">
              <i className="far fa-user"></i>
            </Link>

            <Link to="/Wishlist" className="text-gray-700">
              <i className="far fa-heart"></i>
            </Link>

          </div>

        </div>

        {/* Menu */}
      <div className="navbar-desktop">

<div className="max-w-7xl">

<a
className="navbar-link"
onClick={()=>navigate("/search?category=Suits")}
>
Suits
</a>

<a
className="navbar-link"
onClick={()=>navigate("/search?category=Loungewear")}
>
Loungewear
</a>

<a
className="navbar-link"
onClick={()=>navigate("/search?category=Co-ords")}
>
Co-Ords
</a>

<a
className="navbar-link"
onClick={()=>navigate("/search?category=Dresses")}
>
Dresses
</a>

<a
className="navbar-link"
onClick={()=>navigate("/search?category=Saree")}
>
Saree
</a>

<a
className="navbar-link"
onClick={()=>navigate("/search?category=Kurtas")}
>
Kurtas
</a>

<a
className="navbar-link"
onClick={()=>navigate("/search?category=Tops")}
>
Tops
</a>

<a
className="navbar-link"
onClick={()=>navigate("/search?category=Blazer")}
>
Blazer
</a>

<a
className="navbar-link"
onClick={()=>navigate("/search?category=Skirt Sets")}
>
Skirt Sets
</a>

<a
className="navbar-link"
onClick={()=>navigate("/search?category=Shirts")}
>
Shirts
</a>

</div>

</div>
      </nav>

      <Sidebar isOpen={isSidebarOpen} toggleMenu={toggleSidebar} />

    </>
  );
};

export default Navbar;