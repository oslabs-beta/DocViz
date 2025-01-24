import React from 'react';
import { Line } from 'react-chartjs-2';

const CPUUsageChart = ({ data }) => {
  // Ensure data is not undefined or empty
  if (!data || data.length === 0) {
    return <p>No CPU usage data available.</p>;
  }

  // Example data structure for Chart.js
  const chartData = {
    labels: data.map((_, index) => `Point ${index + 1}`), // Example labels
    datasets: [
      {
        label: 'CPU Usage (%)',
        data: data, // Use provided data
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return <Line data={chartData} options={options} />;
};

export default CPUUsageChart;
