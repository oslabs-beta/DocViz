import React from 'react';
import { Line } from 'react-chartjs-2';

const NetworkIOChart = ({ containers }) => {
  const data = {
    labels: containers.map((container) => container.id.substring(0, 12)),
    datasets: [
      {
        label: 'Network I/O (MB)',
        data: containers.map((container) => container.networkIO),
        fill: false,
        borderColor: 'rgba(153, 102, 255, 1)',
        tension: 0.4,
      },
    ],
  };

  return (
    <div style={{ flex: 1 }}>
      <h2>Network I/O</h2>
      <Line data={data} />
    </div>
  );
};

export default NetworkIOChart;
