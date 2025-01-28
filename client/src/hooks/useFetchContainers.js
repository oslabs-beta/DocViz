import { useState, useEffect } from 'react';

const useFetchContainers = (apiEndpoint = 'http://localhost:5003/api/containers') => {
  const [containers, setContainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true; // Avoid state updates after unmount

    const fetchContainers = async () => {
      try {
        const response = await fetch(apiEndpoint);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        if (isMounted && JSON.stringify(data) !== JSON.stringify(containers)) {
          setContainers(data);
        }
      } catch (err) {
        console.error('Error fetching containers:', err);
        if (isMounted) {
          setError(err.message);
          setContainers(null); // Differentiate error from empty data
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchContainers();

    return () => {
      isMounted = false; // Clean up on unmount
    };
  }, [apiEndpoint]); // Rerun only if API endpoint changes

  return { containers, loading, error };
};

export default useFetchContainers;
