import React, { useState } from 'react';

const Settings = () => {
  const [theme, setTheme] = useState('light');
  const [apiUrl, setApiUrl] = useState('http://localhost:5003/api/containers');

  const handleSave = () => {
    // Save settings logic (e.g., localStorage or backend API call)
    console.log('Settings saved:', { theme, apiUrl });
  };

  return (
    <div>
      <h1>Settings</h1>
      <div style={{ marginBottom: '20px' }}>
        <label>
          Theme:
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            style={{ marginLeft: '10px' }}
          >
            <option value='light'>Light</option>
            <option value='dark'>Dark</option>
          </select>
        </label>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label>
          API URL:
          <input
            type='text'
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
            style={{ marginLeft: '10px', width: '300px' }}
          />
        </label>
      </div>
      <button
        onClick={handleSave}
        style={{
          padding: '10px 20px',
          background: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
        }}
      >
        Save Settings
      </button>
    </div>
  );
};

export default Settings;
