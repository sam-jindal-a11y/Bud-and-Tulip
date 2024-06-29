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
    <div className="block lg:hidden w-full p-4 bg-white">
      <form onSubmit={handleSearch} className="flex items-center space-x-2">
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
