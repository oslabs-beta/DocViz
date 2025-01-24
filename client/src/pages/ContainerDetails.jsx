import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Alert } from 'react-bootstrap';
import useFetchContainers from '../hooks/useFetchContainers';
import '../../styles/index.css';

const ContainerDetails = () => {
  const { containerId } = useParams();
  const navigate = useNavigate();
  // useFetchContainers is managing these 3 states
  const { containers, loading, error } = useFetchContainers();

  const container = containers.find((c) => c.id === containerId);

  // Function to get status color (orange by default)
  const getStatusColor = (status) => {
    if (status?.includes('Up')) return '#00ff9d';
    if (status?.includes('Exited')) return '#ff4757';
    return '#ffa502';
  };

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
            <h1
              style={{
                color: '#fff',
                marginBottom: '2rem',
                textShadow: '0 0 10px rgba(255,255,255,0.3)',
                fontSize: '2.5rem',
                fontWeight: '300',
              }}
            >
              Container: {container.image}
            </h1>
            <div
              style={{
                backgroundColor: 'rgba(41, 28, 64, 0.6)',
                backdropFilter: 'blur(10px)',
                padding: '2rem',
                borderRadius: '8px',
                marginBottom: '2rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 0 20px rgba(123, 89, 255, 0.1)',
              }}
              className='details-card'
            >
              <h3
                style={{
                  color: '#fff',
                  marginBottom: '1.5rem',
                  fontSize: '1.5rem',
                  fontWeight: '400',
                }}
              >
                Container Information
              </h3>
              <div style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                <div className='info-row'>
                  <strong>ID:</strong>
                  <span>{container.id}</span>
                </div>
                <div className='info-row'>
                  <strong>Status:</strong>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
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
                    <span>{container.status}</span>
                  </div>
                </div>
                <div className='info-row'>
                  <strong>Memory Usage:</strong>
                  <span>{container.memoryUsage}</span>
                </div>
                <div className='info-row'>
                  <strong>CPU Usage:</strong>
                  <span>{container.cpuUsage}</span>
                </div>
                <div className='info-row'>
                  <strong>Network I/O:</strong>
                  <span>{container.networkIO}</span>
                </div>
              </div>
            </div>
          </>
        )}

        {!loading && !container && (
          <div className='text-center mt-5'>
            <h3 style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              Container not found
            </h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              The container you're looking for might have been stopped or
              removed
            </p>
          </div>
        )}
      </Container>
    </div>
  );
};

export default ContainerDetails;
