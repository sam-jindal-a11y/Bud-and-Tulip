import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Celebs = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const celebsData = [
    {
      img: "https://ik.imagekit.io/a4onplc06/IMG_5506.PNG",
      link: "/product/slug/hand-embroidered-blue-adhya-suit"
    },

    { img: "https://ik.imagekit.io/a4onplc06/IMG_5495.PNG" },

    { img: "https://ik.imagekit.io/a4onplc06/IMG_5496.PNG" },
    
    {
      img: "https://ik.imagekit.io/a4onplc06/IMG_5499.PNG",
      link: "/product/slug/hand-embroidered-roop-suit"
    },

    { img: "https://ik.imagekit.io/a4onplc06/IMG_5503.jpg" },
    
    {
      img: "https://ik.imagekit.io/a4onplc06/IMG_55080.jpg",
      link: "/product/slug/somya-suit"
    },
    {
      img: "https://ik.imagekit.io/a4onplc06/IMG_5502.PNG",
      link: "/product/slug/hand-embroidered-straight-rose-suit"
    },
    {
      img: "https://ik.imagekit.io/a4onplc06/IMG_5500.JPG.jpeg",
      link: "/product/slug/hot-pink-pleated-suit"
    },
    {
      img: "https://ik.imagekit.io/a4onplc06/IMG_5501.PNG",
      link: "/product/slug/red-rose-suit"
    },
    {
      img: "https://ik.imagekit.io/a4onplc06/IMG_55070.jpg",
      link: "/product/slug/uvika-suit"
    },
    { img: "https://ik.imagekit.io/a4onplc06/IMG_5504.JPG.jpeg" },

    { img: "https://ik.imagekit.io/a4onplc06/IMG_5510.png" }
  ];

  return (
    <section className="celebs-premium px-4 py-8">

      <h2 className="celebs-heading">Loved By Celebs</h2>

      <div className="celebs-premium-grid">

        {celebsData.map((item, i) => {

          const isClickable = !!item.link;

          return (
            <div
              className="celebs-item"
              key={i}
              onClick={() => {
                if (!isClickable) return;

                if (item.link.startsWith("http")) {
                  window.open(item.link, "_self");
                } else {
                  navigate(item.link);
                }
              }}
              style={{ cursor: isClickable ? "pointer" : "default" }}
            >
              <img src={item.img} alt="celebrity" />

              <div className="celebs-overlay">
                <span>{isClickable ? "Shop This Look" : "Shop Look"}</span>
              </div>
            </div>
          );

        })}

      </div>

    </section>
  );
};

export default Celebs;