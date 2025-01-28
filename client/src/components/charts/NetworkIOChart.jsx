import React from 'react';
import { Bar } from 'react-chartjs-2';
import useWebSocket from '../../hooks/useWebSocket';

const NetworkIOChart = ({ containerId }) => {
  const { data, error } = useWebSocket(`ws://localhost:5003/ws/${containerId}`);

  // Helper function to parse RX and TX values
  const parseNetworkIO = (networkIO) => {
    if (!networkIO) return { rx: 0, tx: 0 };

    const rxMatch = networkIO.match(/RX:\s*([\d.]+)\s*MB/);
    const txMatch = networkIO.match(/TX:\s*([\d.]+)\s*MB/);

    return {
      rx: rxMatch ? parseFloat(rxMatch[1]) : 0,
      tx: txMatch ? parseFloat(txMatch[1]) : 0,
    };
  };

  const { rx, tx } = parseNetworkIO(data?.networkIO);

  const chartData = {
    labels: ['RX (Received)', 'TX (Transmitted)'],
    datasets: [
      {
        label: 'Network I/O (MB)',
        data: [rx, tx],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false, // No legend needed for a simple bar chart
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw.toFixed(2)} MB`;
          },
        },
      },
    },
  };

  return (
    <div style={{ flex: 1 }}>
      <h2 style={{ color: '#fff', marginBottom: '1rem' }}>Network I/O</h2>
      {error ? (
        <p style={{ color: 'red' }}>
          Error fetching network data: {error.message}
        </p>
      ) : !data ? (
        <p>Loading Network IO data...</p>
      ) : (
        <Bar data={chartData} options={chartOptions} />
      )}
    </div>
  );
};

export default NetworkIOChart;
