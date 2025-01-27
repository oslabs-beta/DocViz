import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import useDockerData from '../../hooks/useDockerData'; // Import the polling hook

const CPUUsageChart = ({ containerId }) => {
  const { containers, loading, error } = useDockerData(
    `http://localhost:5003/api/containers/`
  );

  if (loading) {
    return <p style={{ color: '#fff', textAlign: 'center' }}>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: '#fff', textAlign: 'center' }}>Error: {error}</p>;
  }

  const container = containers.find((c) => c.id === containerId);
  if (!container) {
    return (
      <p style={{ color: '#fff', textAlign: 'center' }}>
        No CPU data available
      </p>
    );
  }

  const chartData = {
    labels: ['CPU Usage (%)', 'Remaining'],
    datasets: [
      {
        label: 'CPU Usage (%)',
        data: [container.cpuUsage, 100 - container.cpuUsage],
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
