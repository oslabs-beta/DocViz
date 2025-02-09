import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

// We leave our labels an empty array, because it will get updated on our Dashboard page with poll data
const CPUUsageChart = ({ data }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{ label: 'CPU Usage', data: [], borderColor: '#FFA500' }],
  });

  useEffect(() => {
    if (!data) return;

    // This will set the date for each new location, and make sure we keep only the last 10
    setChartData((prev) => ({
      labels: [...prev.labels, new Date().toLocaleTimeString()].slice(-10),
      datasets: [
        {
          ...prev.datasets[0],
          data: [...prev.datasets[0].data, data.usage].slice(-10),
        },
      ],
    }));
  }, [data]);

  return <Line data={chartData} />;
};

export default CPUUsageChart;
