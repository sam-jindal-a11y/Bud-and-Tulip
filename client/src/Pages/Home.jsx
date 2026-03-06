import React, { useEffect, useState, useRef } from "react";
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
    {/* ================= SHOP BY CATEGORY ================= */}

<section className="category-section">
  <h2 className="category-title">Shop by Category</h2>

  <div className="category-grid">

    <div className="category-item" onClick={()=>navigate("/search?category=Suits")}>
      <img src="https://www.fabricoz.com/cdn/shop/products/Indian-Dress-C1064B_1.jpg?v=1699763567" alt="" />
      <p>Suits</p>
    </div>

    <div className="category-item" onClick={()=>navigate("/search?category=Sharara")}>
      <img src="https://image2url.com/r2/default/images/1772178507761-2c89ba5c-d636-4c55-b92f-a689bcd2f56f.webp" alt="" />
      <p>Sharara</p>
    </div>

    <div className="category-item" onClick={()=>navigate("/search?category=Kaftan")}>
      <img src="https://image2url.com/r2/default/images/1772178595747-bc5882cb-6a6d-4f0d-b405-98de89f3e91c.jpg" alt="" />
      <p>Kaftan</p>
    </div>

    <div className="category-item" onClick={()=>navigate("/search?category=Festive")}>
      <img src="https://image2url.com/r2/default/images/1772178643423-245eb90d-7a83-415f-8f4f-de68204b9cd2.jpg" alt="" />
      <p>Festive</p>
    </div>

    <div className="category-item" onClick={()=>navigate("/search?category=Saree")}>
      <img src="https://image2url.com/r2/default/images/1772178866019-981c8f32-9cf6-4bd3-a8af-029810020a60.jpg" alt="" />
      <p>Saree</p>
    </div>

  </div>
</section>

{/* ================= PREMIUM CELEBRATION COUTURE ================= */}

<section className="lux-celebration-section">

<h2 className="lux-celebration-title">
Celebration Column
</h2>

<div className="lux-celebration-grid">

{/* WEDDING */}

<div 
className="lux-celebration-card"
onClick={()=>navigate("/search?occasion=wedding")}
>
<img src="/celebrations/wedding.jpg" alt="Wedding"/>
<div className="lux-celebration-overlay">
<h3>Wedding</h3>
</div>
</div>


{/* MEHNDI */}

<div 
className="lux-celebration-card"
onClick={()=>navigate("/search?occasion=mehndi")}
>
      <img src="https://image2url.com/r2/default/images/1772178643423-245eb90d-7a83-415f-8f4f-de68204b9cd2.jpg" alt="" />
<img src="" alt="Mehndi"/>
<div className="lux-celebration-overlay">
<h3>Mehndi</h3>
</div>
</div>


{/* HALDI */}

<div 
className="lux-celebration-card"
onClick={()=>navigate("/search?occasion=haldi")}
>
      <img src="https://image2url.com/r2/default/images/1772178507761-2c89ba5c-d636-4c55-b92f-a689bcd2f56f.webp" alt="" />
<img src="" alt="Haldi"/>
<div className="lux-celebration-overlay">
<h3>Haldi</h3>
</div>
</div>


{/* RECEPTION */}

<div 
className="lux-celebration-card"
onClick={()=>navigate("/search?occasion=reception")}
>
<img src="/celebrations/reception.jpg" alt="Reception"/>
<div className="lux-celebration-overlay">
<h3>Reception</h3>
</div>
</div>

</div>

</section>

      <div className="container mx-auto px-4 py-8">
        {/* New Arrivals */}
        <section className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-6">New Arrivals</h2>
          <hr />
          <br />

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {displayedProductslatest.map((product) => (
              <ProductCard
                key={product._id}
                slug={product.slug}
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
            View More <i className="fa-solid fa-arrow-right"></i>
          </button>
        </section>

       {/* Best Sellers Section */}
<section className="mb-12 text-center overflow-hidden">
  <h2 className="text-3xl font-bold mb-10">Best Sellers</h2>

  <div className="slider-wrapper">
    <div className="slider-track">

      {bestSellers.concat(bestSellers).map((product, index) => (
        <div className="slide-item" key={index}>
          <ProductCard
            slug={product.slug}
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
        </div>
      ))}

    </div>
  </div>

  <button
    className="bg-pinkc text-white px-4 py-2 rounded-sm hover:bg-blue-950 mt-6"
    onClick={() => navigate("/search?query=&category=All%20Products")}
  >
    View More <i className="fa-solid fa-arrow-right"></i>
  </button>
</section>

        {/* Products on Sale */}
        <section className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-6">Products on Sale</h2>
          <hr />
          <br />

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {displayedSaleProducts.map((product) => (
              <ProductCard
                key={product._id}
                slug={product.slug}
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
            View More <i className="fa-solid fa-arrow-right"></i>
          </button>

          
        </section>

        {/* ================= CUSTOMER REVIEWS ================= */}

<section className="customer-review-section">

<h2 className="review-heading">
What Our Customers Say
</h2>

{/* GOOGLE REVIEW BANNER */}

<div className="google-review-banner">

<div className="google-left">
<h3>Google Reviews</h3>
<p className="rating">5.0 ⭐⭐⭐⭐⭐ (241)</p>
</div>

<button className="google-review-btn">
Review us on Google
</button>

</div>


{/* REVIEW GRID */}

<div className="review-grid">

{/* REVIEW CARD */}

<div className="review-card">

<div className="review-user">
<img src="https://image2url.com/r2/default/images/1772778835514-373752dc-3eee-49de-953f-2f460950b59a.webp" alt="" />
<div>
<h4>Priya Sharma</h4>
<span className="review-time">7 days ago</span>
</div>
</div>

<div className="review-stars">★★★★★</div>

<p>
Absolutely loved the embroidery and quality.
The outfit looked exactly like the pictures.
</p>

<img
className="review-image"
src="/reviews/review1.jpg"
alt=""
/>

</div>


{/* REVIEW CARD */}

<div className="review-card">

<div className="review-user">
<img src="https://image2url.com/r2/default/images/1772778835514-373752dc-3eee-49de-953f-2f460950b59a.webp" alt="" />
<div>
<h4>Ananya Mehta</h4>
<span className="review-time">10 days ago</span>
</div>
</div>

<div className="review-stars">★★★★★</div>

<p>
Delivery was quick and the festive collection is beautiful.
Highly recommended.
</p>

</div>


{/* REVIEW CARD */}

<div className="review-card">

<div className="review-user">
<img src="https://image2url.com/r2/default/images/1772778835514-373752dc-3eee-49de-953f-2f460950b59a.webp" alt="" />
<div>
<h4>Riya Kapoor</h4>
<span className="review-time">18 days ago</span>
</div>
</div>

<div className="review-stars">★★★★★</div>

<p>
Amazing designs and very comfortable fabric.
Will definitely shop again.
</p>

</div>

</div>


{/* LOAD MORE */}

<div className="review-load-more">
<button>View More</button>
</div>

</section>
      </div>
    </div>
  );
};

export default Home;