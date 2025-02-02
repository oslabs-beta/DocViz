import React, { useRef, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';

const NetworkIOChart = ({ container }) => {
  const chartRef = useRef(null)

  // Validate the container prop
  if (!container || !container.networkIO) {
    return (
      <div style={{ flex: 1 }}>
        <h5 style={{ color: '#fff', marginBottom: '1rem' }}>Network I/O</h5>
        <p style={{ color: '#fff', textAlign: 'center' }}>No data available</p>
      </div>
    );
  }

  // Update chart data dynamically without re-rendering the chart
  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = chartRef.current.chartInstance;

      // Update chart data
      chartInstance.data.datasets[0].data = [parseFloat(container.networkIO || 0)];
      chartInstance.update(); // Trigger the chart update
    }
  }, [container.networkIO]); // Only update when networkIO changes

  const chartData = {
    labels: ['Network I/O'], // Static labels
    datasets: [
      {
        label: 'Network I/O (MB)',
        data: [parseFloat(container.networkIO || 0)], // Initial data
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  return (
    <div style={{ flex: 1 }}>
      <h5 style={{ color: '#fff', marginBottom: '1rem' }}>Network I/O</h5>
      <Doughnut ref={chartRef} data={chartData} options={chartOptions} />
    </div>
  );
};

export default NetworkIOChart;
