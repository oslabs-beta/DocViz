import React from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useFetchContainers from '../hooks/useFetchContainers';
import Navbar from '../components/layout/Navbar';

const LandingPage = () => {
  const { containers, loading, error } = useFetchContainers();
  const navigate = useNavigate();

  const handleContainerClick = (containerId) => {
    navigate(`/container/${containerId}`);
  };

  // Function to get status color (default is orange)
  const getStatusColor = (status) => {
    if (status.includes('Up')) return '#00ff9d';
    if (status.includes('Exited')) return '#ff4757';
    return '#ffa502';
  };

  return (
    <div
      style={{
        background: '#1c183d',
        minHeight: '100vh',
      }}
      className='text-white'
    >
      <Navbar />
      <div style={{ marginLeft: '60px' }} className='p-4'>
        <Container>
          <h1 className='mb-4 text-center fw-light fs-1'>DocViz</h1>
          {loading && (
            <div className='text-center pt-5'>
              <div className='spinner-border' role='status'></div>
            </div>
          )}
          {error && (
            <Alert variant='danger'>Error loading containers: {error}</Alert>
          )}
          <Row xs={1} md={2} lg={3} className='g-4 mt-2'>
            {containers.map((container) => (
              <Col key={container.id}>
                <Card
                  onClick={() => handleContainerClick(container.id)}
                  style={{
                    backgroundColor: '#352F6D',
                    border: '1px solid #443c7a',
                    height: '300px',
                    maxWidth: '280px',
                    borderRadius: '13px'
                  }}
                  className='container-card mx-auto text-white'
                >
                  <Card.Body className='d-flex flex-column align-items-center justify-content-center p-4'>
                    <div className='text-center mb-3'>
                      <div className='fs-4 fw-medium mb-3 text-white'>
                        {container.name}
                      </div>
                      <div style={{ color: '#b8b5d1' }} className='fs-6'>
                        {container.image}
                      </div>
                    </div>
                  </Card.Body>
                  <div className='d-flex align-items-center justify-content-center p-4'>
                    <div
                      className='d-flex align-items-center gap-2 rounded-2 px-4 py-2'
                      style={{
                        background: '#3d367580',
                      }}
                    >
                      <div
                        style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          backgroundColor: getStatusColor(container.status),
                          boxShadow: `0 0 10px ${getStatusColor(
                            container.status
                          )}`,
                        }}
                      />
                      <span style={{ color: '#b8b5d1' }}>
                        {container.status}
                      </span>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
          {!loading && !error && containers.length === 0 && (
            <div className='text-center mt-5'>
              <h3 className='text-white-75'>No containers found</h3>
              <p style={{ color: '#b8b5d1' }}>
                Start some Docker containers to see them here
              </p>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
};

export default LandingPage;
