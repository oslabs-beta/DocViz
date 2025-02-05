import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

const MemoryUsageChart = ({ data, totalMemory = 200 }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Used Memory (MB)',
        data: [],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.2,
      },
      {
        label: 'Available Memory (MB)',
        data: [],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.2,
      },
    ],
  });

  useEffect(() => {
    if (!data || typeof data.memoryUsage !== 'number') return;

    console.log('Memory Chart Received Data:', data.memoryUsage); // Debugging Log

    const usedMemory = data.memoryUsage || 0;
    const availableMemory = Math.max(totalMemory - usedMemory, 0);

    setChartData((prevChartData) => ({
      labels: [...prevChartData.labels, new Date().toLocaleTimeString()].slice(
        -10
      ),
      datasets: [
        {
          ...prevChartData.datasets[0],
          data: [...prevChartData.datasets[0].data, usedMemory].slice(-10),
        },
        {
          ...prevChartData.datasets[1],
          data: [...prevChartData.datasets[1].data, availableMemory].slice(-10),
        },
      ],
    }));
  }, [data, totalMemory]);

  return (
    <div style={{ position: 'relative', height: '300px' }}>
      <Line
        data={chartData}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          animation: { duration: 500 },
          scales: {
            x: { ticks: { color: '#ccc' } },
            y: { beginAtZero: true, max: totalMemory },
          },
        }}
      />
    </div>
  );
};

export default MemoryUsageChart;
