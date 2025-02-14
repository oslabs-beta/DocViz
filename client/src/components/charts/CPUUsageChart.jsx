import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

// We leave our labels an empty array, because it will get updated on our Dashboard page with poll data
const CPUUsageChart = ({ data }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'CPU Usage',
        data: [],
        borderColor: '#4FD1C5',
        backgroundColor: 'rgba(79, 209, 197, 0.2)',
        tension: 0.2,
      },
    ],
  });

  useEffect(() => {
    if (!data) return;

    // This will set the date for each new location, and make sure we keep only the last 10
    setChartData((prev) => ({
      labels: [...prev.labels, new Date().toLocaleTimeString()].slice(-10),
      datasets: [
        {
          ...prev.datasets[0],
          data: [...prev.datasets[0].data, data.usage].slice(-10),
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

export default CPUUsageChart;
