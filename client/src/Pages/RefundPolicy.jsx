import React from "react";

const RefundPolicy = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-2xl font-bold mb-6 text-pink-600 sm:text-3xl">
          Refund Policy
        </h1>
        <p className="text-base text-gray-700 mb-6 sm:text-lg">
          We only exchange size within 10 working days. In case we are sold out, we'll exchange the piece.
          <br /><br />
          We don't do returns or cancel orders once placed.
          <br /><br />
          We don't exchange or return international orders.
          <br /><br />
          We don't exchange or refund reduced price articles.
          <br /><br />
          Customized pieces can't be exchanged.
        </p>
        <h2 className="text-xl font-medium text-gray-800 sm:text-2xl">
          Happy Shopping!!
        </h2>
      </div>
    </div>
  );
};

export default RefundPolicy;
