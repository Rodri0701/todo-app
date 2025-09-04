import React, { FC } from 'react';
import './SignUp.css';
import Button from './Button.tsx';
import { FaUserPlus } from 'react-icons/fa';

interface SignUpProps {
  title: string;
  onSubmit?: () => void;
}

const SignUp: FC<SignUpProps> = ({ title, onSubmit }) => {
  return (
    <div className="signup-form">
      <h3>{title}</h3>
      <form>
        <div className="form-group">
          <label htmlFor="name">User Name</label>
          <input type="text" id="name" placeholder="Add your UserName" />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Add your email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" placeholder="Add your password" />
        </div>
        <Button variant="primary" icon={<FaUserPlus />} onClick={onSubmit}>
          Sing Up
        </Button>
      </form>
    </div>
  );
};

export default SignUp;