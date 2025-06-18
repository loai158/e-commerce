import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('https://localhost:7247/api/Order', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setOrders(res.data.data))
    .catch(err => console.error('Error fetching orders:', err));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">My Orders</h2>
      {orders.length === 0 ? (
        <p className="text-center">No orders found.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="card mb-3 p-3 shadow-sm">
            <h5>Order #{order.orderId}</h5>
            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            <p><strong>Total:</strong> ${order.totalPrice}</p>
           <ul>
  {order.orderItems.map((item, idx) => (
    <li key={idx}>
      {item.productName} - {item.quantity} pcs
      <span className="text-muted"> (each: ${item.unitPrice})</span> – 
      Total: ${item.quantity * item.unitPrice}
    </li>
  ))}
</ul>

          </div>
        ))
      )}
    </div>
  );
};

export default OrdersPage;
