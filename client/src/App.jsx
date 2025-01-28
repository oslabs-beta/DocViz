import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import useFetchContainers from './hooks/useFetchContainers';

const App = () => {
  const { containers, loading, error } = useFetchContainers();
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage containers={containers} loading={loading} error={error}/>} />
        <Route path='/container/:containerId' element={<Dashboard containers={containers} loading={loading} error={error}/>} />
      </Routes>
    </Router>
  );
};

export default App;
