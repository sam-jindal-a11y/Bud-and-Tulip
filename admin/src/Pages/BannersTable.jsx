import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BannersTable = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await axios.get('http://103.209.144.220:5000/upload/banners');
      setBanners(response.data);
    } catch (error) {
      console.error('Error fetching banners:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://103.209.144.220:5000/upload/banners/${id}`);
      setBanners(banners.filter(banner => banner._id !== id));
      alert('Banner deleted successfully.');
    } catch (error) {
      console.error('Error deleting banner:', error);
    }
  };

  return (
    <div className="overflow-x-auto text-center">
      <h2 className="text-2xl font-semibold mb-4">Banners</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Index</th>
            <th className="py-2 px-4 border-b">Image</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {banners.map((banner, index) => (
            <tr key={banner._id} className="bg-gray-100 hover:bg-gray-200">
              <td className="py-2 px-4 border-b">{banner.index}</td>
              <td className="py-2 px-4 border-b">
                <img src={banner.url} alt={`Banner ${index + 1}`} className="w-20 h-20 object-cover rounded" />
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-red-500 text-white px-4 py-1 rounded"
                  onClick={() => handleDelete(banner._id)}
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

export default BannersTable;
