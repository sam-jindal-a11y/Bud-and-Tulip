import React from "react";
import { Helmet } from "react-helmet";

const RefundPolicy = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 sm:px-6 lg:px-8 bg-white">
      
      <Helmet>
        <title>Refund & Return Policy | Bud & Tulips</title>
        <meta
          name="description"
          content="Read Bud & Tulips' official Refund & Return Policy. Know about eligibility, size exchanges, non-returnable items, custom orders and international return rules."
        />
        <link rel="canonical" href="https://budandtulips.com/refund-and-return-policy-budandtulips" />
        <meta property="og:title" content="Refund & Return Policy | Bud & Tulips" />
        <meta
          property="og:description"
          content="Understand our refund, return and exchange guidelines including size exchanges, non-refundable items, and policies for international orders."
        />
        <meta property="og:type" content="website" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Refund & Return Policy - Bud & Tulips",
            "description":
              "Official refund and return policy of Bud & Tulips including size exchange, return restrictions, custom order rules, and international order guidelines.",
            "url": "https://budandtulips.com/refund-and-return-policy-budandtulips",
          })}
        </script>
      </Helmet>

      <div className="w-full max-w-3xl text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-pink-600 text-center">
          Refund & Return Policy
        </h1>

        <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
          At Bud & Tulips, every outfit is handcrafted with care. Since we create
          limited pieces and work with hand-embroidered designs, we follow a
          strict refund and return policy. Please read the guidelines carefully
          before placing an order.
        </p>

        <div className="space-y-6 text-gray-700 text-sm sm:text-base leading-relaxed">

          {/* Size Exchange */}
          <section>
            <h2 className="font-semibold text-lg text-gray-900">Size Exchange (India Only)</h2>
            <p>
              We offer a <strong>size exchange within 10 working days</strong> from the
              date of delivery. If the required size is unavailable, we will
              provide an alternative piece of similar value.
            </p>
          </section>

          {/* No Returns */}
          <section>
            <h2 className="font-semibold text-lg text-gray-900">No Returns or Order Cancellations</h2>
            <p>
              We do not accept product returns under any circumstances.  
              Orders once placed <strong>cannot be cancelled</strong> as each piece is
              made or prepared exclusively for you.
            </p>
          </section>

          {/* International */}
          <section>
            <h2 className="font-semibold text-lg text-gray-900">International Orders</h2>
            <p>
              We <strong>do not offer returns or exchanges</strong> on international
              orders due to cross-border logistics and customs limitations.
            </p>
          </section>

          {/* Reduced Price */}
          <section>
            <h2 className="font-semibold text-lg text-gray-900">Sale / Reduced Price Products</h2>
            <p>
              Discounted items, sale items, and reduced-price pieces are{" "}
              <strong>non-returnable and non-exchangeable</strong>.
            </p>
          </section>

          {/* Customized */}
          <section>
            <h2 className="font-semibold text-lg text-gray-900">Customized Orders</h2>
            <p>
              Any garment that has been customized as per your measurements,
              style request, or personalization cannot be exchanged or returned.
            </p>
          </section>

          {/* Condition */}
          <section>
            <h2 className="font-semibold text-lg text-gray-900">Product Condition for Exchange</h2>
            <p>
              For size exchange, items must be unused, unwashed, and in perfect
              condition with all tags attached. Worn or damaged items will not be
              eligible for exchange.
            </p>
          </section>

        </div>

        <h2 className="text-xl sm:text-2xl font-medium text-gray-800 mt-10 text-center">
          Happy Shopping!!
        </h2>
      </div>
    </div>
  );
};

export default RefundPolicy;