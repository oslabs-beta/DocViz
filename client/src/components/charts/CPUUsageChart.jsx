import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const CPUUsageChart = ({ containers }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Example CPU usage data
    const cpuData = containers
      ? containers.map((container) => container.cpuUsage)
      : [20, 30, 25, 35, 40, 50]; // Default data if no containers are provided
    const labels = containers
      ? containers.map((container) => container.id.substring(0, 12))
      : ['10s ago', '8s ago', '6s ago', '4s ago', '2s ago', 'Now'];

    const cpuChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'CPU Usage (%)',
            data: cpuData,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 1,
            tension: 0.4, // Smooth curves
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Ensures consistent size
        plugins: {
          legend: {
            position: 'top',
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'CPU Usage (%)',
            },
          },
          x: {
            title: {
              display: true,
              text: 'Time',
            },
          },
        },
      },
    });

    return () => {
      cpuChart.destroy(); // Clean up the chart instance on component unmount
    };
  }, [containers]);

  return (
    <div style={{ flex: 1, height: '300px', padding: '10px' }}>
      <h2>CPU Usage</h2>
      <canvas ref={chartRef} />
    </div>
  );
};

export default CPUUsageChart;
