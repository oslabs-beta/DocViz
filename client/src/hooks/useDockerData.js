import { useState, useEffect } from 'react';

const useDockerData = (apiEndpoint) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiEndpoint);
        const result = await response.json();
        setData(result.containers); // Assumes API returns `containers` array.
      } catch (error) {
        console.error('Error fetching Docker data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 1000); // Poll every second.

    return () => clearInterval(interval); // Cleanup interval on unmount.
  }, [apiEndpoint]);

  return data;
};

export default useDockerData;
