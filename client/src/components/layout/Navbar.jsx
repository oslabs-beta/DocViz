import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { House, Bell } from 'react-bootstrap-icons';
import Notifications from '../Notifications';
import useWebSocket from '../../hooks/useWebSocket';
import '../../styles/index.css';

const Navbar = () => {
  const navigate = useNavigate();

  // Establish a WebSocket connection and receive notifications
  const { notifications } = useWebSocket('ws://localhost:5003/ws');

  // State to manage visibility of the notifications panel
  const [showPopup, setShowPopup] = useState(false);

  // State to store notifications locally
  const [storedNotifications, setStoredNotifications] = useState([]);

  // Reference to track seen notifications to prevent duplicates
  const seenMessages = useRef(new Set());

  // Effect: Updates stored notifications when new ones arrive
  useEffect(() => {
    // Filter out notifications that have already been seen
    const newNotifications = notifications.filter(
      (notif) => !seenMessages.current.has(notif.message)
    );

    if (newNotifications.length > 0) {
      // Mark new notifications as seen
      newNotifications.forEach((notif) =>
        seenMessages.current.add(notif.message)
      );
      setStoredNotifications((prev) => [...prev, ...newNotifications]);
    }

    // Temporary test notifications (Remove this in production)
    setTimeout(() => {
      setStoredNotifications((prev) => [
        ...prev,
        { id: 'error-001', message: 'Docker container failed to start.' },
        { id: 'error-002', message: 'High memory usage detected.' },
        { id: 'error-003', message: 'Network latency spike detected.' },
      ]);
    }, 5000);
  }, [notifications]); // Effect runs whenever notifications change

  // Function to toggle the notification popup visibility
  const togglePopup = () => setShowPopup(!showPopup);

  return (
    <nav
      style={{
        backgroundColor: '#2D2856',
        borderRight: '1px solid #443c7a',
        width: '63px',
        height: '100vh',
      }}
      className='d-flex flex-column align-items-center py-2 position-fixed start-0 top-0'
    >
      <span
        style={{
          background:
            'linear-gradient(90deg, #B794F4 0%, #F687B3 50%, #FBD38D 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          display: 'inline-block',
          fontSize: '1.5rem',
          fontWeight: 700,
          marginBottom: '0.5rem',
        }}
      >
        DV
      </span>
      {/* Home Button - Navigates to the homepage */}
      <button
        onClick={() => navigate('/')}
        className='nav-button d-flex align-items-center justify-content-center border-0 rounded-2 cursor-pointer mb-2'
        style={{
          backgroundColor: '#3d367580',
          width: '40px',
          height: '40px',
          transition: 'all 0.3s ease',
        }}
      >
        <House size={20} color='#b8b5d1' />
      </button>

      {/* Notification Bell Button - Opens/closes notifications panel */}
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

        {/* Red Dot - Indicates unread notifications */}
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

      {/* Notifications Panel (Rendered using createPortal) */}
      {showPopup &&
        createPortal(
          <div
            className='nav-notifications'
            style={{
              position: 'fixed',
              top: '60px',
              left: '70px',
              width: '300px',
              background: '#3a3a69',
              color: '#fff',
              padding: '8px',
              borderRadius: '5px',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
              zIndex: 9999,
            }}
          >
            <h5 className='text-center'>Current Issues</h5>
            {storedNotifications.length === 0 ? (
              <p className='text-center'>No active issues.</p>
            ) : (
              storedNotifications.map((notif, index) => (
                <div
                  key={notif.id || `${notif.message}-${index}`} // Unique key fallback
                  style={{ padding: '5px', background: '#26264d' }}
                  className='mb-2 rounded-2 gap-2'
                >
                  <button
                    onClick={() => navigate(`/dashboard/${notif.id}`)}
                    style={{
                      marginLeft: '10px',
                      border: 'none',
                      background: '#26264d',
                      color: '#fff',
                      borderRadius: '3px',
                      cursor: 'pointer',
                    }}
                    className='pb-1 px-1'
                  >
                    {notif.message}
                  </button>
                </div>
              ))
            )}
          </div>,
          document.body // Renders at the top level of the DOM
        )}

      {/* Toast-style Notifications that disappear after a few seconds */}
      <Notifications notifications={storedNotifications} />
    </nav>
  );
};

export default Navbar;
