import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [tempCart, setTempCart] = useState([]);
  const [itemsAdded, setItemsAdded] = useState(false);

  useEffect(() => {
    // Load cart data from local storage on component mount
    const storedCart = JSON.parse(localStorage.getItem('tempCart')) || [];
    setTempCart(storedCart);
  }, []);

  useEffect(() => {
    // Save cart data to local storage whenever tempCart changes
    localStorage.setItem('cartData', JSON.stringify({ cart: tempCart, tempCart }));

  }, [tempCart]);

  const addToCartIcon = (item) => {
    setTempCart(prevCart => [...prevCart, item]);
    setItemsAdded(true);
  };

  return (
    <CartContext.Provider value={{ tempCart, itemsAdded, setTempCart, addToCartIcon }}>
      {children}
    </CartContext.Provider>
  );
};
