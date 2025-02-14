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

const SkeletonDashboard = () => (
  <div className='d-flex flex-wrap gap-4'>
    <div style={{ flex: '1', minWidth: '400px' }}>
      <div className='skeleton-card'>
        <div className='skeleton-title'></div>
        <div className='skeleton-stats'>
          <div className='skeleton-stat-row'></div>
          <div className='skeleton-stat-row'></div>
          <div className='skeleton-stat-row'></div>
        </div>
      </div>
      <div className='skeleton-card mt-4'>
        <div className='skeleton-title'></div>
        <div className='skeleton-chart'></div>
      </div>
    </div>
    <div style={{ flex: '1', minWidth: '400px' }}>
      <div className='skeleton-card' style={{ marginBottom: '1rem' }}>
        <div className='skeleton-title'></div>
        <div className='skeleton-chart'></div>
      </div>
      <div className='skeleton-card'>
        <div className='skeleton-title'></div>
        <div className='skeleton-chart'></div>
      </div>
    </div>
  </div>
);

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
        position: 'relative',
      }}
    >
      <Navbar />
      <div style={{ marginLeft: '60px' }}>
        <Container>
          <div className='d-flex flex-column align-items-center mb-4'>
            <span
              style={{
                background:
                  'linear-gradient(90deg, #B794F4 0%, #F687B3 50%, #FBD38D 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                display: 'inline-block',
                fontSize: '48px',
                fontWeight: 700,
                marginBottom: '1rem',
              }}
            >
              DocViz
            </span>
            <div className='d-flex justify-content-between align-items-center w-100'>
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
          </div>

          {loading ? (
            <SkeletonDashboard />
          ) : error ? (
            <Alert variant='danger'>
              Error loading container details: {error}
            </Alert>
          ) : container ? (
            <div className='d-flex flex-wrap gap-4'>
              <div style={{ flex: '1', minWidth: '400px' }}>
                <DockerStats container={container} />
                <div
                  className='mt-4'
                  style={{
                    backgroundColor: '#27304D',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: '1px solid #3a4366',
                  }}
                >
                  <h3
                    style={{
                      color: '#FBD38D',
                      marginBottom: '1.5rem',
                      fontSize: '1.5rem',
                      fontWeight: 600,
                    }}
                  >
                    Memory Usage
                  </h3>
                  <MemoryUsageChart
                    data={{ memoryUsage: container.memoryUsage }}
                  />
                </div>
              </div>
              <div style={{ flex: '1', minWidth: '400px' }}>
                <div
                  style={{
                    backgroundColor: '#27304D',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: '1px solid #3a4366',
                    marginBottom: '1rem',
                  }}
                >
                  <h3
                    style={{
                      color: '#63B3ED',
                      marginBottom: '1.5rem',
                      fontSize: '1.5rem',
                      fontWeight: 600,
                    }}
                  >
                    Network I/O
                  </h3>
                  <NetworkIOChart
                    data={container.networkIO || { RX: 0, TX: 0 }}
                  />
                </div>
                <div
                  style={{
                    backgroundColor: '#27304D',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: '1px solid #3a4366',
                  }}
                >
                  <h3
                    style={{
                      color: '#4FD1C5',
                      marginBottom: '1.5rem',
                      fontSize: '1.5rem',
                      fontWeight: 600,
                    }}
                  >
                    CPU Usage
                  </h3>
                  <CPUUsageChart data={{ usage: container.cpuUsage }} />
                </div>
              </div>
            </div>
          ) : (
            <SkeletonDashboard />
          )}
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;
