import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";

const OutOfStockProducts = () => {
  const [outOfStockProducts, setOutOfStockProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOutOfStockProducts();
  }, []);

  //  fetch from backend out-of-stock API
  const fetchOutOfStockProducts = async () => {
    try {
      const res = await axios.get(`${config}/products/out-of-stock`);
      setOutOfStockProducts(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching out of stock products:", error);
      setLoading(false);
    }
  };

  // remove discount function
  const handleRemoveDiscount = async (productId) => {
    try {
      await axios.put(`${config}/products/remove-discount/${productId}`);

      // refresh list
      fetchOutOfStockProducts();
    } catch (error) {
      console.error("Error removing discount:", error);
      alert("Failed to remove discount");
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-8 p-6 bg-white shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-red-600">
        Out Of Stock Products
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : outOfStockProducts.length === 0 ? (
        <p className="text-green-600 font-medium">
          All products are available in stock 
        </p>
      ) : (
        <table className="w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Product Name</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-left">Discount</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {outOfStockProducts.map((product) => (
              <tr key={product._id} className="border-t">
                <td className="p-3 font-medium">{product.name}</td>

                <td className="p-3">
                  {product.category?.join(", ") || "—"}
                </td>

                <td className="p-3">₹{product.price}</td>

                <td className="p-3 text-red-600 font-bold">
                  {product.stock}
                </td>

                {/* Discount column */}
                <td className="p-3">
                  {product.hasOffer ? (
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                      ₹{product.offerPrice}
                    </span>
                  ) : (
                    <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded">
                      No Discount
                    </span>
                  )}
                </td>

                {/* Action column */}
                <td className="p-3">
                  {product.hasOffer ? (
                    <button
                      onClick={() => handleRemoveDiscount(product._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Remove Discount
                    </button>
                  ) : (
                    <span className="text-gray-500 font-medium">
                      No Discount
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OutOfStockProducts;
