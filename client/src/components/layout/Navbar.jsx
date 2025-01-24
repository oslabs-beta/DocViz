import React from 'react';
import { useNavigate } from 'react-router-dom';
import { House } from 'react-bootstrap-icons';
import '../../styles/index.css';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav
      style={{
        backgroundColor: '#2D2856',
        borderRight: '1px solid #443c7a',
        width: '60px',
        height: '100vh',
      }}
      className='d-flex flex-column align-items-center py-4 position-fixed start-0 top-0'
    >
      <div className='mb-4 text-white fs-3'>D</div>
      <button
        onClick={() => navigate('/')}
        className='nav-button d-flex align-items-center justify-content-center border-0 rounded-2 cursor-pointer'
        style={{
          backgroundColor: '#3d367580',
          width: '40px',
          height: '40px',
          transition: 'all 0.3s ease',
        }}
      >
        <House size={20} color='#b8b5d1' />
      </button>
    </nav>
  );
};

export default Navbar;
