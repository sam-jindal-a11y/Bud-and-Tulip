import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  function signinToggle() {
    navigate("/Register");
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password
    };

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Login successful:", result);
        // Store the token in localStorage or context
        localStorage.setItem('token', result.token);
        // Redirect to the home page or another page
        navigate("/");
      } else {
        console.error("Login failed:", result.message);
        setErrorMessage(result.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex h-96 my-20">
      {/* Left Section */}
      <div className="flex-1 flex flex-col justify-around items-center bg-white p-6">
        
        <h2 className="text-2xl font-bold mb-2 text-pink-600">LOGIN</h2>
  
         {errorMessage && <p className="text-red-500">{errorMessage}</p>}
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
            className="w-full bg-pink-600 text-white py-2 px-4 rounded-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            SIGN IN
          </button>
          <br />
         
        </form>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex flex-col justify-center items-center bg-pink-600 mr-8 p-6">
        <h2 className="text-3xl font-bold text-center mb-4">
          Welcome to Bud & Tulip
        </h2>
        <p className="text-lg text-center mb-6 text-gray-600">
          Join us today to explore the latest trends in ladies' fashion. Sign up
          now to get exclusive offers and discounts!
        </p>
        <button
          className="bg-pink-600 text-white py-2 px-6 rounded-sm hover:bg-pink-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          onClick={signinToggle}
        >
          Create New Account
        </button>
      </div>
    </div>
  );
};

export default Login;
