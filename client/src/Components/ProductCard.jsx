import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ProductCard = ({ image, name, price, productId }) => {
  const navigate = useNavigate();

  const singleProduct = () => {
    navigate(`/product/${productId}`);
  };

  return (
    <a to={`/product/${productId}`}>
    <div className="bg-white rounded-lg shadow-md overflow-hidden" onClick={singleProduct}>
      <img src={image} alt={name} className="w-full h-68 img-proudct" />
      <div className="p-4 text-left">
      
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-gray-500 mb-4">₹&nbsp;{price}</p>
        <div className="flex justify-between items-center">
          <button className="bg-pink-500 text-white px-5 py-2 rounded-md">
            <i className="fa-solid fa-cart-shopping"></i> &nbsp;Add to Cart
          </button>
          <button className="text-red-500 hover:text-red-600">
            <i className="fa fa-heart"></i>
          </button>
        </div>
      </div>
    </div>
    </a>
  );
};

export default ProductCard;
