// src/components/Navbar.tsx
import React, { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  // Simulamos si el usuario está logueado
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Función para alternar login/logout
  const toggleLogin = () => setIsLoggedIn(!isLoggedIn);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>Todo App</h1>
      </div>

      <ul className="navbar-links">
        {isLoggedIn ? (
          <> {/* Bloque que muestra si esta logeado */}
           <li><a href="#home">Home</a></li>
            <li><a href="#tasks">Tasks</a></li>
            <li><a href="#profile">Profile</a></li>
            <li><a href="#settings">Settings</a></li>
             <li><a href="#about">About</a></li>
          </>
        ) : (
            <> {/* Bloque que muestra si no esta logeado */}
            <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          </>
        )}
      </ul>

      <div className="navbar-actions">
        <button className="login-btn" onClick={toggleLogin}>
          {isLoggedIn ? "Logout" : "Login"}
        </button>
      </div>
    </nav>
  );
}
