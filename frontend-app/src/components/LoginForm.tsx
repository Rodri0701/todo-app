import React from "react";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
  title: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ title }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Aquí iría tu validación de email/contraseña
    console.log("Usuario autenticado!");

    // 👇 Navegar a la otra pantalla
    navigate("/pages/TaskShow");
  };

  return (
    <div className="login-form">
      <h3>{title}</h3>
      <form>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Add your email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Add your password" />
        </div>
        <button type="button" className="submit-btn" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
