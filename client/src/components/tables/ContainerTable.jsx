import React from 'react';

const ContainerTable = ({ containers }) => {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th>Container ID</th>
          <th>Image</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {containers.map((container) => (
          <tr key={container.id}>
            <td>{container.id.substring(0, 12)}</td>
            <td>{container.image}</td>
            <td>{container.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ContainerTable;
