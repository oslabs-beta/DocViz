import React from 'react';
import ContainerTable from './tables/ContainerTable';
import useFetchContainers from '../hooks/useFetchContainers';
import 'bootstrap/dist/css/bootstrap.min.css';

const DockerStats = () => {
  const { containers, loading, error } = useFetchContainers();

  return (
    <div style={{ padding: '20px' }}>
      <h1>Docker Dashboard</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && containers.length > 0 && (
        <>
          <ContainerTable containers={containers} />
        </>
      )}
      {!loading && !error && containers.length === 0 && (
        <p>
          No containers found. Please start some Docker containers to see their
          metrics.
        </p>
      )}
    </div>
  );
};

export default DockerStats;
