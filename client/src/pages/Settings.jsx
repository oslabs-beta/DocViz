import React, { useState, useEffect } from 'react';
import Sidebar from '../components/layout/Sidebar';
import '../styles/settings.css';

const Settings = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleThemeChange = (e) => {
    const newTheme = e.target.value;
    setTheme(newTheme);
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme); // Save to localStorage.
  };

  return (
    <div className='settings'>
      <Sidebar />
      <main className='settings-content'>
        <h1>Settings</h1>
        <div className='theme-selector'>
          <label htmlFor='theme'>Theme:</label>
          <select id='theme' value={theme} onChange={handleThemeChange}>
            <option value='light'>Light</option>
            <option value='dark'>Dark</option>
          </select>
        </div>
      </main>
    </div>
  );
};

export default Settings;
