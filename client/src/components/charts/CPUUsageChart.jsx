import React from 'react';
import { Bar } from 'react-chartjs-2';
import '../../styles/charts.css';

function CPUUsageChart({ data }) {
  const chartData = {
    labels: data.map((item) => item.image),
    datasets: [
      {
        label: 'CPU Usage (%)',
        data: data.map((item) => item.cpu),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return <Bar data={chartData} />;
}

export default CPUUsageChart;
