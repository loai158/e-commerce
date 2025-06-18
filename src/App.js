import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductsPage from './pages/ProductsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import OrderPage from './pages/OrderPage';
import OrdersPage from './pages/OrdersPage';

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* ✅ لو راح على "/" رجعه تلقائيًا لـ /products */}
        <Route path="/" element={<Navigate to="/products" />} />

        {/* ✅ صفحة المنتجات */}
        <Route path="/products" element={<ProductsPage />} />

        {/* ✅ صفحة تسجيل الدخول */}
        <Route path="/login" element={<LoginPage />} />

        {/* ✅ صفحة إنشاء حساب جديد */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/order/:productId" element={<OrderPage />} />
        <Route path="/my-orders" element={<OrdersPage />} />

      </Routes>
    </>
  );
}

export default App;
