import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/HomePage';
import ContainerDetails from './pages/ContainerDetails';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/container/:containerId' element={<ContainerDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
