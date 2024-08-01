import React, { useState } from 'react';
import axios from 'axios';
import CategoriesTable from './CategoriesTable';

const AddCategory = () => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://103.209.144.220:5000/categories', { name })
      .then(() => {
        setName('');
        alert('Category added successfully');
        window.location.reload(true);
      })
      .catch(error => console.error('Error adding category:', error));
  };

  return (
    <div className="container mx-auto p-4 text-start">
      <h2 className="text-2xl font-semibold mb-4">Add Category</h2>
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
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">Add Category</button>
      </form>
      <CategoriesTable />
    </div>
  );
};

export default AddCategory;
