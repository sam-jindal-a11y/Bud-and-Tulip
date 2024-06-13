import React from "react";

const Contact = () => {
  return (
    <div className="mx-36 my-20 text-center">
      <h1 className="font-semibold text-4xl mb-4">Get in Touch</h1>
      <hr />
      <br />
      <div className="flex flex-row divsimp">
        <div className="leftsection flex flex-col text-black bg-pinkc px-10 py-10 rounded-md text-left">
        <h1 className="text-2xl font-semibold mb-2">WhatsApp Us</h1>
        <a href="https://wa.link/10k71y"><i class="fa-brands fa-whatsapp text-2xl"></i>  &nbsp;+918268400090</a>
        <br />
        <h1 className="text-2xl font-semibold mb-2">Email Address</h1>
        <a href=""><i class="fa-regular fa-envelope text-2xl"></i>  &nbsp;budandtulip@gmail.com</a>
        <br />
        <h1 className="text-2xl font-semibold mb-2">Office Location</h1>
        <p className="max-w-64"><i class="fa-solid fa-building text-2xl"></i>  &nbsp;M/S BALAJI CORPORATION, Bombay Wali Gali, Ratusaria Building,
          Sirsa-125055, Haryana, India.
        </p>
      </div>
      <div className="rightsection bg-white px-10 py-10 rounded-md  shadow-md">
          <h1 className="text-2xl font-semibold mb-4">Contact Me</h1>
          <form className="flex flex-col space-y-4">
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pinkc"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pinkc"
              />
            </div>
            <input
              type="text"
              placeholder="Phone Number"
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pinkc"
            />
            <input
              type="email"
              placeholder="Email"
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pinkc"
            />
            <textarea
              placeholder="Write your message..."
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pinkc h-32"
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
