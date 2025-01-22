import React from 'react';
import Navbar from '../components/layout/Navbar';
import DockerStats from '../components/DockerStats';

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <DockerStats />
    </>
  );
};

export default Dashboard;
