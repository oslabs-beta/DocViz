import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import NetworkIOPage from './pages/NetworkIOPage';
import CPUUsagePage from './pages/CPUUsagePage';
import MemoryUsagePage from './pages/MemoryUsagePage';
import Settings from './pages/Settings';
import Sidebar from './components/layout/Sidebar';

const App = () => {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        {/* Sidebar is persistent across pages */}
        <Sidebar />
        <div style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/network-io' element={<NetworkIOPage />} />
            <Route path='/cpu-usage' element={<CPUUsagePage />} />
            <Route path='/memory-usage' element={<MemoryUsagePage />} />
            <Route path='/settings' element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
