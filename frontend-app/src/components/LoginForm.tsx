import React, { useState } from "react";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "./AppContext.tsx";

interface LoginFormProps {
  title: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ title }) => {
  const navigate = useNavigate();
  const { setLoggedUser } = useAppContext(); // 👈 Traemos el setter del contexto

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Por favor completa todos los campos");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/Login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("Usuario autenticado:", data.usuario);

        // Guardamos TagName y Jerarquía en localStorage
        localStorage.setItem("tagName", data.usuario.userName);
        localStorage.setItem("jerarquia", data.usuario.jerarquia);

        // Guardamos el usuario completo en el contexto
        setLoggedUser(data.usuario);

        navigate("/pages/TaskShow"); // Navegar a la página de tareas
      } else {
        // Mensaje de error o bloqueo de IP
        alert(data.message);
      }
    } catch (error) {
      console.error("Error en el login:", error);
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <div className="login-form">
      <h3>{title}</h3>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Add your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Add your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="button" className="submit-btn" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
