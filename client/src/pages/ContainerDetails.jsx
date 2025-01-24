import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Alert, Row, Col } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import useFetchContainers from '../hooks/useFetchContainers';
import '../styles/index.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const ContainerDetails = () => {
  const { containerId } = useParams();
  const navigate = useNavigate();
  const { containers, loading, error } = useFetchContainers();

  const container = containers.find((c) => c.id === containerId);

  // Function to get status color (orange by default)
  const getStatusColor = (status) => {
    if (status?.includes('Up')) return '#00ff9d';
    if (status?.includes('Exited')) return '#ff4757';
    return '#ffa502';
  };

  const statusIndicatorStyle = (status) => ({
    width: '15px',
    height: '15px',
    borderRadius: '50%',
    backgroundColor: getStatusColor(status),
    boxShadow: `0 0 5px ${getStatusColor(status)}`,
  });

  // Function to prepare Doughnut chart data
  const prepareChartData = (label, value, maxValue, color) => ({
    labels: [label, 'Remaining'],
    datasets: [
      {
        label,
        data: [value, maxValue - value],
        backgroundColor: [color, '#ddd'],
        hoverBackgroundColor: [color, '#aaa'],
        borderWidth: 1,
      },
    ],
  });

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
            {/* Container Details */}
            <Row>
              <Col md={6}>
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
                        <div style={statusIndicatorStyle(container.status)} />
                        <span>{container.status}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>

              {/* Charts Section */}
              <Col md={6}>
                <Row>
                  <Col md={4}>
                    <h5 style={{ color: '#fff', marginBottom: '1rem' }}>
                      Network I/O
                    </h5>
                    <Doughnut
                      data={prepareChartData(
                        'Network I/O (MB)',
                        parseFloat(container.networkIO) || 0, // Example value
                        1000, // Max value assumption
                        '#ff6384'
                      )}
                      options={{
                        responsive: true,
                        maintainAspectRatio: true,
                      }}
                      width={60}
                      height={60} // Small chart size
                    />
                  </Col>
                  <Col md={4}>
                    <h5 style={{ color: '#fff', marginBottom: '1rem' }}>
                      Memory Usage
                    </h5>
                    <Doughnut
                      data={prepareChartData(
                        'Memory Usage (MB)',
                        parseFloat(container.memoryUsage) || 0, // Example value
                        16000, // Max value assumption
                        '#36a2eb'
                      )}
                      options={{
                        responsive: true,
                        maintainAspectRatio: true,
                      }}
                      width={60}
                      height={60} // Small chart size
                    />
                  </Col>
                  <Col md={4}>
                    <h5 style={{ color: '#fff', marginBottom: '1rem' }}>
                      CPU Usage
                    </h5>
                    <Doughnut
                      data={prepareChartData(
                        'CPU Usage (%)',
                        parseFloat(container.cpuUsage) || 0, // Example value
                        100, // Max value assumption
                        '#ffce56'
                      )}
                      options={{
                        responsive: true,
                        maintainAspectRatio: true,
                      }}
                      width={60}
                      height={60} // Small chart size
                    />
                  </Col>
                </Row>
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
              removed
            </p>
          </div>
        )}
      </Container>
    </div>
  );
};

export default ContainerDetails;
