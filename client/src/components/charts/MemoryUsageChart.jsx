import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const MemoryUsageChart = () => {
  const [containers, setContainers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/stats');
        const data = await response.json();
        setContainers(data);
      } catch (error) {
        console.error('Error fetching container stats:', error);
      }
    };

    // Fetch data every 5 seconds
    const intervalId = setInterval(fetchData, 5000);

    // Fetch immediately and set up interval
    fetchData();

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const data = {
    labels: containers.map((container) => container.Name),
    datasets: [
      {
        label: 'Memory Usage (MB)',
        data: containers.map((container) =>
          parseFloat(container.MemUsage.split('/')[0])
        ), // Parse memory usage
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ flex: 1 }}>
      <h2>Memory Usage</h2>
      <Bar data={data} />
    </div>
  );
};

export default MemoryUsageChart;
