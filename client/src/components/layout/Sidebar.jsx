import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div
      style={{
        width: '200px',
        background: '#f8f9fa',
        padding: '20px',
        height: '100vh',
      }}
    >
      <h2>DocViz</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={{ marginBottom: '10px' }}>
          <Link to='/'>Home</Link>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <Link to='/dashboard'>Dashboard</Link>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <Link to='/network-io'>Network I/O</Link>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <Link to='/cpu-usage'>CPU Usage</Link>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <Link to='/memory-usage'>Memory Usage</Link>
        </li>
        <li>
          <Link to='/settings'>Settings</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
