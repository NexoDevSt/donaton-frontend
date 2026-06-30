import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { crearNecesidad } from '../services/necesidadService';
import './CrearNecesidadPage.css';

const CrearNecesidadPage = () => {
  const { token, usuario } = useAuth();
  const navigate = useNavigate();

  // 🚀 CORREGIDO: Inicializado con un Enum real ('ALIMENTO_NO_PERECIBLE') para evitar caídas al enviar por defecto
  const [formData, setFormData] = useState({
    cantidadSolicitada: '',
    descripcion: '',
    region: '',
    ubicacion: '',
    tipoRecurso: 'ALIMENTO_NO_PERECIBLE', 
    urgencia: 'MEDIA',        
    estado: 'PENDIENTE'       
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const necesidadDTO = {
      ...formData,
      cantidadSolicitada: parseInt(formData.cantidadSolicitada, 10),
      reportadoPorId: usuario?.id || 1 
    };

    try {
      await crearNecesidad(necesidadDTO, token);
      alert('¡Necesidad crítica reportada con éxito!');
      navigate('/necesidades'); 
    } catch (err) {
      console.error('Error al crear la necesidad:', err);
      setError(err.message || 'No se pudo registrar la necesidad. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="crear-necesidad-container">
      <div className="form-card">
        <h2>Reportar Nueva Necesidad Crítica</h2>
        <p>Completa el formulario para registrar una carencia en los centros de ayuda.</p>

        {error && <div className="error-banner">{error}</div>}

        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label htmlFor="tipoRecurso">Tipo de Recurso</label>
            <select
              id="tipoRecurso"
              name="tipoRecurso"
              value={formData.tipoRecurso}
              onChange={handleChange}
              required
            >
              {/* 🚀 CORREGIDO: Mapeo exacto letra por letra con tu enum de Spring Boot */}
              <option value="ALIMENTO_NO_PERECIBLE">Alimento No Perecible</option>
              <option value="ROPA">Ropa / Abrigo</option>
              <option value="INSUMO_MEDICO">Insumo Médico</option>
              <option value="HIGIENE">Artículos de Higiene</option>
              <option value="OTRO">Otro / Diferente</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="cantidadSolicitada">Cantidad Solicitada</label>
            <input
              type="number"
              id="cantidadSolicitada"
              name="cantidadSolicitada"
              placeholder="Ej: 150"
              value={formData.cantidadSolicitada}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="region">Región</label>
              <input
                type="text"
                id="region"
                name="region"
                placeholder="Ej: Metropolitana"
                value={formData.region}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="ubicacion">Ubicación / Centro</label>
              <input
                type="text"
                id="ubicacion"
                name="ubicacion"
                placeholder="Ej: Gimnasio Municipal"
                value={formData.ubicacion}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="urgencia">Nivel de Urgencia</label>
            <select
              id="urgencia"
              name="urgencia"
              value={formData.urgencia}
              onChange={handleChange}
              required
            >
              <option value="BAJA">Baja</option>
              <option value="MEDIA">Media</option>
              <option value="ALTA">Alta / Crítica</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="descripcion">Descripción del Requerimiento</label>
            <textarea
              id="descripcion"
              name="descripcion"
              rows="4"
              placeholder="Detalla de manera clara qué se necesita..."
              value={formData.descripcion}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="btn-secondary" 
              onClick={() => navigate('/necesidades')}
              disabled={loading}
            >
              Cancelar
            </button>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Guardando...' : 'Publicar Necesidad'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CrearNecesidadPage;