import React from 'react';
import { Bar } from 'react-chartjs-2';
import useWebSocket from '../../hooks/useWebSocket';

const MemoryUsageChart = ({ containerId }) => {
  const { data, error } = useWebSocket(`ws://localhost:5003/ws/${containerId}`);
  const memoryUsage = parseFloat(data?.memoryUsage || 0);

  const chartData = {
    labels: [containerId.substring(0, 12)],
    datasets: [
      {
        label: 'Memory Usage (MB)',
        data: [memoryUsage],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        min: 0, // Set minimum value for y-axis
        max: 1024, // Set max value for y-axis (adjust based on expected max memory usage)
        ticks: {
          stepSize: 128, // Adjust step size as needed
        },
      },
    },
  };

  return (
    <div>
      <h5 style={{ color: '#fff', marginBottom: '1rem' }}>Memory Usage</h5>
      {error ? (
        <p style={{ color: 'red' }}>
          Error fetching memory data: {error.message}
        </p>
      ) : (
        <Bar data={chartData} options={chartOptions} />
      )}
    </div>
  );
};

export default MemoryUsageChart;
