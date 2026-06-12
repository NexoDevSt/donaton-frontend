import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import { FaHeart, FaShippingFast, FaHospital, FaClipboardList } from 'react-icons/fa'; 
import './LandingPage.css';

const LandingPage = () => {
  const { usuario } = useAuth();

  const esAdmin = usuario && usuario.rol === 'ADMIN';

  return (
    <div className="landing-container">
      <section className="hero">
        <h1 className="hero-title">
          {usuario ? `¡Hola de nuevo, ${usuario.nombre}!` : "Dona. Transforma. Salva Vidas."}
        </h1>
        
        <p className="hero-subtitle">
          {usuario 
            ? "Qué bueno tenerte de vuelta. Revisa el impacto de las donaciones o consulta los requerimientos urgentes actuales."
            : "Únete a la red de apoyo humanitario más grande. Gestionamos donaciones de alimentos, ropa e insumos médicos de forma transparente y eficiente."
          }
        </p>

        <div className="hero-cta">
          {usuario ? (
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/dashboard">
                <button className="btn-primary" style={{ padding: '15px 40px', fontSize: '1.2rem' }}>
                  Ir al Dashboard
                </button>
              </Link>
              
              <Link to="/necesidades">
                <button className="btn-secondary" style={{ padding: '15px 40px', fontSize: '1.2rem', background: 'transparent', border: '2px solid white', color: 'white', cursor: 'pointer', borderRadius: '8px' }}>
                  Ver Necesidades
                </button>
              </Link>

              {/* BOTÓN EXCLUSIVO PARA EL ADMINISTRADOR */}
              {esAdmin && (
                <Link to="/necesidades/crear">
                  <button 
                    className="btn-primary" 
                    style={{ 
                      padding: '15px 40px', 
                      fontSize: '1.2rem', 
                      backgroundColor: '#E8720C', 
                      borderColor: '#E8720C' 
                    }}
                  >
                    Crear Necesidad
                  </button>
                </Link>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
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

      <section className="stats-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
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

        <Link to="/necesidades" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="stat-card" style={{ cursor: 'pointer', border: '1px solid rgba(232, 114, 12, 0.3)', transition: 'all 0.3s ease' }}>
            <FaClipboardList size={45} className="stat-icon" style={{ color: '#E8720C' }} />
            <span className="stat-number" style={{ color: '#E8720C' }}>Alertas</span>
            <p className="stat-label" style={{ fontWeight: 'bold', textDecoration: 'underline' }}>Necesidades Críticas →</p>
          </div>
        </Link>
      </section>
    </div>
  );
};

export default LandingPage;