import React, { FC, useState, useEffect } from 'react';
import './Navbar.css';
import { useAppContext } from './AppContext.tsx';
import Button from './Button.tsx';
import { FaSignInAlt, FaUserPlus, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  onMenuToggle: (isOpen: boolean) => void;
}

const Navbar: FC<NavbarProps> = ({ onMenuToggle }) => {
  const {
    isLoginFormVisible,
    setIsLoginFormVisible,
    isSignUpFormVisible,
    setIsSignUpFormVisible,
    loggedUser,
    setLoggedUser,
  } = useAppContext();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Guardamos TagName y Jerarquía del usuario logueado
  const tagName = loggedUser?.userName || null;
  const jerarquia = loggedUser?.jerarquia?.toLowerCase() || null;

  const toggleMenu = () => {
    setIsMenuOpen((prev) => {
      const newState = !prev;
      onMenuToggle(newState);
      return newState;
    });
  };

  // Manejar cambio entre login y signup
  const handleToggleLogin = () => {
    setIsLoginFormVisible(!isLoginFormVisible);
    setIsSignUpFormVisible(false);
    if (isMenuOpen) { setIsMenuOpen(false); onMenuToggle(false); }
  };

  const handleToggleSignUp = () => {
    setIsSignUpFormVisible(!isSignUpFormVisible);
    setIsLoginFormVisible(false);
    if (isMenuOpen) { setIsMenuOpen(false); onMenuToggle(false); }
  };

  // Log out
  const handleLogOut = () => {
    localStorage.clear();
    setLoggedUser(null);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>Todo App</h1>
      </div>

      {tagName && (
        <div className="navbar-user">
          Hola, <strong>{tagName}</strong>!
        </div>
      )}

      <div className="navbar-hamburger" onClick={toggleMenu}>
        ☰
      </div>

      <ul className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
        <li>
          <a href="#home" onClick={() => { setIsMenuOpen(false); onMenuToggle(false); }}>Home</a>
        </li>
        <li>
          <a href="#about" onClick={() => { setIsMenuOpen(false); onMenuToggle(false); }}>About</a>
        </li>
      </ul>

      <div className="navbar-actions">
        {!tagName && (
          <>
            <Button
              variant="primary"
              icon={<FaSignInAlt />}
              onClick={handleToggleLogin}
            >
              {isLoginFormVisible ? 'Cancelar' : 'Login'}
            </Button>

            <Button
              variant="secondary"
              icon={<FaUserPlus />}
              onClick={handleToggleSignUp}
            >
              {isSignUpFormVisible ? 'Cancelar' : 'Sign Up'}
            </Button>
          </>
        )}

        {/* Usuario logueado */}
        {tagName && (
          <>
            
            <Button
              variant="primary"
              icon={<FaSignOutAlt />}
              onClick={handleLogOut}
            >
              Log Out
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
