import React from "react";

const Contact = () => {
  return (
    <div className="px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-10 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row md:space-x-8">
          <div className="leftsection flex flex-col bg-pink-500 px-4 py-6 rounded-md text-left text-white md:px-6 md:py-8 md:text-gray-800">
            <h2 className="text-lg font-medium mb-4 md:text-xl">WhatsApp Us</h2>
            <a href="https://wa.me/9485701666" className="flex items-center text-sm md:text-base mb-4 hover:underline">
              <i className="fab fa-whatsapp text-xl mr-2"></i> 9485701666
            </a>
            <h2 className="text-lg font-medium mb-4 md:text-xl">Email Address</h2>
            <a href="mailto:budandtulip@gmail.com" className="flex items-center text-sm md:text-base mb-4 hover:underline">
              <i className="far fa-envelope text-xl mr-2"></i> budandtulip@gmail.com
            </a>
            <h2 className="text-lg font-medium mb-4 md:text-xl">Office Location</h2>
            <p className="text-sm md:text-base">
              <i className="fas fa-building text-xl mr-2"></i> M/S BALAJI CORPORATION, Bombay Wali Gali, Ratusaria Building, Sirsa-125055, Haryana, India.
            </p>
          </div>
          <div className="rightsection bg-white px-4 py-6 rounded-md shadow-md md:px-6 md:py-8">
            <h2 className="text-lg font-medium mb-6 text-gray-800 md:text-xl">Contact Me</h2>
            <form className="flex flex-col space-y-4 md:space-y-6">
              <div className="flex flex-col md:flex-row md:space-x-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full mt-4 md:mt-0 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <textarea
                placeholder="Write your message..."
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 text-sm"
              ></textarea>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 text-sm"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
