import { useState, useEffect } from 'react';

const useFetchContainers = () => {
  const [containers, setContainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      // Get the server URL from environment variables
  const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:4000';
    const fetchContainers = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/api/containers`);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setContainers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContainers();
  }, []);

  return { containers, loading, error };
};

export default useFetchContainers;
