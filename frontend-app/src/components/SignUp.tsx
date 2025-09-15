import React, { FC, useState } from 'react';
import './SignUp.css';
import Button from './Button.tsx';
import { FaUserPlus } from 'react-icons/fa';

interface SignUpProps {
  title: string;
}

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  edad: string | number;
  email: string;
  password: string;
  userName: string;
  jerarquia: string;
  group: string;
}

const SignUp: FC<SignUpProps> = ({ title }) => {
  const [userName, setUserName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [tagName, setTagName] = useState('');
  const [hierarchy, setHierarchy] = useState('Soon');
  const [group, setGroup] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSignUp = async (usuario: Usuario) => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/NewUsuario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario),
      });

      if (!res.ok) throw new Error('Error al guardar el usuario');

      setMessage({ type: 'success', text: 'Usuario guardado exitosamente!' });

      // Limpiar formulario
      setUserName('');
      setLastName('');
      setAge('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setTagName('');
      setHierarchy('Soon');
      setGroup('');
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Error desconocido' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones
    if (!userName || !lastName || !email || !password || !tagName) {
      setMessage({ type: 'error', text: 'Por favor completa todos los campos' });
      return;
    }

    if (password !== confirmPassword) {
      setMessage({ type: 'error', text: 'Las contraseñas no coinciden' });
      return;
    }

    if ((hierarchy === 'Boss' || hierarchy === 'Soon') && !group) {
      setMessage({ type: 'error', text: 'Debes asignar un grupo para esta jerarquía' });
      return;
    }

    const usuario: Usuario = {
      id: Date.now(),
      nombre: userName,
      apellido: lastName,
      edad: age,
      email,
      password,
      userName: tagName,
      jerarquia: hierarchy,
      group,
    };

    handleSignUp(usuario);
  };

  return (
    <div className="signup-form">
      <h3>{title}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>User Name</label>
          <input type="text" value={userName} onChange={e => setUserName(e.target.value)} placeholder="Add your UserName" />
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Add your last name" />
        </div>

        <div className="form-group">
          <label>Age</label>
          <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="Add your Age" />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Add your email" />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Add your password" />
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Repeat your password" />
        </div>

        <div className="form-group">
          <label>TagName</label>
          <input type="text" value={tagName} onChange={e => setTagName(e.target.value)} placeholder="Add your TagName" />
        </div>

        <div className="form-group">
          <label>Hierarchy</label>
          <select value={hierarchy} onChange={e => setHierarchy(e.target.value)}>
            <option value="Soon">Soon</option>
            <option value="Boss">Boss</option>
          </select>
        </div>

        <div className="form-group">
          <label>Group</label>
          <input type="text" value={group} onChange={e => setGroup(e.target.value)} placeholder="Add your Group" />
        </div>

        {message && <p className={`message ${message.type}`}>{message.text}</p>}

        <Button variant="primary" icon={<FaUserPlus />} type="submit" disabled={loading}>
          {loading ? 'Guardando...' : 'Sign Up'}
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
