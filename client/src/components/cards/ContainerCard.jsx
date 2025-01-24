import React from 'react';
import '../../styles/containerCard.css';

const ContainerCard = ({ container, onClick }) => {
  console.log('ContainerCard Data:', container);

  if (!container) return null; // Safeguard against undefined data

  return (
    <div className='container-card' onClick={onClick}>
      <h2>{container.image}</h2>
      <p>
        <strong>Status:</strong> {container.status}
      </p>
      <p>
        <strong>CPU Usage:</strong> {container.cpuUsage}
      </p>
      <p>
        <strong>Memory Usage:</strong> {container.memoryUsage}
      </p>
    </div>
  );
};

export default ContainerCard;
