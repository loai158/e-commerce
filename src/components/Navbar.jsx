 import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { username, logout } = useAuth();
    const navigate = useNavigate(); // ✅ كده هتقدر تستخدم navigate()

  const handleCartClick = () => {
      if (username) {
        navigate('/my-orders');
      } else {
        navigate('/login');
      }
    };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <Link className="navbar-brand fw-bold" to="/products">MyStore</Link>

      <div className="navbar-nav ms-auto">
        <Link className="nav-link" to="/products">Products</Link>
         <button onClick={handleCartClick} className="btn btn-outline-dark me-3">
          <FaShoppingCart /> {/* 🛒 أيقونة السلة */}
        </button>
        {username ? (
          <>
            <span className="nav-link text-success fw-bold">Welcome, {username}</span>
            <button className="btn btn-outline-danger btn-sm ms-2" onClick={logout}>Logout</button>
          </>
        ) : (
          <Link className="nav-link" to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
