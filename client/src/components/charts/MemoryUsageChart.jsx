import React from 'react';
import { Doughnut } from 'react-chartjs-2';


const MemoryUsageChart = ({ containers }) => {
  // Prepare the data for each container
  const data = {
    labels: containers.map((container) => container.id.substring(0, 12)),
    datasets: containers.map((container) => ({
      label: `Memory Usage for ${container.id.substring(0, 12)}`,
      data: [container.memoryUsage, container.totalMemory - container.memoryUsage],
      backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
      borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
      borderWidth: 1,
    })),
  };

  // Options for customizing the chart
  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: ${value} MB`;
          },
        },
      },
    },
  };

  return (
    <div style={{ flex: 1 }}>
      <h2>Memory Usage</h2>
      {containers.map((container, index) => (
        <div key={container.id} style={{ marginBottom: '40px' }}>
          <h4>{container.id.substring(0, 12)}</h4>
          <Doughnut
            data={{
              labels: ['Used Memory', 'Free Memory'],
              datasets: [
                {
                  label: `Memory Usage for ${container.id.substring(0, 12)}`,
                  data: [container.memoryUsage, container.totalMemory - container.memoryUsage],
                  backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
                  borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                  borderWidth: 1,
                },
              ],
            }}
            options={options}
          />
        </div>
      ))}
    </div>
  );
};

export default MemoryUsageChart;