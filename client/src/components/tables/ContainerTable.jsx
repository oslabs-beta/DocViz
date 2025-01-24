import React from 'react';
import '../../styles/tables.css';

function ContainerTable({ data = [] }) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Image</th>
          <th>Status</th>
          <th>CPU (%)</th>
          <th>Memory (%)</th>
        </tr>
      </thead>
      <tbody>
        {data.map((container) => (
          <tr key={container.id}>
            <td>{container.id}</td>
            <td>{container.image}</td>
            <td>{container.status}</td>
            <td>{container.cpuUsage}</td>
            <td>{container.memoryUsage}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ContainerTable;
