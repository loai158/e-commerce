import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const OrderPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Please login first.');
      return navigate('/login', { state: { from: `/order/${productId}` } });
    }

    try {
      const response = await axios.post(
        'https://localhost:7247/api/Order/Add-New',
        {
          userId: '', // ❗ اتركه فاضي لو الـ API بيستخدم التوكن للتعرف على المستخدم
          orderItems: [{ productId: parseInt(productId), quantity }]
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.isSuccess) {
        alert('✅ Order created successfully!');
        navigate('/products');
      } else {
        alert('❌ Failed to create order.');
      }
    } catch (err) {
      console.error(err);
      alert('❌ Error creating order.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Place Your Order</h2>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-3">
          <label>Quantity:</label>
          <input
            type="number"
            className="form-control"
            value={quantity}
            min="1"
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
        </div>
        <button type="submit" className="btn btn-success w-100">
          Confirm Order
        </button>
      </form>
    </div>
  );
};

export default OrderPage;
