import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

// The empty array will constantly be updated with our polling 
const NetworkIOChart = ({ data }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'RX (Received) MB',
        data: [],
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        tension: 0.2,
      },
      {
        label: 'TX (Transmitted) MB',
        data: [],
        borderColor: '#FF9800',
        backgroundColor: 'rgba(255, 152, 0, 0.2)',
        tension: 0.2,
      },
    ],
  });

  useEffect(() => {
    if (!data) return;

    // This will constantly update our charts with the current time of update.
    setChartData((prev) => ({
      labels: [...prev.labels, new Date().toLocaleTimeString()].slice(-10),
      datasets: [
        {
          ...prev.datasets[0],
          data: [...prev.datasets[0].data, data.RX || 0].slice(-10),
        },
        {
          ...prev.datasets[1],
          data: [...prev.datasets[1].data, data.TX || 0].slice(-10),
        },
      ],
    }));
  }, [data]);

  return (
    <div style={{ position: 'relative', height: '300px' }}>
      <Line
        data={chartData}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          animation: { duration: 500 },
          scales: { x: { ticks: { color: '#ccc' } }, y: { beginAtZero: true } },
        }}
      />
    </div>
  );
};

export default NetworkIOChart;
