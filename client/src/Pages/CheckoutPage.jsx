// CheckoutPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const addresses = [
  { id: 1, address: '123 Main St, Springfield' },
  { id: 2, address: '456 Elm St, Shelbyville' },
];

const products = [
  { id: 1, name: 'Product 1', price: 50, image: 'path/to/image1.jpg' },
  { id: 2, name: 'Product 2', price: 30, image: 'path/to/image2.jpg' },
];

const CheckoutPage = () => {
  const [selectedAddress, setSelectedAddress] = useState(addresses[0].id);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const navigate = useNavigate();

  const totalPrice = products.reduce((acc, product) => acc + product.price, 0);
  const gst = totalPrice * 0.18;
  const finalPrice = totalPrice + gst;

  const handlePayment = () => {
    if (paymentMethod === 'razorpay') {
      navigate('/razorpay');
    } else {
      // Handle Cash on Delivery
      alert('Order placed with Cash on Delivery');
    }
  };

  return (
    <div className="container mx-auto p-4 flex flex-wrap">
      <div className="w-full lg:w-2/3 p-4">
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2">Select Address</h2>
          {addresses.map((address) => (
            <div key={address.id} className="mb-2">
              <input
                type="radio"
                id={`address-${address.id}`}
                name="address"
                value={address.id}
                checked={selectedAddress === address.id}
                onChange={() => setSelectedAddress(address.id)}
                className="mr-2"
              />
              <label htmlFor={`address-${address.id}`} className="text-gray-700">{address.address}</label>
            </div>
          ))}
        </div>
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2">Select Payment Method</h2>
          <div className="mb-2">
            <input
              type="radio"
              id="cod"
              name="payment"
              value="cod"
              checked={paymentMethod === 'cod'}
              onChange={() => setPaymentMethod('cod')}
              className="mr-2"
            />
            <label htmlFor="cod" className="text-gray-700">Cash on Delivery</label>
          </div>
          <div className="mb-2">
            <input
              type="radio"
              id="razorpay"
              name="payment"
              value="razorpay"
              checked={paymentMethod === 'razorpay'}
              onChange={() => setPaymentMethod('razorpay')}
              className="mr-2"
            />
            <label htmlFor="razorpay" className="text-gray-700">Razorpay</label>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/3 p-4 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-2">Order Summary</h2>
        {products.map((product) => (
          <div key={product.id} className="flex items-center mb-4">
            <img src={product.image} alt={product.name} className="w-16 h-16 mr-4" />
            <div>
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-gray-700">₹{product.price}</p>
            </div>
          </div>
        ))}
        <div className="mb-4">
          <h3 className="text-xl font-bold">Apply Gift Card/Voucher</h3>
          <input
            type="text"
            placeholder="Enter code"
            className="w-full p-2 border rounded mt-2"
          />
        </div>
        <div className="flex justify-between items-center font-bold mb-2">
          <span>Total Price (incl. ₹{gst.toFixed(2)} &nbsp;GST)</span>
          <span> ₹{finalPrice.toFixed(2)}</span>
        </div>
        <button
          onClick={handlePayment}
          className="w-full bg-pink-500 text-white py-2 mt-4 rounded-lg hover:bg-pink-600"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
