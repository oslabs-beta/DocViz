import React from 'react';
import { Doughnut } from 'react-chartjs-2';
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
        label: 'CPU Usage Chart',
        data: [remaining, adjustedCPUUsage], // Remaining first, then usage
        backgroundColor: ['#ffce56', '#ddd'], // Yellow for remaining, gray for usage
        hoverBackgroundColor: ['#ffce56', '#aaa'], // Adjust hover colors
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true, // Maintain aspect ratio for responsiveness
    rotation: Math.PI * 1.5, // Start angle
    circumference: Math.PI * 2, // Full circle
    cutout: '60%', // Inner radius (Doughnut shape)
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: ${value.toFixed(2)}%`;
          },
        },
      },
    },
  };

  return (
    <div
      style={{
        width: '40%', // Reduced size
        height: '200px',
        margin: '0 auto',
      }}
    >
      {error ? (
        <p style={{ color: 'red' }}>Error fetching CPU data: {error.message}</p>
      ) : (
        <Doughnut data={chartData} options={chartOptions} />
      )}
    </div>
  );
};

export default CPUUsageChart;
