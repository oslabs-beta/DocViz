import React from 'react';
import Sidebar from '../components/layout/Sidebar';
import CPUUsageChart from '../components/charts/CPUUsageChart';

const CPUOverviewPage = ({ cpuData }) => {
  return (
    <div className='cpu-overview'>
      <Sidebar />
      <main className='overview-content'>
        <h1>CPU Usage Overview</h1>
        <CPUUsageChart data={cpuData} />
      </main>
    </div>
  );
};

export default CPUOverviewPage;
