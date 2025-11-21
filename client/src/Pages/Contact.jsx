import React from "react";
import { Helmet } from "react-helmet";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Bud & Tulips | Customer Support, Orders & Business Enquiries</title>
        <meta
          name="description"
          content="Need help with your order or product? Contact Bud & Tulips via WhatsApp, email, or our contact form. We're here to assist with orders, sizing, and collaborations."
        />
        <link rel="canonical" href="https://budandtulips.com/contact-budandtulips" />

        {/* Open Graph */}
        <meta property="og:title" content="Contact Bud & Tulips | Jaipur Handcrafted Fashion Support" />
        <meta
          property="og:description"
          content="Reach out to Bud & Tulips for customer service, order help, sizing queries, or business collaborations."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://budandtulips.com/contact-budandtulips" />
        <meta property="og:image" content="https://budandtulips.com/images/contact-cover.jpg" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Bud & Tulips | Customer Assistance" />
        <meta
          name="twitter:description"
          content="Get in touch with Bud & Tulips for support regarding your order, products, or partnership opportunities."
        />
        <meta name="twitter:image" content="https://budandtulips.com/images/contact-cover.jpg" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact Bud & Tulips",
            "description": "Reach out to Bud & Tulips for customer support, product queries, and business collaborations.",
            "url": "https://budandtulips.com/contact-budandtulips",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+91-9485701666",
              "contactType": "customer service",
              "areaServed": "IN",
              "availableLanguage": ["English", "Hindi"]
            },
            "email": "budandtulip@gmail.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "M/S BALAJI CORPORATION, Bombay Wali Gali, Ratusaria Building",
              "addressLocality": "Sirsa",
              "addressRegion": "Haryana",
              "postalCode": "125055",
              "addressCountry": "IN"
            }
          })}
        </script>
      </Helmet>

      <div className="px-4 py-8 md:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-pink-600 mb-8">
            Contact Bud & Tulips
          </h1>
          <p className="text-center text-gray-700 max-w-2xl mx-auto mb-10 text-sm md:text-base">
            We’re here to help! Whether it's an order query, sizing assistance,
            custom request, or business collaboration — feel free to reach out.  
            Our team will get back to you as soon as possible.
          </p>

          <div className="flex flex-col space-y-6 md:flex-row md:space-y-0 md:space-x-8">

            {/* Left Section */}
            <div className="flex flex-col bg-pink-500 px-5 py-7 rounded-lg text-white md:w-1/3">
              <h2 className="text-lg font-semibold mb-4">WhatsApp Support</h2>
              <a
                href="https://wa.me/9485701666"
                className="flex items-center text-sm md:text-base mb-6 hover:underline"
                title="Chat with Bud & Tulips on WhatsApp"
              >
                <i className="fab fa-whatsapp text-xl mr-2"></i> 9485701666
              </a>

              <h2 className="text-lg font-semibold mb-4">Email Us</h2>
              <a
                href="mailto:budandtulip@gmail.com"
                className="flex items-center text-sm md:text-base mb-6 hover:underline"
              >
                <i className="far fa-envelope text-xl mr-2"></i> budandtulip@gmail.com
              </a>

              <h2 className="text-lg font-semibold mb-3">Office Location</h2>
              <p className="text-sm md:text-base">
                <i className="fas fa-building text-xl mr-2"></i>
                M/S BALAJI CORPORATION, Bombay Wali Gali,  
                Ratusaria Building, Sirsa-125055, Haryana, India.
              </p>
            </div>

            {/* Right Section */}
            <div className="bg-white px-5 py-7 rounded-lg shadow-md md:w-2/3">
              <h2 className="text-lg md:text-xl font-semibold mb-6 text-gray-800">
                Send Us a Message
              </h2>

              <form className="flex flex-col space-y-4 md:space-y-5">
                <div className="flex flex-col md:flex-row md:space-x-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-pink-500 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full mt-4 md:mt-0 px-4 py-2 border rounded-md focus:ring-2 focus:ring-pink-500 text-sm"
                  />
                </div>

                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-pink-500 text-sm"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-pink-500 text-sm"
                />

                <textarea
                  placeholder="Write your message…"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-pink-500 h-32 text-sm"
                ></textarea>

                <button
                  type="submit"
                  className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 text-sm"
                >
                  Submit
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;