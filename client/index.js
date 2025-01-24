import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './src/App';
import './src/styles/dashboard.css';
import './src/utils/chartSetup';

// Apply the saved theme when the app loads
const savedTheme = localStorage.getItem('theme') || 'light';
document.body.setAttribute('data-theme', savedTheme);

const mockData = {
  containers: [
    {
      id: '1',
      name: 'web-server',
      image: 'nginx:latest',
      status: 'Running',
      cpuUsage: [5, 15, 20],
      memoryUsage: [200, 250, 300],
      networkIO: { received: 1000, sent: 2000 },
    },
    {
      id: '2',
      name: 'db-server',
      image: 'postgres:13',
      status: 'Running',
      cpuUsage: [10, 25, 35],
      memoryUsage: [400, 450, 500],
      networkIO: { received: 2000, sent: 1500 },
    },
  ],
  cpuData: [10, 20, 30],
  memoryData: [200, 300, 400],
  networkData: [
    { time: '10:00', received: 500, sent: 300 },
    { time: '10:05', received: 600, sent: 350 },
  ],
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App containerData={mockData} />);
