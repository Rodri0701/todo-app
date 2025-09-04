import React, { FC, useState } from 'react';
import './Navbar.css';
import { useAppContext } from './AppContext.tsx';
import Button from './Button.tsx';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';

interface NavbarProps {
  onMenuToggle: (isOpen: boolean) => void;
}

const Navbar: FC<NavbarProps> = ({ onMenuToggle }) => {
  const { isLoginFormVisible, setIsLoginFormVisible, isSignUpFormVisible, setIsSignUpFormVisible } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => {
      const newState = !prev;
      onMenuToggle(newState);
      return newState;
    });
  };

  const handleSignUp = () => {
    setIsSignUpFormVisible(!isSignUpFormVisible);
    setIsLoginFormVisible(false); // Cierra el formulario de login si está abierto
    if (isMenuOpen) {
      setIsMenuOpen(false);
      onMenuToggle(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>Todo App</h1>
      </div>
      <div className="navbar-hamburger" onClick={toggleMenu}>
        ☰
      </div>
      <ul className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
        <li>
          <a
            href="#home"
            onClick={() => {
              setIsMenuOpen(false);
              onMenuToggle(false);
            }}
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#about"
            onClick={() => {
              setIsMenuOpen(false);
              onMenuToggle(false);
            }}
          >
            About
          </a>
        </li>
        {/* {isLoginFormVisible && (
          <>
            <li>
              <a
                href="#tasks"
                onClick={() => {
                  setIsMenuOpen(false);
                  onMenuToggle(false);
                }}
              >
                Tasks
              </a>
            </li>
            <li>
              <a
                href="#profile"
                onClick={() => {
                  setIsMenuOpen(false);
                  onMenuToggle(false);
                }}
              >
                Profile
              </a>
            </li>
            <li>
              <a
                href="#settings"
                onClick={() => {
                  setIsMenuOpen(false);
                  onMenuToggle(false);
                }}
              >
                Settings
              </a>
            </li>
          </>
        )} */}
      </ul>
      <div className="navbar-actions">
        <Button
          variant="primary"
          icon={<FaSignInAlt />}
          onClick={() => {
            setIsLoginFormVisible(!isLoginFormVisible);
            if (isMenuOpen) {
              setIsMenuOpen(false);
              onMenuToggle(false);
            }
          }}
        >
          {isLoginFormVisible ? 'Cancelar' : 'Login'}
        </Button>
        <Button
          variant="secondary"
          icon={<FaUserPlus />}
          onClick={handleSignUp}
        >
          Sign Up
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;