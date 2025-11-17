import React, { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "../Components/Carousel";
import ProductCard from "../Components/ProductCard";
import config from "../config";
import Loading from "../Components/Loading";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const Home = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // ✅ fixed template literal
        const response = await axios.get(`${config}/products`);
        const products = response.data.createdProducts || [];
        setProducts(products);
        window.scrollTo(0, 0);
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
      window.scrollTo(0, 0);
    }
  }, [loading]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  if (loading) {
    return <Loading />;
  }

  // Products on sale
  const productsOnSale = products.filter((product) => product.hasOffer);

  // Just in case products is empty/null
  const displayedProducts = products.slice(0, 10);
  const displayedSaleProducts = productsOnSale.slice(0, 5);

  // Best sellers (by salesCount)
  const bestSellers = products
    .filter((product) => product.salesCount)
    .sort((a, b) => b.salesCount - a.salesCount)
    .slice(0, 10);

  // Latest products (reverse by creation order)
  const sortedProducts = [...products].reverse();
  const displayedProductslatest = sortedProducts.slice(0, 10);

  return (
    <div>
      <Helmet>
        <title>
          Bud &amp; Tulips | Hand-Embroidered Suits, Kaftans &amp; Designer Wear
          from Jaipur
        </title>
        <meta
          name="description"
          content="Discover Bud & Tulips – Jaipur's handcrafted fashion label offering premium hand-embroidered suits, kaftans & festive wear for all sizes (XXS-10XL)."
        />
        <link rel="canonical" href="https://budandtulips.com/" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Bud & Tulips | Hand-Embroidered Suits & Kaftans"
        />
        <meta
          property="og:description"
          content="Shop Jaipur-inspired hand-embroidered suits, kaftans & modern Indian wear at Bud & Tulips."
        />
        <meta property="og:url" content="https://budandtulips.com/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://budandtulips.com/home-cover.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Bud & Tulips | Hand-Embroidered Suits & Kaftans"
        />
        <meta
          name="twitter:description"
          content="Shop Jaipur-inspired hand-embroidered suits & kaftans."
        />
        <meta
          name="twitter:image"
          content="https://budandtulips.com/home-cover.jpg"
        />

        {/* Organization structured data */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Bud & Tulips",
              "url": "https://budandtulips.com",
              "logo": "https://budandtulips.com/logo.png",
              "sameAs": [
                "https://www.instagram.com/budandtulips",
                "https://www.facebook.com/budandtulips"
              ]
            }
          `}
        </script>
      </Helmet>

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
                image={product.image?.[0]}
                name={product.name}
                price={product.price}
                offerPrice={product.offerPrice}
                category={product.category}
                isActive={product.isActive}
                hasOffer={product.hasOffer}
                size={product.size}
              />
            ))}
          </div>
          <button
            className="bg-pinkc text-white px-4 py-2 rounded-sm hover:bg-blue-950 mt-5"
            onClick={() =>
              navigate(
                "/search?query=&category=All%20Products&hasoffer=false&sortorder=new"
              )
            }
          >
            View More{" "}
            <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
          </button>
        </section>

        {/* Best Sellers Section */}
        <section className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-12">Best Sellers</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {bestSellers.map((product) => (
              <ProductCard
                key={product._id}
                productId={product._id}
                image={product.image?.[0]}
                name={product.name}
                price={product.price}
                offerPrice={product.offerPrice}
                category={product.category}
                isActive={product.isActive}
                hasOffer={product.hasOffer}
                size={product.size}
              />
            ))}
          </div>
          <button
            className="bg-pinkc text-white px-4 py-2 rounded-sm hover:bg-blue-950 mt-5"
            onClick={() => navigate("/search?query=&category=All%20Products")}
          >
            View More{" "}
            <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
          </button>
        </section>

        {/* Products on Sale Section */}
        <section className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-6">Products on Sale</h2>
          <hr className="mt-0" />
          <br />
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {displayedSaleProducts.map((product) => (
              <ProductCard
                key={product._id}
                productId={product._id}
                image={product.image?.[0]}
                name={product.name}
                price={product.price}
                offerPrice={product.offerPrice}
                category={product.category}
                isActive={product.isActive}
                hasOffer={product.hasOffer}
                size={product.size}
              />
            ))}
          </div>
          <button
            className="bg-pinkc text-white px-4 py-2 rounded-sm hover:bg-blue-950 mt-5"
            onClick={() =>
              navigate("/search?query=&category=All%20Products&hasoffer=true")
            }
          >
            View More{" "}
            <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
          </button>
        </section>
      </div>
    </div>
  );
};

export default Home;
