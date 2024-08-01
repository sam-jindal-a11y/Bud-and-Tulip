import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from "../config";
const SizesTable = () => {
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    axios.get(`${config}/sizes`)
      .then(response => setSizes(response.data))
      .catch(error => console.error('Error fetching sizes:', error));
  }, []);

  
const deleteSize = (id) => {
    axios.delete(`${config}/sizes/${id}`)
      .then(() => {
        // Assuming 'sizes' and 'setSizes' are properly managed state variables
        setSizes(sizes.filter(size => size.size_id !== id));
      })
      .catch(error => console.error('Error deleting size:', error));
  };

  return (
    <div className="overflow-x-auto text-center">
      <h2 className="text-2xl font-semibold mb-4">Sizes</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sizes.map(size => (
            <tr key={size.size_id} className="bg-gray-100 hover:bg-gray-200">
              <td className="py-2 px-4 border-b">{size.size_id}</td>
              <td className="py-2 px-4 border-b">{size.name}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-red-500 text-white px-4 py-1 rounded"
                  onClick={() => deleteSize(size.size_id)}
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

export default SizesTable;
