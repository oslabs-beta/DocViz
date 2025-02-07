import { useState, useEffect } from 'react';

const useWebSocket = (url) => {
  const [notifications, setNotifications] = useState([]);
  const seenMessages = new Set(); // Track unique messages

  useEffect(() => {
    const socket = new WebSocket(url);

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      // Only add new messages if they haven't been seen before
      if (!seenMessages.has(message.message)) {
        seenMessages.add(message.message);
        setNotifications((prev) => [...prev, message]);
      }
    };

    socket.onopen = () => {
      console.log('✅ WebSocket Connected');
    };

    socket.onerror = (error) => {
      console.error('❌ WebSocket Error:', error);
    };

    socket.onclose = () => {
      console.log('❌ WebSocket Disconnected');
    };

    return () => {
      socket.close();
    };
  }, [url]);

  return { notifications };
};

export default useWebSocket;