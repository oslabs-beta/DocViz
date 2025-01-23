import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './src/App';
import './src/utils/chartSetup';
import './src/styles/index.css';

// Apply the saved theme when the app loads
const savedTheme = localStorage.getItem('theme') || 'light';
document.body.setAttribute('data-theme', savedTheme);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
