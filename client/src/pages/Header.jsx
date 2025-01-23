import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="py-3">
      <Container fluid>
        <Navbar.Brand className="mx-auto" style={{ fontSize: '2rem', fontWeight: 'bold' }}>
          DocViz
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;