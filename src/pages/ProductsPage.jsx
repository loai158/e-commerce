import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
const navigate = useNavigate();
const { username } = useAuth();

const handleAddToCart = (product) => {
  if (!username) {
    // ⛔ لو مش عامل login
    navigate('/login');
  } else {
    // ✅ لو عامل login، يروح لصفحة اختيار الكمية
    navigate(`/order/${product.id}`);
  }
};

  useEffect(() => {
    axios.get('https://localhost:7247/api/Product')
      .then(response => {
        setProducts(response.data.data); // حسب Response<T>
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Our Products</h2>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={
                  product.image && product.image !== "Microsoft.AspNetCore.Http.FormFile"
                    ? `https://localhost:7247${product.image}`
                    : "https://via.placeholder.com/300x200?text=No+Image"
                }
                className="card-img-top"
                alt={product.name}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text"><strong>Category:</strong> {product.categoryName}</p>
                <p className="card-text"><strong>Price:</strong> ${product.price}</p>
                <p className="card-text"><strong>In Stock:</strong> {product.quantity}</p>
               <button
                  className="btn btn-success mt-3"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
              </button>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
