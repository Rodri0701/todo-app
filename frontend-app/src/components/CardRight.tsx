import React, { FC } from 'react';
import './CardRight.css';
import LoginForm from './LoginForm.tsx';
import SignUp from './SignUp.tsx';
import Task from './Task.tsx';
import { useAppContext } from './AppContext.tsx';

const CardRight: FC = () => {
  const { isLoginFormVisible, isSignUpFormVisible } = useAppContext();

  return (
    <>
      <div className="Izq">
        {isSignUpFormVisible ? (
          <SignUp
            title="Crear cuenta"
            onSubmit={() => alert('Registro enviado')}
          />
        ) : isLoginFormVisible ? (
          <LoginForm
            title="Iniciar Sesión"
            onSubmit={() => alert('Inicio de sesión enviado')}
          />
        ) : (
          <Task />
        )}
      </div>
      <div className="Der">
        <h2>Administra tus tareas en tiempo real y decide quién hace cada cosa</h2>
      </div>
    </>
  );
};

export default CardRight;