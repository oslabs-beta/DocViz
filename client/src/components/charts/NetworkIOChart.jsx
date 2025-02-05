import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

const NetworkIOChart = ({ data }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'RX (Received) MB',
        data: [],
        borderColor: '#4CAF50', // Green for RX
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        tension: 0.2,
      },
      {
        label: 'TX (Transmitted) MB',
        data: [],
        borderColor: '#FF9800', // Orange for TX
        backgroundColor: 'rgba(255, 152, 0, 0.2)',
        tension: 0.2,
      },
    ],
  });

  useEffect(() => {
    if (!data || typeof data.RX !== 'number' || typeof data.TX !== 'number')
      return;

    setChartData((prevData) => ({
      labels: [...prevData.labels, new Date().toLocaleTimeString()].slice(-10),
      datasets: [
        {
          ...prevData.datasets[0],
          data: [...prevData.datasets[0].data, data.RX].slice(-10),
        },
        {
          ...prevData.datasets[1],
          data: [...prevData.datasets[1].data, data.TX].slice(-10),
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
            x: { ticks: { color: '#ccc' } },
            y: { beginAtZero: true },
          },
        }}
      />
    </div>
  );
};

export default NetworkIOChart;
