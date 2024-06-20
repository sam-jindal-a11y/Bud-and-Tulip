import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductView = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('M'); // Default size

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  const addToCart = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/cart', {
        productId: product._id,
        productName: product.name,
        price: product.price,
        quantity: quantity,
        size: size,
      });
      alert('Product added to cart');
    } catch (error) {
      console.error("Error adding product to cart:", error.response?.data?.message || error.message);
      alert('Failed to add product to cart');
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row mb-12">
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start mb-8 lg:mb-0">
          <img
            src={product.image[selectedImageIndex]}
            alt={product.name}
            className="w-full h-96 object-contain rounded-md mb-4"
          />
          <div className="flex space-x-2">
            {product.image.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.name} thumbnail ${index + 1}`}
                className={`w-24 h-24 object-cover rounded-md cursor-pointer ${
                  index === selectedImageIndex ? 'border-2 border-blue-500' : ''
                }`}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
          </div>
        </div>
        <div className="w-full lg:w-1/2 lg:pl-8">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-xl text-gray-700 mb-4">₹ {product.price}</p>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Quantity</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-20 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Size</label>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
          </div>
          <div className="flex space-x-4 mb-4">
            <button
              className="bg-pink-500 text-white px-4 py-2 rounded-sm hover:bg-blue-950"
              onClick={addToCart}
            >
              Add to Cart
            </button>
            <button className="bg-pink-500 text-white px-4 py-2 rounded-sm hover:bg-blue-950">
              Add to Wishlist
            </button>
            <button className="bg-pink-500 text-white px-4 py-2 rounded-sm hover:bg-blue-950">
              <a href={`/size-chart/${product._id}`} className="text-white">Size Chart</a>
            </button>
          </div>
          <p className="text-gray-700 mb-6">
            <b>Product Display Information:</b> <br />
            Model is Wearing Size Small (S) and Model Height is 5 Ft. 7 Inch. <br />
            <br />
            {product.description}
          </p>
        </div>
      </div>
      <div>
        <div>
          <div className="mb-8 flex gap-8 text-center justify-center">
            <h2 className="text-2xl font-bold mb-2 cursor-pointer">
              Description
              <hr />
            </h2>
            <h2 className="text-2xl font-bold mb-2 cursor-pointer">
              Additional Information
              <hr />
            </h2>
            <h2 className="text-2xl font-bold mb-2 cursor-pointer">
              Washing Information
              <hr />
            </h2>
          </div>
          <div className="mb-8 text-left">
            <p className="text-gray-700">
              <h3 className="font-bold mb-2">Description</h3>
              {product.description}
            </p>
            <div className="container mx-auto p-4">
              <table className="min-w-full bg-white">
                <thead></thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 px-4 font-semibold">Include</td>
                    <td className="py-2 px-4">{product.include}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4 font-semibold">Shipping Details</td>
                    <td className="py-2 px-4">{product.shippingDetails}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4 font-semibold">Exchange/Return</td>
                    <td className="py-2 px-4">{product.exchangeReturn}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4 font-semibold">Other Description</td>
                    <td className="py-2 px-4">{product.otherDescription}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-700">
              <h3 className="font-bold mb-2">Washing Instruction</h3>
              {product.washingInstructions}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
