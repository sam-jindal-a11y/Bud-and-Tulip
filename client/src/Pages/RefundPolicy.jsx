import React from "react";
import { Helmet } from "react-helmet";

const RefundPolicy = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <Helmet>
        <title>Refund Policy - Bud & Tulip</title>
        <meta
          name="description"
          content="Read Bud & Tulip's Refund Policy. Learn about our exchange and refund rules for domestic and international orders, customized pieces, and sale items."
        />
      </Helmet>

      <section className="w-full max-w-2xl text-center">
        <h1 className="text-2xl font-bold mb-6 text-pink-600 sm:text-3xl">
          Refund Policy
        </h1>

        <p className="text-base text-gray-700 mb-6 sm:text-lg sm:leading-relaxed">
          We only exchange sizes within 10 working days. If the requested size
          is sold out, we will exchange it with a similar piece.
          <br />
          <br />
          Please note:
          <ul className="list-disc list-inside text-left mt-2">
            <li>We do not accept returns or cancel orders once placed.</li>
            <li>International orders cannot be exchanged or returned.</li>
            <li>
              Reduced-price articles are non-exchangeable and non-refundable.
            </li>
            <li>Customized pieces cannot be exchanged.</li>
          </ul>
          <br />
          Thank you for shopping with us!
        </p>

        <h2 className="text-xl font-medium text-gray-800 sm:text-2xl">
          Happy Shopping!
        </h2>
      </section>
    </main>
  );
};

export default RefundPolicy;
