import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // Corrected import statement
import ProductCard from "./ProductCard";
import SizeChartModal from "./SizeChartModal";
import Modal from 'react-modal';
import Loading from "./Loading";
const ProductView = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(""); // Initialize with an empty string
  const [user, setUser] = useState(null);
  const [visibleSection, setVisibleSection] = useState("description");
  const [allProducts, setAllProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === product.image.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? product.image.length - 1 : prevIndex - 1
    );
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
    // setIsModalOpen(true);
  };
  
  const toggleSizeChart = () => {
    setIsModalVisible(!isModalVisible);
  };

  const formatInstructions = (instructions) => {
    return instructions.split(",").map((item, index) => (
      <span key={index}>
        {item.trim()}
        <br />
      </span>
    ));
  };

  const toggleSection = (section) => {
    setVisibleSection(visibleSection === section ? null : section);
  };

  const addToCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to add items to the cart.");
        navigate("/login"); // Redirect to login page if not authenticated
        return;
      }

      const decoded = jwtDecode(token);
      setUser(decoded);

      await axios.post(
        "https://bud-tulips.onrender.com/api/cart",
        {
          userId: decoded.id,
          productId: product._id,
          productName: product.name,
          price: product.hasOffer ? product.offerPrice : product.price,
          image: product.image[0],
          quantity,
          size,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Product added to cart");
      navigate("/ShoppingCart");
    } catch (error) {
      console.error(
        "Error adding product to cart:",
        error.response?.data?.message || error.message
      );
      alert("Login Expired !!");
    }
  };

  const addToWishlist = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to add items to the wishlist.");
        navigate("/login"); // Redirect to login page if not authenticated
        return;
      }

      const decoded = jwtDecode(token);
      setUser(decoded);

      await axios.post(
        "https://bud-tulips.onrender.com/api/wishlist",
        {
          userId: decoded.id,
          productId: product._id,
          productName: product.name,
          price: product.hasOffer ? product.offerPrice : product.price,
          image: product.image[0], // Assuming the first image is used for the wishlist
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Product added to wishlist");
    } catch (error) {
      console.error(
        "Error adding product to wishlist:",
        error.response?.data?.message || error.message
      );
      alert("Login Expired !!");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://bud-tulips.onrender.com/products/${id}`
        );
        const productData = response.data;
        setProduct(productData);
        if (productData.size.length === 1) {
          setSize(productData.size[0]); // Set size to the single available size
        } else {
          setSize(productData.size[0]); // Set default size to M if multiple sizes are available
        }

        // Fetch all products
        const allProductsResponse = await axios.get(
          "https://bud-tulips.onrender.com/products"
        );
        setAllProducts(allProductsResponse.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>
    <Loading/>
  </div>;
  if (!product.isActive) return <div>Product not available</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row mb-12">
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start mb-8 lg:mb-0">
      <div className="flex flex-row gap-2">
        <img
          src={product.image[selectedImageIndex]}
          alt={product.name}
          className="w-full h-96 object-contain rounded-md mb-4 cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        />
        <img
          src={product.image[selectedImageIndex === product.image.length - 1 ? 0 : selectedImageIndex + 1]}
          alt={product.name}
          className="w-full h-96 object-contain rounded-md mb-4 hidden sm:block"
          onClick={() => setIsModalOpen(true)}
        />
      </div>
      <div className="flex space-x-2 overflow-x-auto">
        {product.image.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`${product.name} thumbnail ${index + 1}`}
            className={`w-24 h-24 object-cover rounded-md cursor-pointer ${
              index === selectedImageIndex ? 'border-2 border-blue-500' : ''
            }`}
            onClick={() => handleThumbnailClick(index)}
          />
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        className="flex items-center justify-center outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <div className="relative bg-white p-4 rounded-md shadow-lg max-w-xs w-full sm:max-w-md sm:w-auto">
          <button
            onClick={handlePrevImage}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
          >
            &lt;
          </button>
          <img
            src={product.image[selectedImageIndex]}
            alt={product.name}
            className="w-full h-auto object-contain"
          />
          <button
            onClick={handleNextImage}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
          >
            &gt;
          </button>
        </div>
      </Modal>
    </div>
        <div className="w-full lg:w-1/2 lg:pl-8">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-xl text-gray-700 mb-4">
            {product.hasOffer ? (
              <>
                <span className="line-through">₹ {product.price}</span>
                <span className="ml-2 text-gray-700">
                  Sale Price : ₹ {product.offerPrice}
                </span>
              </>
            ) : (
              <>₹ {product.price}</>
            )}
          </p>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-bold">
              Quantity
            </label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-20 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            {product.size.length === 1 ? (
              <select
                value={size} // Use the size state variable
                onChange={(e) => setSize(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled // Optionally disable the select if there's only one size
              >
                <option value={product.size[0]}>{product.size[0]}</option>
              </select>
            ) : (
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {product.size.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className="flex space-x-4 mb-4">
            <button
              className="bg-pinkc text-white px-4 py-2 rounded-sm hover:bg-blue-950"
              onClick={addToCart}
            >
              Add to Cart
            </button>
            <button
              className="bg-pinkc text-white px-4 py-2 rounded-sm hover:bg-blue-950"
              onClick={addToWishlist}
            >
              Add to Wishlist
            </button>
            <div>
      <button
        className="bg-pinkc text-white px-4 py-2 rounded-sm hover:bg-blue-950"
        onClick={toggleSizeChart}
      >
        Size Chart
      </button>
      <SizeChartModal isVisible={isModalVisible} onClose={toggleSizeChart} />
    </div>
          </div>
          {/* <p className="text-gray-700 mb-6">
            <b>Category : </b>
            {product.category[0]}
          </p> */}
          <p className="text-gray-700 mb-6">
            <b>Include : </b>
            {product.inbox}
          </p>
          <p className="text-gray-700 mb-6">
            <b>Product Display Information:</b> <br />
            Model is Wearing Size Small (S) and Model Height is 5 Ft. 7 Inch.{" "}
            <br />
            <br />
            {product.description}
          </p>
        </div>
      </div>
      <div className="container mx-auto p-4">
        <div className="mb-8 flex flex-col sm:flex-row gap-4 sm:gap-8 text-center justify-center">
          <h2
            className="text-2xl font-bold mb-2 cursor-pointer"
            onClick={() => toggleSection("description")}
          >
            Description
            <hr />
          </h2>
          <h2
            className="text-2xl font-bold mb-2 cursor-pointer"
            onClick={() => toggleSection("additionalInfo")}
          >
            Additional Information
            <hr />
          </h2>
          <h2
            className="text-2xl font-bold mb-2 cursor-pointer"
            onClick={() => toggleSection("washingInfo")}
          >
            Washing Information
            <hr />
          </h2>
        </div>

        {visibleSection === "description" && (
          <div className="mb-8 text-left">
            <h3 className="font-bold mb-2">Description</h3>
            <p className="text-gray-700">
              {formatInstructions(product.description)}
            </p>
          </div>
        )}

        {visibleSection === "additionalInfo" && (
          <div className="mb-8 text-left">
            <h3 className="font-bold mb-2">Additional Information</h3>
            <div className="container mx-auto p-4 overflow-x-auto">
              <table className="min-w-full bg-white">
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 px-4 font-semibold">Include</td>
                    <td className="py-2 px-4">{product.inbox}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4 font-semibold">
                      Shipping Details
                    </td>
                    <td className="py-2 px-4">
                      The order will take 5-18 working days to deliver. Free
                      delivery within India.
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4 font-semibold">Exchange/Return</td>
                    <td className="py-2 px-4">
                      We only exchange size within 10 working days; In case we
                      are sold out, we'll exchange the piece. <br />
                      We don't do returns or cancel orders once placed. <br />
                      We don't exchange or return international orders. <br />
                      We don't exchange or refund reduced price articles.
                      Customized pieces can't be exchanged.
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4 font-semibold">
                      Other Description
                    </td>
                    <td className="py-2 px-4">
                      Model is Wearing Size Small (S) & Model Height is 5 Ft. 7
                      Inch.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {visibleSection === "washingInfo" && (
          <div className="mb-8 text-left">
            <h3 className="font-bold mb-2">Washing Information</h3>
            <p className="text-gray-700">
              {formatInstructions(product.washingInstruction)}
            </p>
          </div>
        )}
      </div>

     {/* You may also like these section */}
<div className="container mx-auto">
  <h2 className="text-2xl font-bold mb-4 text-center">You may also like these</h2>
  <hr />
  <br />
  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0">
    {allProducts.createdProducts && allProducts.createdProducts.slice(0, 8).map((product) => (
      <div key={product._id} className="">
        <ProductCard
          productId={product._id}
          image={product.image[0]}
          name={product.name}
          price={product.price}
          offerPrice={product.offerPrice}
          category={product.category}
          isActive={product.isActive}
          hasOffer={product.hasOffer}
        />
      </div>
    ))}
  </div>
  <div className="flex justify-center mt-4">
    <button
      className="bg-pinkc text-white px-4 py-2 rounded-sm hover:bg-blue-950"
      onClick={() => navigate("/search?query=&category=All%20Products")}
    >
      More
    </button>
  </div>
</div>

    </div>
  );
};

export default ProductView;
