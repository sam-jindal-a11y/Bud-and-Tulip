import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateBanner = () => {
  const { index } = useParams();  // Assuming the route will provide the index parameter
  const history = useNavigate();
  const [newImage, setNewImage] = useState(null);

  const handleImageUpload = (event) => {
    setNewImage(event.target.files[0]);
  };

  const handleSave = async () => {
    if (!newImage) {
      alert('Please select an image to upload');
      return;
    }

    const formData = new FormData();
    formData.append('image', newImage);

    try {
      await axios.put(`https://your-backend-api.com/banners/${index}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Banner updated successfully');
      history.push('/banners');  // Redirect to the banners list page
    } catch (error) {
      console.error('Error updating banner:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 text-start">
      <h2 className="text-2xl font-semibold mb-4">Update Banner Image</h2>
      <p className="mb-4">Updating banner at index: {index}</p>
      <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
        <label className="block mb-2">
          Upload New Image:
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload} 
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </label>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4">
          Save
        </button>
      </form>
    </div>
  );
};

export default UpdateBanner;
