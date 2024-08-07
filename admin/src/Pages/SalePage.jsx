import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import SalesTablePage from './SalesTablePage';

const SalePage = () => {
  const [saleName, setSaleName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [discount, setDiscount] = useState('');
  const [flatDiscount, setFlatDiscount] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/categories');
        const categories = response.data.map(category => ({
          value: category.category_id,
          label: category.name,
        }));
        setCategories(response.data);
        setCategoryOptions(categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategories.length > 0) {
      const fetchProducts = async () => {
        try {
          const categoryNames = selectedCategories.map(category => category.label);
          const response = await axios.post('http://localhost:5000/products/by-categories', { categoryNames });
          const productsWithCategory = response.data.map(product => {
            const categoryName = product.categoryName || 'Unknown';
            return { ...product, categoryName };
          });
          setProducts(productsWithCategory);
          setSelectedProducts([]);
          setSelectAll(false);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };

      fetchProducts();
    } else {
      setProducts([]);
      setSelectedProducts([]);
      setSelectAll(false);
    }
  }, [selectedCategories, categories]);

  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions || []);
  };

  const handleProductChange = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
    const filteredProducts = products.filter(product => !product.hasOffer);
    if (selectedProducts.length + 1 === filteredProducts.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  };

  const handleSelectAll = () => {
    const filteredProducts = products.filter(product => !product.hasOffer);
    if (selectAll) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map(product => product._id));
    }
    setSelectAll(!selectAll);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProducts = products.map(product => {
      let offerPrice = product.price;
      if (discount) {
        offerPrice = product.price - (product.price * (discount / 100));
      } else if (flatDiscount) {
        offerPrice = product.price - flatDiscount;
      }
      return {
        ...product,
        offerPrice,
        hasOffer: selectedProducts.includes(product._id),
      };
    });

    const saleData = {
      saleName,
      startDate,
      startTime,
      endDate,
      endTime,
      discount,
      flatDiscount,
      categories: selectedCategories.map(option => option.value),
      products: updatedProducts,
    };

    try {
      const response = await axios.post('http://localhost:5000/sales', saleData);
      console.log('Sale created successfully:', response.data);
      alert('Sale created successfully');
      window.location.reload();
    } catch (error) {
      console.error('Error creating sale:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-start">
      <div className="max-w-full mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Create Sale</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700">Sale Name</label>
            <input
              type="text"
              value={saleName}
              onChange={(e) => setSaleName(e.target.value)}
              className="w-full mt-2 p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full mt-2 p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700">Start Time</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full mt-2 p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full mt-2 p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700">End Time</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full mt-2 p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700">Percentage Discount (%)</label>
              <input
                type="number"
                value={discount}
                onChange={(e) => {
                  setDiscount(e.target.value);
                  if (e.target.value) setFlatDiscount('');
                }}
                disabled={flatDiscount !== ''}
                className="w-full mt-2 p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700">Flat Discount (₹)</label>
              <input
                type="number"
                value={flatDiscount}
                onChange={(e) => {
                  setFlatDiscount(e.target.value);
                  if (e.target.value) setDiscount('');
                }}
                disabled={discount !== ''}
                className="w-full mt-2 p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700">Category</label>
            <Select
              isMulti
              options={categoryOptions}
              value={selectedCategories}
              onChange={handleCategoryChange}
              className="mt-2"
              classNamePrefix="react-select"
            />
          </div>
          {products.length > 0 && (
            <div className="mt-6">
              <h2 className="text-xl font-bold mb-4">Products</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                  <thead>
                    <tr>
                      <th className="p-3 border-b">
                        <input
                          type="checkbox"
                          checked={selectAll}
                          onChange={handleSelectAll}
                          className="form-checkbox"
                        />
                      </th>
                      <th className="p-3 border-b text-left">Product Name</th>
                      <th className="p-3 border-b text-left">Category</th>
                      <th className="p-3 border-b text-left">Price</th>
                      <th className="p-3 border-b text-left">Offer Price</th>
                      <th className="p-3 border-b text-left">Has Offer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.filter(product => !product.hasOffer).map(product => (
                      <tr key={product._id}>
                        <td className="p-3 border-b">
                          <input
                            type="checkbox"
                            checked={selectedProducts.includes(product._id)}
                            onChange={() => handleProductChange(product._id)}
                            className="form-checkbox"
                          />
                        </td>
                        <td className="p-3 border-b">{product.name}</td>
                        <td className="p-3 border-b">{product.category}</td>
                        <td className="p-3 border-b">{product.price}</td>
                        <td className="p-3 border-b">{product.offerPrice}</td>
                        <td className="p-3 border-b">{product.hasOffer ? 'Yes' : 'No'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Start Sale
            </button>
          </div>
        </form>
        <SalesTablePage/>
      </div>
    </div>
  );
};

export default SalePage;