import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config";
const Register = () => {
  const navigate = useNavigate();
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const registerData = {
      firstName,
      lastName,
      email,
      password
    };

    try {
      const response = await fetch(`${config}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      const result = await response.json();

      if (response.ok) {
        // console.log("Registration successful:", result);
        navigate('/Login');
      } else {
        setError(result.message || 'Registration failed. Please try again.');
        console.error("Registration failed:", result.message);
      }
    } catch (error) {
      setError('Error registering. Please try again later.');
      console.error("Error registering:", error);
    }
  };

  const signinToggle = () => {
    navigate('/Login');
  };

  return (
    <div className="flex flex-col md:flex-row h-auto md:h-96 my-20">
      {/* Left Section */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white p-6 md:mr-4">
        <h2 className="text-2xl font-bold mb-2 text-pink-600">REGISTER</h2>
        <p className="mb-6">Please fill in the details to create a new account.</p>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleRegister} className="w-full max-w-md">
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">FIRST NAME</label>
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">LAST NAME</label>
            <input
              type="text"
              id="lastName"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">EMAIL</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">PASSWORD</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 px-4 rounded-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            REGISTER
          </button>
        </form>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex flex-col justify-center items-center bg-pink-50 mt-8 md:mt-0 ml-0 md:ml-8 p-6">
        <h2 className="text-3xl font-bold text-center mb-4">Welcome Back!</h2>
        <p className="text-lg text-center mb-6 text-gray-600">
          Already have an account? Sign in now to explore exclusive offers and the latest trends in ladies' fashion.
        </p>
        <button
          className="bg-pink-600 text-white py-2 px-6 rounded-sm hover:bg-pink-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          onClick={signinToggle}
        >
          SIGN IN
        </button>
      </div>
    </div>
  );
};

export default Register;
