import React, { useEffect, useState } from 'react';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    // Fetch the wishlist items from the API or local storage
    const fetchWishlist = async () => {
      // Replace with your API call or state management logic
      const response = await fetch('/api/wishlist');
      const data = await response.json();
      setWishlist(data);
    };

    fetchWishlist();
  }, []);

  const handleAddToCart = (productId) => {
    // Implement add to cart functionality
    console.log(`Add to cart: ${productId}`);
  };

  const handleDelete = (productId) => {
    // Implement delete functionality
    setWishlist(wishlist.filter(product => product.id !== productId));
    console.log(`Delete: ${productId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {wishlist.map(product => (
          <div key={product.id} className="bg-white shadow-md rounded-lg p-4">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4">${product.price}</p>
            <button 
              onClick={() => handleAddToCart(product.id)} 
              className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2 hover:bg-blue-600">
              Add to Cart
            </button>
            <button 
              onClick={() => handleDelete(product.id)} 
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
