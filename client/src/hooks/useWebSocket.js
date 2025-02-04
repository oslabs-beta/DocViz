import { useState, useEffect } from 'react';

const useWebSocket = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url || url.includes('undefined')) return; // Avoid invalid URLs

    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log('WebSocket connection established:', url);
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        console.log('WebSocket Data Received:', message);
        setData(message.error ? null : message); // Ignore errors
      } catch (err) {
        console.error('Error parsing WebSocket message:', err);
        setError(err);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setError(error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed:', url);
    };

    return () => {
      console.log('Cleaning up WebSocket connection');
      ws.close();
    };
  }, [url]);

  return { data, error };
};

export default useWebSocket;
