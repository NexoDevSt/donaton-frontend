import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getDonacionesByUser } from '../services/donacionService';
import Badge from '../components/ui/Badge'; 
import Button from '../components/ui/Button';
import './DonacionesPage.css';

const DonacionesPage = () => {
  const { usuario } = useAuth();
  const [donaciones, setDonaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarMisDonaciones = async () => {
      if (usuario && usuario.usuarioId) {
        try {
          const data = await getDonacionesByUser(usuario.usuarioId);
          setDonaciones(data);
        } catch (error) {
          console.error("Error al cargar donaciones:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    cargarMisDonaciones();
  }, [usuario]);

  if (loading) return <div className="donaciones-container"><p>Cargando tus donaciones...</p></div>;

  return (
    <div className="donaciones-container">
      <div className="donaciones-header">
        <h1>Mis Donaciones</h1>
        <Link to="/donaciones/nueva">
          <Button variant="primary">Nueva Donación</Button>
        </Link>
      </div>

      <div className="filtros-bar">
        <select className="form-input">
          <option value="">Todas las categorías</option>
          <option value="ALIMENTO_NO_PERECIBLE">Alimentos</option>
          <option value="ROPA">Ropa</option>
          <option value="INSUMO_MEDICO">Insumos Médicos</option>
        </select>
      </div>

      <table className="tabla-donaciones">
        <thead>
          <tr>
            <th>Recurso</th>
            <th>Categoría</th>
            <th>Cantidad</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {donaciones.length > 0 ? (
            donaciones.map(d => (
              <tr key={d.id}>
                <td>{d.recurso}</td>
                <td>{d.categoria ? d.categoria.replace(/_/g, ' ') : 'N/A'}</td>
                <td>{d.cantidad} {d.unidad}</td>
                <td>
                  <Badge variant={d.estado === 'RECIBIDA' ? 'recibida' : 'bodega'}>
                    {d.estado || 'PENDIENTE'}
                  </Badge>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>
                No has realizado donaciones todavía.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DonacionesPage;