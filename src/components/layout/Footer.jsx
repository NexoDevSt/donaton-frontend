import React from 'react';
import { FaHandHoldingHeart } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <FaHandHoldingHeart size={24} color="var(--color-primary)" />
          <span>DONATON</span>
        </div>
        
        <div className="footer-info">
          <p>Proyecto de Ayuda Humanitaria</p>
        </div>
      </div>
      
      <div className="footer-copy">
        &copy; {new Date().getFullYear()} Donaton. Desarrollado por Equipo JAMBY.
      </div>
    </footer>
  );
};

export default Footer;