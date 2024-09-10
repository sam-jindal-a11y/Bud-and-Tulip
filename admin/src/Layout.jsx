import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
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
import LoginPage from './Pages/LoginPage';
import UserDetails from './Pages/UserDetails';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const isLoginPage = location.pathname === '/login';

  const isAuthenticated = () => {
    return !!localStorage.getItem('admintoken');
  };

  useEffect(() => {
    if (!isAuthenticated() && !isLoginPage) {
      window.location.href = '/login';
    }
  }, [location]);

  return (
    <div className="flex h-screen overflow-hidden">
      {!isLoginPage && (
        <>
          {/* Sidebar for larger screens */}
          <div className={`hidden lg:flex lg:w-64 lg:flex-shrink-0 ${isSidebarOpen ? 'block' : 'hidden'}`}>
            <Sidebar onClose={closeSidebar} />
          </div>

          {/* Sidebar for smaller screens */}
          <div className={`fixed inset-0 bg-gray-800 z-40 lg:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}>
            <Sidebar onClose={closeSidebar} />
          </div>
        </>
      )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {!isLoginPage && <Header onToggleSidebar={toggleSidebar} />}

        {/* Main content area */}
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            {isAuthenticated() ? (
              <>
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
                <Route path="/userdetails/:userId" element={<UserDetails />} />
                <Route path="/users" element={<UsersTable />} />
                {/* Add more routes for other content components */}
              </>
            ) : (
              <Route path="*" element={<Navigate to="/login" />} />
            )}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Layout;
