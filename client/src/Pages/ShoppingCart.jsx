// CartPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const products = [
  { id: 1, name: 'Product 1', price: 50, quantity: 2 },
  { id: 2, name: 'Product 2', price: 30, quantity: 1 },
  { id: 3, name: 'Product 3', price: 20, quantity: 3 },
];

const ShoppingCart= () => {
  const totalPrice = products.reduce((acc, product) => acc + product.price * product.quantity, 0);
const Navigate = useNavigate();
function handletoCheckout(){
  Navigate('/CheckoutPage');
}
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        {products.map((product) => (
          <div key={product.id} className="flex justify-between items-center border-b py-2">
            <div>
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-600">Quantity: {product.quantity}</p>
            </div>
            <p className="text-xl"> ₹{product.price * product.quantity}</p>
          </div>
        ))}
        <div className="flex justify-between items-center mt-4">
          <h2 className="text-xl font-bold">Total Price</h2>
          <p className="text-xl font-bold"> ₹{totalPrice}</p>
        </div>
        <button className="w-full bg-pink-500 text-white py-2 mt-4 rounded-lg hover:bg-pink-600" onClick={handletoCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;
