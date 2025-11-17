import React from "react";
import { Helmet } from "react-helmet";

const ShippingPolicy = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white my-10 px-4 md:px-0">
      <Helmet>
        <title>Shipping & Exchange Policy | Bud & Tulips</title>
        <meta
          name="description"
          content="Learn about Bud & Tulips' shipping policy, delivery timelines, and exchange procedures for domestic and international orders."
        />
        <link rel="canonical" href="https://budandtulips.com/shipping-policy" />
        <meta
          property="og:title"
          content="Shipping & Exchange Policy | Bud & Tulips"
        />
        <meta
          property="og:description"
          content="Know our shipping timelines and exchange policy. Free delivery in India. Easy size exchange within 10 days."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://budandtulips.com/shipping-policy"
        />
        <meta property="og:site_name" content="Bud & Tulips" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Shipping & Exchange Policy | Bud & Tulips",
            description:
              "Learn about Bud & Tulips' shipping policy, delivery timelines, and exchange procedures for domestic and international orders.",
            url: "https://budandtulips.com/shipping-policy",
            publisher: {
              "@type": "Organization",
              name: "Bud & Tulips",
              url: "https://budandtulips.com",
              logo: "https://budandtulips.com/logo.png",
            },
          })}
        </script>
      </Helmet>

      <div className="text-center mx-auto max-w-3xl">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-pink-500">
          Shipping & Exchange Policy
        </h1>

        <section className="text-left text-gray-700 text-sm md:text-base leading-relaxed space-y-4">
          <h2 className="font-semibold text-lg text-gray-900">
            Domestic Shipping
          </h2>
          <p>
            Orders within India will be delivered within{" "}
            <strong>5–18 working days</strong>. We offer{" "}
            <strong>free delivery</strong> on all domestic orders.
          </p>

          <h2 className="font-semibold text-lg text-gray-900">
            International Shipping
          </h2>
          <p>
            For international orders, delivery takes approximately{" "}
            <strong>20–25 working days</strong>. Shipping costs and customs
            duties (if any) are the responsibility of the customer.
          </p>

          <h2 className="font-semibold text-lg text-gray-900">
            Exchange Policy
          </h2>
          <p>
            We allow <strong>size exchange within 10 working days</strong>. In
            case the item is sold out, we’ll offer a replacement piece. To
            initiate an exchange, message us on WhatsApp at{" "}
            <a
              href="https://wa.me/9485701666"
              className="text-pink-600 underline"
            >
              9485701666
            </a>{" "}
            or DM us on Instagram.
          </p>

          <h2 className="font-semibold text-lg text-gray-900">
            Returns & Cancellations
          </h2>
          <p>
            We do not accept returns or cancellations once an order has been
            placed. Sale or reduced-price items are{" "}
            <strong>non-exchangeable and non-refundable</strong>.
          </p>

          <h2 className="font-semibold text-lg text-gray-900">
            International Exchange
          </h2>
          <p>
            We do not exchange or return international orders due to high
            customs and logistics costs.
          </p>
        </section>

        <h3 className="font-medium text-xl md:text-2xl mt-10 text-pink-500">
          Happy Shopping!!
        </h3>
      </div>
    </div>
  );
};

export default ShippingPolicy;
