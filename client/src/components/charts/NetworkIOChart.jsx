import React from 'react';
import { Bar } from 'react-chartjs-2';

const NetworkIOChart = ({ data }) => {
  // Check if the data is valid and contains the required properties
  const isValidData =
    data &&
    Array.isArray(data.timestamps) &&
    Array.isArray(data.networkIn) &&
    Array.isArray(data.networkOut);

  if (!isValidData) {
    console.error('Invalid data format for NetworkIOChart:', data);
    return <div>Error: Invalid data format</div>;
  }

  const chartData = {
    labels: data.timestamps || [], // Fallback to an empty array if timestamps are not available
    datasets: [
      {
        label: 'Network In (KB)',
        data: data.networkIn || [], // Fallback to an empty array if networkIn is not available
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Network Out (KB)',
        data: data.networkOut || [], // Fallback to an empty array if networkOut is not available
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
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
      y: { title: { display: true, text: 'Data (KB)' } },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default NetworkIOChart;
