import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaHandHoldingHeart } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <FaHandHoldingHeart size={30} color="var(--color-primary)" />
        <span className="logo-text">DONATON</span>
      </Link>

      <div className="navbar-links">
        <Link to="/" className="nav-link">Inicio</Link>
        <Link to="/centros" className="nav-link">Centros</Link>
        
        {usuario ? (
          <>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/donaciones" className="nav-link">Mis Donaciones</Link>
            <button onClick={handleLogout} className="nav-btn-login">
              Cerrar Sesión
            </button>
          </>
        ) : (
          <Link to="/login">
            <button className="nav-btn-login">Ingresar</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;