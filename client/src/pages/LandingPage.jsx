import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const mockContainerData = [
    {
      id: 'container1',
      status: 'running',
      networkIO: 120,
      cpuUsage: 30,
      memoryUsage: 500,
    },
    {
      id: 'container2',
      status: 'stopped',
      networkIO: 50,
      cpuUsage: 10,
      memoryUsage: 200,
    },
  ];

  return (
    <div>
      <h1>Welcome to DocViz</h1>
      <p>Start visualizing your Docker containers now!</p>
      <Link
        to={{
          pathname: '/dashboard',
          state: { containerData: mockContainerData },
        }}
        style={{
          padding: '10px 20px',
          background: '#007BFF',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px',
        }}
      >
        Go to Dashboard
      </Link>
    </div>
  );
};

export default LandingPage;
