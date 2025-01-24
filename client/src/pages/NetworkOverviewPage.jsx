import React from 'react';
import NetworkIOChart from '../components/charts/NetworkIOChart';
import Sidebar from '../components/layout/Sidebar';

const NetworkOverviewPage = ({ data }) => {
  return (
    <div className='network-overview'>
      <Sidebar />
      <main className='overview-content'>
        <h1>Network Overview</h1>
        {data.map((container) => (
          <div key={container.id} className='chart-container'>
            <h2>{container.name}</h2>
            <p>
              <strong>Image:</strong> {container.image} |{' '}
              <strong>Status:</strong> {container.status}
            </p>
            <NetworkIOChart data={container.networkIO} />
          </div>
        ))}
      </main>
    </div>
  );
};

export default NetworkOverviewPage;
