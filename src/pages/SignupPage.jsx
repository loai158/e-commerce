 import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    phoneNumber: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7247/api/Authentication/register', form);

      if (response.data.isAuthenticated) {
        // ✅ حفظ التوكن
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.username);

        alert('✅ Account created successfully!');
        navigate('/products'); // رجوع للرئيسية
      } else {
        alert('❌ Registration failed');
      }
    } catch (error) {
      console.error(error);
      alert('❌ Error occurred during signup');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Sign Up</h2>
      <form onSubmit={handleSignup} className="w-50 mx-auto">
        <div className="row">
          <div className="col">
            <label>First Name</label>
            <input type="text" name="firstName" className="form-control" onChange={handleChange} required />
          </div>
          <div className="col">
            <label>Last Name</label>
            <input type="text" name="lastName" className="form-control" onChange={handleChange} required />
          </div>
        </div>
        <div className="mb-3 mt-3">
          <label>Username</label>
          <input type="text" name="username" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Phone Number</label>
          <input type="text" name="phoneNumber" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" name="email" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" name="password" className="form-control" onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-success w-100">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;
