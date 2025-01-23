import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import './Header.css';

const Header = () => {
    return (
      <Navbar bg="dark" variant="dark" expand="lg" className="header py-3">
        <Container fluid>
          <Navbar.Brand className="mx-auto brand-text">
            DocViz
          </Navbar.Brand>
        </Container>
      </Navbar>
    );
  };
  
  export default Header;
  