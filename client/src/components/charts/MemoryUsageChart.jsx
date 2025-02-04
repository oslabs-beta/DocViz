import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const MemoryUsageChart = ({ data, totalMemory = 1024 }) => {
  // Default to 1024MB if totalMemory isn't provided
  const [chartData, setChartData] = useState({
    labels: ['Memory Usage'], // Single category
    datasets: [
      {
        label: 'Used Memory (MB)',
        data: [0], // Starts empty, updates dynamically
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1.5,
      },
      {
        label: 'Available Memory (MB)',
        data: [totalMemory], // Start with total memory
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1.5,
      },
    ],
  });

  const [lastUpdated, setLastUpdated] = useState('Never');

  useEffect(() => {
    if (!data || !data.memoryUsage) return;

    const usedMemory = parseFloat(data.memoryUsage.replace(/[^\d.]/g, '') || 0);
    const availableMemory = Math.max(totalMemory - usedMemory, 0); // Ensure it doesn't go negative

    setChartData({
      labels: [`Last Updated: ${new Date().toLocaleTimeString()}`], // Update label to show timestamp
      datasets: [
        {
          ...chartData.datasets[0],
          data: [usedMemory], // Update Used Memory
        },
        {
          ...chartData.datasets[1],
          data: [availableMemory], // Update Available Memory
        },
      ],
    });

    setLastUpdated(new Date().toLocaleTimeString());
  }, [data]);

  return (
    <div>
      <div style={{ position: 'relative', height: '300px' }}>
        {' '}
        {/* Set a height that fits the layout */}
        <Bar
          data={chartData}
          options={{
            maintainAspectRatio: false,
            responsive: true,
            scales: {
              y: { beginAtZero: true },
            },
          }}
        />
      </div>
      <p style={{ textAlign: 'center', marginTop: '10px', fontWeight: 'bold' }}>
        Last Updated: {lastUpdated}
      </p>
    </div>
  );
};

export default MemoryUsageChart;
