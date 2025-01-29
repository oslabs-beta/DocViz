import React from 'react';
import { Bar } from 'react-chartjs-2';
import useWebSocket from '../../hooks/useWebSocket';

const CPUUsageChart = ({ containerId }) => {
  const { data, error } = useWebSocket(`ws://localhost:5003/ws/${containerId}`);

  // Parse and validate CPU usage
  const parseCPUUsage = (cpuUsage) => {
    if (!cpuUsage) return 0; // Default to 0 if not available
    const parsedValue = parseFloat(cpuUsage.replace('%', '')); // Remove % and parse as float
    return Math.max(0, Math.min(100, isNaN(parsedValue) ? 0 : parsedValue)); // Clamp between 0 and 100
  };

  const cpuUsage = parseCPUUsage(data?.cpuUsage);

  // Ensure both slices are always visible, even when one value is 0
  const adjustedCPUUsage = cpuUsage > 0 ? cpuUsage : 0.01; // Add a tiny value for visibility
  const remaining = 100 - adjustedCPUUsage;

  const chartData = {
    labels: ['Remaining', 'CPU Usage (%)'], // Update labels
    datasets: [
      {
        label: 'CPU Usage (%)',
        data: [remaining, adjustedCPUUsage], // Remaining first, then usage
        backgroundColor: ['#3a3a3a', '#ffcc80'], // Light gray for remaining, bright orange for usage
        borderColor: ['#4a4a4a', '#ffa726'], // Slightly darker borders for better definition
        borderWidth: 1.5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allow chart height to adjust independently
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // Light gray grid lines
          drawBorder: false, // Remove axis border
        },
        ticks: {
          color: '#ccc', // Light tick labels
        },
      },
      y: {
        beginAtZero: true,
        max: 100, // Ensure the y-axis doesn't go beyond 100%
        ticks: {
          stepSize: 20,
          color: '#ccc', // Light tick labels
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // Light gray grid lines
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
        bodyColor: '#fff', // Tooltip text color
        callbacks: {
          label: function (context) {
            const value = context.raw || 0;
            return `${context.label}: ${value.toFixed(2)}%`;
          },
        },
      },
    },
    layout: {
      padding: {
        top: 10, // Add some padding above the chart
        bottom: 10, // Add padding below the chart
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
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)', // Add a soft shadow
      }}
    >
      <h2 style={{ color: '#fff', marginBottom: '1rem', textAlign: 'center' }}>CPU Usage</h2>
      {error ? (
        <p style={{ color: 'red' }}>Error fetching CPU data: {error.message}</p>
      ) : (
        <Bar data={chartData} options={chartOptions} height={150} /> // Reduced height for the chart
      )}
    </div>
  );
};

export default CPUUsageChart;