import React, { useRef, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import useWebSocket from '../../hooks/useWebSocket';

const NetworkIOChart = ({ containerId }) => {
  const { data, error } = useWebSocket(`ws://localhost:5003/ws/${containerId}`);
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
    maintainAspectRatio: false, // Allow better control over chart size
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // Light grid lines
          drawBorder: false, // Remove axis border
        },
        ticks: {
          color: '#ccc', // Light tick labels
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 50, // Adjust step size as needed
          color: '#ccc', // Light tick labels
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // Light gray grid lines
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Dark tooltip background
        titleColor: '#fff', // Tooltip title color
        bodyColor: '#fff', // Tooltip text color
        callbacks: {
          label: function (context) {
            const value = context.raw || 0;
            return `${context.label}: ${value.toFixed(2)} MB`;
          },
        },
      },
    },
    layout: {
      padding: {
        top: 10, // Add padding to prevent overflow
        bottom: 10,
      },
    },
  };

  return (
    <div
      style={{
        width: '100%',
        height: '250px',
        margin: '0 auto',
        background: 'rgba(255, 255, 255, 0.05)', // Subtle background for contrast
        borderRadius: '8px',
        padding: '1rem',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)', // Add a soft shadow
        position: 'relative',
      }}
    >
      <h2 style={{ color: '#fff', marginBottom: '1rem', textAlign: 'center' }}>Network I/O</h2>
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
          {hoveredLabel === 'RX (Received)'
            ? `RX: ${rx.toFixed(2)} MB`
            : `TX: ${tx.toFixed(2)} MB`}
        </div>
      )}
      {error ? (
        <p style={{ color: 'red' }}>Error fetching network data: {error.message}</p>
      ) : (
        <Bar data={chartData} options={chartOptions} height={150} /> // Smaller chart height
      )}
    </div>
  );
};

export default NetworkIOChart;