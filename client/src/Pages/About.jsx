import React from "react";
import { Helmet } from "react-helmet";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Bud & Tulip | Handcrafted Women’s Clothing from Jaipur</title>
        <meta
          name="description"
          content="Bud & Tulip is a Jaipur-based handcrafted fashion brand offering breezy silhouettes, unique prints and detailed hand embroidery. Sizes available from XXS to 10XL."
        />
        <link rel="canonical" href="https://budandtulips.com/about-bud-and-tulip" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="About Bud & Tulip | Jaipur Handcrafted Clothing Brand" />
        <meta property="og:description" content="Learn about Bud & Tulip — a fashion label inspired by Jaipur, offering handcrafted clothing with beautiful prints and embroidery in all sizes." />
        <meta property="og:url" content="https://budandtulips.com/about-bud-and-tulip" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://budandtulips.com/images/about-cover.jpg" />

        <meta name="twitter:card" content="summary_large_image" />

        {/* Schema Markup */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "FashionBrand",
            "name": "Bud & Tulip",
            "url": "https://budandtulips.com",
            "logo": "https://budandtulips.com/logo.png",
            "description": "A Jaipur-based handcrafted fashion brand offering breezy embroidered outfits and inclusive sizes (XXS to 10XL).",
            "sameAs": [
              "https://www.instagram.com/budandtulips",
              "https://www.facebook.com/budandtulips"
            ]
          }
        `}</script>
      </Helmet>

      <main className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-white">
        <div className="w-full max-w-3xl text-center sm:text-left">
          <h1 className="text-3xl font-bold mb-6 text-pink-600 sm:text-4xl">
            About Bud & Tulip – Handcrafted Clothing from Jaipur
          </h1>

          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Bud & Tulip is more than just a clothing label — it is a celebration
            of comfort, craftsmanship, and creativity. Rooted in the vibrant
            culture of Jaipur, our brand focuses on creating everyday
            easy-breezy outfits that women love to wear. From breathable fabrics
            to delicate hand-embroidered detailing, every piece is crafted with
            care and passion.
          </p>

          <h2 className="text-2xl font-semibold mb-3 text-gray-900">
            ✨ Our Inspiration
          </h2>
          <p className="text-base text-gray-700 mb-6 leading-relaxed">
            Jaipur’s heritage, architecture, and artistic charm inspire our
            prints, colours, and silhouettes. Each design reflects elegance,
            comfort, and timeless beauty. Our artisans and designers work
            together to bring modern styles infused with traditional techniques.
          </p>

          <h2 className="text-2xl font-semibold mb-3 text-gray-900">
            ❤ Size Inclusivity (XXS to 10XL)
          </h2>
          <p className="text-base text-gray-700 mb-6 leading-relaxed">
            At Bud & Tulip, we believe fashion should be for everyone.
            That’s why we proudly offer sizes from XXS to 10XL. Our patterns are
            thoughtfully created to ensure perfect fits across all body types.
          </p>

          <h2 className="text-2xl font-semibold mb-3 text-gray-900">
            🌸 What Makes Us Special?
          </h2>
          <ul className="list-disc ml-6 text-gray-700 leading-relaxed text-base mb-6">
            <li>Handcrafted embroidery</li>
            <li>Soft, breathable fabrics</li>
            <li>Exclusive prints inspired by Jaipur</li>
            <li>Comfort-first silhouettes</li>
            <li>Wide and inclusive size range</li>
            <li>Ethically crafted garments</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-3 text-gray-900">
            🌿 Our Promise
          </h2>
          <p className="text-base text-gray-700 mb-8 leading-relaxed">
            Every Bud & Tulip outfit is thoughtfully designed to bring comfort,
            confidence, and joy to your everyday wardrobe. Whether you love
            breathable cottons, playful prints, or handcrafted details — we have
            something special waiting for you.
          </p>

          <h2 className="text-xl font-medium text-gray-800 text-center sm:text-2xl">
            Happy Shopping!  
          </h2>
        </div>
      </main>
    </>
  );
};

export default About;