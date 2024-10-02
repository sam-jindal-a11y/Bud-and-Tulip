import React from "react";

const ShippingPolicy = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white my-10 px-4 md:px-0">
      <div className="text-center mx-auto">
        <h1 className="text-xl md:text-2xl font-bold mb-4 text-pink-500">Shipping Policy</h1>
        <p className="text-sm md:text-base opacity-70">
          The order will take 5-18 working days to deliver. Free delivery within India.<br/><br/>
          In case of International order, it will take 20-25 working days to deliver.<br/><br/>
          We only exchange size within 10 working days; In case we are sold out, we'll exchange the piece. For exchange, please drop us a message at 9485701666 or DM us on Instagram.<br/><br/>
          We don't do returns or cancel orders once placed.<br/><br/>
          We don't exchange or return international orders.<br/><br/>
          We don't exchange or refund reduced price/sale articles.
        </p>
        <h1 className="font-medium text-xl md:text-2xl my-5">Happy Shopping!!</h1>
      </div>
    </div>
  );
};

export default ShippingPolicy;
