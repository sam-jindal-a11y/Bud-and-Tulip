import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchSection = () => {
  const [products, setProducts] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 25000 });
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [sortOption, setSortOption] = useState('popularity');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/products');
        const productArray = Object.values(response.data); // Convert JSON object to array
        setProducts(productArray);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('query');
    const category = params.get('category');
    filterProducts(query, category);
  }, [selectedSizes, selectedColors, priceRange, itemsPerPage, sortOption, currentPage, products, location.search, navigate]);

  const handleSizeChange = (size) => {
    setSelectedSizes((prevSizes) =>
      prevSizes.includes(size) ? prevSizes.filter((s) => s !== size) : [...prevSizes, size]
    );
  };

  const handleColorChange = (color) => {
    setSelectedColors((prevColors) =>
      prevColors.includes(color) ? prevColors.filter((c) => c !== color) : [...prevColors, color]
    );
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange((prevRange) => ({ ...prevRange, [name]: Number(value) }));
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const filterProducts = (query, category) => {
    if (products.length !== 0) {
      let filteredProducts = products[0];
console.log(category);
      // Filter by category if specified
      if (category && category !== 'All Products') {
        
        filteredProducts = filteredProducts.filter((product) =>{console.log(product.category.includes(category)); return product.category.includes(category)});
      }

      console.log(filteredProducts)

      // Apply other filters
      filteredProducts = filteredProducts.filter((product) => {
        const sizeMatch = selectedSizes.length === 0 || product.size.some((size) => selectedSizes.includes(size));
        const colorMatch = selectedColors.length === 0 || product.color.some((color) => selectedColors.includes(color));
        const priceMatch = product.price >= priceRange.min && product.price <= priceRange.max;
        const queryMatch = !query || product.name.toLowerCase().includes(query.toLowerCase());
        return sizeMatch && colorMatch && priceMatch && queryMatch;
      });

      const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortOption) {
          case 'priceLowToHigh':
            return a.price - b.price;
          case 'priceHighToLow':
            return b.price - a.price;
          case 'popularity':
            return b.popularity - a.popularity;
          default:
            return 0;
        }
      });

      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setDisplayedProducts(sortedProducts.slice(startIndex, endIndex));
      setTotalPages(Math.ceil(sortedProducts.length / itemsPerPage));
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4 p-4 mx-20">
        {/* Filters Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Sizes</h2>
          <div>
            {['4XL', '5XL', 'L', 'M', 'S', 'XL', 'XS', 'XXL', 'XXS', 'XXXL'].map((size) => (
              <div key={size} className="mb-1">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value={size}
                    onClick={() => {
                      handleSizeChange(size);
                    }}
                    className="mr-2"
                  />
                  {size}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Colors</h2>
          <div>
            {['Blue', 'Red', 'Purple', 'Yellow', 'Pink', 'Orange', 'Green'].map((color) => (
              <div key={color} className="mb-1">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value={color}
                    onChange={() => {
                      handleColorChange(color);
                    }}
                    className="mr-2"
                  />
                  {color}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Price</h2>
          <div className="flex items-center mb-2">
            <span className="mr-2">From ₹</span>
            <input
              type="number"
              name="min"
              value={priceRange.min}
              onChange={(e) => {
                handlePriceChange(e);
              }}
              className="border p-1 w-20"
            />
          </div>
          <div className="flex items-center">
            <span className="mr-2">To ₹</span>
            <input
              type="number"
              name="max"
              value={priceRange.max}
              onChange={(e) => {
                handlePriceChange(e);
              }}
              className="border p-1 w-20"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-4">
        {/* Top Layer */}
        <div className="mb-4 flex justify-between items-center">
          <div>
            <label className="mr-2">Show</label>
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="border p-1"
            >
              <option value={20}>20</option>
              <option value={40}>40</option>
              <option value={60}>60</option>
            </select>
            <label className="ml-2">items per page</label>
          </div>
          <div>
            <label className="mr-2">Sort by:</label>
            <select
              value={sortOption}
              onChange={handleSortChange}
              className="border p-1"
            >
              <option value="popularity">Popularity</option>
              <option value="priceLowToHigh">Price: Low to High</option>
              <option value="priceHighToLow">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Listing */}
        <div className="grid grid-cols-3 gap-4">
          {displayedProducts.length > 0 &&
            displayedProducts.map((product) => (
              <div key={product.id} className="border p-4">
                <img
                  src={product.image[0]}
                  alt={product.name}
                  className="mb-4"
                />
                <h3 className="font-bold mb-2">{product.name}</h3>
                <p className="text-gray-700">₹{product.price}</p>
                <p className="text-gray-500">
                  Popularity: {product.popularity}
                </p>
              </div>
            ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex justify-center">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`border px-3 py-1 mr-2 ${
                currentPage === index + 1 ? 'bg-blue-500 text-white' : ''
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
