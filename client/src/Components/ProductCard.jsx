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
  slug,
}) => {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const singleProduct = () => {
    navigate(`/product/slug/${slug}`);
  };

  /* ---------------- WISHLIST ---------------- */

  const addToWishlist = async (e) => {
    e.stopPropagation();

    try {

      const token = localStorage.getItem("token");

      if (!token) {
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

      alert("Added to Wishlist");

    } catch (error) {

      console.error(error);
      alert("Login Expired");

    }
  };

  /* ---------------- ADD TO CART (UI only for now) ---------------- */

  const addToCart = (e) => {
    e.stopPropagation();
    alert("Added to cart");
  };

  if (!isActive) return null;

  return (
    <div
      className="product-card bg-white rounded-md shadow-sm overflow-hidden cursor-pointer"
      onClick={singleProduct}
    >

      {/* SALE BADGE */}

      {hasOffer && (
        <div className="absolute top-3 left-3 bg-pink-500 text-white px-2 py-1 text-xs rounded">
          Sale
        </div>
      )}

   {/* SOLD OUT */}

{size && size.length === 0 && (
  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
    <div className="bg-pink-500 bg-opacity-80 w-full text-center py-2 text-white font-bold">
      Sold Out
    </div>
  </div>
)}

      {/* IMAGE */}

      <img
        src={image}
        alt={name}
        className="w-full h-56 sm:h-64 md:h-72 lg:h-80 object-cover"
      />

      {/* CONTENT */}

      <div className="p-4 text-left">

        <p className="text-sm text-gray-400 mb-1">
          {category[0]}
        </p>

        <h3 className="text-md font-semibold mb-2 product-name">
          {name}
        </h3>

        {/* PRICE + ACTIONS */}

        <div className="flex items-center justify-between">

          <p className="text-gray-700 font-medium">

            {hasOffer ? (
              <>
                <span className="line-through text-gray-400 mr-2">
                  ₹{price}
                </span>
                ₹{offerPrice}
              </>
            ) : (
              `₹ ${price}`
            )}

          </p>

          <div className="flex gap-2">

            {/* Wishlist */}

            <button
              onClick={addToWishlist}
              className="product-action-btn"
            >
              <i className="far fa-heart"></i>
            </button>

            {/* Cart */}

            <button
              onClick={addToCart}
              className="product-action-btn"
            >
              <i className="fa-solid fa-bag-shopping"></i>
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ProductCard;