import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Alert, Row, Col } from 'react-bootstrap';
import useFetchContainers from '../hooks/useFetchContainers'; // Import your hook
import '../styles/index.css';
import CPUUsageChart from '../components/charts/CPUUsageChart';
import MemoryUsageChart from '../components/charts/MemoryUsageChart';
import NetworkIOChart from '../components/charts/NetworkIOChart';
import DockerStats from '../components/DockerStats'; // Import DockerStats to use its card structure

const ContainerDetails = () => {
  const { containerId } = useParams();
  const navigate = useNavigate();

  // Use your custom hook to fetch container data
  const { containers, loading, error } = useFetchContainers();

  // Find the container matching the ID from params
  const container = loading
    ? null
    : containers.find((c) => c.id?.trim() === containerId?.trim());

  return (
    <div
      style={{
        background: 'linear-gradient(to bottom, #0a0118 0%, #1a0b2e 100%)',
        minHeight: '100vh',
        color: '#fff',
        padding: '2rem',
      }}
    >
      <Container>
        <div className='d-flex justify-content-between align-items-center mb-4'>
          <Button
            variant='outline-light'
            onClick={() => navigate('/')}
            style={{
              borderColor: 'rgba(123, 89, 255, 0.5)',
              color: '#fff',
              padding: '0.5rem 1.5rem',
              transition: 'all 0.3s ease',
            }}
            className='back-button'
          >
            ← Back to Containers
          </Button>
        </div>

        {loading && (
          <div className='text-center'>
            <div className='spinner-border text-light' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </div>
          </div>
        )}

        {error && (
          <Alert variant='danger'>
            Error loading container details: {error}
          </Alert>
        )}

        {container && (
          <>
            <Row>
              <Col md={6}>
                <DockerStats container={container} />
              </Col>
              <Col md={6}>
                <NetworkIOChart containerId={container.id} />
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <MemoryUsageChart containerId={container.id} />
              </Col>
              <Col md={6}>
                <CPUUsageChart containerId={container.id} />
              </Col>
            </Row>
          </>
        )}

        {!loading && !container && (
          <div className='text-center mt-5'>
            <h3 style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              Container not found
            </h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              The container you're looking for might have been stopped or
              removed.
            </p>
          </div>
        )}
      </Container>
    </div>
  );
};

export default ContainerDetails;
