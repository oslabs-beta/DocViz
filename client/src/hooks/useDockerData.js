import { useState, useEffect } from 'react';

const useDockerData = (apiEndpoint) => {
  const [containers, setContainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Reset loading for every fetch
      try {
        const response = await fetch(apiEndpoint);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();

        // Debug log
        console.log('API Response:', result);

        // Compare current and new data
        if (JSON.stringify(containers) !== JSON.stringify(result)) {
          setContainers(result); // Only update if data is different
        }

        setError(null); // Clear any previous errors
      } catch (err) {
        console.error('Error fetching Docker data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // Initial fetch
    const interval = setInterval(fetchData, 5000); // Poll every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [apiEndpoint, containers]);

  return { containers, loading, error }; // Return state as an object
};

export default useDockerData;
