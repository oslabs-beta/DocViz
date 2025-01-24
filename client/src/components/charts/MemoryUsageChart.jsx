import React from 'react';
import { Line } from 'react-chartjs-2';

const MemoryUsageChart = ({ data }) => {
  const chartData = {
    labels: data.timestamps,
    datasets: [
      {
        label: 'Memory Usage (MB)',
        data: data.memoryUsage,
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
