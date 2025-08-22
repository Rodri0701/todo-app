import React, { FC } from 'react';
import './Button.css';

interface ButtonProps {
  icon?: React.ReactNode; // Ícono opcional
  children: React.ReactNode; // Contenido del botón (texto o elementos)
  onClick?: () => void; // Función para el evento click
  variant?: 'primary' | 'secondary'; // Variantes de estilo
  disabled?: boolean; // Estado deshabilitado
  className?: string; // Clases adicionales para personalización
}

const Button: FC<ButtonProps> = ({
  icon,
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  className = '',
}) => {
  return (
    <button
      className={`custom-button ${variant} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="button-icon">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;