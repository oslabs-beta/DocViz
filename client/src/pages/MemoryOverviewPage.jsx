import React from 'react';
import Sidebar from '../components/layout/Sidebar';
import MemoryUsageChart from '../components/charts/MemoryUsageChart';

const MemoryOverviewPage = ({ memoryData }) => {
  return (
    <div className='memory-overview'>
      <Sidebar />
      <main className='overview-content'>
        <h1>Memory Usage Overview</h1>
        <MemoryUsageChart data={memoryData} />
      </main>
    </div>
  );
};

export default MemoryOverviewPage;
