import React, { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "../Components/Carousel";
import ProductCard from "../Components/ProductCard";



const Home = () => {

  const [product , setProduct] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products");
        const products = response.data.createdProducts;
        setProduct(products);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProducts();
    
  }, []);

  
  
  return (
    <div>
      <Carousel />
      <div className="container mx-auto px-4 py-8">
        {/* Carousel Section */}
        <section className="mb-12">
          
        </section>
        {/* New Arrivals Section */}
        <section className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-12">New Arrivals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {product.map((product) => (
              <ProductCard
                key={product._id}
                image={product.image[0]}  // Using the first image from the array
                name={product.name}
                price={product.price}
              />
            ))}
          </div>
        </section>
        {/* Best Sellers Section */}
        <section className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-12">Best Sellers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            <ProductCard
              image="https://www.budandtulips.com/Content/Pro_Images/BT758iq81.jpg"
              name="Heena Sharara Suit"
              price="4000.00"
            />
            <ProductCard
              image="https://www.budandtulips.com/Content/Pro_Images/BT757iq71.jpg"
              name="Falguni Suit"
              price="4500.00"
            />
            <ProductCard
              image="https://www.budandtulips.com/Content/Pro_Images/BT756iq61.jpg"
              name="Ira Suit"
              price="5000.00"
            />
            <ProductCard
              image="https://www.budandtulips.com/Content/Pro_Images/BT755iq51.jpg"
              name="Apple Pear Shirt"
              price="5500.00"
            />
              <ProductCard
              image="https://www.budandtulips.com/Content/Pro_Images/BT755iq51.jpg"
              name="Apple Pear Shirt"
              price="5500.00"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
