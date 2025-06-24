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
        <Route path="/" element={<Navigate to="/products" />} />

        <Route path="/products" element={<ProductsPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/signup" element={<SignupPage />} />

        <Route path="/order/:productId" element={<OrderPage />} />
        
        <Route path="/my-orders" element={<OrdersPage />} />

      </Routes>
    </>
  );
}

export default App;
