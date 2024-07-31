// HamburgerMenu.js

import React from 'react';

const HamburgerMenu = ({ onClick }) => {
  return (
    <button onClick={onClick} className="text-white">
      <i className="fas fa-bars fa-2x"></i>
    </button>
  );
};

export default HamburgerMenu;
