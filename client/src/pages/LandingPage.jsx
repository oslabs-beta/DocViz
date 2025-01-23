import React from 'react';

const LandingPage = () => {
  return (
    <div>
      <h1>Welcome to DocViz</h1>
      <p>
        DocViz is your go-to tool for visualizing Docker containers and their
        dependencies. Start by exploring the dashboard or configuring your
        settings.
      </p>
      <a
        href='/dashboard'
        style={{
          padding: '10px 20px',
          background: '#007BFF',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px',
        }}
      >
        Go to Dashboard
      </a>
    </div>
  );
};

export default LandingPage;
