import React, { useState } from 'react';
import axios from 'axios';
import ColorsTable from './ColorsTable';
import config from "../config";
const AddColor = () => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${config}/colors`, { name })
      .then(() => {
        setName('');
        alert('Color added successfully');
        window.location.reload(true);
      })
      .catch(error => console.error('Error adding color:', error));
  };

  return (
    <div className="container mx-auto p-4 text-start">
      <h2 className="text-2xl font-semibold mb-4">Add Color</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <label className="block mb-2">
          Name:
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </label>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">Add Color</button>
      </form>
      <ColorsTable />
    </div>
  );
};

export default AddColor;
