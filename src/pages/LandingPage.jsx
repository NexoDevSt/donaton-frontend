import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importamos el contexto de autenticación
import { FaHeart, FaShippingFast, FaHospital } from 'react-icons/fa';
import './LandingPage.css';

const LandingPage = () => {
  const { usuario } = useAuth();

  return (
    <div className="landing-container">
      <section className="hero">
        <h1 className="hero-title">
          {usuario ? `¡Hola de nuevo, ${usuario.nombre}!` : "Dona. Transforma. Salva Vidas."}
        </h1>
        
        <p className="hero-subtitle">
          {usuario 
            ? "Qué bueno tenerte de vuelta. Revisa el impacto de las donaciones que nuestros usuarios han realizado."
            : "Únete a la red de apoyo humanitario más grande. Gestionamos donaciones de alimentos, ropa e insumos médicos de forma transparente y eficiente."
          }
        </p>

        <div className="hero-cta">
          {usuario ? (
            <Link to="/dashboard">
              <button className="btn-primary" style={{ padding: '15px 40px', fontSize: '1.2rem' }}>
                Ir al Dashboard
              </button>
            </Link>
          ) : (
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
              <Link to="/register">
                <button className="btn-primary" style={{ padding: '15px 40px', fontSize: '1.2rem' }}>
                  Comenzar a Donar
                </button>
              </Link>
              <Link to="/login">
                <button className="btn-secondary" style={{ padding: '15px 40px', fontSize: '1.2rem', background: 'transparent', border: '2px solid white', color: 'white', cursor: 'pointer', borderRadius: '8px' }}>
                  Iniciar Sesión
                </button>
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="stats-section">
        <div className="stat-card">
          <FaHeart size={45} className="stat-icon" />
          <span className="stat-number">+1,500</span>
          <p className="stat-label">Donaciones Realizadas</p>
        </div>

        <div className="stat-card">
          <FaShippingFast size={45} className="stat-icon" />
          <span className="stat-number">12,000 kg</span>
          <p className="stat-label">Ayuda Entregada</p>
        </div>

        <div className="stat-card">
          <FaHospital size={45} className="stat-icon" />
          <span className="stat-number">25</span>
          <p className="stat-label">Centros de Acopio</p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;