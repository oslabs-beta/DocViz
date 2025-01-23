import React from 'react';

const ContainerTable = ({ data }) => {
  if (!data || data.length === 0) {
    return <p></p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Container ID</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map((container) => (
          <tr key={container.id}>
            <td>{container.id}</td>
            <td>{container.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ContainerTable;
