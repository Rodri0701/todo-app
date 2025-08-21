import React from 'react';
import './Navbar.css';
import { useAppContext } from './AppContext.tsx';

const Navbar: React.FC = () => {
  const { isLoginFormVisible, setIsLoginFormVisible } = useAppContext();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>Todo App</h1>
      </div>

      <ul className="navbar-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        {isLoginFormVisible && (
          <>
           {/*  <li><a href="#tasks">Tasks</a></li>
            <li><a href="#profile">Profile</a></li>
            <li><a href="#settings">Settings</a></li> */}
          </>
        )}
      </ul>

      <div className="navbar-actions">
        <button
          className="login-btn"
          onClick={() => setIsLoginFormVisible(!isLoginFormVisible)}
        >
          {isLoginFormVisible ? 'Cancelar' : 'Login'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;