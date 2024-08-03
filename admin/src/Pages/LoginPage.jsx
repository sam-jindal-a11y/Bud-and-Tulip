import React, { useState } from 'react';
import axios from 'axios';
import config from '../config';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${config}/admin/authenticate`, { username, password });
      // Handle successful login: save token to localStorage
      const { token } = response.data;
      localStorage.setItem('admintoken', token);
      console.log('Login successful:', token);
      navigate('/'); // Redirect user to dashboard page or perform other actions
      // Redirect user or perform other actions
    } catch (err) {
      // Handle errors (e.g., invalid credentials)
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 md:flex-row">
      <div className="flex flex-col items-start justify-center w-full p-8 bg-gray-900 text-white md:w-1/2">
        <h1 className="text-2xl font-bold">Welcome Admin</h1>
        <p className="text-lg">budandtulips.com</p>
        <p className="text-xs">A software developed by Soft Coders</p>
      </div>
      <div className="flex items-center justify-center w-full p-8 bg-white md:w-1/2">
        <div className="w-full max-w-md p-8 space-y-8 bg-gray-50 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-900">Admin Login</h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:border-gray-900"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:border-gray-900"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-gray-900 rounded-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
