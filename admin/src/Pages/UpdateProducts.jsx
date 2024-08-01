import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
import config from "../config";
const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: [],
    image: '',
    size: [],
    color: [],
    inbox: '',
    washingInstruction: '',
    hasOffer: false,
    offerPrice: 0,
    isActive: true,
  });

  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const [sizeResponse, colorResponse, categoryResponse, productResponse] = await Promise.all([
          axios.get(`${config}/sizes`),
          axios.get(`${config}/colors`),
          axios.get(`${config}/categories`),
          axios.get(`${config}/products/${id}`),
        ]);

        setSizes(sizeResponse.data);
        setColors(colorResponse.data);
        setCategories(categoryResponse.data);
        setFormData(productResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product data:', error);
        setError('Failed to load product data');
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSelectChange = (selectedOptions, action) => {
    setFormData({
      ...formData,
      [action.name]: selectedOptions ? selectedOptions.map(option => option.value) : [],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(`${config}/products/${id}`, formData);

      console.log('Product updated successfully:', response.data);
      alert('Product updated successfully!');
      navigate('/'); // Redirect to the product list or another appropriate page
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product. Please try again.');
      setLoading(false);
    }
  };

  const sizeOptions = sizes.map(size => ({ value: size.name, label: size.name }));
  const colorOptions = colors.map(color => ({ value: color.name, label: color.name }));
  const categoryOptions = categories.map(category => ({ value: category.name, label: category.name }));

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-md text-start">
      <h2 className="text-2xl font-semibold mb-4 text-start">Update Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-blue-200"
            rows="4"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <Select
            id="category"
            name="category"
            options={categoryOptions}
            isMulti
            value={formData.category.map(cat => ({ value: cat, label: cat }))}
            onChange={handleSelectChange}
            className="mt-1"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL(s)</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="size" className="block text-sm font-medium text-gray-700">Size</label>
          <Select
            id="size"
            name="size"
            options={sizeOptions}
            isMulti
            value={formData.size.map(sz => ({ value: sz, label: sz }))}
            onChange={handleSelectChange}
            className="mt-1"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="color" className="block text-sm font-medium text-gray-700">Color</label>
          <Select
            id="color"
            name="color"
            options={colorOptions}
            isMulti
            value={formData.color.map(cl => ({ value: cl, label: cl }))}
            onChange={handleSelectChange}
            className="mt-1"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="inbox" className="block text-sm font-medium text-gray-700">Inbox</label>
          <textarea
            id="inbox"
            name="inbox"
            value={formData.inbox}
            onChange={handleChange}
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-blue-200"
            rows="2"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="washingInstruction" className="block text-sm font-medium text-gray-700">Washing Instruction</label>
          <textarea
            id="washingInstruction"
            name="washingInstruction"
            value={formData.washingInstruction}
            onChange={handleChange}
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-blue-200"
            rows="2"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="hasOffer" className="block text-sm font-medium text-gray-700">Has Offer</label>
          <input
            type="checkbox"
            id="hasOffer"
            name="hasOffer"
            checked={formData.hasOffer}
            onChange={handleChange}
            className="mt-1"
          />
        </div>
        {formData.hasOffer && (
          <div className="mb-4">
            <label htmlFor="offerPrice" className="block text-sm font-medium text-gray-700">Offer Price</label>
            <input
              type="number"
              id="offerPrice"
              name="offerPrice"
              value={formData.offerPrice}
              onChange={handleChange}
              className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-blue-200"
              required={formData.hasOffer}
            />
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="isActive" className="block text-sm font-medium text-gray-700">Is Active</label>
          <div>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, isActive: true })}
              className={`px-2 rounded ${formData.isActive ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Yes
            </button>
            <button 
              type="button"
              onClick={() => setFormData({ ...formData, isActive: false })}
              className={`px-2 rounded ml-2 ${!formData.isActive ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              No
            </button>
          </div>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
