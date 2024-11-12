import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import config from "../config";
const ProductCard = ({
  image,
  name,
  price,
  offerPrice,
  category,
  isActive,
  hasOffer,
  size,
  productId,
}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const singleProduct = () => {
    navigate(`/product/${productId}`);
  };

  const addToWishlist = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        // alert("Please login to add items to the wishlist.");
        navigate("/login");
        return;
      }

      const decoded = jwtDecode(token);
      setUser(decoded);

      await axios.post(
        `${config}/api/wishlist`,
        {
          userId: decoded.id,
          productId: productId,
          productName: name,
          price: hasOffer ? offerPrice : price,
          image: image,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(image);
      alert("Product added to wishlist");
    } catch (error) {
      console.error(
        "Error adding product to wishlist:",
        error.response?.data?.message || error.message
      );
      alert("Login Expired !!");
    }
  };

  if (!isActive) {
    return null;
  }

  return (
    <div
      className="bg-white rounded-sm shadow-md overflow-hidden relative m-1 cursor-pointer"
      onClick={singleProduct}
    >
      {hasOffer && (
        <div className="absolute top-0 left-0 bg-pink-500 text-white px-2 py-1 text-xs rounded-md m-4">
          Sale
        </div>
      )}
      {size.includes("SOLD OUT") && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute bg-pink-500 bg-opacity-75 w-full text-center py-2 text-white font-bold text-lg">
            Sold Out
          </div>
        </div>
      )}
      <img
        src={image}
        alt={name}
        className="w-full h-56 sm:h-64 md:h-72 lg:h-80 object-cover"
      />
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevents navigation on button click
          addToWishlist();
        }}
        className="absolute top-4 right-4 bg-pink-500 text-white py-1 px-2 rounded-full shadow-lg transition-transform duration-300 hover:scale-110 hover:bg-pink-700 focus:outline-none"
      >
        <i class="fa-solid fa-heart fa-sm "></i>
      </button>
      <div className="p-4 text-left">
        <p className="text-sm text-gray-400 mb-1">{category[0]}</p>
        <h3 className="text-md font-semibold mb-2 product-name">{name}</h3>
        <p className="text-gray-500 mb-1">
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

      </div>
    </div>
  );
};

export default ProductCard;
