import React from "react";

const Contact = () => {
  return (
    <div className="mx-4 md:mx-auto md:max-w-3xl my-10 md:my-20 text-center">
      <h1 className="font-semibold text-3xl md:text-4xl mb-4">Get in Touch</h1>
      <hr className="w-20 md:w-auto mx-auto border-2 border-pinkc" />
      <br />
      <div className="flex flex-col md:flex-row md:divide-x divide-pinkc">
        <div className="leftsection flex flex-col text-black bg-pinkc px-6 md:px-10 py-6 md:py-10 rounded-md text-left">
          <h1 className="text-lg md:text-2xl font-semibold mb-2">WhatsApp Us</h1>
          <a href="https://wa.link/10k71y" className="flex items-center text-lg md:text-2xl mb-4 md:mb-2">
            <i className="fab fa-whatsapp text-xl md:text-2xl mr-2"></i> +918268400090
          </a>
          <h1 className="text-lg md:text-2xl font-semibold mb-2">Email Address</h1>
          <a href="mailto:budandtulip@gmail.com" className="flex items-center text-lg md:text-2xl mb-4 md:mb-2">
            <i className="far fa-envelope text-xl md:text-2xl mr-2"></i> budandtulip@gmail.com
          </a>
          <h1 className="text-lg md:text-2xl font-semibold mb-2">Office Location</h1>
          <p className="text-lg md:text-xl max-w-full md:max-w-64">
            <i className="fas fa-building text-xl md:text-2xl mr-2"></i> M/S BALAJI CORPORATION, Bombay Wali Gali, Ratusaria Building, Sirsa-125055, Haryana, India.
          </p>
        </div>
        <div className="rightsection bg-white px-6 md:px-10 py-6 md:py-10 rounded-md shadow-md mt-6 md:mt-0">
          <h1 className="text-lg md:text-2xl font-semibold mb-4">Contact Me</h1>
          <form className="flex flex-col space-y-4">
            <div className="flex flex-col md:flex-row md:space-x-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-full md:w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pinkc"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full md:w-1/2 mt-4 md:mt-0 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pinkc"
              />
            </div>
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pinkc"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pinkc"
            />
            <textarea
              placeholder="Write your message..."
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pinkc h-32"
            ></textarea>
            <button
              type="submit"
              className="bg-pinkc text-white px-4 py-2 rounded-md hover:bg-blue-600"
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
