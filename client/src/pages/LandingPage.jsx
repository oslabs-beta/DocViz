import React from 'react';
import { useNavigate } from 'react-router-dom';
import ContainerCard from '../components/cards/ContainerCard';
import '../styles/landingPage.css';

const LandingPage = ({ containers }) => {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/dashboard/${id}`);
  };

  return (
    <div className='landing-page'>
      <h1>Welcome to Your Docker Monitor</h1>
      <div className='container-cards'>
        {containers.map((container) => (
          <ContainerCard
            key={container.id}
            container={container}
            onClick={() => handleCardClick(container.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
