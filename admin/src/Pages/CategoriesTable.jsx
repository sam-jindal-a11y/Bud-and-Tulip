import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from "../config";
const CategoriesTable = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get(`${config}/categories`)
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const deleteCategory = (id) => {
    axios.delete(`${config}/categories/${id}`)
      .then(() => {
        setCategories(categories.filter(category => category.category_id !== id));
      })
      .catch(error => console.error('Error deleting category:', error));
  };

  return (
    <div className="overflow-x-auto text-center">
      <h2 className="text-2xl font-semibold mb-4">Categories</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => (
            <tr key={category.category_id} className="bg-gray-100 hover:bg-gray-200">
              <td className="py-2 px-4 border-b">{category.category_id}</td>
              <td className="py-2 px-4 border-b">{category.name}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-red-500 text-white px-4 py-1 rounded"
                  onClick={() => deleteCategory(category.category_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesTable;
