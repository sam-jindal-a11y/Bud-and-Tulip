import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from "../config";
const ProductsTable = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState('newest'); // 'newest' or 'oldest'
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // Ensure products.createdProducts is an array
  const createdProducts = Array.isArray(products.createdProducts) ? products.createdProducts : [];
  useEffect(() => {
    axios.get(`${config}/categories`)
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const handleEdit = (productId) => {
    navigate(`/updateproduct/${productId}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
    "Are you sure you want to delete this product?"
  );

  if (!confirmDelete) return; 
    // `/api/wishlist/${user}/${productId}
    axios.delete(`${config}/products/${id}`)
      .then(response => {
        console.log(response.data.message);
      
        alert("Product deleted successfully!");
        window.location.reload();
      })
      .catch(error => {
        console.error('There was an error deleting the product!', error);
      });
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
  };

  const handleSortOrderChange = (order) => {
    setSortOrder(order);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // Filter and sort the products based on search term, filter, and sort order
  const filteredProducts = createdProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filter === '' || product.category[0] === filter)
  );
  // console.log(products.createdProducts[0].category);
  
  console.log(filter);
  const sortedProducts = sortOrder === 'newest' ? [...filteredProducts].reverse() : [...filteredProducts];

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Existing Products</h3>

      {/* Search and Filter Controls */}
      <div className="mb-4 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="border p-2"
        />
        <select
          value={filter}
          onChange={handleFilterChange}
          className="border p-2"
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category._id} value={category.name}>{category.name}</option>
          ))}
        </select>
        <div>
          
        </div>
        <select
          className="mr-4"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
        >
          <option value={5}>5 items per page</option>
          <option value={10}>10 items per page</option>
          <option value={20}>20 items per page</option>
        </select>

        <select
          className="mr-4"
          value={sortOrder}
          onChange={(e) => handleSortOrderChange(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      

      {/* Desktop Table */}
      <div className="hidden md:block">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Product Id</th>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Price</th>
              <th className="px-4 py-2 border-b">Offer Price</th>
              <th className="px-4 py-2 border-b">Edit</th>
              <th className="px-4 py-2 border-b">Delete</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map(product => (
              <tr key={product._id}>
                <td className="px-4 py-2 border-b text-center">{product._id}</td>
                <td className="px-4 py-2 border-b text-center">{product.name}</td>
                <td className="px-4 py-2 border-b text-center">{product.price}</td>
                <td className="px-4 py-2 border-b text-center">{product.offerPrice || 0}</td>
                <td className="px-4 py-2 border-b text-center">
                  <button className="text-blue-500 hover:underline" onClick={() => handleEdit(product._id)}>Edit</button>
                </td>
                <td className="px-4 py-2 border-b text-center">
                  <button className="text-red-500 hover:underline" onClick={() => handleDelete(product._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card View for Smaller Screens */}
      <div className="md:hidden">
        {currentProducts.map(product => (
          <div key={product._id} className="bg-white shadow-md rounded p-4 mb-4">
            <h3 className="text-lg font-bold mb-2">Product Id: {product._id}</h3>
            <p><strong>Name:</strong> {product.name}</p>
            <p><strong>Price:</strong> {product.price}</p>
            <p><strong>Offer Price:</strong> {product.offerPrice || 0}</p>
            <div className="flex justify-between mt-4">
              <button className="text-blue-500 hover:underline" onClick={() => handleEdit(product._id)}>Edit</button>
              <button className="text-red-500 hover:underline" onClick={() => handleDelete(product._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-between items-center">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductsTable;
