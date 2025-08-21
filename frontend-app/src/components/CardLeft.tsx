import React from 'react';
import './CardLeft.css';
import { useAppContext } from './AppContext.tsx';

interface CardLeftProps {
  title: string;
}

const CardLeft: React.FC<CardLeftProps> = ({ title }) => {
  const { isLoginFormVisible } = useAppContext();

  return (
    <div className={`card-left ${isLoginFormVisible ? 'compressed' : ''}`}>
      <h2>{title}</h2>
    </div>
  );
};

export default CardLeft;