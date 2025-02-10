import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import { NotificationProvider } from './utils/NotificationProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';

const App = () => {
  return (
    <NotificationProvider>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route
            path='/container/:containerId'
            element={<Dashboard />}
          />
        </Routes>
      </Router>
    </NotificationProvider>
  );
};

export default App;
