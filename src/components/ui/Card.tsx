import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-panel border border-steel rounded-card p-4 md:p-[18px] ${
        onClick ? 'cursor-pointer hover:border-signal-blue/50 transition-colors' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
