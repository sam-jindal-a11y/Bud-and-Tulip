import React from "react";

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-6 bg-white">
      <div className="w-full max-w-2xl text-center sm:text-left">
        <h1 className="text-2xl font-bold mb-4 text-pink-600 sm:text-3xl">
          Bud & Tulip
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
    </div>
  );
};

export default About;
