import React from 'react';
import { Pie } from 'react-chartjs-2';

const StatusPieChart = ({ containers }) => {
  const statusCounts = {
    running: containers.filter((c) => c.status === 'running').length,
    stopped: containers.filter((c) => c.status === 'stopped').length,
    paused: containers.filter((c) => c.status === 'paused').length,
  };

  const data = {
    labels: ['Running', 'Stopped', 'Paused'],
    datasets: [
      {
        data: [statusCounts.running, statusCounts.stopped, statusCounts.paused],
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
      },
    ],
  };

  return (
    <div>
      <h2>Container Status</h2>
      <Pie data={data} />
    </div>
  );
};

export default StatusPieChart;
