import React from 'react';
import MemoryUsageChart from './charts/MemoryUsageChart';
import NetworkIOChart from './charts/NetworkIOChart';
import StatusPieChart from './charts/StatusPieChart';
import ContainerTable from './tables/ContainerTable';
import useFetchContainers from '../hooks/useFetchContainers';

const DockerStats = () => {
  const { containers, loading, error } = useFetchContainers();

  return (
    <div style={{ padding: '20px' }}>
      <h1>Docker Dashboard</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        <>
          <ContainerTable containers={containers} />
          <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
            <MemoryUsageChart containers={containers} />
            <NetworkIOChart containers={containers} />
          </div>
          <StatusPieChart containers={containers} />
        </>
      )}
    </div>
  );
};

export default DockerStats;
