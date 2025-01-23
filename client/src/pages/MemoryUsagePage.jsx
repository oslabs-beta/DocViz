import React from 'react';
import { useLocation } from 'react-router-dom';
import MemoryUsageChart from '../components/charts/MemoryUsageChart';

const MemoryUsagePage = () => {
  const location = useLocation();
  const containerData = location.state?.containerData || [];

  return (
    <div>
      <h1>Memory Usage Details</h1>
      <MemoryUsageChart containers={containerData} />
    </div>
  );
};

export default MemoryUsagePage;
