import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Celebration = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="celebration-poster-wrapper">

      {/* LEFT POSTER */}
      <div className="poster-left">
        <img
          src="https://image2url.com/r2/default/images/1774334548742-5c023fb9-a8e7-44fe-bc52-d520caab0f21.png"
          alt="Celebration Poster"
          className="poster-img"
        />

        <div className="poster-content">
          <h1>
            CELEBRATION <br />
            EDIT
          </h1>

          <p>
            A curated collection of timeless ethnic styles
            crafted for every celebration moment
          </p>

          <button
            className="shop-btn"
            onClick={() => navigate("/search")}
          >
            Shop Now →
          </button>
        </div>
      </div>

      {/* RIGHT CARDS */}
      <div className="poster-right">

        <div
          className="lux-celebration-card"
          onClick={() => navigate("/search?category=Suits")}
        >
          <div className="lux-celebration-image">
            <img className="celebration-img-main"
              src="https://api.budandtulips.com/images/Red%20Rose%20Straight%20Suit2.jpg"/>
            <img className="celebration-img-hover"
              src="https://api.budandtulips.com/images/Red%20Rose%20Suit%203.jpg"/>
          </div>
          <div className="lux-celebration-overlay">
            <h3>Wedding</h3>
          </div>
        </div>

        <div
          className="lux-celebration-card"
          onClick={() => navigate("/search?category=All%20Products")}
        >
          <div className="lux-celebration-image">
            <img className="celebration-img-main"
              src="https://api.budandtulips.com/images/Green%20Adhya%20Suit1.jpg"/>
            <img className="celebration-img-hover"
              src="https://api.budandtulips.com/images/BT732io21.jpg"/>
          </div>
          <div className="lux-celebration-overlay">
            <h3>Mehndi</h3>
          </div>
        </div>

        <div
          className="lux-celebration-card"
          onClick={() => navigate("/search?color=yellow")}
        >
          <div className="lux-celebration-image">
            <img className="celebration-img-main"
              src="https://api.budandtulips.com/images/mustard%20Sadhna%20Suit1.jpg"/>
            <img className="celebration-img-hover"
              src="https://api.budandtulips.com/images/Basanti%20Suit%201.jpg"/>
          </div>
          <div className="lux-celebration-overlay">
            <h3>Haldi</h3>
          </div>
        </div>

        <div
          className="lux-celebration-card"
          onClick={() => navigate("/search?category=Dresses")}
        >
          <div className="lux-celebration-image">
            <img className="celebration-img-main"
              src="https://api.budandtulips.com/images/BT673ii31.jpg"/>
            <img className="celebration-img-hover"
              src="https://api.budandtulips.com/images/BT733io31.jpg"/>
          </div>
          <div className="lux-celebration-overlay">
            <h3>Reception</h3>
          </div>
        </div>

      </div>

    </section>
  );
};

export default Celebration;