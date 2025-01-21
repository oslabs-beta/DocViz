import React, { useState, useEffect } from "react";

const DockerStats = () => {
  const [containers, setContainers] = useState([]); // State to hold the containers data
  const [loading, setLoading] = useState(true); // State to show a loading indicator
  const [error, setError] = useState(null); // State to handle errors

  // Function to fetch containers data
  const fetchContainers = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5003/api/containers"); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setContainers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // useEffect to fetch data on component mount
  useEffect(() => {
    fetchContainers();
  }, []);

  return (
    <div>
      <h1>Docker Containers</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>Container ID</th>
              <th>Image</th>
              <th>Status</th>
              <th>CPU Usage</th>
              <th>Memory Usage</th>
              <th>Network I/O</th>
            </tr>
          </thead>
          <tbody>
            {containers.map((container) => (
              <tr key={container.id}>
                <td>{container.id.substring(0, 12)}</td>
                <td>{container.image}</td>
                <td>{container.status}</td>
                <td>{container.cpuUsage}</td>
                <td>{container.memoryUsage}</td>
                <td>{container.networkIO}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DockerStats;