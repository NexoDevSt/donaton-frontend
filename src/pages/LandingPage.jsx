import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaShippingFast, FaHospital } from 'react-icons/fa';
import './LandingPage.css'; // Importación de estilos separados

const LandingPage = () => {
  return (
    <div className="landing-container">
      <section className="hero">
        <h1 className="hero-title">Dona. Transforma. Salva Vidas.</h1>
        <p className="hero-subtitle">
          Únete a la red de apoyo humanitario más grande. Gestionamos donaciones 
          de alimentos, ropa e insumos médicos de forma transparente y eficiente.
        </p>
        <Link to="/register">
          <button className="btn-primary" style={{ padding: '15px 40px', fontSize: '1.2rem' }}>
            Comenzar a Donar
          </button>
        </Link>
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