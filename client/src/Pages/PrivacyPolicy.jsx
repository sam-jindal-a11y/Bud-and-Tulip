import React from "react";
import { Helmet } from "react-helmet";

const PrivacyPolicy = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12">
      <Helmet>
        <title>Privacy Policy - Bud & Tulip</title>
        <meta
          name="description"
          content="Read Bud & Tulip's Privacy Policy. Learn how we collect, store, and use your personal and financial information to enhance your shopping experience."
        />
      </Helmet>

      <section className="w-full max-w-md text-center sm:max-w-lg sm:text-left">
        <h1 className="text-xl font-bold mb-4 text-gray-800 sm:text-2xl">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-700 mb-4 sm:text-base sm:leading-relaxed">
          Bud & Tulip collects personal information such as your name, age,
          phone number, and email to improve your shopping experience and
          communicate promotions, offers, and services tailored to your
          interests. Financial information and postal addresses can also be
          saved optionally for your convenience.
          <br />
          <br />
          We track your past purchases, product favorites, and website activity
          to enhance your experience. Additionally, website usage is monitored
          to analyze traffic and improve our services.
          <br />
          <br />
          Bud & Tulip may disclose personal information when required by law,
          court, or government authorities. We may also share limited
          information with our corporate family or contracted companies for
          security purposes and fraud prevention.
          <br />
          <br />
          <strong>All disputes</strong> are subject to{" "}
          <strong>Sirsa Jurisdiction</strong> only.
        </p>
      </section>
    </main>
  );
};

export default PrivacyPolicy;
