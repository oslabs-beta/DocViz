import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useDockerData from './hooks/useDockerData';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';

const App = () => {
  const { containers, error, loading } = useDockerData();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage containers={containers} />} />
        <Route
          path='/dashboard/:id'
          element={
            <Dashboard
              container={(params) => containers.find((c) => c.id === params.id)}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
