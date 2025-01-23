import React from 'react';
import { Nav, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    return (
            <Col md={3} className="side-nav">
      <div className="side-nav-header">DocViz</div>
      <Nav className="flex-column">
        <Nav.Link as={Link} to="/dashboard" className="nav-item">
          Dashboard
        </Nav.Link>
        <Nav.Link as={Link} to="/profile" className="nav-item">
          About Us
        </Nav.Link>
        <Nav.Link as={Link} to="/settings" className="nav-item">
          Settings
        </Nav.Link>
      </Nav>
    </Col>
    );
};

export default Sidebar;