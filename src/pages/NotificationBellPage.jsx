import React, { useEffect, useState } from "react";
import createHubConnection from "../signalR/notificationHub";

const NotificationBell = () => {
  const [connection, setConnection] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const newConnection = createHubConnection(token);
    setConnection(newConnection);

    newConnection
      .start()
      .then(() => {
        console.log("Connected to SignalR hub");

        newConnection.on("ReceiveNotification", (message) => {
          setNotifications((prev) => [...prev, message]);
        });
      })
      .catch((error) => console.error("SignalR connection error:", error));

    return () => {
      newConnection.stop();
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={toggleDropdown}
        style={{
          background: "none",
          border: "none",
          position: "relative",
          fontSize: "24px",
          cursor: "pointer"
        }}
      >
        🔔
        {notifications.length > 0 && (
          <span
            style={{
              position: "absolute",
              top: "-5px",
              right: "-5px",
              background: "red",
              color: "white",
              borderRadius: "50%",
              padding: "3px 6px",
              fontSize: "12px"
            }}
          >
            {notifications.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "35px",
            right: "0",
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "10px",
            width: "250px",
            zIndex: 999
          }}
        >
          {notifications.length === 0 ? (
            <p>No notifications</p>
          ) : (
            notifications.map((note, index) => (
              <p key={index} style={{ marginBottom: "5px" }}>
                {note}
              </p>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;

