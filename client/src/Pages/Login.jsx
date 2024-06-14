import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Navigate = useNavigate();
  function signinToggle() {
    Navigate("/Register");
  }

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="flex h-96 my-20">
      {/* Left Section */}
      <div className="flex-1 flex flex-col justify-arround items-center bg-white p-6 ">
        <h2 className="text-2xl font-bold mb-2 text-pink-600">LOGIN</h2>
        <p className="mb-6">
          If you've created an account with us, please enter.
        </p>
        <form onSubmit={handleLogin} className="w-full max-w-md">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              EMAIL
            </label>
            <input
              type="email"
              id="email"
              placeholder="EMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-SM shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              placeholder="PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-SM shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <a href="" className="text-pink-600">
            Forgot your password?
          </a>
          <br />
          <br />
          <button
            type="submit"
            className="w-full bg-pinkc text-white py-2 px-4 rounded-SM hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            SIGN IN
          </button>
          <br />
        </form>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex flex-col justify-center items-center bg-pinkc mr-8 p-6">
        <h2 className="text-3xl font-bold text-center mb-4">
          Welcome to Bud & Tulip
        </h2>
        <p className="text-lg text-center mb-6 text-gray-600">
          Join us today to explore the latest trends in ladies' fashion. Sign up
          now to get exclusive offers and discounts!
        </p>
        <button className="bg-pink-600 text-white py-2 px-6 rounded-sm hover:bg-pink-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500" onClick={signinToggle}>
          Create New Account
        </button>
      </div>
    </div>
  );
};

export default Login;
