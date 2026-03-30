import React, { useEffect } from "react";

const Review = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const reviews = [
    {
      text: "Absolutely loved the embroidery and quality. The outfit looked exactly like the pictures.",
      name: "Priya Sharma",
      time: "7 days ago"
    },
    {
      text: "Delivery was quick and the festive collection is beautiful. Highly recommended.",
      name: "Ananya Mehta",
      time: "10 days ago"
    },
    {
      text: "Amazing designs and very comfortable fabric. Will definitely shop again.",
      name: "Riya Kapoor",
      time: "18 days ago"
    }
  ];

  return (
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

        {reviews.map((item, i) => (
          <div
            key={i}
            className="review-card"
            style={{
              backgroundImage: `url(https://api.budandtulips.com/images/sea%20Green%20cindrella%20suit2.jpg)`
            }}
          >

            <div className="review-stars">★★★★★</div>

            <p>{item.text}</p>

            <div className="review-user">
              <img
                src="https://image2url.com/r2/default/images/1772778835514-373752dc-3eee-49de-953f-2f460950b59a.webp"
                alt=""
              />
              <div>
                <h4>{item.name}</h4>
                <span className="review-time">{item.time}</span>
              </div>
            </div>

          </div>
        ))}

      </div>

      {/* LOAD MORE */}
      <div className="review-load-more">
        <button>View More</button>
      </div>

    </section>
  );
};

export default Review;