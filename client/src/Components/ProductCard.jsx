import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ image, name, price, offerPrice, category, isActive, hasOffer, productId }) => {
  const navigate = useNavigate();

  const singleProduct = () => {
    navigate(`/product/${productId}`);
  };

  if (!isActive) {
    return null; // Don't render anything if the product is not active
  }

  return (
    <div className="bg-white rounded-sm shadow-md overflow-hidden relative" onClick={singleProduct}>
      {hasOffer && (
        <div className="absolute top-0 left-0 bg-pink-500 text-white px-2 py-1 text-xs rounded-md mx-4 my-4">
          Sale
        </div>
      )}
      <img src={image} alt={name} className="w-full h-68 img-product" />
      <div className="p-4 text-left">
        <p className="text-sm text-gray-400 mb-1">{category}</p>
        <h3 className="text-md font-semibold mb-2 product-name sm:text-sm md:text-md">{name}</h3>
        <p className="text-gray-500 mb-4">
          {hasOffer ? (
            <>
              <span className="line-through">₹&nbsp;{price}</span>
              &nbsp;
              <span>₹&nbsp;{offerPrice}</span>
            </>
          ) : (
            `₹ ${price}`
          )}
        </p>
        <div className="flex justify-between items-center">
          <button className="bg-pink-500 text-white px-3 py-1.5 sm:px-5 sm:py-2 rounded-sm">
            <i className="fa-solid fa-cart-shopping"></i> &nbsp;Add to Cart
          </button>
          <button className="text-red-500 hover:text-red-600">
            <i className="fa fa-heart"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
