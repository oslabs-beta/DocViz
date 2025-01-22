import React from 'react';
import { Bar } from 'react-chartjs-2';

const MemoryUsageChart = ({ containers }) => {
  const data = {
    labels: containers.map((container) => container.id.substring(0, 12)),
    datasets: [
      {
        label: 'Memory Usage (MB)',
        data: containers.map((container) => container.memoryUsage),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ flex: 1 }}>
      <h2>Memory Usage</h2>
      <Bar data={data} />
    </div>
  );
};

export default MemoryUsageChart;
