import React from 'react';
import './LoginForm.css';

interface LoginFormProps {
  title: string;
  onSubmit?: () => void; // Para manejar el envío (de muestra por ahora)
}

const LoginForm: React.FC<LoginFormProps> = ({ title, onSubmit }) => {
  return (
    <div className="login-form">
      <h3>{title}</h3>
      <form>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Ingresa tu email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" placeholder="Ingresa tu contraseña" />
        </div>
        <button type="button" className="submit-btn" onClick={onSubmit}>
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default LoginForm;