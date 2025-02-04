import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

const CPUUsageChart = ({ data }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{ label: 'CPU Usage', data: [], borderColor: '#FFA500' }],
  });

  useEffect(() => {
    if (!data) return;

    setChartData((prevData) => ({
      labels: [...prevData.labels, new Date().toLocaleTimeString()].slice(-10),
      datasets: [
        {
          ...prevData.datasets[0],
          data: [...prevData.datasets[0].data, data.usage].slice(-10),
        },
      ],
    }));
  }, [data]);

  return <Line data={chartData} />;
};

export default CPUUsageChart;
