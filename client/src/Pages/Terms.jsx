import React from "react";
import { Helmet } from "react-helmet";

const Terms = () => {
  return (
    <main className="flex items-center justify-center min-h-screen py-10 bg-gray-50">
      <Helmet>
        <title>Terms & Conditions - Bud & Tulip</title>
        <meta
          name="description"
          content="Read Bud & Tulip's Terms & Conditions. Learn how we collect, store, and use your personal information to enhance your shopping experience."
        />
      </Helmet>

      <section className="w-full max-w-4xl mx-auto px-4 md:px-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-pink-600 text-center">
          Terms & Conditions
        </h1>

        <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center text-gray-800">
          We do not buy from the open market & traders
        </h2>

        <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
          Bud & Tulip collects your personal information for several purposes,
          primarily to improve your shopping experience and provide promotions,
          offers, and services tailored to your interests. This may include
          details such as your name, age, phone number, and email that you
          provide when saving your details on our website. Financial information
          and postal addresses are optional.
        </p>

        <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
          We also store information about your past purchases, product
          favorites, and other relevant data to enhance your shopping
          experience. Website usage is monitored to analyze traffic and improve
          the platform.
        </p>

        <p className="text-sm md:text-base text-gray-700 leading-relaxed">
          Bud & Tulip may disclose personal information when required by law,
          court, or government authorities. Limited information may also be
          shared with our corporate family and contracted companies to prevent
          unauthorized use of cards and ensure security.
        </p>
      </section>
    </main>
  );
};

export default Terms;
