// src/components/CardRight.tsx
import React from 'react';
import './CardRight.css';

interface CardRightProps {
  // Puedes añadir props aquí en el futuro, por ejemplo:
  // title?: string;
  // content?: string;
}

const CardRight: React.FC<CardRightProps> = () => {
  return (
    <div className="Principal">
      {/* Div izquierdo */}
      <div className="Izq">
        <h2>Espacio para tu contenido</h2>
        <p>Contenido adicional del lado izquierdo.</p>
      </div>
      {/* Div derecho */}
      <div className="Der">
        <h2>Administra tus tareas en tiempo real y decide quién hace cada cosa</h2>
      </div>
    </div>
  );
};

export default CardRight;