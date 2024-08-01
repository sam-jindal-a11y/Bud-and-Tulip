import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from "../config";
const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the users from your backend
    axios.get(`${config}/api/auth/users`)
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the users!", error);
      });
  }, []);

  const viewUser = (userId) => {
    navigate(`/userdetails/${userId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      
      <div className="hidden md:block">
        {/* Table for larger screens */}
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">User ID</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Account Type</th>
              <th className="py-2 px-4 border-b">Last Login</th>
              <th className="py-2 px-4 border-b">Account Created</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td className="py-2 px-4 border-b">{user._id}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.accountType}</td>
                <td className="py-2 px-4 border-b">{user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}</td>
                <td className="py-2 px-4 border-b">{new Date(user.createdAt).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => viewUser(user._id)} disabled>
                    <i className="fa-regular fa-envelope"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden">
        {/* Card view for smaller screens */}
        {users.map(user => (
          <div key={user._id} className="bg-white shadow-md rounded p-4 mb-4">
            <h2 className="text-xl font-bold mb-2">User ID: {user._id}</h2>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Account Type:</strong> {user.accountType}</p>
            <p><strong>Last Login:</strong> {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}</p>
            <p><strong>Account Created:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
              onClick={() => viewUser(user._id)}
              disabled
            >
              <i className="fa-regular fa-envelope"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersTable;
