import React from "react";
import { Link } from "react-router-dom";
import InstagramPost from "./InstagramPost";


const Footer = () => {
  return (
    <div className="w-full footer px-4 md:px-20 flex text-white flex-col py-10 bg-greyc">
      <div className="flex flex-col md:flex-row justify-between footer-div">
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
        </div>
        <div className="account mb-6 md:mr-20">
          <h3 className="font-semibold text-lg">My Account</h3>
          <hr className="my-2" />
          <Link to="/Account" className="block mb-2 hover:text-pinkc">
            My Account
          </Link>
          <Link to="/ShoppingCart" className="block mb-2 hover:text-pinkc">
            Shopping Cart
          </Link>
          <Link to="/Wishlist" className="block mb-2 hover:text-pinkc">
            Wishlist
          </Link>
          <Link to="/Login" className="block mb-2 hover:text-pinkc">
            Login
          </Link>
          <Link to="/privacyPolicy" className="block mb-2 hover:text-pinkc">
            Privacy Policy
          </Link>
          <Link to="/shippingPolicy" className="block mb-2 hover:text-pinkc">
            Shipping Policy
          </Link>
          <Link to="/Refund" className="block mb-2 hover:text-pinkc">
            Refund Policy
          </Link>
          <Link to="/terms" className="block mb-2 hover:text-pinkc">
            Terms & Conditions
          </Link>
        </div>
        <div className="categories mb-6 md:mr-20">
          <h3 className="font-semibold text-lg">Categories</h3>
          <hr className="my-2" />
          <Link
            to="/search?query=&category=All%20Products"
            className="block mb-1"
          >
            All Products
          </Link>
          <Link to="/search?query=&category=Sale" className="block mb-1">
            Sale
          </Link>
          <Link to="/search?query=&category=Suits" className="block mb-1">
            Suits
          </Link>
          <Link to="/search?query=&category=Loungewear" className="block mb-1">
            Loungewear
          </Link>
          <Link to="/search?query=&category=Co-ords" className="block mb-1">
            Co-Ords
          </Link>
          <Link to="/search?query=&category=Dresses" className="block mb-1">
            Dresses
          </Link>
          <Link to="/search?query=&category=Saree" className="block mb-1">
            Saree
          </Link>
          <Link to="/search?query=&category=Kurtas" className="block mb-1">
            Kurtas
          </Link>
          <Link to="/search?query=&category=Tops" className="block mb-1">
            Tops
          </Link>
          <Link to="/search?query=&category=Blazer" className="block mb-1">
            Blazer
          </Link>
          <Link
            to="/search?query=&category=Skirt%20Sets"
            className="block mb-1"
          >
            Skirt Sets
          </Link>
          <Link to="/search?query=&category=Shirts" className="block mb-1">
            Shirts
          </Link>
        </div>
        <div className="insta md:max-w-96 bg-white">
          {/* Instagram embedded section */}
          {/* Replace with your Instagram embed code */}
          {/* <div className="max-w-96 bg-white">instagram embedded</div> */}
        </div>
        <div className="hide-on-small-screens">
          <InstagramPost/>
        </div>
      </div>
      <div className="nav2">
        <p className="font-semibold my-5 text-sm text-center md:text-left">
          Copyright © 2022 Bud & Tulip. All Rights Reserved. Developed by Soft
          Coders
        </p>
      </div>
      
    </div>
  );
};

export default Footer;
