import React from 'react';
import { Line } from 'react-chartjs-2';

const MemoryUsageChart = ({ data }) => {
  // Check if data is valid and structure is correct
  const isValidData =
    data && Array.isArray(data.timestamps) && Array.isArray(data.memoryUsage);

  if (!isValidData) {
    console.error('Invalid data format for MemoryUsageChart:', data);
    return <div>Error: Invalid data format</div>;
  }

  const chartData = {
    labels: data.timestamps || [], // Fallback to empty array if not available
    datasets: [
      {
        label: 'Memory Usage (MB)',
        data: data.memoryUsage || [], // Fallback to empty array if not available
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
    },
    scales: {
      x: { title: { display: true, text: 'Time' } },
      y: { title: { display: true, text: 'Memory (MB)' } },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default MemoryUsageChart;
