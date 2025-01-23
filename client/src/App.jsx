import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router components
import Dashboard from './pages/Dashboard'; // Dashboard Component 
import Profile from './pages/Profile'; // Profile component
import Settings from './pages/Settings'; // Settings component
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import './App.css';

// import './App.css'; // Custom CSS for the sidebar


function App() {
  return (
    <Router>
      <div> 
        <Header/>
  
      <Container fluid className="p-0">
        <Row>
          {/* Sidebar component */}
          <Sidebar />

          {/* Main Content Area */}
          <Col md={9} className="content">
            <Routes>
              {/* Define Routes for each page */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Col>
        </Row>
      </Container>
      </div>
    </Router>
  );
}

export default App;