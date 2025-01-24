import React from 'react';
import Sidebar from '../components/layout/Sidebar';
import ContainerCard from '../components/cards/ContainerCard';
import '../styles/cards.css';

const ContainerDetailsPage = ({ container }) => {
  return (
    <div className='container-details'>
      <Sidebar />
      <main className='details-content'>
        <h1>Container Details</h1>
        <ContainerCard container={container} />
      </main>
    </div>
  );
};

export default ContainerDetailsPage;
