import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import useWebSocket from '../../hooks/useWebSocket';

const CPUUsageChart = ({ containerId }) => {
  const { data, error } = useWebSocket(`ws://localhost:5003/ws/${containerId}`);
  const cpuUsage = data?.cpuUsage || 0;

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
