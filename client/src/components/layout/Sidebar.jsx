import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/dashboard.css';

function Sidebar() {
  return (
    <div className='sidebar'>
      <h2>Dashboard</h2>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/dashboard'>Dashboard</Link>
          </li>
          <li>
            <Link to='/network-overview'>Network Overview</Link>
          </li>
          <li>
            <Link to='/cpu-overview'>CPU Overview</Link>
          </li>
          <li>
            <Link to='/memory-overview'>Memory Overview</Link>
          </li>
          <li>
            <Link to='/settings'>Settings</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
