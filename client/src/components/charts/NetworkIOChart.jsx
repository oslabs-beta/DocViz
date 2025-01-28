import React from 'react';
import { Line } from 'react-chartjs-2';
import useWebSocket from '../../hooks/useWebSocket';

const NetworkIOChart = ({ containerId }) => {
  const { data, error } = useWebSocket(`ws://localhost:5003/ws/${containerId}`);
  const networkIO = data?.networkIO
    ? parseFloat(data.networkIO.replace(' MB', ''))
    : 0; // Remove " MB" and convert to number

  const chartData = {
    labels: ['Network I/O'],
    datasets: [
      {
        label: 'Network I/O (MB)',
        data: [networkIO],
        fill: false,
        borderColor: 'rgba(153, 102, 255, 1)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        min: 0, // Set minimum value for y-axis
        max: 100, // Set maximum value for y-axis (adjust based on expected network traffic)
      },
    },
  };

  return (
    <div style={{ flex: 1 }}>
      <h2 style={{ color: '#fff', marginBottom: '1rem' }}>Network I/O</h2>
      {error ? (
        <p style={{ color: 'red' }}>
          Error fetching network data: {error.message}
        </p>
      ) : !data ? (
        <p>Loading Network IO data...</p>
      ) : (
        <Line data={chartData} options={chartOptions} />
      )}
    </div>
  );
};

export default NetworkIOChart;
