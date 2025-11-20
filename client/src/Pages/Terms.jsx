import React from "react";
import { Helmet } from "react-helmet";

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions | Bud & Tulip – User Agreement & Policies</title>
        <meta
          name="description"
          content="Read the Terms & Conditions of Bud & Tulip. Learn about user responsibilities, policies, payments, data usage, disputes, and our commitment to safe shopping."
        />
        <link rel="canonical" href="https://budandtulips.com/terms-and-conditions-budandtulips" />

        <meta property="og:title" content="Terms & Conditions | Bud & Tulip" />
        <meta
          property="og:description"
          content="Review Bud & Tulip's Terms & Conditions including policies for website use, data privacy, purchases, and dispute resolution."
        />
        <meta property="og:url" content="https://budandtulips.com/terms-and-conditions-budandtulips" />
        <meta property="og:type" content="website" />

        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Terms and Conditions - Bud & Tulip",
            "url": "https://budandtulips.com/terms-and-conditions-budandtulips",
            "description": "Full Terms and Conditions for using Bud & Tulip's e-commerce website."
          }
        `}</script>
      </Helmet>

      <div className="flex items-center justify-center min-h-screen py-10 bg-gray-50">
        <div className="w-full max-w-4xl mx-auto px-4 md:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-pink-600 text-center">
            Terms & Conditions
          </h1>

          <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center">
            We do not buy from the open market or traders.  
            We create our own handcrafted pieces.
          </h2>

          <p className="text-gray-700 text-base leading-relaxed mb-6">
            Welcome to <strong>www.budandtulips.com</strong>. By accessing or using our website,
            you agree to comply with the Terms & Conditions stated below. Please
            read them carefully before engaging with our services.
          </p>

          {/* Section 1 */}
          <h3 className="text-lg md:text-xl font-semibold mb-2">1. Personal Information Collection</h3>
          <p className="text-gray-700 text-base leading-relaxed mb-6">
            Bud & Tulip collects general information to enhance your shopping
            experience and provide personalized services including promotions,
            offers, and updates. The information collected may include:
          </p>
          <ul className="list-disc ml-6 text-gray-700 mb-6 leading-relaxed">
            <li>Name, age, and gender</li>
            <li>Email address and phone number</li>
            <li>Shipping and billing address</li>
            <li>Financial information (processed securely)</li>
            <li>Order history and saved favorites</li>
            <li>Device data such as IP address, browser details, and browsing behavior</li>
          </ul>

          {/* Section 2 */}
          <h3 className="text-lg md:text-xl font-semibold mb-2">2. Use of Information</h3>
          <p className="text-gray-700 text-base leading-relaxed mb-6">
            Your information helps us:
          </p>
          <ul className="list-disc ml-6 text-gray-700 mb-6 leading-relaxed">
            <li>Process and deliver your orders efficiently</li>
            <li>Improve website functionality and user experience</li>
            <li>Provide personalized product recommendations</li>
            <li>Send promotional messages (only if opted-in)</li>
            <li>Prevent fraudulent or unauthorized transactions</li>
          </ul>

          {/* Section 3 */}
          <h3 className="text-lg md:text-xl font-semibold mb-2">3. Disclosure of Information</h3>
          <p className="text-gray-700 text-base leading-relaxed mb-6">
            We may disclose personal information under the following circumstances:
          </p>
          <ul className="list-disc ml-6 text-gray-700 mb-6 leading-relaxed">
            <li>When required by law, court order, or government authority</li>
            <li>To trusted partners such as payment gateways, courier services, and IT support</li>
            <li>To prevent unauthorized use of cards and fraudulent purchases</li>
          </ul>

          {/* Section 4 */}
          <h3 className="text-lg md:text-xl font-semibold mb-2">4. Product & Service Authenticity</h3>
          <p className="text-gray-700 text-base leading-relaxed mb-6">
            Bud & Tulip designs and manufactures its own products. We do not buy
            from open markets, wholesalers, or traders. Every product is
            handcrafted with quality materials and careful workmanship.
          </p>

          {/* Section 5 */}
          <h3 className="text-lg md:text-xl font-semibold mb-2">5. Limitation of Liability</h3>
          <p className="text-gray-700 text-base leading-relaxed mb-6">
            We strive to maintain accurate information on our website, but we do
            not guarantee that product descriptions, pricing, or availability
            details are always error-free. Bud & Tulip shall not be held liable
            for any incidental, indirect, or consequential damages resulting
            from website usage.
          </p>

          {/* Section 6 */}
          <h3 className="text-lg md:text-xl font-semibold mb-2">6. Modifications to Terms</h3>
          <p className="text-gray-700 text-base leading-relaxed mb-6">
            Bud & Tulip reserves the right to update or modify these Terms &
            Conditions at any time. Changes will be posted on this page, and
            continued use of the website indicates acceptance of the updated terms.
          </p>

          {/* Section 7 */}
          <h3 className="text-lg md:text-xl font-semibold mb-2">7. Jurisdiction</h3>
          <p className="text-gray-700 text-base leading-relaxed mb-6">
            All disputes arising from the use of this website are subject to{" "}
            <strong>Sirsa Jurisdiction</strong> only.
          </p>
        </div>
      </div>
    </>
  );
};

export default Terms;