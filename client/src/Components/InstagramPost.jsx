import React, { useEffect, useRef } from "react";

const InstagramPost = ({ url }) => {
  const embedRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;

    script.onload = () => {
      if (window.instgrm) window.instgrm.Embeds.process();
    };

    document.body.appendChild(script);
  }, []);

  return (
    <div
      className="w-full overflow-hidden rounded-lg"
      style={{
        maxHeight: "350px",      
        height: "350px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <blockquote
        ref={embedRef}
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{
          width: "100%",
          maxWidth: "100%",
          margin: 0,
          padding: 0,
          border: 0,
          transform: "scale(0.75)",      
          transformOrigin: "top center",
        }}
      >
        <a href={url}>View this post on Instagram</a>
      </blockquote>
    </div>
  );
};

export default InstagramPost;
