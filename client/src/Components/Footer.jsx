import React from "react";
import { Link } from "react-router-dom";
import InstagramPost from "./InstagramPost";

const Footer = () => {
  const instagramUrl = "https://www.instagram.com/p/C8tG6_wSdYc/";

  return (
    <div className="w-full footer px-4 md:px-20 flex flex-col py-10 bg-greyc text-white">
      <div className="flex flex-col md:flex-row justify-between footer-div">
        {/* About Us Section */}
        <div className="about mb-6 md:mr-20">
          <h3 className="font-semibold text-lg">About Us</h3>
          <hr className="my-2" />
          <p className="text-sm">
            Bud & Tulip is an everyday easy breezy, fuss free clothing label
            having its manufacturing rooted in and inspired from Jaipur. We at
            Bud & Tulip believe in providing the best fabrics, unique prints,
            and beautiful hand-embroidered details. Our team creates silhouettes
            that can be worn by XXS to 5XL. Hope you love your Bud & Tulip
            garments. Happy Shopping!
          </p>

          {/* Contact Details */}
          <div className="mt-3 text-sm">
            <p>
              <i className="fab fa-whatsapp text-xl mr-2"></i>
              <span className="font-semibold">WhatsApp:</span> 9485701666
            </p>

            <p className="mt-2">
              <i className="fas fa-envelope text-lg mr-2"></i>
              <span className="font-semibold">Email:</span> budandtulip@gmail.com
            </p>

            <p className="mt-2">
              <i className="fas fa-map-marker-alt text-lg mr-2"></i>
              <span className="font-semibold">Office:</span><br />
              M/S BALAJI CORPORATION, Bombay Wali Gali,
              Ratusaria Building, Sirsa-125055, Haryana, India.
            </p>
          </div>
        </div>


        {/* My Account Section */}

        <div className="account mb-6 md:mr-20">
          <h3 className="font-semibold text-lg">My Account</h3>
          <hr className="my-3" />
          <div className="flex flex-wrap gap-2">
            <Link to="/Account" className="hover:text-pinkc">My Account</Link>
            <Link to="/ShoppingCart" className="hover:text-pinkc">Shopping Cart</Link>
            <Link to="/Wishlist" className="hover:text-pinkc">Wishlist</Link>
            <div className="w-full"></div>
            <Link to="/Login" className="hover:text-pinkc">Login</Link>
            <Link to="/privacyPolicy" className="hover:text-pinkc">Privacy Policy</Link>
            <Link to="/shippingPolicy" className="hover:text-pinkc">Shipping Policy</Link>
            <Link to="/Refund" className="hover:text-pinkc">Refund Policy</Link>
            <Link to="/terms" className="hover:text-pinkc">Terms & Conditions</Link>
          </div>
        </div>


        {/* Categories Section */}
        <div className="categories mb-6 md:mr-20">
          <h3 className="font-semibold text-lg">Categories</h3>
          <hr className="my-2" />
          {["All Products", "Sale", "Suits", "Loungewear", "Co-ords", "Dresses", "Saree", "Kurtas", "Tops", "Blazer", "Skirt Sets", "Shirts"].map((cat) => (
            <Link key={cat} to={`/search?query=&category=${encodeURIComponent(cat)}`} className="block mb-1">
              {cat}
            </Link>
          ))}
        </div>

        {/* Instagram Section */}
        <div className="bg-white rounded p-2 w-full overflow-hidden flex justify-center">
          <InstagramPost url={instagramUrl} />
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="nav2 mt-8">
        <p className="font-semibold text-sm text-center md:text-left text-white">
          Copyright © {new Date().getFullYear()} Bud & Tulip. All Rights Reserved. Developed by Soft Coders
        </p>
      </div>
    </div>
  );
};

export default Footer;