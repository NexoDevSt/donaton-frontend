import React from 'react';
import './Badge.css';

const Badge = ({ children, variant = 'recibida' }) => {
  return (
    <span className={`badge badge-${variant.toLowerCase()}`}>
      {children}
    </span>
  );
};

export default Badge;