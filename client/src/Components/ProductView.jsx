import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductView = () => {
  const [visibleSection, setVisibleSection] = useState(null);

  const toggleSection = (section) => {
    setVisibleSection(visibleSection === section ? null : section);
  };

  const Navigate = useNavigate();

  function sizeButton(){
    Navigate('/SizeChart')
  }
  return (
    <div className="container mx-auto px-4 py-8">
      {/* First Section: Product Images and Details */}
      <div className="flex flex-col lg:flex-row mb-12">
        {/* Left Side: Product Images */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start mb-8 lg:mb-0">
          <img
            src="https://www.budandtulips.com/Content/Pro_Images/BT763ir31.jpg"
            alt="Product"
            className="w-full h-96 object-cover rounded-md mb-4"
          />
          <div className="flex space-x-2">
            <img
              src="https://www.budandtulips.com/Content/Pro_Images/BT763ir31.jpg"
              alt="Thumbnail"
              className="w-24 h-24 object-cover rounded-md"
            />
            <img
              src="https://www.budandtulips.com/Content/Pro_Images/BT763ir31.jpg"
              alt="Thumbnail"
              className="w-24 h-24 object-cover rounded-md"
            />
            <img
              src="https://www.budandtulips.com/Content/Pro_Images/BT763ir31.jpg"
              alt="Thumbnail"
              className="w-24 h-24 object-cover rounded-md"
            />
          </div>
        </div>
        {/* Right Side: Product Details */}
        <div className="w-full lg:w-1/2 lg:pl-8">
          <h1 className="text-3xl font-bold mb-2">Rabbit Suit</h1>
          <p className="text-xl text-gray-700 mb-4">₹ 3141</p>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Quantity</label>
            <input
              type="number"
              min="1"
              defaultValue="1"
              className="w-20 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Size</label>
            <select className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>S</option>
              <option>M</option>
              <option>L</option>
              <option>XL</option>
            </select>
          </div>
          <div className="flex space-x-4 mb-4">
            <button className="bg-pinkc text-white px-4 py-2 rounded-sm hover:bg-blue-950">
              Add to Cart
            </button>
            <button className="bg-pinkc text-white px-4 py-2 rounded-sm hover:bg-blue-950">
              Add to Wishlist
            </button>
            <button className="bg-pinkc text-white px-4 py-2 rounded-sm hover:bg-blue-950 " onClick={sizeButton}>
              Size Chart
            </button>
          </div>
          <p className="text-gray-700 mb-6">
            <b>Product Display Information:</b> <br /> 
            Model is Wearing Size Small (S)
            & Model Height is 5 Ft. 7 Inch. <br />
            <br />
            100% Linen Cotton,Hand Block Printed,Hand Embroidered Sequins
            Detailing On Neck,Hand Embroidered Sequins Chidkaw All over
            Kurta,Hand Embroidered Sequins And Delicate Lace Detailing On
            Sleeves,Delicate Lace Detailing On Mid And Front Of Kurta,Side Cut
            With Sequins Detailing On Bottom,Straight Fit Pant,Straight Fit
            Silhouette <br />
            <br />
            <b>Guaranteed Safe Checkout</b>
          </p>
         
        </div>
      </div>
      {/* Second Section: Additional Information */}
      <div>
        <div>
          <div className="mb-8 flex gap-8 text-center justify-center">
            <h2
              className={`text-2xl font-bold mb-2 cursor-pointer ${
                visibleSection === "description" ? "text-pinkc" : ""
              }`}
              onClick={() => setVisibleSection("description")}
            >
              Description
              <hr />
            </h2>
            <h2
              className={`text-2xl font-bold mb-2 cursor-pointer ${
                visibleSection === "additionalInfo" ? "text-pinkc" : ""
              }`}
              onClick={() => setVisibleSection("additionalInfo")}
            >
              Additional Information
              <hr />
            </h2>
            <h2
              className={`text-2xl font-bold mb-2 cursor-pointer ${
                visibleSection === "washingInfo" ? "text-pinkc" : ""
              }`}
              onClick={() => setVisibleSection("washingInfo")}
            >
              Washing Information
              <hr />
            </h2>
          </div>
          <div className="mb-8 text-left">
            {visibleSection === "description" && (
              <p className="text-gray-700">
                <h3 className="font-bold mb-2">Description</h3>
                100% Cotton <br /> Hand Done Beads Detailing on Neck <br />
                Hand Embroidered Tiny Beads and Sequins Flower Detailing on Yoke{" "}
                <br />
                Hand Embroidered Tiny Flower Beads Detailin on Yoke And Ghera
                All Over Kurta <br />
                Hand Embroidered Beads Detailing on Sleeves <br />
                Hand Embroidered Cutdana Flower Detailing On Top Of Sleeves
                (Armhole Side) <br />
                Fully Elastic Pant <br />
                Comfort To Loose <br />
                Fit Kurta Sequins <br />
                Detailed On Dupatta
                <br />
                Cotton Chanderi Dupatta
              </p>
            )}
            {visibleSection === "additionalInfo" && (
               <div className="container mx-auto p-4">
               <table className="min-w-full bg-white">
                 <thead>
               
                     {/* <th className="flex ">Additional Information</th><span></span> */}
                
                 </thead>
                 <tbody>
                   <tr className="border-b">
                     <td className="py-2 px-4 font-semibold">Include</td>
                     <td className="py-2 px-4">Kurta and Pant</td>
                   </tr>
                   <tr className="border-b">
                     <td className="py-2 px-4 font-semibold">Shipping Details</td>
                     <td className="py-2 px-4">The order will take 5-18 working days to deliver. Free delivery within India.</td>
                   </tr>
                   <tr className="border-b">
                     <td className="py-2 px-4 font-semibold">Exchange/Return</td>
                     <td className="py-2 px-4">
                       We only exchange size within 10 working days; in case we are sold out we'll exchange the piece. We don't do returns or cancel orders once placed. We don't exchange or return international orders. We don't exchange or refund reduced price articles. Customized pieces can't be exchanged.
                     </td>
                   </tr>
                   <tr className="border-b">
                     <td className="py-2 px-4 font-semibold">Other Description</td>
                     <td className="py-2 px-4">Model is wearing Size Small (S) & Model Height is 5 Ft. 7 Inch.</td>
                   </tr>
                 </tbody>
               </table>
             </div>
            )}
            {visibleSection === "washingInfo" && (
              <p className="text-gray-700">
                <h3 className="font-bold mb-2">Washing Instruction</h3>
                Wash Inside Out <br />
                Do Not Soak or Scrub <br />
                Hand Wash <br />
                Dry in Shade <br />
                Iron on Low Heat <br />
                Do not Iron on Embellishments
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
