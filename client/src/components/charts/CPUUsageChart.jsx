import React from 'react';
import { Bar } from 'react-chartjs-2';
import useWebSocket from '../../hooks/useWebSocket';

const CPUUsageChart = ({ containerId }) => {
  // Use environment variable for WebSocket URL
  const WS_SERVER_URL = process.env.REACT_APP_WS_SERVER_URL || 'ws://localhost:4000';
  const { data, error } = useWebSocket(`${WS_SERVER_URL}/ws/${containerId}`);

  // Parse and validate CPU usage
  const parseCPUUsage = (cpuUsage) => {
    if (!cpuUsage) return 0;
    const parsedValue = parseFloat(cpuUsage.replace('%', ''));
    return Math.max(0, Math.min(100, isNaN(parsedValue) ? 0 : parsedValue));
  };

  const cpuUsage = parseCPUUsage(data?.cpuUsage);
  const adjustedCPUUsage = cpuUsage > 0 ? cpuUsage : 0.01;
  const remaining = 100 - adjustedCPUUsage;

  const chartData = {
    labels: ['Remaining', 'CPU Usage (%)'],
    datasets: [
      {
        label: 'CPU Usage (%)',
        data: [remaining, adjustedCPUUsage],
        backgroundColor: ['#3a3a3a', '#ffcc80'],
        borderColor: ['#4a4a4a', '#ffa726'],
        borderWidth: 1.5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { grid: { color: 'rgba(255, 255, 255, 0.1)' }, ticks: { color: '#ccc' } },
      y: { beginAtZero: true, max: 100, ticks: { stepSize: 20, color: '#ccc' }, grid: { color: 'rgba(255, 255, 255, 0.1)' } },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        callbacks: { label: (context) => `${context.label}: ${context.raw.toFixed(2)}%` },
      },
    },
    layout: { padding: { top: 10, bottom: 10 } },
  };

  return (
    <div style={{ width: '100%', height: '250px', margin: '0 auto', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', padding: '1rem', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)' }}>
      <h2 style={{ color: '#fff', marginBottom: '1rem', textAlign: 'center' }}>CPU Usage</h2>
      {error ? <p style={{ color: 'red' }}>Error fetching CPU data: {error.message}</p> : <Bar data={chartData} options={chartOptions} height={150} />}
    </div>
  );
};

export default CPUUsageChart;
