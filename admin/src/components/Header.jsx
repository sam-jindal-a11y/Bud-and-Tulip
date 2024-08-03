import React from "react";
import { useNavigate } from "react-router-dom";
// import { FaBars } from 'react-icons/fa'; // Import Font Awesome icon

const Header = ({ onToggleSidebar }) => {
  const Navigate = useNavigate();
  function sendHome(){
    Navigate('/');
  }
  return (
    <header className="bg-gray-800 text-white shadow-md flex items-center justify-between px-4 py-3">
      <div className="flex items-center space-x-4">
        <button
          onClick={onToggleSidebar}
          className="text-white hover:text-gray-400 focus:outline-none transition duration-300"
        >
          <i className="fa-solid fa-bars fa-lg"></i>
        </button>
        <h1 className="text-2xl font-semibold" onClick={sendHome}>Bud&Tulip</h1>
      </div>
      <button
  className="bg-red-500 hover:bg-red-600 text-white py-2 px-2 rounded-lg focus:outline-none transition duration-300"
  onClick={() => {
    localStorage.clear();
    window.location.reload();
  }}
>
  <i className="fa-solid fa-right-from-bracket fa-lg"></i>
</button>

    </header>
  );
};

export default Header;
