import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../../Components/ProductCard";
import config from "../../config";
import Loading from "../../Components/Loading";
import { useNavigate } from "react-router-dom";

const Bestseller = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  if (loading) return <Loading />;

  // Best sellers logic (same as Home)
  const bestSellers = products
    .filter((product) => product.salesCount)
    .sort((a, b) => b.salesCount - a.salesCount)
    .slice(0, 20);

  return (
    <section className="mb-12 text-center overflow-hidden px-4 py-8">

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
        className="text-white px-6 py-2 rounded-md mt-5 transition-all duration-300"
        style={{ backgroundColor: "#ec4899" }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#ffd1ec")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#ec4899")}
        onClick={() =>
          navigate(
            "/search?query=&category=All%20Products&hasoffer=false&sortorder=new"
          )
        }
      >
        View More <i className="fa-solid fa-arrow-right"></i>
      </button>

    </section>
  );
};

export default Bestseller;