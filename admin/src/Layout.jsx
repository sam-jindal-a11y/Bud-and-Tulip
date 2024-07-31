import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import AddProduct from './Pages/AddProduct';
import AddSize from './Pages/AddSize';
import UpdateSize from './Pages/UpdateSize';
import AddColor from './Pages/AddColor';
import UpdateColor from './Pages/UpdateColor';
import AddCategory from './Pages/AddCategory';
import UpdateCategory from './Pages/UpdateCategory';
import UpdateProduct from './Pages/UpdateProducts';
import Dashboard from './Pages/Dashboard';
import OrdersTable from './Pages/OrdersTable';
import OrderDetail from './Pages/OrderDetail';
import VoucherForm from './Pages/GiftCard';
import SalePage from './Pages/SalePage';
import AddBanner from './Pages/AddBanner';
import UpdateBanner from './Pages/UpdateBanner';
import UsersTable from './Pages/UsersTable';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar for larger screens */}
      <div className={`hidden lg:flex lg:w-64 lg:flex-shrink-0 ${isSidebarOpen ? 'block' : 'hidden'}`}>
        <Sidebar onClose={closeSidebar} />
      </div>

      {/* Sidebar for smaller screens */}
      <div className={`fixed inset-0 bg-gray-800 z-40 lg:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}>
        <Sidebar onClose={closeSidebar} />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onToggleSidebar={toggleSidebar} />

        {/* Main content area */}
        <div className="flex-1 p-4 overflow-y-auto">
          <Routes>
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/updateproduct/:id" element={<UpdateProduct />} />
            <Route path="/addsize" element={<AddSize />} />
            <Route path="/updatesize" element={<UpdateSize />} />
            <Route path="/addcolor" element={<AddColor />} />
            <Route path="/updatecolor" element={<UpdateColor />} />
            <Route path="/addcategory" element={<AddCategory />} />
            <Route path="/updatecategory" element={<UpdateCategory />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<OrdersTable />} />
            <Route path="/giftcards" element={<VoucherForm />} />
            <Route path="/orderdetails/:id" element={<OrderDetail />} />
            <Route path="/sale" element={<SalePage />} />
            <Route path="/addbanner" element={<AddBanner />} />
            <Route path="/updatebanner" element={<UpdateBanner />} />
            <Route path="/users" element={<UsersTable />} />
            {/* Add more routes for other content components */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Layout;
