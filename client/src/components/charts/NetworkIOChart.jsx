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
        borderColor: '#63B3ED',
        backgroundColor: 'rgba(99, 179, 237, 0.2)',
        tension: 0.2,
      },
      {
        label: 'TX (Transmitted) MB',
        data: [],
        borderColor: '#4FD1C5',
        backgroundColor: 'rgba(79, 209, 197, 0.2)',
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
          scales: {
            x: {
              ticks: { color: '#fff' },
              grid: { color: 'rgba(255, 255, 255, 0.1)' },
            },
            y: {
              beginAtZero: true,
              ticks: { color: '#fff' },
              grid: { color: 'rgba(255, 255, 255, 0.1)' },
            },
          },
          plugins: {
            legend: {
              labels: {
                color: '#fff',
              },
            },
          },
        }}
      />
    </div>
  );
};

export default NetworkIOChart;
