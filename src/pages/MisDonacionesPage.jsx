import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getDonacionesByUser } from '../services/donacionService';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import './MisDonacionesPage.css';

const MisDonacionesPage = () => {
  const { usuario } = useAuth();
  const [donaciones, setDonaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarHistorial = async () => {
      try {
        const data = await getDonacionesByUser(usuario.usuarioId);
        setDonaciones(data);
      } catch (error) {
        console.error("Error al obtener el historial:", error);
      } finally {
        setLoading(false);
      }
    };
    if (usuario?.usuarioId) cargarHistorial();
  }, [usuario]);

  if (loading) return <div className="loader">Cargando historial...</div>;

  return (
    <div className="historial-container">
      <header className="historial-header">
        <h1>Mi Historial de Donaciones</h1>
        <p>Aquí puedes ver el impacto de tu generosidad, {usuario.nombre}.</p>
      </header>
      <div className="historial-grid">
        {donaciones.length === 0 ? (
          <Card className="no-data-card"><p>Aún no has registrado donaciones.</p></Card>
        ) : (
          donaciones.map((donacion) => (
            <Card key={donacion.id} className="donacion-item-card">
              <div className="donacion-info">
                <h3>{donacion.recurso}</h3>
                <p className="donacion-meta"><strong>Cantidad:</strong> {donacion.cantidad} {donacion.unidad}</p>
                <p className="donacion-date">{new Date(donacion.fecha).toLocaleDateString('es-CL')}</p>
              </div>
              <div className="donacion-status">
                <Badge text={donacion.categoria.replace(/_/g, ' ')} variant="info" />
                <Badge text="Registrada" variant="success" />
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default MisDonacionesPage; 