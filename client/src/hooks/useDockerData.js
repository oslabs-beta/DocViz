import { useState, useEffect } from 'react';

const useDockerData = () => {
  const [containers, setContainers] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5003/api/containers'); // Backend API endpoint
      const data = await response.json();

      console.log('API Response:', data); // Log the response for debugging

      if (!Array.isArray(data)) {
        throw new Error('Expected an array of containers');
      }

      // Set containers directly since the backend sends an array
      setContainers(data);
    } catch (error) {
      console.error('Error fetching Docker data:', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { containers, error };
};

export default useDockerData;
