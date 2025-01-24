import React from 'react';
import '../../styles/containerCard.css';

const ContainerCard = ({ container, onClick }) => {
  console.log('ContainerCard Data:', container);

  if (!container) return null; // Safeguard against undefined data.

  return (
    <div className='container-card' onClick={onClick}>
      <h2>{container.name}</h2>
      <p>Image: {container.image}</p>
      <p>Status: {container.status}</p>
    </div>
  );
};

export default ContainerCard;
