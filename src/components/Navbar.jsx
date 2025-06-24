import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaShoppingCart, FaBell } from 'react-icons/fa';
import createHubConnection from '../signalR/notificationHub';

const Navbar = () => {
  const { username, logout } = useAuth();
  const navigate = useNavigate();

  const [connection, setConnection] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleCartClick = () => {
    if (username) navigate('/my-orders');
    else navigate('/login');
  };

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  // 📡 SignalR setup
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const newConnection = createHubConnection(token);
    setConnection(newConnection);

    newConnection
      .start()
      .then(() => {
        console.log("Connected to SignalR");

        newConnection.on("ReceiveNotification", (message) => {
          const newNotification = {
            id: Date.now(), // generate unique id
            message: message,
            isRead: false
          };
          setNotifications(prev => [newNotification, ...prev]);
        });
      })
      .catch(err => console.error("SignalR Error:", err));

    return () => {
      newConnection.stop();
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <Link className="navbar-brand fw-bold" to="/products">MyStore</Link>

      <div className="navbar-nav ms-auto d-flex align-items-center">

        <Link className="nav-link" to="/products">Products</Link>

        {/* 🔔 Notification Bell */}
        <div className="position-relative me-3">
          <button
            className="btn btn-outline-secondary position-relative"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <FaBell />
            {unreadCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {unreadCount}
              </span>
            )}
          </button>

          {showDropdown && (
            <div className="position-absolute bg-white shadow p-2 mt-2" style={{ right: 0, minWidth: '250px', zIndex: 1000 }}>
              {notifications.length === 0 ? (
                <div className="text-center text-muted">No Notifications Yet</div>
              ) : (
                notifications.map(n => (
                  <div
                    key={n.id}
                    className={`dropdown-item ${n.isRead ? 'text-muted' : 'fw-bold'}`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => markAsRead(n.id)}
                  >
                    {n.message}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <button onClick={handleCartClick} className="btn btn-outline-dark me-3">
          <FaShoppingCart />
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
