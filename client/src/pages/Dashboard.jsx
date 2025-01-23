import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ContainerTable from '../components/tables/ContainerTable';
import CPUUsageChart from '../components/charts/CPUUsageChart';
import MemoryUsageChart from '../components/charts/MemoryUsageChart';
import NetworkIOChart from '../components/charts/NetworkIOChart';
import '../styles/dashboard.css';

const Dashboard = () => {
  const location = useLocation();
  const containerData = location.state?.containerData || []; // Fallback data

  console.log('containerData:', containerData); // Log data for debugging

  const [currentSection, setCurrentSection] = useState('cpu');

  return (
    <div className='dashboard'>
      <h1>Dashboard Overview</h1>
      <br />
      <ContainerTable data={containerData} />
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <CPUUsageChart />
        <MemoryUsageChart containers={containerData} />
        <NetworkIOChart containers={containerData} />
      </div>
    </div>
  );
};

export default Dashboard;
