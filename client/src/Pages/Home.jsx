import React, { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "../Components/Carousel";
import ProductCard from "../Components/ProductCard";
import config from "../config";
import Loading from "../Components/Loading";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${config}/products`);
        const products = response.data.createdProducts;
        setProducts(products);
        window.scrollTo(0, 0); // Scroll to top after setting products
        console.log("Products Loaded:", products);
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (!loading) {
      window.scrollTo(0, 0); // Ensure the page scrolls to top when loading is done
    }
  }, [loading]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Carousel />
      <div className="container mx-auto px-4 py-8">
        {/* New Arrivals Section */}
        <section className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-6">New Arrivals</h2>
          <hr className="mt-0" />
          <br />
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                productId={product._id}
                image={product.image[0]}
                name={product.name}
                price={product.price}
                offerPrice={product.offerPrice}
                category={product.category}
                isActive={product.isActive}
                hasOffer={product.hasOffer}
              />
            ))}
          </div>
        </section>

        {/* Best Sellers Section */}
        <section className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-12">Best Sellers</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {/* Sample Best Sellers */}
            {[
              {
                id: "2",
                image:
                  "https://www.budandtulips.com/Content/Pro_Images/BT758iq81.jpg",
                name: "Heena Sharara Suit",
                price: "4000.00",
              },
              {
                id: "3",
                image:
                  "https://www.budandtulips.com/Content/Pro_Images/BT757iq71.jpg",
                name: "Falguni Suit",
                price: "4500.00",
              },
              {
                id: "4",
                image:
                  "https://www.budandtulips.com/Content/Pro_Images/BT756iq61.jpg",
                name: "Ira Suit",
                price: "5000.00",
              },
              {
                id: "5",
                image:
                  "https://www.budandtulips.com/Content/Pro_Images/BT755iq51.jpg",
                name: "Apple Pear Shirt",
                price: "5500.00",
              },
              {
                id: "6",
                image:
                  "https://www.budandtulips.com/Content/Pro_Images/BT755iq51.jpg",
                name: "Apple Pear Shirt",
                price: "5500.00",
              },
            ].map((product) => (
              <ProductCard
                key={product.id}
                productId={product.id}
                image={product.image}
                name={product.name}
                price={product.price}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
