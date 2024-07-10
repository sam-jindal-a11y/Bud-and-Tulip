import React from "react";

const Contact = () => {
  return (
    <div className="mx-4 md:mx-auto md:max-w-3xl my-10 md:my-10">
    
      <div className="flex flex-col md:flex-row md:space-x-8">
        <div className="leftsection flex flex-col text-gray-800 bg-pinkc px-6 md:px-10 py-6 md:py-10 rounded-md text-left">
          <h2 className="text-md md:text-xl font-medium mb-4">WhatsApp Us</h2>
          <a href="https://wa.me/9485701666" className="flex items-center text-md md:text-xl mb-6 text-black-700 hover:underline">
            <i className="fab fa-whatsapp text-xl mr-2"></i> 9485701666
          </a>
          <h2 className="text-md md:text-xl font-medium mb-4">Email Address</h2>
          <a href="mailto:budandtulip@gmail.com" className="flex items-center text-md md:text-xl mb-6 text-black-700 hover:underline">
            <i className="far fa-envelope text-xl mr-2"></i> budandtulip@gmail.com
          </a>
          <h2 className="text-md md:text-xl font-medium mb-4">Office Location</h2>
          <p className="text-md md:text-lg">
            <i className="fas fa-building text-xl mr-2"></i> M/S BALAJI CORPORATION, Bombay Wali Gali, Ratusaria Building, Sirsa-125055, Haryana, India.
          </p>
        </div>
        <div className="rightsection bg-white px-6 md:px-10 py-6 md:py-10 rounded-md shadow-md mt-6 md:mt-0">
          <h2 className="text-md md:text-xl font-medium mb-6 text-gray-800">Contact Me</h2>
          <form className="flex flex-col space-y-6">
            <div className="flex flex-col md:flex-row md:space-x-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-full md:w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full md:w-1/2 mt-4 md:mt-0 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
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
  );
};

export default Contact;
