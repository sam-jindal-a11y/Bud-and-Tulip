import React from 'react';

const ProductCard = ({ image, name, price }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={image} alt={name} className="w-full h-68 object-cover" />
      <div className="p-4 text-left">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-gray-500 mb-4">₹{price}</p>
        <div className="flex justify-between items-center">
          <button className="bg-pinkc text-white px-16 py-2 rounded-md ">
          <i class="fa-solid fa-cart-shopping"></i> &nbsp;Add to Cart
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
