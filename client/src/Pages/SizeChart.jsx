import React from "react";
import { Helmet } from "react-helmet";

const SizeChart = () => {
  return (
    <>
      <Helmet>
        <title>Size Chart | Bud & Tulips Clothing Measurements Guide</title>
        
        <meta
          name="description"
          content="Find the perfect fit with Bud & Tulips size chart. Check detailed measurements for bust, waist, hips for sizes XXS to XXXL. Custom sizes also available."
        />
        <link rel="canonical" href="https://budandtulips.com/size-chart" />

        {/* Open Graph */}
        <meta property="og:title" content="Bud & Tulips | Size Chart & Measurement Guide" />
        <meta
          property="og:description"
          content="Accurate size chart for all Bud & Tulips outfits. View measurements for XXS–XXXL & contact for custom size orders."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://budandtulips.com/size-chart" />
        <meta property="og:image" content="https://budandtulips.com/images/size-chart-cover.jpg" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Bud & Tulips | Size Chart Guide" />
        <meta
          name="twitter:description"
          content="Find accurate clothing measurements for Bud & Tulips fashion sizes from XXS to XXXL."
        />
        <meta name="twitter:image" content="https://budandtulips.com/images/size-chart-cover.jpg" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Bud & Tulips Size Chart",
            "url": "https://budandtulips.com/size-chart",
            "description":
              "Find accurate size measurements for Bud & Tulips clothing. Measurements for bust, waist, and hips from XXS to XXXL.",
          })}
        </script>
      </Helmet>

      <div className="overflow-x-auto my-10 mx-4">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-pink-100">
            <tr>
              <th className="py-2 px-4 border border-gray-300">SIZE</th>
              <th className="py-2 px-4 border border-gray-300">UK SIZE</th>
              <th className="py-2 px-4 border border-gray-300">BUST</th>
              <th className="py-2 px-4 border border-gray-300">WAIST</th>
              <th className="py-2 px-4 border border-gray-300">HIPS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border border-gray-300">XXS</td>
              <td className="py-2 px-4 border border-gray-300">4</td>
              <td className="py-2 px-4 border border-gray-300">29-30</td>
              <td className="py-2 px-4 border border-gray-300">23-24</td>
              <td className="py-2 px-4 border border-gray-300">31-32</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border border-gray-300">XS</td>
              <td className="py-2 px-4 border border-gray-300">6</td>
              <td className="py-2 px-4 border border-gray-300">31-32</td>
              <td className="py-2 px-4 border border-gray-300">25-26</td>
              <td className="py-2 px-4 border border-gray-300">33-34</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border border-gray-300">S</td>
              <td className="py-2 px-4 border border-gray-300">8</td>
              <td className="py-2 px-4 border border-gray-300">33-34</td>
              <td className="py-2 px-4 border border-gray-300">27-28</td>
              <td className="py-2 px-4 border border-gray-300">35-36</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border border-gray-300">M</td>
              <td className="py-2 px-4 border border-gray-300">10</td>
              <td className="py-2 px-4 border border-gray-300">35-36</td>
              <td className="py-2 px-4 border border-gray-300">29-30</td>
              <td className="py-2 px-4 border border-gray-300">37-38</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border border-gray-300">L</td>
              <td className="py-2 px-4 border border-gray-300">12</td>
              <td className="py-2 px-4 border border-gray-300">37-38</td>
              <td className="py-2 px-4 border border-gray-300">31-32</td>
              <td className="py-2 px-4 border border-gray-300">39-40</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border border-gray-300">XL</td>
              <td className="py-2 px-4 border border-gray-300">14</td>
              <td className="py-2 px-4 border border-gray-300">39-40</td>
              <td className="py-2 px-4 border border-gray-300">33-34</td>
              <td className="py-2 px-4 border border-gray-300">41-42</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border border-gray-300">XXL</td>
              <td className="py-2 px-4 border border-gray-300">16</td>
              <td className="py-2 px-4 border border-gray-300">41-42</td>
              <td className="py-2 px-4 border border-gray-300">35-36</td>
              <td className="py-2 px-4 border border-gray-300">43-44</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border border-gray-300">XXXL</td>
              <td className="py-2 px-4 border border-gray-300">18</td>
              <td className="py-2 px-4 border border-gray-300">43-44</td>
              <td className="py-2 px-4 border border-gray-300">37-38</td>
              <td className="py-2 px-4 border border-gray-300">45-46</td>
            </tr>
          </tbody>
        </table>

        <div className="text-center mt-4">
          <p>Ease is added according to the style of garment.</p>
          <p>
            If your size is above XXXL, please email your measurements or WhatsApp at 9485701666 to place an order.
          </p>
        </div>
      </div>
    </>
  );
};

export default SizeChart;