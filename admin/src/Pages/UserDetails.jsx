import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import config from '../config';

const UserDetails = () => {
  const { userId } = useParams();
  const [shippingDetails, setShippingDetails] = useState(null);
  const [previousOrders, setPreviousOrders] = useState([]);
  const [productDetails, setProductDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        const shipDetailsResponse = await fetch(`${config}/api/address?userId=${userId}`);
        const ordersResponse = await fetch(`${config}/api/orderHistory/orders/user/${userId}`);

        const shipDetails = await shipDetailsResponse.json();
        const orders = await ordersResponse.json();

        setShippingDetails(shipDetails.length ? shipDetails : null);
        setPreviousOrders(orders);

        // Fetch product details
        const productIds = orders.flatMap(order => order.products.map(product => product.productId));
        const uniqueProductIds = [...new Set(productIds)];

        const productDetailsResponses = await Promise.all(
          uniqueProductIds.map(productId => fetch(`${config}/products/${productId}`))
        );
        const productDetailsData = await Promise.all(productDetailsResponses.map(res => res.json()));

        const productDetailsMap = productDetailsData.reduce((acc, product) => {
          acc[product._id] = product;
          return acc;
        }, {});

        setProductDetails(productDetailsMap);

      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen"><p className="text-lg font-semibold text-gray-500">Loading...</p></div>;
  }

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">User Dashboard</h1>

      {/* Shipping Details Section */}
      <div className="bg-white p-6 shadow-lg rounded-lg border border-gray-200 mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Shipping Details</h2>
        {shippingDetails ? (
          <div className="space-y-3">
            <p><span className="font-medium text-gray-600">Name:</span> {shippingDetails[0].firstName} {shippingDetails[0].lastName}</p>
            <p><span className="font-medium text-gray-600">Address:</span> {shippingDetails[0].address1}</p>
            <p><span className="font-medium text-gray-600">City:</span> {shippingDetails[0].city}</p>
            <p><span className="font-medium text-gray-600">Postal Code:</span> {shippingDetails[0].postalCode}</p>
            <p><span className="font-medium text-gray-600">Country:</span> {shippingDetails[0].country}</p>
            <p><span className="font-medium text-gray-600">Phone:</span> {shippingDetails[0].phone}</p>
          </div>
        ) : (
          <p className="text-red-500">No shipping details found.</p>
        )}
      </div>

      {/* Previous Orders Section */}
      <div className="bg-white p-6 shadow-lg rounded-lg border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Previous Orders</h2>
        {previousOrders.length > 0 ? (
          <ul className="space-y-4">
            {previousOrders.map((order) => (
              <li key={order._id} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                <p><strong>Order ID:</strong> {order._id}</p>
                <p><strong>Status:</strong> <span className={`px-2 py-1 rounded text-white ${order.status === 'Delivered' ? 'bg-green-500' : 'bg-yellow-500'}`}>{order.status}</span></p>
                <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
                <p><strong>Final Amount:</strong> ₹{order.finalAmount}</p>
                <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                <div className="mt-3">
                  <h3 className="font-semibold text-gray-700">Products:</h3>
                  <ul className="ml-4 list-disc space-y-2">
                    {order.products.map((product) => {
                      const productDetail = productDetails[product.productId];
                      return (
                        <li key={product.productId} className="text-gray-600">
                          <p><strong>Product Name:</strong> {productDetail ? productDetail.name : 'Loading...'}</p>
                          <p><strong>Quantity:</strong> {product.quantity}</p>
                          <p><strong>Price:</strong> ₹{product.price}</p>
                          <p><strong>Size:</strong> {product.size}</p>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-red-500">No previous orders found.</p>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
