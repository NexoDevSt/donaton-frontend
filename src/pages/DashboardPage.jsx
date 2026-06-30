import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from '../context/AuthContext';
import { actualizarEstadoDonacion } from '../services/donacionService'; 
import axiosInstance from '../services/axiosConfig'; 
import Card from '../components/ui/Card';
import { toast } from 'react-hot-toast';
import './DashboardPage.css';

const DashboardPage = () => {
  const { usuario } = useAuth();
  const [donaciones, setDonaciones] = useState([]); // Garantizamos estado inicial vacío
  const [loading, setLoading] = useState(true);

  const esAdmin = usuario && (
    usuario.email === 'admin@donaton.cl' || 
    usuario.nombre?.toLowerCase().includes('admin')
  );

  const datosGrafico = [
    { name: 'Alimentos', cantidad: 400 },
    { name: 'Ropa', cantidad: 300 },
    { name: 'Insumos', cantidad: 200 },
  ];

  useEffect(() => {
    const cargarDonaciones = async () => {
      try {
        const url = esAdmin ? '/gateway/donaciones' : `/gateway/donaciones/usuario/${usuario?.id}`;
        const response = await axiosInstance.get(url);
        
        console.log("=== DEBUG DONACIONES RECIBIDAS ===", response.data);

        // 🛡️ CONTROL DE DAÑOS EXTRA: Evaluamos cómo viene el JSON del backend
        if (Array.isArray(response.data)) {
          setDonaciones(response.data);
        } else if (response.data && Array.isArray(response.data.content)) {
          setDonaciones(response.data.content);
        } else if (response.data && Array.isArray(response.data.donaciones)) {
          setDonaciones(response.data.donaciones);
        } else {
          console.error("El backend no devolvió una lista reconocible:", response.data);
          setDonaciones([]); // Fallback para evitar que .map explote
        }

      } catch (err) {
        console.error("Error al obtener donaciones:", err);
        setDonaciones([]); // Fallback en caso de error de red
      } finally {
        setLoading(false);
      }
    };

    if (usuario) cargarDonaciones();
  }, [usuario, esAdmin]);

  const handleEstadoChange = async (donacionId, nuevoEstado) => {
    try {
      await actualizarEstadoDonacion(donacionId, nuevoEstado);
      
      setDonaciones(prev => 
        prev.map(d => d.id === donacionId ? { ...d, estado: nuevoEstado } : d)
      );
      
      toast.success(`Estado actualizado a ${nuevoEstado.replace(/_/g, ' ')}`);
    } catch (error) {
      console.error("Error al cambiar estado:", error);
      toast.error("No se pudo actualizar el estado de la donación.");
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Panel de Control</h1>
      
      <div className="stats-grid">
        <Card className="stat-card">
          <h3>Total Donaciones</h3>
          <p className="stat-value">{Array.isArray(donaciones) ? donaciones.length : 0}</p>
        </Card>
        <Card className="stat-card">
          <h3>Kilos Entregados</h3>
          <p className="stat-value">12,000</p>
        </Card>
      </div>

      <Card className="chart-card">
        <h3>Donaciones por Categoría</h3>
        <div style={{ width: '100%', height: 300, minWidth: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={datosGrafico}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cantidad" fill="#E8720C" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="donaciones-table-card" style={{ marginTop: '20px', padding: '20px' }}>
        <h3>{esAdmin ? "Administrar Todas las Donaciones" : "Mis Donaciones Registradas"}</h3>
        {loading ? (
          <p>Cargando registros...</p>
        ) : !Array.isArray(donaciones) || donaciones.length === 0 ? (
          <p>No se encontraron donaciones registradas.</p>
        ) : (
          <div style={{ overflowX: 'auto', marginTop: '15px' }}>
            <table className="dashboard-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px' }}>
                  <th style={{ padding: '10px' }}>ID</th>
                  <th style={{ padding: '10px' }}>Recurso</th>
                  <th style={{ padding: '10px' }}>Cantidad</th>
                  <th style={{ padding: '10px' }}>Estado</th>
                </tr>
              </thead>
              <tbody>
                {donaciones.map((donacion) => (
                  <tr key={donacion.id} style={{ borderBottom: '1px solid #edf2f7' }}>
                    <td style={{ padding: '10px' }}>#{donacion.id}</td>
                    <td style={{ padding: '10px' }}>{donacion.recurso || donacion.tipoRecurso || 'N/A'}</td>
                    <td style={{ padding: '10px' }}>{donacion.cantidad || donacion.cantidadSolicitada || 0}</td>
                    <td style={{ padding: '10px' }}>
                      {esAdmin ? (
                        <select
                          value={donacion.estado || 'RECIBIDA'}
                          onChange={(e) => handleEstadoChange(donacion.id, e.target.value)}
                          style={{
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontWeight: 'bold',
                            border: '1px solid #cbd5e1',
                            cursor: 'pointer'
                          }}
                        >
                          {/* 🚀 MODIFICADO: Solo Enums reales del microservicio */}
                          <option value="RECIBIDA">RECIBIDA</option>
                          <option value="EN_BODEGA">EN BODEGA</option>
                          <option value="DISTRIBUIDA">DISTRIBUIDA</option>
                        </select>
                      ) : (
                        <span className={`badge-estado ${(donacion.estado || 'RECIBIDA').toLowerCase()}`}>
                          {(donacion.estado || 'RECIBIDA').replace(/_/g, ' ')}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default DashboardPage;