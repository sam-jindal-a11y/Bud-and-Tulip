import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [guestEmail, setGuestEmail] = useState("");

  const navigate = useNavigate();

  function signinToggle() {
    navigate("/Register");
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
    };

    try {
      const response = await fetch("https://bud-tulips.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("token", result.user.token);
        navigate(-1);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  const handleGuestLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/guest-signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: guestEmail }),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("token", result.user.token);
        navigate(-1);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error logging in as guest:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-full md:h-96 my-20">
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
            />
          </div>

          <a
            href="#"
            className="text-pink-600"
            onClick={(e) => {
              e.preventDefault();
              setShowGuestModal(true);
            }}
          >
            Login as Guest
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
      <div className="flex-1 flex flex-col justify-center items-center bg-pinkc p-6">
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

      {/* Guest Login Modal */}
      {showGuestModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Login as Guest</h2>
            <form onSubmit={handleGuestLogin}>
              <div className="mb-4">
                <label
                  htmlFor="guestEmail"
                  className="block text-sm font-medium text-gray-700"
                >
                  EMAIL
                </label>
                <input
                  type="email"
                  id="guestEmail"
                  placeholder="EMAIL"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-pink-600 text-white py-2 px-4 rounded-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                LOGIN AS GUEST
              </button>
              <button
                type="button"
                className="w-full mt-4 bg-gray-300 text-gray-700 py-2 px-4 rounded-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                onClick={() => setShowGuestModal(false)}
              >
                CANCEL
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
