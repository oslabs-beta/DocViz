import React from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useFetchContainers from '../hooks/useFetchContainers';
import Navbar from '../components/layout/Navbar';
import { ArrowDown } from 'react-bootstrap-icons';
import '../styles/index.css';

const SkeletonCard = () => (
  <Col>
    <div
      className='skeleton-card container-card mx-auto'
      style={{
        height: '300px',
        maxWidth: '280px',
      }}
    >
      <div className='d-flex flex-column align-items-center justify-content-center p-4'>
        <div className='text-center mb-3' style={{ width: '100%' }}>
          <div className='skeleton-title mx-auto'></div>
        </div>
      </div>
      <div className='d-flex align-items-center justify-content-center p-4'>
        <div
          className='skeleton-stat-row'
          style={{ width: '120px', height: '35px' }}
        ></div>
      </div>
    </div>
  </Col>
);

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
      <div style={{ marginLeft: '60px' }}>
        <Container>
          {/* Hero Section */}
          <div
            className='text-center'
            style={{
              padding: '65px 0 30px 0',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <h1
              style={{
                fontSize: '60px',
                fontWeight: 700,
                marginBottom: '1.5rem',
                color: '#ffffff',
              }}
            >
              Welcome to{' '}
              <span
                style={{
                  background:
                    'linear-gradient(90deg, #B794F4 0%, #F687B3 50%, #FBD38D 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  display: 'inline-block',
                }}
              >
                DocViz
              </span>
            </h1>
            <p
              style={{
                fontSize: '21px',
                color: '#E2E8F0',
                maxWidth: '800px',
                margin: '0 auto 25px auto',
                lineHeight: 1.6,
                opacity: 0.9,
              }}
            >
              Monitor and visualize your Docker container microservices in
              real-time. Get detailed insights into performance metrics,
              resource usage, and container health status.
            </p>
            <p
              style={{
                fontSize: '18px',
                color: '#E2E8F0',
                fontWeight: 500,
                opacity: 0.9,
                marginBottom: '1.5rem',
              }}
            >
              Select a container below to view detailed metrics
            </p>
            <ArrowDown className='floating-arrow' />
          </div>
          {/* Loading and Error Handling */}
          {loading && (
            <div className='text-center pt-5'>
              <div className='spinner-border' role='status'></div>
            </div>
          )}
          {error && (
            <Alert variant='danger'>Error loading containers: {error}</Alert>
          )}
          {/* Container Cards */}
          <Row xs={1} md={2} lg={3} className='g-4 mt-2'>
            {loading ? (
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            ) : containers.length > 0 ? (
              containers.map((container) => (
                <Col key={container.id}>
                  <Card
                    onClick={() => handleContainerClick(container.id)}
                    style={{
                      backgroundColor: '#3f387d',
                      border: '1px solid #443c7a',
                      height: '300px',
                      maxWidth: '280px',
                      borderRadius: '13px',
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
              ))
            ) : (
              <div className='text-center mt-5 w-100'>
                <h3 className='text-white-75'>No containers found</h3>
                <p style={{ color: '#b8b5d1' }}>
                  Start some Docker containers to see them here
                </p>
              </div>
            )}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default LandingPage;
