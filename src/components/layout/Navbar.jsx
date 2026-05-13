import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaHandHoldingHeart, FaUserCircle } from 'react-icons/fa';
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
            <Link to="/donaciones" className="nav-link">Como donar</Link>
            <Link to="/donaciones/nueva" className="nav-link">Nueva Donación</Link>
            <Link to="/mis-donaciones" className="nav-link">Mi Historial</Link>
            
            <div className="user-info-display" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '15px' }}>
              <FaUserCircle size={20} color="var(--color-primary)" />
              <span className="nav-link" style={{ fontWeight: 'bold', color: 'var(--color-secondary)' }}>
                {usuario.nombre}
              </span>
              <button onClick={handleLogout} className="nav-btn-login" style={{ marginLeft: '10px' }}>
                Salir
              </button>
            </div>
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