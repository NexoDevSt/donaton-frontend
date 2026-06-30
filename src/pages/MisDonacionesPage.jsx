import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getDonacionesByUser } from '../services/donacionService';
import Card from '../components/ui/Card';
import './MisDonacionesPage.css';

const MisDonacionesPage = () => {
  const { usuario } = useAuth();
  const [donaciones, setDonaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🚀 MODIFICADO: Formatea según los 3 enums reales de la base de datos
  const formatearEstado = (estado) => {
    if (!estado) return 'RECIBIDA';
    const est = estado.toUpperCase();
    if (est === 'EN_BODEGA') return 'EN BODEGA';
    return est;
  };

  // 🚀 MODIFICADO: Asigna colores a los 3 enums vigentes del microservicio
  const obtenerColorEstado = (estado) => {
    switch (estado?.toUpperCase()) {
      case 'RECIBIDA':
        return '#059669'; // Verde
      case 'EN_BODEGA':
        return '#d97706'; // Ámbar / Amarillo oscuro
      case 'DISTRIBUIDA':
        return '#0284c7'; // Azul
      default:
        return '#059669'; // Fallback a Verde si el registro inicial no tiene estado explícito
    }
  };

  useEffect(() => {
    const cargarHistorial = async () => {
      try {
        const idUsuario = usuario?.usuarioId || usuario?.id;
        if (!idUsuario) return;

        const data = await getDonacionesByUser(idUsuario);
        
        if (Array.isArray(data)) {
          setDonaciones(data);
        } else if (data && Array.isArray(data.content)) {
          setDonaciones(data.content);
        } else {
          setDonaciones([]);
        }
      } catch (error) {
        console.error("Error al obtener el historial:", error);
        setDonaciones([]);
      } finally {
        setLoading(false);
      }
    };
    
    if (usuario) cargarHistorial();
  }, [usuario]);

  if (loading) return <div className="loader">Cargando historial...</div>;

  return (
    <div className="historial-container">
      <header className="historial-header">
        <h1>Mi Historial de Donaciones</h1>
        <p>Aquí puedes ver el impacto de tu generosidad, {usuario?.nombre}.</p>
      </header>
      
      <div className="historial-grid">
        {!Array.isArray(donaciones) || donaciones.length === 0 ? (
          <Card className="no-data-card">
            <p>Aún no has registrado donaciones.</p>
          </Card>
        ) : (
          donaciones.map((donacion) => (
            <Card key={donacion.id || donacion.idDonacion} className="donacion-item-card">
              <div className="donacion-info" style={{ width: '100%' }}>
                <h3>{donacion.recurso}</h3>
                
                <p className="donacion-meta">
                  <strong>Cantidad:</strong> {donacion.cantidad} {donacion.unidad}
                </p>
                
                {donacion.nombreCentroAcopio && (
                  <p className="donacion-centro">
                    <strong>Centro:</strong> {donacion.nombreCentroAcopio}
                  </p>
                )}
                
                <p className="donacion-estado-texto">
                  <strong>Estado: </strong>
                  <span style={{ 
                    color: obtenerColorEstado(donacion.estado), 
                    fontWeight: 'bold',
                    textTransform: 'uppercase'
                  }}>
                    {formatearEstado(donacion.estado)}
                  </span>
                </p>

                {donacion.categoria && (
                  <p className="donacion-categoria-texto" style={{ fontSize: '0.9rem', color: '#6b7280', marginTop: '4px' }}>
                    <strong>Categoría:</strong> {donacion.categoria.replace(/_/g, ' ')}
                  </p>
                )}
                
                <p className="donacion-date" style={{ marginTop: '8px' }}>
                  {donacion.fecha ? new Date(donacion.fecha).toLocaleDateString('es-CL') : '09-05-2026'}
                </p>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default MisDonacionesPage;