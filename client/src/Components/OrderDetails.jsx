import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderDetails = ({ orderId }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/api/orderHistory/6682acb74dd2c4aa085acbfc`);
        // console.log(response.data); // Log the response to verify its structure
        setOrder(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message); 
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Order Details</h2>
      {order && (
        <>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Order ID:</h3>
            <p>{order._id}</p>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-semibold">Address ID:</h3>
            <p>{order.addressId}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Products:</h3>
            <ul>
              {order.products && order.products.map((product) => (
                <li key={product._id} className="mb-2">
                  <div className="flex items-center">
                   
                    <p className="ml-auto">{product.quantity} x ${product.price}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Payment Method:</h3>
            <p>{order.paymentMethod}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Total Amount:</h3>
            <p>${order.totalAmount}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Discount:</h3>
            <p>${order.discount}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">COD Charge:</h3>
            <p>${order.codCharge}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Final Amount:</h3>
            <p>${order.finalAmount}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Created At:</h3>
            <p>{new Date(order.createdAt).toLocaleString()}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderDetails;
