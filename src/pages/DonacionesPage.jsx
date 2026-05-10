import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getDonacionesByUser } from '../services/donacionService';
import { useAuth } from '../context/AuthContext';
import Card from '../components/ui/Card';
import './DashboardPage.css';

const DashboardPage = () => {
  const { usuario } = useAuth();
  const [stats, setStats] = useState({ total: 0, kilos: 0, grafico: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const procesarDatos = async () => {
      try {
        const donaciones = await getDonacionesByUser(usuario.usuarioId);
        
        const total = donaciones.length;

        const totalKilos = donaciones
          .filter(d => d.unidad?.toLowerCase() === 'kg')
          .reduce((acc, curr) => acc + (Number(curr.cantidad) || 0), 0);

        const agrupado = donaciones.reduce((acc, curr) => {
          const cat = curr.categoria || 'OTROS';
          acc[cat] = (acc[cat] || 0) + 1; 
          return acc;
        }, {});

        const datosFormateados = Object.keys(agrupado).map(key => ({
          name: key.replace(/_/g, ' '),
          cantidad: agrupado[key]
        }));

        setStats({ total, kilos: totalKilos, grafico: datosFormateados });
      } catch (error) {
        console.error("Error cargando dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    if (usuario?.usuarioId) procesarDatos();
  }, [usuario]);

  if (loading) return <p>Cargando panel...</p>;

  return (
    <div className="dashboard-container">
      <h1>Panel de Control</h1>
      
      <div className="stats-grid">
        <Card className="stat-card">
          <h3>Mis Donaciones</h3>
          <p className="stat-value">{stats.total}</p>
        </Card>
        <Card className="stat-card">
          <h3>Total Kilos (Aportados)</h3>
          <p className="stat-value">{stats.kilos} kg</p>
        </Card>
      </div>

      <Card className="chart-card">
        <h3>Distribución por Categoría</h3>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={stats.grafico}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cantidad" fill="#E8720C" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default DashboardPage;