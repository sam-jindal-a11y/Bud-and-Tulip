import React from "react";
import { Helmet } from "react-helmet";

const ShippingPolicy = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white my-10 px-4 md:px-0">
      <Helmet>
        <title>Shipping & Exchange Policy | Bud & Tulips</title>
        <meta
          name="description"
          content="Detailed Shipping & Exchange Policy of Bud & Tulips. Check delivery timelines, shipping charges, domestic & international shipping, return rules and exchange guidelines."
        />
        <link rel="canonical" href="https://budandtulips.com/shipping-and-exchange-policy-budandtulips" />

        <meta property="og:title" content="Shipping & Exchange Policy | Bud & Tulips" />
        <meta
          property="og:description"
          content="Know Bud & Tulips' shipping timelines, dispatch process, size exchange rules and international delivery guidelines."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://budandtulips.com/shipping-and-exchange-policy-budandtulips" />
        <meta property="og:site_name" content="Bud & Tulips" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Shipping & Exchange Policy - Bud & Tulips",
            "description":
              "Official shipping & exchange policy page of Bud & Tulips including domestic delivery, international shipping, dispatch timeline, returns & cancellations.",
            "url": "https://budandtulips.com/shipping-and-exchange-policy-budandtulips",
            "publisher": {
              "@type": "Organization",
              "name": "Bud & Tulips",
              "logo": "https://budandtulips.com/logo.png",
            },
          })}
        </script>
      </Helmet>

      <div className="text-center mx-auto max-w-3xl">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-pink-500">
          Shipping & Exchange Policy
        </h1>

        <section className="text-left text-gray-700 text-sm md:text-base leading-relaxed space-y-5">
          <p>
            At Bud & Tulips, we aim to deliver a smooth and hassle-free shopping experience to our customers. Below you’ll find complete details regarding our domestic and international shipping timelines, replacement policies, and exchange procedures.
          </p>

          {/* Domestic Shipping */}
          <h2 className="font-semibold text-lg text-gray-900">Domestic Shipping (India)</h2>
          <p>
            All orders within India are delivered within <strong>5–18 working days</strong>.  
            We offer <strong>free delivery</strong> across India without any minimum order value.
          </p>
          <p>
            Each order is quality checked, packed carefully, and dispatched through trusted courier partners.
          </p>

          {/* Dispatch Time */}
          <h2 className="font-semibold text-lg text-gray-900">Order Processing & Dispatch Time</h2>
          <p>
            Your order is processed within <strong>1–3 working days</strong>.  
            During sale periods or festive seasons, dispatch may take slightly longer.
          </p>

          {/* International Shipping */}
          <h2 className="font-semibold text-lg text-gray-900">International Shipping</h2>
          <p>
            We ship worldwide! International deliveries take around  
            <strong>20–25 working days</strong>.
          </p>
          <p>
            Shipping charges, import duties, and customs fees (if applicable) must be paid by the customer.
          </p>

          {/* Exchange Policy */}
          <h2 className="font-semibold text-lg text-gray-900">Exchange Policy (India Only)</h2>
          <p>
            We offer a <strong>size exchange within 10 working days</strong> of delivery.  
            If the same size or product is unavailable, we provide an alternative product.
          </p>
          <p>
            To request an exchange, message us on WhatsApp:{" "}
            <a href="https://wa.me/9485701666" className="text-pink-600 underline">
              9485701666
            </a>
            {" "}or DM us on Instagram.
          </p>

          {/* Returns */}
          <h2 className="font-semibold text-lg text-gray-900">Returns & Cancellations</h2>
          <p>
            We do not accept returns or cancellations once an order is placed as each piece is handcrafted specially for you.
          </p>
          <p>
            Sale/discounted products are <strong>non-returnable & non-exchangeable</strong>.
          </p>

          {/* International Exchange */}
          <h2 className="font-semibold text-lg text-gray-900">International Exchange & Returns</h2>
          <p>
            Due to high customs and international logistics charges, we do not offer exchanges or returns on international orders.
          </p>

          {/* Additional Notes */}
          <h2 className="font-semibold text-lg text-gray-900">Additional Information</h2>
          <ul className="list-disc ml-5 space-y-2">
            <li>Ensure your address and contact details are correct during checkout.</li>
            <li>If a shipment is undelivered due to incorrect address, reshipping charges apply.</li>
            <li>We are not responsible for delays caused due to weather or courier issues.</li>
          </ul>
        </section>

        <h3 className="font-medium text-xl md:text-2xl mt-10 text-pink-500">
          Happy Shopping!!
        </h3>
      </div>
    </div>
  );
};

export default ShippingPolicy;