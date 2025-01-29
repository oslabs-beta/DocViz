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
        backgroundColor: 'rgba(54, 162, 235, 0.6)', // Light blue
        borderColor: 'rgba(54, 162, 235, 1)', // Blue border
        borderWidth: 1.5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      y: {
        beginAtZero: true,
        suggestedMin: 0, // Prevent bars from leaking below the chart
        suggestedMax: 500, // Adjust max value based on expected memory usage
        ticks: {
          stepSize: 128, // Adjust step size as needed
          color: '#ccc', // Light gray for ticks
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // Light gray grid lines
        },
      },
      x: {
        grid: {
          display: false, // Remove x-axis grid lines for a cleaner look
        },
        ticks: {
          color: '#ccc', // Light gray for ticks
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hide legend for simplicity
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Dark tooltip background
        titleColor: '#fff', // Tooltip title color
        bodyColor: '#fff', // Tooltip body text color
        callbacks: {
          label: function (context) {
            const value = context.raw || 0;
            return `${context.label}: ${value.toFixed(2)} MB`;
          },
        },
      },
    },
  };

  return (
    <div
      style={{
        width: '100%',
        height: '250px',
        margin: '0 auto',
        background: 'rgba(255, 255, 255, 0.05)', // Subtle background for contrast
        borderRadius: '8px',
        padding: '1rem',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)', // Soft shadow
      }}
    >
      <h5 style={{ color: '#fff', marginBottom: '1rem', textAlign: 'center' }}>
        Memory Usage
      </h5>
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