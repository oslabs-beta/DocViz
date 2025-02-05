import { useState, useEffect } from 'react';

const useDockerData = (containerId) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      fetch(`/api/containers/${containerId}/stats`)
        .then((res) => res.json())
        .then((json) => {
          setData(json);
        })
        .catch((err) => console.error('Error fetching data:', err));
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Poll every 5 seconds

    return () => clearInterval(interval);
  }, [containerId]);

  return data;
};

export default useDockerData;
