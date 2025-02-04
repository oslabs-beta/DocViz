import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Alert, Row, Col } from 'react-bootstrap';
import '../styles/index.css';
import CPUUsageChart from '../components/charts/CPUUsageChart';
import MemoryUsageChart from '../components/charts/MemoryUsageChart';
import NetworkIOChart from '../components/charts/NetworkIOChart';
import DockerStats from '../components/DockerStats'; 
import Navbar from '../components/layout/Navbar';

const ContainerDetails = () => {
  const { containerId } = useParams();
  const navigate = useNavigate();
  const [containers, setContainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get the server URL from environment variables
  const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:4000';

  // Function to fetch container data
  const fetchContainers = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/api/containers`);
      const data = await response.json();

      if (Array.isArray(data)) {
        setContainers(data);
      } else if (typeof data === 'object' && data !== null) {
        setContainers([data]);
      } else {
        console.error('Unexpected data format:', data);
        setContainers([]);
      }

      setLoading(false);
    } catch (err) {
      console.error('Error fetching container data:', err);
      setError('Error fetching container data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContainers();
    const interval = setInterval(fetchContainers, 10000);
    return () => clearInterval(interval);
  }, []);

  const container = loading ? null : containers.find((c) => c.id?.trim() === containerId?.trim());

  return (
    <div style={{ background: '#1c183d', minHeight: '100vh', color: '#fff', padding: '2rem' }}>
      <Navbar />
      <Container>
        <div className='d-flex justify-content-between align-items-center mb-4'>
          <h1 className="pr-1">Docker Dashboard</h1>
          <Button
            variant='outline-light'
            onClick={() => navigate('/')}
            style={{ borderColor: 'rgba(123, 89, 255, 0.5)', backgroundColor: '#352F6D', color: '#fff', padding: '0.5rem 1.5rem', transition: 'all 0.3s ease' }}
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
              The container you're looking for might have been stopped or removed.
            </p>
          </div>
        )}
      </Container>
    </div>
  );
};

export default ContainerDetails;
