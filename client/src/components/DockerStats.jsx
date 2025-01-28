import React from 'react';
import { Card } from 'react-bootstrap'; // We are using Card here for the container info card
// import useFetchContainers from '../hooks/useFetchContainers';
import 'bootstrap/dist/css/bootstrap.min.css';

const DockerStats = ({ container }) => {
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

  return (
    <div style={{ padding: '20px' }}>
      <h1>Docker Dashboard</h1>

      {/* Container Info Card */}
      <Card
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
        <Card.Body>
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
              <span
                style={{
                  wordBreak: 'break-word', // Ensures long ID info wraps instead of overflowing
                  whiteSpace: 'normal', // Allows text to wrap naturally
                  display: 'inline-block', // Keeps the text inline but allows wrapping
                }}
              >
                {container.id}
              </span>
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
        </Card.Body>
      </Card>
    </div>
  );
};

export default DockerStats;
