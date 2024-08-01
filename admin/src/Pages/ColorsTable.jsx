import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ColorsTable = () => {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/colors')
      .then(response => setColors(response.data))
      .catch(error => console.error('Error fetching colors:', error));
  }, []);

  const deleteColor = (id) => {
    axios.delete(`http://127.0.0.1:5000/colors/${id}`)
      .then(() => {
        setColors(colors.filter(color => color.color_id !== id));
      })
      .catch(error => console.error('Error deleting color:', error));
  };

  return (
    <div className="overflow-x-auto text-center">
      <h2 className="text-2xl font-semibold mb-4">Colors</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {colors.map(color => (
            <tr key={color.color_id} className="bg-gray-100 hover:bg-gray-200">
              <td className="py-2 px-4 border-b">{color.color_id}</td>
              <td className="py-2 px-4 border-b">{color.name}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-red-500 text-white px-4 py-1 rounded"
                  onClick={() => deleteColor(color.color_id)}
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

export default ColorsTable;
