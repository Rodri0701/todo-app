import React from 'react';
import './CardRight.css';
import Task from './Task.tsx';
import LoginForm from './LoginForm.tsx';
import { useAppContext } from './AppContext.tsx';


const CardRight: React.FC = () => {
  const { isLoginFormVisible, setIsLoginFormVisible } = useAppContext();

  const handleLoginSubmit = () => {
    setIsLoginFormVisible(false);
  };

  return (
    <div className="Principal">
      <div className="Izq">
        {isLoginFormVisible ? (
          <LoginForm title="Iniciar Sesión" onSubmit={handleLoginSubmit} />
        ) : (
          <Task title="Tareas Importantes" />
        )}
      </div>
      <div className="Der">
        <h2>Administra tus tareas en tiempo real y decide quién hace cada cosa</h2>
      </div>
    </div>
  );
};

export default CardRight;