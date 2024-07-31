// EditAddressForm.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditAddressForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { address } = location.state || {};

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    company: '',
    address1: '',
    address2: '',
    city: '',
    province: '',
    country: '',
    postalCode: '',
    phone: '',
  });

  useEffect(() => {
    if (address) {
      setForm({
        firstName: address.firstName || '',
        lastName: address.lastName || '',
        company: address.company || '',
        address1: address.address1 || '',
        address2: address.address2 || '',
        city: address.city || '',
        province: address.province || '',
        country: address.country || '',
        postalCode: address.postalCode || '',
        phone: address.phone || '',
      });
    }
  }, [address]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.put(`http://103.209.144.220:5000/api/address/${address._id}`, form, { headers });

      if (response.status === 200) {
        navigate('/account'); // Navigate back to account page
      } else {
        console.error('Failed to update address');
      }
    } catch (error) {
      console.error('Error updating address:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Edit Address</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">First Name</label>
          <input type="text" name="firstName" value={form.firstName} onChange={handleInputChange} className="w-full border p-2 rounded" required />
        </div>
        <div>
          <label className="block">Last Name</label>
          <input type="text" name="lastName" value={form.lastName} onChange={handleInputChange} className="w-full border p-2 rounded" required />
        </div>
        <div>
          <label className="block">Company</label>
          <input type="text" name="company" value={form.company} onChange={handleInputChange} className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block">Address 1</label>
          <input type="text" name="address1" value={form.address1} onChange={handleInputChange} className="w-full border p-2 rounded" required />
        </div>
        <div>
          <label className="block">Address 2</label>
          <input type="text" name="address2" value={form.address2} onChange={handleInputChange} className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block">City</label>
          <input type="text" name="city" value={form.city} onChange={handleInputChange} className="w-full border p-2 rounded" required />
        </div>
        <div>
          <label className="block">Province</label>
          <input type="text" name="province" value={form.province} onChange={handleInputChange} className="w-full border p-2 rounded" required />
        </div>
        <div>
          <label className="block">Country</label>
          <input type="text" name="country" value={form.country} onChange={handleInputChange} className="w-full border p-2 rounded" required />
        </div>
        <div>
          <label className="block">Postal Code</label>
          <input type="text" name="postalCode" value={form.postalCode} onChange={handleInputChange} className="w-full border p-2 rounded" required />
        </div>
        <div>
          <label className="block">Phone</label>
          <input type="text" name="phone" value={form.phone} onChange={handleInputChange} className="w-full border p-2 rounded" required />
        </div>
        <button type="submit" className="px-4 py-2 border border-black rounded">Save</button>
      </form>
    </div>
  );
};

export default EditAddressForm;
