import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

// For our current example we set the data total to 200, but it will expand with bigger sets
const MemoryUsageChart = ({ data, totalMemory = 200 }) => {
  const [chartData, setChartData] = useState({
    labels: [], // This will be updated on our Dashbaord
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
    if (!data) return;

    // our used memory and available memory, this will return a numerical value
    const usedMemory = data.memoryUsage || 0;
    const availableMemory = Math.max(totalMemory - usedMemory, 0);

    // this will update our chart data
    setChartData((prev) => ({
      labels: [...prev.labels, new Date().toLocaleTimeString()].slice(-10),
      datasets: [
        {
          ...prev.datasets[0],
          data: [...prev.datasets[0].data, usedMemory].slice(-10),
        },
        {
          ...prev.datasets[1],
          data: [...prev.datasets[1].data, availableMemory].slice(-10),
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
