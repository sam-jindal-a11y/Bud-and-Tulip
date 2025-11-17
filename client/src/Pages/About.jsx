import React from "react";
import { Helmet } from "react-helmet";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Bud & Tulip | Handcrafted Clothing from Jaipur</title>
        <meta
          name="description"
          content="Learn about Bud & Tulip — a Jaipur-based clothing brand offering hand-embroidered, easy-breezy fashion from XXS to 10XL."
        />
        <link rel="canonical" href="https://budandtulips.com/about" />
        <meta
          property="og:title"
          content="About Bud & Tulip | Handcrafted Clothing from Jaipur"
        />
        <meta
          property="og:description"
          content="Discover the story behind Bud & Tulip — inspired by Jaipur, offering unique prints and beautiful hand embroidery."
        />
        <meta property="og:url" content="https://budandtulips.com/about" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://budandtulips.com/images/about-cover.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Bud & Tulip",
            "url": "https://budandtulips.com",
            "logo": "https://budandtulips.com/logo.png",
            "sameAs": [
              "https://www.instagram.com/budandtulips",
              "https://www.facebook.com/budandtulips"
            ],
            "description": "A Jaipur-based handcrafted fashion brand offering breezy, embroidered clothing for all sizes (XXS to 10XL)."
          }
        `}</script>
      </Helmet>

      <main className="flex flex-col items-center justify-center min-h-screen px-4 py-6 bg-white">
        <div className="w-full max-w-2xl text-center sm:text-left">
          <h1 className="text-2xl font-bold mb-4 text-pink-600 sm:text-3xl">
            About Bud & Tulip – Handcrafted Clothing Label from Jaipur
          </h1>
          <p className="text-base text-gray-700 mb-4 sm:text-lg sm:leading-relaxed">
            Bud & Tulip is an everyday easy breezy, fuss-free clothing label
            rooted in and inspired by Jaipur. We at Bud & Tulip believe in
            providing the best fabrics, unique prints, and beautiful hand
            embroidered details. Our team creates silhouettes that can be worn
            by XXS to 10XL. Hope you love your Bud & Tulip garments.
          </p>
          <h2 className="text-xl font-medium text-gray-800 sm:text-2xl">
            Happy Shopping!!
          </h2>
        </div>
      </main>
    </>
  );
};

export default About;
