import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Alert, Row, Col } from 'react-bootstrap';
import '../styles/index.css';
import CPUUsageChart from '../components/charts/CPUUsageChart';
import MemoryUsageChart from '../components/charts/MemoryUsageChart';
import NetworkIOChart from '../components/charts/NetworkIOChart';
import DockerStats from '../components/DockerStats';
import Navbar from '../components/layout/Navbar';
import useWebSocket from '../hooks/useWebSocket';

const ContainerDetails = () => {
  const { containerId } = useParams();
  const navigate = useNavigate();

  // WebSocket data (NOW includes containerId)
  const { data: socketData } = useWebSocket(
    `ws://localhost:5003/ws/${containerId}`
  );
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContainers = async () => {
      try {
        const response = await fetch('http://localhost:5003/api/containers');
        const data = await response.json();
        setApiData(Array.isArray(data) ? data : [data]); // Ensure array
        setLoading(false);
      } catch (err) {
        setError('Error fetching container data');
        setLoading(false);
      }
    };

    fetchContainers();
  }, []);

  if (!containerId) {
    return (
      <Alert variant='danger' className='m-4'>
        Error: Invalid container ID
      </Alert>
    );
  }

  // Use WebSocket data unless it contains an error
  const containerList = socketData?.error
    ? apiData
    : Array.isArray(socketData)
    ? socketData
    : socketData
    ? [socketData] // Ensure single object is wrapped in an array
    : apiData || [];
  const container = containerList.find(
    (c) => c && String(c.id) === String(containerId)
  );

  if (container) {
    container.memoryUsage = parseFloat(container.memoryUsage) || 0;
    container.cpuUsage = parseFloat(container.cpuUsage) || 0;
    container.networkIO = {
      RX: parseFloat(container.networkIO?.RX) || Math.random() * 0.1, // Simulating movement
      TX: parseFloat(container.networkIO?.TX) || Math.random() * 0.1,
    };
  }

  if (!container) {
    console.warn('No container found for ID:', containerId);
    return <p>Container not found or data is loading...</p>;
  }

  console.log('Container Data Passed to Charts:', container);

  return (
    <div
      style={{
        background: '#1c183d',
        minHeight: '100vh',
        color: '#fff',
        padding: '2rem',
      }}
    >
      <Navbar />
      <Container>
        <div className='d-flex justify-content-between align-items-center mb-4'>
          <h1 className='pr-1'>Docker Dashboard</h1>
          <Button
            variant='outline-light'
            onClick={() => navigate('/')}
            style={{
              borderColor: 'rgba(123, 89, 255, 0.5)',
              backgroundColor: '#352F6D',
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

        {container ? (
          <>
            <Row>
              <Col md={6}>
                <DockerStats container={container} />
              </Col>
              <Col md={6}>
                <NetworkIOChart
                  data={container.networkIO || { RX: 0, TX: 0 }}
                />
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <MemoryUsageChart
                  data={{ memoryUsage: container.memoryUsage }}
                />
              </Col>
              <Col md={6}>
                <CPUUsageChart data={{ usage: container.cpuUsage }} />{' '}
              </Col>
            </Row>
          </>
        ) : (
          !loading && (
            <div className='text-center mt-5'>
              <h3 style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                Container not found
              </h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                The container you're looking for might have been stopped or
                removed.
              </p>
            </div>
          )
        )}
      </Container>
    </div>
  );
};

export default ContainerDetails;
