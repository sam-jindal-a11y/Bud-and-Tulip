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
   
{/* ================= PREMIUM CELEBRATION COUTURE ================= */}

<section className="lux-celebration-section">

<h2 className="lux-celebration-title">
Celebration Couture
</h2>

<div className="lux-celebration-grid">

{/* WEDDING → SUITS */}

<div 
className="lux-celebration-card"
onClick={()=>navigate("/search?category=Suits")}
>

<div className="lux-celebration-image">

<img 
className="celebration-img-main"
src="https://api.budandtulips.com/images/Red%20Rose%20Straight%20Suit2.jpg" 
alt="Wedding"
/>

<img 
className="celebration-img-hover"
src="https://api.budandtulips.com/images/Red%20Rose%20Suit%203.jpg"
alt="Weddding"
/>

</div>
<div className="lux-celebration-overlay">
<h3>Wedding</h3>
</div>
</div>


{/* MEHNDI → GREEN PRODUCTS */}

<div 
className="lux-celebration-card"
onClick={()=>navigate("/search?query=&category=All%20Products")}
>
<div className="lux-celebration-image">

<img 
className="celebration-img-main"
src="https://api.budandtulips.com/images/Green%20Adhya%20Suit1.jpg" 
alt="Mehndi"
/>

<img 
className="celebration-img-hover"
src="https://api.budandtulips.com/images/BT732io21.jpg"
alt="Mehndi Hover"
/>

</div>
  
<div className="lux-celebration-overlay">
<h3>Mehndi</h3>
</div>
</div>

{/* HALDI → YELLOW PRODUCTS */}

<div 
className="lux-celebration-card"
onClick={() => navigate("/search?color=yellow")}
>

<div className="lux-celebration-image">

<img 
className="celebration-img-main"
src="https://api.budandtulips.com/images/mustard%20Sadhna%20Suit1.jpg" 
alt="Haldi"
/>

<img 
className="celebration-img-hover"
src="https://api.budandtulips.com/images/Basanti%20Suit%201.jpg"
alt="Haldi Hover"
/>

</div>

<div className="lux-celebration-overlay">
<h3>Haldi</h3>
</div>

</div>

{/* RECEPTION → DRESSES */}

<div 
className="lux-celebration-card"
onClick={()=>navigate("/search?category=Dresses")}
>

<div className="lux-celebration-image">

<img 
className="celebration-img-main"
src="https://api.budandtulips.com/images/BT673ii31.jpg" 
alt="Reception"
/>

<img 
className="celebration-img-hover"
src="https://api.budandtulips.com/images/BT733io31.jpg"
alt="Reception"
/>

</div>

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
                images={product.image}
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
            images={product.image}
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

{/* ================= FULL WIDTH POSTER ================= */}

<section className="promo-banner">

  <img
     src="https://image2url.com/r2/default/images/1773128515561-8462daba-26db-4bb1-bd6e-684b8394e9ce.png"
    alt="Bud & Tulips Collection"
  />

</section>

{/* ================= SHOP BY CATEGORY ================= */}

<section className="category-section">

<h2 className="category-title">Shop by Category</h2>

<div className="category-slider">

  <div className="category-track">
{/* SUITS */}

<div
className="category-card"
onClick={()=>navigate("/search?category=Suits")}
>
<img src="https://api.budandtulips.com/images/BT683ij31.jpg" alt="Suits"/>
<div className="category-text">
<span className="category-btn">Kurta & Suit Sets</span>
</div>
</div>

{/* LOUNGEWEAR */}

<div
className="category-card"
onClick={()=>navigate("/search?category=Loungewear")}
>
<img src="https://api.budandtulips.com/images/BT581hz11.jpg" alt="Loungewear"/>
<div className="category-text">
<span className="category-btn">Loungewear</span>
</div>
</div>

{/* KAFTAN */}

<div
className="category-card"
onClick={()=>navigate("/search?category=Kaftan")}
>
<img src="https://api.budandtulips.com/images/Sachi%20Kaftan1.jpg" alt="Kaftan"/>
<div className="category-text">
<span className="category-btn">Kaftan</span>
</div>
</div>

{/* CO-ORDS */}

<div
className="category-card"
onClick={()=>navigate("/search?category=Co-ords")}
>
<img src="https://api.budandtulips.com/images/BT559hw91.jpg" alt="Co-Ords"/>
<div className="category-text">
<span className="category-btn">Co-Ords</span>
</div>
</div>

{/* DRESSES */}

<div
className="category-card"
onClick={()=>navigate("/search?category=Dresses")}
>
<img src="https://api.budandtulips.com/images/Starlet%20Shirt%20Dress1.jpg" alt="Dresses"/>
<div className="category-text">
<span className="category-btn">Dresses</span>
</div>
</div>

{/* SAREE */}

<div
className="category-card"
onClick={()=>navigate("/search?category=Saree")}
>
<img src="https://api.budandtulips.com/images/saree1.jpg" alt="Saree"/>
<div className="category-text">
<span className="category-btn">Saree</span>
</div>
</div>

{/* KURTAS */}

<div
className="category-card"
onClick={()=>navigate("/search?category=Kurtas")}
>
<img src="https://api.budandtulips.com/images/BT753iq31.jpg" alt="Kurtas"/>
<div className="category-text">
<span className="category-btn">Kurtas</span>
</div>
</div>

{/* TOPS */}

<div
className="category-card"
onClick={()=>navigate("/search?category=Tops")}
>
<img src="https://api.budandtulips.com/images/BT651ig11.jpg" alt="Tops"/>
<div className="category-text">
<span className="category-btn">Tops</span>
</div>
</div>

{/* BLAZER */}

<div
className="category-card"
onClick={()=>navigate("/search?category=Blazer")}
>
<img src="https://api.budandtulips.com/images/BT546hv61.jpg" alt="Blazer"/>
<div className="category-text">
<span className="category-btn">Blazer</span>
</div>
</div>

{/* SKIRT SETS */}

<div
className="category-card"
onClick={()=>navigate("/search?category=Skirt Sets")}
>
<img src="https://api.budandtulips.com/images/BT673ii31.jpg" alt="Skirt Sets"/>
<div className="category-text">
<span className="category-btn">Skirt Sets</span>
</div>
</div>

{/* SHIRTS */}

<div
className="category-card"
onClick={()=>navigate("/search?category=Shirts")}
>
<img src="https://api.budandtulips.com/images/BT755iq51.jpg" alt="Shirts"/>
<div className="category-text">
<span className="category-btn">Shirts</span>
</div>
</div>

{/* DUPLICATE ITEMS FOR INFINITE SLIDER */}

<div
className="category-card"
onClick={()=>navigate("/search?category=Suits")}
>
<img src="https://api.budandtulips.com/images/BT683ij31.jpg" alt="Suits"/>
<div className="category-text">
<span className="category-btn">Kurta & Suit Sets</span>
</div>
</div>

<div
className="category-card"
onClick={()=>navigate("/search?category=Loungewear")}
>
<img src="https://api.budandtulips.com/images/BT581hz11.jpg" alt="Loungewear"/>
<div className="category-text">
<span className="category-btn">Loungewear</span>
</div>
</div>

</div>

</div>

</section>

{/* ================= PRODUCTS ON SALE ================= */}

<section className="products-sale section-spacing">

</section>
        {/* Products on Sale */}
        <section className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-6">Exclusive Price Drop</h2>
          <hr />
          <br />

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {displayedSaleProducts.map((product) => (
              <ProductCard
                key={product._id}
                slug={product.slug}
                productId={product._id}
                image={product.image?.[0]}
                images={product.image}
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