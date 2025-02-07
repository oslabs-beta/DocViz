import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Notifications = ({ notifications }) => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false); // Hide only the popup
    }, 3000);

    return () => clearTimeout(timer);
  }, [notifications]);

  if (!visible) return null; // Hide the toast after 3 seconds

  return (
    <div
      style={{
        position: 'absolute',
        top: '50px',
        left: '60px',
        backgroundColor: '#2D2856',
        color: '#fff',
        width: '250px',
        borderRadius: '5px',
        padding: '10px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
      }}
    >
      {notifications.length === 0 ? (
        <p>No new notifications</p>
      ) : (
        notifications.map((notif) => (
          <div
            key={notif.file || notif.id || Math.random()} // Ensure a unique key
            onClick={() => notif.file ? navigate(`/dashboard/${notif.file}`) : console.warn("❌ Missing file path")}
            style={{
              padding: '5px 0',
              cursor: 'pointer',
              borderBottom: '1px solid #555',
            }}
          >
            <strong>{notif.file || "Unknown File"}</strong>: {notif.message || "No description available"}
          </div>
        ))
      )}
    </div>
  );
};

export default Notifications;