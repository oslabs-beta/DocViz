import { useState, useEffect } from 'react';

/**
 * Custom hook to fetch the list of Docker containers from the API.
 * It manages loading state, error handling, and container data.
 */
const useFetchContainers = () => {
  const [containers, setContainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContainers = async () => {
      try {
        const response = await fetch('http://localhost:5003/api/containers');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
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
