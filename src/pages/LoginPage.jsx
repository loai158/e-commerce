 import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // ✅

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth(); // ✅
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7247/api/Authentication/log-in', form);

      if (response.data.isAuthenticated) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('email', response.data.email);

        login(response.data.username); // ✅ حدّث السياق

        alert('✅ Logged in successfully!');

        // ✅ يرجعه للمكان اللي كان رايح له قبل الـ login
        const redirectTo = location.state?.from || '/products';
        navigate(redirectTo);
      } else {
        alert('❌ Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('❌ Error logging in');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Login</h2>
      <form onSubmit={handleLogin} className="w-50 mx-auto">
        <div className="mb-3">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Login</button>

        <p className="text-center mt-3">
          You Don't Have An Account? <Link to="/signup">Register Now</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
