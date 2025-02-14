import React from 'react';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const DockerStats = ({ container }) => {
  // Function to determine the status color based on container status
  const getStatusColor = (status) => {
    if (status?.includes('Up')) return '#00ff9d'; // Green for running containers
    if (status?.includes('Exited')) return '#ff4757'; // Red for stopped containers
    return '#ffa502'; // Orange for unknown states
  };

  // Function to generate the status indicator styling dynamically
  const statusIndicatorStyle = (status) => ({
    width: '15px',
    height: '15px',
    borderRadius: '50%',
    backgroundColor: getStatusColor(status),
    boxShadow: `0 0 5px ${getStatusColor(status)}`,
  });

  return (
    <div style={{ padding: '10px' }}>
      {/* Display container information inside a styled card */}
      <Card
        style={{
          backgroundColor: '#2f2a5c',
          backdropFilter: 'blur(10px)',
          borderRadius: '8px',
          padding: '1rem',
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
            Docker Dashboard
          </h3>
          <div style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            <div className='info-row pt-1'>
              <p style={{ fontWeight: 'bold' }} className='mb-0'>
                ID:
              </p>
              <span
                style={{
                  wordBreak: 'break-word',
                  whiteSpace: 'normal',
                }}
                title={container.id}
              >
                {container.id.substring(0, 30)}...
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
                {/* Status indicator with dynamic color */}
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
