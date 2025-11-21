import React from "react";
import { Helmet } from "react-helmet";

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Bud & Tulip – Data Protection & User Safety</title>
        <meta
          name="description"
          content="Read Bud & Tulip’s Privacy Policy to know how we collect, use, and protect your personal information while ensuring a safe shopping experience."
        />
        <link rel="canonical" href="https://budandtulips.com/privacy-policy-budandtulips" />

        <meta property="og:title" content="Privacy Policy | Bud & Tulip" />
        <meta property="og:description" content="Learn how Bud & Tulip protects your personal data and ensures safe, secure shopping and browsing." />
        <meta property="og:url" content="https://budandtulips.com/privacy-policy-budandtulips" />
        <meta property="og:type" content="website" />

        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "PrivacyPolicy",
            "name": "Bud & Tulip Privacy Policy",
            "url": "https://budandtulips.com/privacy-policy-budandtulips",
            "description": "Bud & Tulip explains how customer information is collected, stored, and used to offer a safe and personalized shopping experience."
          }
        `}</script>
      </Helmet>

      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-10 sm:px-6 lg:px-8 bg-white">
        <div className="w-full max-w-3xl text-left">
          <h1 className="text-3xl font-bold mb-6 text-pink-600 text-center">
            Privacy Policy
          </h1>

          <p className="text-gray-700 text-base leading-relaxed mb-6">
            At Bud & Tulip, we value your trust and are committed to protecting
            your privacy. This Privacy Policy explains how we collect, use,
            store, and safeguard your personal information when you visit or make
            a purchase from our website – <strong>www.budandtulips.com</strong>.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            1. Information We Collect
          </h2>
          <p className="text-gray-700 text-base leading-relaxed mb-6">
            We collect personal information to improve your shopping experience,
            communicate effectively, and process your orders smoothly. This may
            include:
          </p>
          <ul className="list-disc ml-6 text-gray-700 mb-6 leading-relaxed">
            <li>Name, age, gender</li>
            <li>Email address and phone number</li>
            <li>Billing and shipping address</li>
            <li>Payment information (securely processed)</li>
            <li>Order history and saved preferences</li>
            <li>Device and browsing information (cookies, IP, pages visited)</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            2. How We Use Your Information
          </h2>
          <p className="text-gray-700 text-base leading-relaxed mb-6">
            Your information helps us provide a better, personalized experience.
            We may use it for:
          </p>
          <ul className="list-disc ml-6 text-gray-700 mb-6 leading-relaxed">
            <li>Processing orders and delivering products</li>
            <li>Customer support and communication</li>
            <li>Sending promotions, offers, and updates (only if you opt-in)</li>
            <li>Improving website performance and user experience</li>
            <li>Preventing unauthorized or fraudulent transactions</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            3. Sharing of Personal Information
          </h2>
          <p className="text-gray-700 text-base leading-relaxed mb-6">
            Bud & Tulip does not sell or trade your personal information. We only
            share information with:
          </p>
          <ul className="list-disc ml-6 text-gray-700 mb-6 leading-relaxed">
            <li>Trusted service providers (shipping partners, payment gateways)</li>
            <li>Legal authorities when required by law or court order</li>
            <li>Fraud prevention agencies for secure transactions</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            4. Cookies & Website Tracking
          </h2>
          <p className="text-gray-700 text-base leading-relaxed mb-6">
            We use cookies to analyze website traffic, save your preferences, and
            enhance your browsing experience. You can disable cookies in your
            browser settings anytime.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            5. Data Security
          </h2>
          <p className="text-gray-700 text-base leading-relaxed mb-6">
            We follow strict security measures to protect your personal data from
            unauthorized access, misuse, or alteration. All payment-related
            information is encrypted and handled via secure payment gateways.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            6. Third-Party Links
          </h2>
          <p className="text-gray-700 text-base leading-relaxed mb-6">
            Our website may contain links to external sites. We are not
            responsible for their privacy practices or content. We advise you to
            review their policies before sharing any information.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            7. Updates to This Policy
          </h2>
          <p className="text-gray-700 text-base leading-relaxed mb-6">
            Bud & Tulip may update this Privacy Policy occasionally. Any changes
            will be reflected on this page with an updated “Last Modified” date.
          </p>

          <p className="text-gray-700 text-base leading-relaxed mt-6">
            <strong>All disputes</strong> are subject to{" "}
            <strong>Sirsa Jurisdiction</strong> only.
          </p>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;