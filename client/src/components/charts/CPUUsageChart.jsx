import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import useWebSocket from '../../hooks/useWebSocket';

const CPUUsageChart = ({ containerId }) => {
  const { data, error } = useWebSocket(`ws://localhost:5003/ws/${containerId}`);

  // Parse and validate CPU usage
  const parseCPUUsage = (cpuUsage) => {
    if (!cpuUsage) return 0;
    // Remove non-numeric characters (e.g., "%") and parse as a float
    const parsedValue = parseFloat(cpuUsage.replace('%', ''));
    // Ensure the value is between 0 and 100
    return isNaN(parsedValue) || parsedValue < 0 || parsedValue > 100
      ? 0
      : parsedValue;
  };

  const cpuUsage = parseCPUUsage(data?.cpuUsage);

  const chartData = {
    labels: ['CPU Usage (%)', 'Remaining'],
    datasets: [
      {
        label: 'CPU Usage (%)',
        data: [cpuUsage, 100 - cpuUsage],
        backgroundColor: ['#ffce56', '#ddd'],
        hoverBackgroundColor: ['#ffce56', '#aaa'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    rotation: Math.PI * 1.5, // Start angle
    circumference: Math.PI * 2, // Full circle
    cutoutPercentage: 60, // Inner radius (Donut shape)
  };

  return (
    <div style={{ width: '80%', height: '250px', margin: '0 auto' }}>
      {error ? (
        <p style={{ color: 'red' }}>Error fetching CPU data: {error.message}</p>
      ) : (
        <Doughnut data={chartData} options={chartOptions} />
      )}
    </div>
  );
};

export default CPUUsageChart;
