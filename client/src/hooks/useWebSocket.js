import { useEffect, useState } from 'react';

const useWebSocket = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        console.log('WebSocket Data Received:', message); // Log the raw data received
        setData(message); // Update state with new message
      } catch (err) {
        console.error('Error parsing WebSocket message:', err);
        setError(err);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error); // Log any WebSocket errors
      setError(error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      console.log('Cleaning up WebSocket connection');
      ws.close();
    };
  }, [url]);

  return { data, error };
};

export default useWebSocket;
