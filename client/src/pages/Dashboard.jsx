import React, { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import ChartContainer from '../components/tables/ContainerTable';
import '../styles/dashboard.css';

const Dashboard = ({ containerData }) => {
  const [currentSection, setCurrentSection] = useState('cpu');

  const stats = {
    total: containerData.length,
    running: containerData.filter((container) => container.status === 'running')
      .length,
    stopped: containerData.filter((container) => container.status !== 'running')
      .length,
  };

  return (
    <div className='dashboard'>
      <Sidebar stats={stats} onSectionChange={setCurrentSection} />
      <ChartContainer section={currentSection} data={containerData} />
    </div>
  );
};

export default Dashboard;
