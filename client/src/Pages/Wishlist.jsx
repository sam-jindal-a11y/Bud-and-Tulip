import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Token not found in local storage");
        }

        const decodedToken = jwtDecode(token);
        setUser(decodedToken.id);

        if (decodedToken) {
          const response = await fetch(
            `http://127.0.0.1:5000/api/wishlist/${decodedToken.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error("Failed to fetch wishlist items");
          }

          const data = await response.json();
          setWishlist(data);
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, []);

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/wishlist/${user}/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete wishlist item");
      }

      setWishlist(
        wishlist.filter((product) => product.productId !== productId)
      );
      // console.log(`Deleted product with ID: ${productId}`);
    } catch (error) {
      console.error("Error deleting wishlist item:", error);
    }
  };

  const handleAddToCart = (productId) => {
    // console.log(`Add to cart: ${productId}`);
  };

  const handleRedirect = (productId) => {
    window.location.href = `/product/${productId}`;
  };

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-4 sm:mb-6">Wishlist</h1>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="pb-2 sm:pb-4">PRODUCT</th>
            <th className="pb-2 sm:pb-4">PRICE</th>
            <th className="pb-2 sm:pb-4">ADD TO CART</th>
          </tr>
        </thead>
        <tbody>
          {wishlist.map((product) => (
            <tr key={product.productId} className="border-t">
              <td className="py-2 sm:py-4">
                <div className="flex items-center">
                  <button
                    onClick={() => handleDelete(product.productId)}
                    className="mr-2 sm:mr-4 text-red-500 font-bold"
                  >
                    X
                  </button>
                  <div
                    onClick={() => handleRedirect(product.productId)}
                    className="flex items-center cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.productName}
                      className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-md"
                    />
                    <span className="ml-2 sm:ml-4">{product.productName}</span>
                  </div>
                </div>
              </td>
              <td className="py-2 sm:py-4">₹ {product.price}</td>
              <td className="py-2 sm:py-4">
                <button
                  onClick={() => handleRedirect(product.productId)}
                  className="bg-pink-200 text-pink-700 py-1 px-2 sm:py-2 sm:px-4 rounded-md hover:bg-pink-300"
                >
                  Add To Cart
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-6 sm:mt-8 flex justify-between">
        <Link to="/ShoppingCart" className="text-pink-400 hover:underline">
          Continue Shopping
        </Link>
        <Link to="/search?query=&category=All%20Products" className="text-pink-400 hover:underline">
          View All Products
        </Link>
      </div>
    </div>
  );
};

export default Wishlist;
