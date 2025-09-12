import React, { FC, useState } from 'react';
import './SignUp.css';
import Button from './Button.tsx';
import { FaUserPlus } from 'react-icons/fa';

// Define las propiedades esperadas por el componente SignUp
interface SignUpProps {
  title: string; // Título del formulario, se muestra en la parte superior
}

// Define la estructura de un objeto Usuario para enviar al backend
interface Usuario {
  id: number; // Identificador único del usuario, generado automáticamente
  nombre: string; // Nombre del usuario
  apellido: string; // Apellido del usuario
  edad: string | number; // Edad del usuario (puede ser string o número según el input)
  email: string; // Correo electrónico del usuario
  password: string; // Contraseña del usuario
  userName: string; // Nombre de usuario (tagName en el formulario)
  jerarquia: string; // Nivel de jerarquía del usuario (Soon o Boss)
}

// Componente funcional SignUp, recibe props de tipo SignUpProps
const SignUp: FC<SignUpProps> = ({ title }) => {
  // Estados para almacenar los valores de los campos del formulario
  const [userName, setUserName] = useState(''); // Almacena el nombre del usuario
  const [lastName, setLastName] = useState(''); // Almacena el apellido del usuario
  const [age, setAge] = useState(''); // Almacena la edad del usuario
  const [email, setEmail] = useState(''); // Almacena el correo electrónico
  const [password, setPassword] = useState(''); // Almacena la contraseña
  const [confirmPassword, setConfirmPassword] = useState(''); // Almacena la confirmación de la contraseña
  const [tagName, setTagName] = useState(''); // Almacena el nombre de usuario (tagName)
  const [hierarchy, setHierarchy] = useState('Soon'); // Almacena la jerarquía, por defecto "Soon"

  // Función asíncrona para enviar los datos del usuario al backend
  const handleSignUp = async (usuario: Usuario) => {
    try {
      // Realiza una solicitud POST al endpoint del servidor
      const res = await fetch('http://localhost:5000/NewUsuario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, // Especifica que el cuerpo es JSON
        body: JSON.stringify(usuario) // Convierte el objeto usuario a JSON
      });
      // Verifica si la respuesta del servidor es exitosa
      if (!res.ok) throw new Error("Error al guardar el usuario");
      alert('Usuario guardado!'); // Muestra mensaje de éxito
    } catch (error) {
      alert(`Error: ${error}`); // Muestra mensaje de error si falla la solicitud
    }
  };

  // Maneja el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Evita que el formulario recargue la página

    // Valida que los campos obligatorios estén completos
    if (!userName || !lastName || !email || !password || !tagName) {
      alert("Por favor completa todos los campos obligatorios");
      return;
    }

    // Verifica que las contraseñas coincidan
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    // Crea un objeto usuario con los datos del formulario
    const usuario: Usuario = {
      id: Date.now(), // Genera un ID único basado en la fecha actual
      nombre: userName,
      apellido: lastName,
      edad: age,
      email,
      password,
      userName: tagName,
      jerarquia: hierarchy
    };

    // Llama a la función para enviar los datos al backend
    handleSignUp(usuario);
  };

  // Renderiza el formulario de registro
  return (
    <div className="signup-form">
      <h3>{title}</h3> {/* Muestra el título pasado como prop */}
      <form onSubmit={handleSubmit}> {/* Asocia el evento de envío al manejador handleSubmit */}
        {/* Grupo de campo para el nombre */}
        <div className="form-group">
          <label>User Name</label>
          <input type="text" value={userName} onChange={e => setUserName(e.target.value)} placeholder="Add your UserName" />
        </div>
        {/* Grupo de campo para el apellido */}
        <div className="form-group">
          <label>Last Name</label>
          <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Add your last name" />
        </div>
        {/* Grupo de campo para la edad */}
        <div className="form-group">
          <label>Age</label>
          <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="Add your Age" />
        </div>
        {/* Grupo de campo para el correo electrónico */}
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Add your email" />
        </div>
        {/* Grupo de campo para la contraseña */}
        <div className="form-group">
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Add your password" />
        </div>
        {/* Grupo de campo para confirmar la contraseña */}
        <div className="form-group">
          <label>Confirm Password</label>
          <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Repeat your password" />
        </div>
        {/* Grupo de campo para el tagName */}
        <div className="form-group">
          <label>TagName</label>
          <input type="text" value={tagName} onChange={e => setTagName(e.target.value)} placeholder="Add your TagName" />
        </div>
        {/* Grupo de campo para la jerarquía */}
        <div className="form-group">
          <label>Hierarchy</label>
          <select value={hierarchy} onChange={e => setHierarchy(e.target.value)}>
            <option value="Soon">Soon</option>
            <option value="Boss">Boss</option>
          </select>
        </div>
        {/* Botón para enviar el formulario */}
        <Button variant="primary" icon={<FaUserPlus />} type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUp; // Exporta el componente para usarlo en otras partes de la aplicación