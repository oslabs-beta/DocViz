import React from 'react';
import Sidebar from '../components/layout/Sidebar';
import DockerStats from '../components/DockerStats';
import { Container, Row, Col } from 'react-bootstrap';


const Dashboard = () => {
  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Col md={3}>
          <Sidebar />
        </Col>

        {/* Main content */}
        <Col md={9}>
          <DockerStats />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
