import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MobileSearchBar = () => {
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Products");


  const handleInputChange = (event) => {
    setProductName(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };



  const handleSearch = (e) => {
    e.preventDefault();
    const query = encodeURIComponent(productName);
    const category = encodeURIComponent(selectedCategory);
    navigate(`/search?query=${query}&category=${category}`);
  };

  return (
    <div className="block lg:hidden w-full   p-4  items-center bg-white">
      <form onSubmit={handleSearch}>
    
        <input
         type="text"
         placeholder="Product name..."
         value={productName}
         onChange={handleInputChange}
         className='border rounded-l-md px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        <button type="submit" className="bg-pink-500 text-white p-2 rounded-r">
          <i className="fa fa-search"></i>
        </button>
      </form>
    </div>
  );
};

export default MobileSearchBar;
