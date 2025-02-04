import React from 'react';
import { Bar } from 'react-chartjs-2';
import useWebSocket from '../../hooks/useWebSocket';

const MemoryUsageChart = ({ containerId }) => {
  // Use environment variable for WebSocket URL
  const WS_SERVER_URL = process.env.REACT_APP_WS_SERVER_URL || 'ws://localhost:4000';
  const { data, error } = useWebSocket(`${WS_SERVER_URL}/ws/${containerId}`);

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
        suggestedMin: 0,
        suggestedMax: 500,
        ticks: {
          stepSize: 128,
          color: '#ccc',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#ccc',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
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
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '8px',
        padding: '1rem',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
      }}
    >
      <h5 style={{ color: '#fff', marginBottom: '1rem', textAlign: 'center' }}>
        Memory Usage
      </h5>
      {error ? (
        <p style={{ color: 'red' }}>Error fetching memory data: {error.message}</p>
      ) : (
        <Bar data={chartData} options={chartOptions} />
      )}
    </div>
  );
};

export default MemoryUsageChart;
