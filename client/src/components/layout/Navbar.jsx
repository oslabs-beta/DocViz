import React from 'react';
import { useTheme } from '../context/themeContext';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav
      className={`navbar ${
        theme === 'dark' ? 'navbar-dark bg-dark' : 'navbar-light bg-light'
      }`}
    >
      <span className='navbar-brand'>Dashboard</span>
      <div>
        <button className='btn btn-secondary' onClick={toggleTheme}>
          Toggle Theme
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
