import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import MobileSearchBar from "../Components/MobileSearchBar";
import Loading from "../Components/Loading";
import config from "../config";
const SearchSection = () => {
  const [products, setProducts] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 25000 });
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [sortOption, setSortOption] = useState("popularity");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${config}/products`);
        const productArray = Object.values(response.data); // Convert JSON object to array
        setProducts(productArray);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch products");
        setLoading(false);
      }
    };

    const fetchSizes = async () => {
      try {
        const response = await axios.get(`${config}/sizes`);
        setSizes(response.data);
      } catch (error) {
        console.error("Error fetching sizes:", error);
      }
    };

    const fetchColors = async () => {
      try {
        const response = await axios.get(`${config}/colors`);
        setColors(response.data);
      } catch (error) {
        console.error("Error fetching colors:", error);
      }
    };

    fetchProducts();
    fetchSizes();
    fetchColors();
  }, []);

  useEffect(() => {
    // Check localStorage for stored page number
    const storedPage = localStorage.getItem("currentPage");
    if (storedPage) {
      setCurrentPage(Number(storedPage)); // Set current page to the stored page
      localStorage.removeItem("currentPage"); // Clear stored page after using it
    }
    const params = new URLSearchParams(location.search);
    const query = params.get("query");
    const category = params.get("category");
    const hasOffer = params.get("hasoffer") === "true"; // Check for hasoffer param
    const sortOrder = params.get("sortorder"); // Get sortorder param
    filterProducts(query, category, hasOffer, sortOrder);
  }, [
    selectedSizes,
    selectedColors,
    priceRange,
    itemsPerPage,
    sortOption,
    currentPage,
    products,
    location.search,
    navigate,
  ]);

  const handleProductClick = (productId) => {
    // Store the current page in localStorage before navigating
    localStorage.setItem("currentPage", currentPage);
    navigate(`/product/${productId}`);
  };

  const handleSizeChange = (size) => {
    setSelectedSizes((prevSizes) =>
      prevSizes.includes(size)
        ? prevSizes.filter((s) => s !== size)
        : [...prevSizes, size]
    );
  };

  const handleColorChange = (color) => {
    setSelectedColors((prevColors) =>
      prevColors.includes(color)
        ? prevColors.filter((c) => c !== color)
        : [...prevColors, color]
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

  const scrollToTop = () => {
    setTimeout(() => {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0; // for Safari
    }, 50);
  };

  const filterProducts = (query, category, hasOffer, sortOrder) => {
    if (products.length !== 0) {
      let filteredProducts = [...products[0]]; // Ensure to copy array
      // Filter by category if specified
      if (category && category !== "All Products") {
        filteredProducts = filteredProducts.filter((product) =>
          product.category.includes(category)
        );
      }
      if (hasOffer) {
        filteredProducts = filteredProducts.filter(
          (product) => product.hasOffer
        );
        setSortOption("");
      }
      if (sortOrder === "new") {
        filteredProducts = filteredProducts.reverse();
        setSortOption("");
      }

      // Apply other filters
      filteredProducts = filteredProducts.filter((product) => {
        const sizeMatch =
          selectedSizes.length === 0 ||
          product.size.some((size) => selectedSizes.includes(size));
        const colorMatch =
          selectedColors.length === 0 ||
          product.color.some((color) => selectedColors.includes(color));
        const priceMatch =
          product.price >= priceRange.min && product.price <= priceRange.max;
        const queryMatch =
          !query || product.name.toLowerCase().includes(query.toLowerCase());
        return sizeMatch && colorMatch && priceMatch && queryMatch;
      });

      const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortOption) {
          case "priceLowToHigh":
            return a.price - b.price;
          case "priceHighToLow":
            return b.price - a.price;
          case "popularity":
            return b.salesCount - a.salesCount;
          default:
            return 0;
        }
      });

      if (sortOption === "oldest") {
        sortedProducts.reverse();
      }
      const productsOnSale = products.filter((product) => product.hasOffer);
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setDisplayedProducts(sortedProducts.slice(startIndex, endIndex));
      setTotalPages(Math.ceil(sortedProducts.length / itemsPerPage));
    }
  };

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row lg:px-6">
      {/* Sidebar */}
      <div className=" h-full w-full lg:w-1/4 p-4 mt-5 lg:px-8 bg-white shadow-lg rounded-lg overflow-y-auto hidden lg:block">
        {/* Filters Section */}
        <div className="mb-10 border-b pb-6">
          <h2 className="text-xl font-bold mb-4">Sizes</h2>
          <div className="space-y-2">
            {sizes.map((size) => (
              <div key={size._id}>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value={size.name}
                    onChange={() => handleSizeChange(size.name)}
                    className="mr-3 h-5 w-5"
                    checked={selectedSizes.includes(size.name)}
                  />
                  <span className="text-lg">{size.name}</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-10 border-b pb-6">
          <h2 className="text-xl font-bold mb-4">Colors</h2>
          <div className="space-y-2">
            {colors.map((color) => (
              <div key={color._id}>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value={color.name}
                    onChange={() => handleColorChange(color.name)}
                    className="mr-3 h-5 w-5"
                    checked={selectedColors.includes(color.name)}
                  />
                  <span className="text-lg">{color.name}</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4">Price</h2>
          <div className="flex items-center mb-4">
            <span className="mr-3">From ₹</span>
            <input
              type="number"
              name="min"
              value={priceRange.min}
              onChange={handlePriceChange}
              className="border p-2 rounded w-24"
            />
          </div>
          <div className="flex items-center">
            <span className="mr-3">To ₹</span>
            <input
              type="number"
              name="max"
              value={priceRange.max}
              onChange={handlePriceChange}
              className="border p-2 rounded w-24"
            />
          </div>
        </div>
      </div>

      {/* Mobile Filter Button */}
      <div className="block lg:hidden w-full p-4">
        <button
          onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
          className="bg-pinkc text-white px-4 py-2 rounded"
        >
          {isFilterDropdownOpen ? "Hide Filters" : "Show Filters"}
        </button>
        {isFilterDropdownOpen && (
          <div className="mt-4">
            {/* Filters Section */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Sizes</h2>
              <div>
                {sizes.map((size) => (
                  <div key={size._id} className="mb-1">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        value={size.name}
                        onChange={() => handleSizeChange(size.name)}
                        className="mr-2"
                        checked={selectedSizes.includes(size.name)}
                      />
                      {size.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Colors</h2>
              <div>
                {colors.map((color) => (
                  <div key={color._id} className="mb-1">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        value={color.name}
                        onChange={() => handleColorChange(color.name)}
                        className="mr-2"
                        checked={selectedColors.includes(color.name)}
                      />
                      {color.name}
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
                  onChange={handlePriceChange}
                  className="border p-1 w-20"
                />
              </div>
              <div className="flex items-center">
                <span className="mr-2">To ₹</span>
                <input
                  type="number"
                  name="max"
                  value={priceRange.max}
                  onChange={handlePriceChange}
                  className="border p-1 w-20"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-full lg:w-2/3 p-4 mx-auto">
        <div className="mb-4 flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-2 sm:mb-0">
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
          <div className=" flex justify-center flex-wrap">
            {/* Previous Button */}
            {currentPage > 1 && (
              <button
                className="border px-3 py-1 mr-2 bg-pinkc text-white"
                onClick={() => {
                  handlePageChange(currentPage - 1);
                  scrollToTop();
                }}
              >
                Prev
              </button>
            )}

            {/* Page Buttons */}
            {Array.from({ length: Math.min(totalPages, 5) }, (_, index) => {
              let startPage = Math.max(1, currentPage - 2);
              let endPage = Math.min(totalPages, currentPage + 2);

              if (currentPage <= 3) {
                startPage = 1;
                endPage = Math.min(totalPages, 5);
              } else if (currentPage >= totalPages - 2) {
                startPage = Math.max(1, totalPages - 4);
                endPage = totalPages;
              }

              const page = startPage + index;

              if (page > endPage) {
                return null;
              }

              return (
                <button
                  key={page}
                  className={`border px-3 py-1 mr-2 ${
                    currentPage === page ? "bg-pinkc text-white" : ""
                  }`}
                  onClick={() => {
                    handlePageChange(page);
                    scrollToTop();
                  }}
                >
                  {page}
                </button>
              );
            })}

            {/* Next Button */}
            {currentPage < totalPages && (
              <button
                className="border px-3 py-1 mr-2 bg-pinkc text-white"
                onClick={() => {
                  handlePageChange(currentPage + 1);
                  scrollToTop();
                }}
              >
                Next
              </button>
            )}
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
              <option value="newest">Newest First</option>{" "}
              {/* New option for newest first */}
              <option value="oldest">Oldest First</option>{" "}
              {/* New option for oldest first */}
            </select>
          </div>
        </div>

        {/* Product Listing */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {displayedProducts.length > 0 &&
            displayedProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-sm shadow-md overflow-hidden relative cursor-pointer"
                onClick={() => handleProductClick(product._id)}
              >
                {product.hasOffer && (
                  <div className="absolute top-0 left-0 bg-pink-500 text-white px-2 py-1 text-xs rounded-md mx-4 my-4">
                    Sale
                  </div>
                )}
                {product.size.includes("SOLD OUT") && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute bg-pink-500 bg-opacity-75 w-full text-center py-2 text-white font-bold text-lg sm:text-base">
                      Sold Out
                    </div>
                  </div>
                )}

                {product.image && product.image[0] && (
                  <img
                    src={product.image[0]}
                    alt={product.name}
                    className="w-full h-68 img-product"
                  />
                )}
                <div className="p-4 text-left">
                  <p className="text-sm text-gray-400 mb-1">
                    {product.category}
                  </p>
                  <h3 className="text-md font-semibold mb-2 product-name sm:text-sm md:text-md">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 mb-4">
                    {product.hasOffer ? (
                      <>
                        <span className="line-through">
                          ₹&nbsp;{product.price}
                        </span>
                        &nbsp;
                        <span>₹&nbsp;{product.offerPrice}</span>
                      </>
                    ) : (
                      `₹ ${product.price}`
                    )}
                  </p>
                </div>
              </div>
            ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex justify-center flex-wrap">
          {/* Previous Button */}
          {currentPage > 1 && (
            <button
              className="border px-3 py-1 mr-2 bg-pink-500 text-white"
              onClick={() => {
                handlePageChange(currentPage - 1);
                scrollToTop();
              }}
            >
              Prev
            </button>
          )}

          {/* Page Buttons */}
          {Array.from({ length: Math.min(totalPages, 5) }, (_, index) => {
            let startPage = Math.max(1, currentPage - 2);
            let endPage = Math.min(totalPages, currentPage + 2);

            if (currentPage <= 3) {
              startPage = 1;
              endPage = Math.min(totalPages, 5);
            } else if (currentPage >= totalPages - 2) {
              startPage = Math.max(1, totalPages - 4);
              endPage = totalPages;
            }

            const page = startPage + index;

            if (page > endPage) {
              return null;
            }

            return (
              <button
                key={page}
                className={`border px-3 py-1 mr-2 ${
                  currentPage === page ? "bg-pink-500 text-white" : ""
                }`}
                onClick={() => {
                  handlePageChange(page);
                  scrollToTop();
                }}
              >
                {page}
              </button>
            );
          })}

          {/* Next Button */}
          {currentPage < totalPages && (
            <button
              className="border px-3 py-1 mr-2 bg-pink-500 text-white"
              onClick={() => {
                handlePageChange(currentPage + 1);
                scrollToTop();
              }}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
