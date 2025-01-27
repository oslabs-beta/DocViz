import React from 'react';
import { Bar } from 'react-chartjs-2';
import useDockerData from '../../hooks/useDockerData'; // Import the polling hook

const MemoryUsageChart = ({ containerId }) => {
  const { containers, loading, error } = useDockerData(
    `http://localhost:5003/api/containers/`
  );

  if (loading) {
    return <p style={{ color: '#fff', textAlign: 'center' }}>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: '#fff', textAlign: 'center' }}>Error: {error}</p>;
  }

  const container = containers.find((c) => c.id === containerId);
  if (!container) {
    return (
      <p style={{ color: '#fff', textAlign: 'center' }}>
        No memory data available
      </p>
    );
  }

  const data = {
    labels: [container.id.substring(0, 12)],
    datasets: [
      {
        label: 'Memory Usage (MB)',
        data: [parseFloat(container.memoryUsage || 0)],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h5 style={{ color: '#fff', marginBottom: '1rem' }}>Memory Usage</h5>
      <Bar data={data} />
    </div>
  );
};

export default MemoryUsageChart;
