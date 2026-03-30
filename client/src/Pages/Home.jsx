import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Carousel from "../Components/Carousel";
// import ProductCard from "../Components/ProductCard";
import config from "../config";
import Loading from "../Components/Loading";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Celebration from "./Home/Celebration";
import Arrivals from "./Home/Arrivals";
import Bestseller from "./Home/Bestseller";
import Celebs from "./Home/Celebs";
import Category from "./Home/Category";
import Reels from "./Home/Reels";
import Review from "./Home/Review";
import Sale from "./Home/Sale";

const Home = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
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

  const productsOnSale = products.filter((product) => product.hasOffer);
  const displayedSaleProducts = productsOnSale.slice(0, 5);

  const bestSellers = products
    .filter((product) => product.salesCount)
    .sort((a, b) => b.salesCount - a.salesCount)
    .slice(0, 10);

  const sortedProducts = [...products].reverse();
  const displayedProductslatest = sortedProducts.slice(0, 10);

  const slideLeft = () => {
    sliderRef.current.scrollBy({ left: -400, behavior: "smooth" });
  };

  const slideRight = () => {
    sliderRef.current.scrollBy({ left: 400, behavior: "smooth" });
  };

  return (
    <div>
      <Helmet>
        <title>
          Bud &amp; Tulips | Hand-Embroidered Suits, Kaftans &amp; Designer Wear
          from Jaipur
        </title>
      </Helmet>

      <Carousel />

      <div className="container mx-auto px-4 py-8">




              <Arrivals />
 
              <Celebration />

              <Bestseller />

              <Celebs />

{/* ================= FULL WIDTH POSTER ================= */}

<section className="promo-banner">

  <img
     src="https://image2url.com/r2/default/images/1773128515561-8462daba-26db-4bb1-bd6e-684b8394e9ce.png"
    alt="Bud & Tulips Collection"
  />

</section>

              <Category />

              <Reels />

              <Review />
          
             <Sale />

      </div>
    </div>
  );
};

export default Home;