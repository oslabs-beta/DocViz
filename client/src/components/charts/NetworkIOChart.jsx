import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import useWebSocket from '../../hooks/useWebSocket';

const NetworkIOChart = ({ containerId }) => {
  // Use environment variable for WebSocket URL
  const WS_SERVER_URL = process.env.REACT_APP_WS_SERVER_URL || 'ws://localhost:4000';
  const { data, error } = useWebSocket(`${WS_SERVER_URL}/ws/${containerId}`);

  const [hoveredLabel, setHoveredLabel] = useState(null);

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
        backgroundColor: ['#3a3a3a', '#ffcc80'], // Consistent colors
        borderColor: ['#4a4a4a', '#ffa726'], // Slightly darker borders
        borderWidth: 1.5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawBorder: false,
        },
        ticks: { color: '#ccc' },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 50,
          color: '#ccc',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        callbacks: {
          label: function (context) {
            const value = context.raw || 0;
            return `${context.label}: ${value.toFixed(2)} MB`;
          },
        },
      },
    },
    layout: {
      padding: { top: 10, bottom: 10 },
    },
  };

  return (
    <div
      style={{
        width: '100%',
        height: '250px',
        margin: '0 auto',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '8px',
        padding: '1rem',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
        position: 'relative',
      }}
    >
      <h2 style={{ color: '#fff', marginBottom: '1rem', textAlign: 'center' }}>
        Network I/O
      </h2>
      {hoveredLabel && (
        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            padding: '8px',
            borderRadius: '4px',
            pointerEvents: 'none',
            zIndex: 1000,
          }}
        >
          {hoveredLabel === 'RX (Received)' ? `RX: ${rx.toFixed(2)} MB` : `TX: ${tx.toFixed(2)} MB`}
        </div>
      )}
      {error ? (
        <p style={{ color: 'red' }}>Error fetching network data: {error.message}</p>
      ) : (
        <Bar data={chartData} options={chartOptions} height={150} />
      )}
    </div>
  );
};

export default NetworkIOChart;
