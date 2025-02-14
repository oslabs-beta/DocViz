import { useState, useEffect } from 'react';

/**
 * Custom hook to establish a WebSocket connection and listen for real-time updates.
 * It maintains WebSocket data, handles errors, and provides notifications for key events.
 * @param {string} url - The WebSocket URL to connect to.
 */
const useWebSocket = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [notifications, setNotifications] = useState([]);

  /**
   * Adds a new notification to the state and removes the oldest one after 5 seconds.
   * @param {string} message - The notification message.
   */
  const addNotification = (message) => {
    setNotifications((prev) => [...prev, { id: Date.now(), message }]);

    setTimeout(() => {
      setNotifications((prev) => prev.slice(1)); // Auto-remove oldest notification after 5 sec
    }, 5000);
  };

  useEffect(() => {
    // Prevent WebSocket connection if the URL is invalid
    if (!url || url.includes('undefined')) return;

    const ws = new WebSocket(url);

    ws.onopen = () => console.log('WebSocket connected:', url);

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        console.log('WebSocket Data:', message);

        // Update state only if the new data is different
        setData((prevData) =>
          JSON.stringify(prevData) !== JSON.stringify(message)
            ? message
            : prevData
        );

        // Trigger notifications based on container status
        if (message.status === 'stopped') {
          addNotification(`Container ${message.name} has stopped.`);
        }
        if (message.cpuUsage > 90) {
          addNotification(
            `High CPU usage: ${message.name} at ${message.cpuUsage}%`
          );
        }
        if (message.memoryUsage > 80) {
          addNotification(
            `Memory alert: ${message.name} at ${message.memoryUsage}%`
          );
        }
      } catch (err) {
        console.error('WebSocket error:', err);
        setError(err);
      }
    };

    ws.onerror = (error) => setError(error);
    ws.onclose = () => console.log('WebSocket closed:', url);

    return () => ws.close();
  }, [url]);

  return { data, error, notifications };
};

export default useWebSocket;
