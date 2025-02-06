import { ReactNode, MouseEventHandler } from 'react';
import './Card.module.css';

interface CardProps {
    className?: string; // Optional additional CSS classes
    onClick?: MouseEventHandler<HTMLDivElement>;
    children: ReactNode; // Content inside the card
  }

const Card: React.FC<CardProps> = ({ className = '', onClick, children }) => {
  const classes = `card ${className}`; // Combine card class with additional classes

  return <div className={classes} onClick={onClick}>{children}</div>;
};
export default Card;