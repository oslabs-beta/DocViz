import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { House, Bell } from 'react-bootstrap-icons';
import Notifications from '../Notifications';
import useWebSocket from '../../hooks/useWebSocket';
import '../../styles/index.css';

const Navbar = () => {
  const navigate = useNavigate();
  const { notifications } = useWebSocket('ws://localhost:5003/ws');
  const [showPopup, setShowPopup] = useState(false);
  const [storedNotifications, setStoredNotifications] = useState([]);
  const seenMessages = useRef(new Set());

  // ✅ Add new notifications *only if they haven't been seen before*
  useEffect(() => {
    const newNotifications = notifications.filter(
      (notif) => !seenMessages.current.has(notif.message)
    );

    if (newNotifications.length > 0) {
      newNotifications.forEach((notif) =>
        seenMessages.current.add(notif.message)
      );
      setStoredNotifications((prev) => [...prev, ...newNotifications]);
    }
  }, [notifications]); // Only run when `notifications` change

  // 🔔 Toggle notifications panel (but don't clear them)
  const togglePopup = () => setShowPopup(!showPopup);

  return (
    <nav
      style={{
        backgroundColor: '#2D2856',
        borderRight: '1px solid #443c7a',
        width: '60px',
        height: '100vh',
      }}
      className='d-flex flex-column align-items-center py-4 position-fixed start-0 top-0'
    >
      <div className='mb-3 mr-2 text-white fs-3'>D</div>

      {/* 🏠 Home Button */}
      <button
        onClick={() => navigate('/')}
        className='nav-button d-flex align-items-center justify-content-center border-0 rounded-2 cursor-pointer'
        style={{
          backgroundColor: '#3d367580',
          width: '40px',
          height: '40px',
          transition: 'all 0.3s ease',
        }}
      >
        <House size={20} color='#b8b5d1' />
      </button>

      {/* 🔔 Notification Bell Button */}
      <button
        onClick={togglePopup}
        className='nav-button d-flex align-items-center justify-content-center border-0 rounded-2 cursor-pointer position-relative'
        style={{
          backgroundColor: '#3d367580',
          width: '40px',
          height: '40px',
          transition: 'all 0.3s ease',
        }}
      >
        <Bell size={20} color='#b8b5d1' />

        {/* 🔴 Red Dot - Stays Until All Issues Are Resolved */}
        {storedNotifications.length > 0 && (
          <span
            style={{
              position: 'absolute',
              top: '5px',
              right: '5px',
              backgroundColor: 'red',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
            }}
          />
        )}
      </button>

      {/* 📌 Notifications Panel - Stays Open Until Manually Closed */}
      {showPopup && (
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
          <h5>Current Issues</h5>
          {storedNotifications.length === 0 ? (
            <p>No active issues</p>
          ) : (
            storedNotifications.map((notif, index) => (
              <div
                key={notif.id || `${notif.message}-${index}`} // ✅ Unique key fallback
                style={{ padding: '5px 0' }}
              >
                {notif.message}
                <button
                  onClick={() => navigate(`/dashboard/${notif.id}`)}
                  style={{
                    marginLeft: '10px',
                    backgroundColor: '#ff9800',
                    border: 'none',
                    color: '#fff',
                    padding: '5px 10px',
                    borderRadius: '3px',
                    cursor: 'pointer',
                  }}
                >
                  View
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* 🔔 Toast Notifications (Popup Fades After 3 Seconds, But Notifications Stay) */}
      <Notifications notifications={storedNotifications} />
    </nav>
  );
};

export default Navbar;
