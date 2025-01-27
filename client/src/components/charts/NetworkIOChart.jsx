import React from 'react';
import { Line } from 'react-chartjs-2';
import useDockerData from '../../hooks/useDockerData'; // Import the polling hook

const NetworkIOChart = ({ containerId }) => {
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
        No network data available
      </p>
    );
  }

  const data = {
    labels: [container.id.substring(0, 12)],
    datasets: [
      {
        label: 'Network I/O (MB)',
        data: [parseFloat(container.networkIO || 0)],
        fill: false,
        borderColor: 'rgba(153, 102, 255, 1)',
        tension: 0.4,
      },
    ],
  };

  return (
    <div style={{ flex: 1 }}>
      <h2 style={{ color: '#fff', marginBottom: '1rem' }}>Network I/O</h2>
      <Line data={data} />
    </div>
  );
};

export default NetworkIOChart;
