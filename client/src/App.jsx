import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import useDockerData from './hooks/useDockerData';

const App = () => {
  const containerData = useDockerData('http://localhost:4000/api/containers'); // Replace with your actual API endpoint.

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage containers={containerData} />} />
        <Route path='/dashboard/:id' element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
