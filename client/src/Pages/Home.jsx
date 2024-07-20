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

  // Filter products on sale
  const productsOnSale = products.filter((product) => product.hasOffer);

  // Show only 10 products per section to fit in 2 rows (5 per row)
  const displayedProducts = products.slice(0, 10);
  const displayedSaleProducts = productsOnSale.slice(0, 5);

  // Filter and sort best-selling products
  const bestSellers = products
    .filter((product) => product.salesCount)
    .sort((a, b) => b.salesCount - a.salesCount)
    .slice(0, 10);
 // Sort products by creation date in descending order
 const sortedProducts = [...products].reverse();

 // Display only the latest 20 products
 const displayedProductslatest = sortedProducts.slice(0, 10);

  return (
    <div>
      <Carousel />
      <div className="container mx-auto px-4 py-8">
        {/* New Arrivals Section */}
        <section className="mb-12 text-center">
      <h2 className="text-3xl font-bold mb-6">New Arrivals</h2>
      <hr className="mt-0" />
      <br />
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {displayedProductslatest.map((product) => (
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
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap">
            {bestSellers.map((product) => (
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
        {/* Products on Sale Section */}
        <section className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-6">Products on Sale</h2>
          <hr className="mt-0" />
          <br />
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap">
            {displayedSaleProducts.map((product) => (
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

      
      </div>
    </div>
  );
};

export default Home;
