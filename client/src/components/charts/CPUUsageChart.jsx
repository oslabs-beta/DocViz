import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const CPUUsageChart = ({ cpuUsage }) => {
  if (!cpuUsage) {
    return (
      <p style={{ color: '#fff', textAlign: 'center' }}>
        No CPU data available
      </p>
    );
  }

  //helper func
  const parsePercentage = (cpuUsage) => {
    const match = cpuUsage.match(/([\d.]+)%/); // Match digits followed by %
    if (match) {
      return parseFloat(match[1]); // Extract and parse the numeric part
    }
    return 0; // Fallback if parsing fails
  };

  const percentage = parsePercentage(cpuUsage);

  const chartData = {
    labels: ['CPU Usage (%)', 'Remaining'],
    datasets: [
      {
        label: 'CPU Usage (%)',
        data: [percentage, 100-percentage],
        backgroundColor: ['#ffce56', '#ddd'],
        hoverBackgroundColor: ['#ffce56', '#aaa'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: '80%', height: '250px', margin: '0 auto' }}>
      <Doughnut data={chartData} />
    </div>
  );
};

export default CPUUsageChart;
