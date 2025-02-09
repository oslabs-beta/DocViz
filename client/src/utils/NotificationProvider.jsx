import React, { createContext, useState, useContext } from 'react';
import Notifications from '../components/Notifications';

// Create Context
const NotificationContext = createContext();

// Custom Hook to use Notifications
export const useNotification = () => useContext(NotificationContext);

// Notification Provider Component
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (file, message) => {
    setNotifications((prev) => [...prev, { id: Date.now(), file, message }]);

    // Auto-remove after 3s
    setTimeout(() => {
      setNotifications((prev) => prev.slice(1));
    }, 3000);
  };

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      <Notifications notifications={notifications} />
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
