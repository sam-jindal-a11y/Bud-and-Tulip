import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../../Components/ProductCard";
import config from "../../config";
import Loading from "../../Components/Loading";
import { useNavigate } from "react-router-dom";

const Arrivals = () => {
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

  // Latest products logic (same as Home)
  const sortedProducts = [...products].reverse();
  const displayedProductslatest = sortedProducts.slice(0, 10);

  return (
    <section className="mb-12 text-center px-4 py-8">

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

export default Arrivals;