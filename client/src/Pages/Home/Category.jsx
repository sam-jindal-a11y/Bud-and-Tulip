import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    {
      name: "Kurta & Suit Sets",
      img: "https://api.budandtulips.com/images/BT683ij31.jpg",
      link: "/search?category=Suits"
    },
    {
      name: "Loungewear",
      img: "https://api.budandtulips.com/images/BT581hz11.jpg",
      link: "/search?category=Loungewear"
    },
    {
      name: "Kaftan",
      img: "https://api.budandtulips.com/images/Sachi%20Kaftan1.jpg",
      link: "/search?category=Kaftan"
    },
    {
      name: "Co-Ords",
      img: "https://api.budandtulips.com/images/BT559hw91.jpg",
      link: "/search?category=Co-ords"
    },
    {
      name: "Dresses",
      img: "https://api.budandtulips.com/images/Starlet%20Shirt%20Dress1.jpg",
      link: "/search?category=Dresses"
    },
    {
      name: "Saree",
      img: "https://api.budandtulips.com/images/saree1.jpg",
      link: "/search?category=Saree"
    },
    {
      name: "Kurtas",
      img: "https://api.budandtulips.com/images/BT753iq31.jpg",
      link: "/search?category=Kurtas"
    },
    {
      name: "Tops",
      img: "https://api.budandtulips.com/images/BT651ig11.jpg",
      link: "/search?category=Tops"
    },
    {
      name: "Blazer",
      img: "https://api.budandtulips.com/images/BT546hv61.jpg",
      link: "/search?category=Blazer"
    },
    {
      name: "Skirt Sets",
      img: "https://api.budandtulips.com/images/BT673ii31.jpg",
      link: "/search?category=Skirt Sets"
    },
    {
      name: "Shirts",
      img: "https://api.budandtulips.com/images/BT755iq51.jpg",
      link: "/search?category=Shirts"
    }
  ];

  const scrollLeft = () => {
    document.querySelector(".category-track").scrollBy({
      left: -320,
      behavior: "smooth"
    });
  };

  const scrollRight = () => {
    document.querySelector(".category-track").scrollBy({
      left: 320,
      behavior: "smooth"
    });
  };

  return (
    <section className="category-section">

      <h2 className="category-title">Shop by Category</h2>

      <div className="category-slider">

        {/* LEFT */}
        <button className="category-arrow left" onClick={scrollLeft}>
          ‹
        </button>

        {/* RIGHT */}
        <button className="category-arrow right" onClick={scrollRight}>
          ›
        </button>

        <div className="category-track">

          {categories.map((item, i) => (
            <div
              key={i}
              className="category-card"
              onClick={() => navigate(item.link)}
            >
              <img src={item.img} alt={item.name} />

              <div className="category-text">
                <span className="category-btn">{item.name}</span>
              </div>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default Category;