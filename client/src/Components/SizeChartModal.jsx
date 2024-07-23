import React from 'react';

const SizeChartModal = ({ isVisible, onClose }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-6 rounded-sm z-10 relative w-full max-w-xs sm:max-w-lg mx-4 max-h-full overflow-y-auto">
        <button
          className="absolute top-0 right-0 mt-2 mr-2 text-gray-500 hover:text-gray-700 text-4xl"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="overflow-x-auto my-4  text-sm">
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
          <div className="text-center mt-4 text-sm">
            <p>Ease is added according to the style of garment.</p>
            <p>
              If your size is above XXXL, please e-mail your measurements or WhatsApp at 9485701666 to place an order.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeChartModal;
