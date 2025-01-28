import React from 'react';
import { Bar } from 'react-chartjs-2';

const MemoryUsageChart = ({ memoryUsage }) => {

  if (!memoryUsage) {
    return (
      <p style={{ color: '#fff', textAlign: 'center' }}>
        No memory data available
      </p>
    );
  }

  const data = {
    labels: ['memory usage'],
    datasets: [
      {
        label: 'Memory Usage (MB)',
        data: [parseFloat(memoryUsage || 0)],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h5 style={{ color: '#fff', marginBottom: '1rem' }}>Memory Usage</h5>
      <Bar data={data} />
    </div>
  );
};

export default MemoryUsageChart;
