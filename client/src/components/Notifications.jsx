import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const Notifications = ({ notifications }) => {
  const [visibleNotifications, setVisibleNotifications] =
    useState(notifications);

  useEffect(() => {
    if (notifications.length > 0) {
      setVisibleNotifications(notifications);

      // Remove notifications after 3 seconds
      const timer = setTimeout(() => {
        setVisibleNotifications([]);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [notifications]);

  return createPortal(
    <div
      className='notifications-overlay'
      style={{
        position: 'fixed',
        backgroundColor: '#3A3A69',
        top: '20px',
        right: '20px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      {visibleNotifications.map((notif) => (
        <div
          key={notif.id}
          className='notification-item'
          style={{
            background: '#26264d',
            color: '#fff',
            padding: '10px 15px',
            borderRadius: '5px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
          }}
        >
          <strong>{notif.file || 'Unknown File'}</strong>: {notif.message}
        </div>
      ))}
    </div>,
    document.body
  );
};

export default Notifications;
