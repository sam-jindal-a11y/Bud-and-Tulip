import React, { useState } from 'react';
import axios from 'axios';
import BannersTable from './BannersTable';
import config from "../";
const AddBanner = () => {
  const [images, setImages] = useState([]);

  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    const formData = new FormData();

    files.forEach(file => formData.append('images', file));

    try {
      const response = await axios.post(`${config}/upload/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const uploadedImages = response.data.map(file => file.url); // Update to use file.url from ImageKit response
      setImages(prevImages => [...prevImages, ...uploadedImages]);

      alert('Images uploaded successfully');
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('${config}/upload/upload', {
        images: images
      });

      if (response.status === 200) {
        alert('Images data sent successfully');
      }  if (response.status === 400){
        alert('images are full but could not be uploaded');
      }
    } catch (error) {
      console.error('Error sending images data:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 text-start">
      <h2 className="text-2xl font-semibold mb-4">Add Banner Images</h2>
      <form className="mb-4">
      <h2 className='font-semibold text-red-500'>*You can only add banners with indices from 0 to 4, i.e., 0, 1, 2, 3, 4 (a maximum of 5 images allowed)</h2>
        <label className="block mb-2">
          Upload Images:
          <input 
            type="file" 
            multiple 
            accept="image/*" 
            onChange={handleImageUpload} 
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </label>
      </form>
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
      >
        Save Banners
      </button>
      <BannersTable />
    </div>
  );
};

export default AddBanner;
