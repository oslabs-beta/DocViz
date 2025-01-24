import React from 'react';
import { useParams } from 'react-router-dom';
import CPUUsageChart from '../components/charts/CPUUsageChart';
import MemoryUsageChart from '../components/charts/MemoryUsageChart';
import NetworkIOChart from '../components/charts/NetworkIOChart';
import Sidebar from '../components/layout/Sidebar';
import '../styles/dashboard.css';

const Dashboard = ({ container }) => {
  if (!container) {
    return <p>Loading container data...</p>;
  }

  return (
    <div className='dashboard'>
      <Sidebar />
      <main className='dashboard-content'>
        <h1>Dashboard for {container.name}</h1>
        <p>
          <strong>Image:</strong> {container.image}
        </p>
        <p>
          <strong>Status:</strong> {container.status}
        </p>

        <div className='chart-section'>
          <CPUUsageChart data={container.cpuUsage} />
          <MemoryUsageChart data={container.memoryUsage} />
          <NetworkIOChart data={container.networkIO} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
