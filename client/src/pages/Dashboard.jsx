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

/**
 * Dashboard component displays detailed metrics for a specific container.
 * It retrieves data via WebSockets and API calls, providing visual insights.
 */
const Dashboard = ({ addNotification }) => {
  const { containerId } = useParams();
  const navigate = useNavigate();
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
        setApiData(Array.isArray(data) ? data : [data]);
      } catch (err) {
        setError('Error fetching container data');
        addNotification('Dashboard.js', 'Failed to fetch container data');
      } finally {
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

  const containerList = socketData?.error
    ? apiData
    : Array.isArray(socketData)
    ? socketData
    : [socketData] || apiData;
  const container = containerList.find(
    (c) => c && String(c.id) === String(containerId)
  );

  if (container) {
    container.memoryUsage = parseFloat(container.memoryUsage) || 0;
    container.cpuUsage = parseFloat(container.cpuUsage) || 0;
    container.networkIO = {
      RX: parseFloat(container.networkIO?.RX) || Math.random() * 0.1,
      TX: parseFloat(container.networkIO?.TX) || Math.random() * 0.1,
    };

    if (container.status.includes('Exited')) {
      addNotification(
        'Dashboard.js',
        `Container ${container.name} has exited.`
      );
    }
  }

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
            className='back-button'
            style={{
              borderColor: 'rgba(123, 89, 255, 0.5)',
              backgroundColor: '#352F6D',
              color: '#fff',
            }}
          >
            ← Back to Containers
          </Button>
        </div>

        {loading && (
          <div className='text-center'>
            <div className='spinner-border text-light' role='status'></div>
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
                <CPUUsageChart data={{ usage: container.cpuUsage }} />
              </Col>
            </Row>
          </>
        ) : (
          <p>Loading Containers...</p>
        )}
      </Container>
    </div>
  );
};

export default Dashboard;
