import React from 'react';
import { useLocation } from 'react-router-dom';
import NetworkIOChart from '../components/charts/NetworkIOChart';

const NetworkIOPage = () => {
  const location = useLocation();
  const containerData = location.state?.containerData || [];

  return (
    <div>
      <h1>Network I/O Details</h1>
      <NetworkIOChart containers={containerData} />
    </div>
  );
};

export default NetworkIOPage;
