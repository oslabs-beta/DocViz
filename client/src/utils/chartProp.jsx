// import React from 'react';
// import useDockerData from '../hooks/useDockerData'; // Hook for polling data
// import CPUUsageChart from '../components/charts/CPUUsageChart';
// import MemoryUsageChart from '../components/charts/MemoryUsageChart';
// import NetworkIOChart from '../components/charts/NetworkIOChart';

// const Dashboard = () => {
//   const { containers, loading, error } = useDockerData(
//     `http://localhost:5003/api/containers/`
//   );

//   if (loading) {
//     return <p style={{ color: '#fff', textAlign: 'center' }}>Loading...</p>;
//   }

//   if (error) {
//     return <p style={{ color: '#fff', textAlign: 'center' }}>Error: {error}</p>;
//   }

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
//       {containers.map((container) => (
//         <div
//           key={container.id}
//           style={{ backgroundColor: '#333', padding: '1rem' }}
//         >
//           <h4 style={{ color: '#fff' }}>{container.name || container.id}</h4>
//           <CPUUsageChart cpuUsage={container.cpuUsage} />
//           <MemoryUsageChart
//             memoryUsage={container.memoryUsage}
//             containerId={container.id}
//           />
//           <NetworkIOChart networkIO={container.networkIO} />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Dashboard;
