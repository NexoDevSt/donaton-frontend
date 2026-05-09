import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '../components/ui/Card';
import './DashboardPage.css';

const DashboardPage = () => {
  const datosGrafico = [
    { name: 'Alimentos', cantidad: 400 },
    { name: 'Ropa', cantidad: 300 },
    { name: 'Insumos', cantidad: 200 },
  ];

  return (
    <div className="dashboard-container">
      <h1>Panel de Control</h1>
      
      <div className="stats-grid">
        <Card className="stat-card">
          <h3>Total Donaciones</h3>
          <p className="stat-value">1,520</p>
        </Card>
        <Card className="stat-card">
          <h3>Kilos Entregados</h3>
          <p className="stat-value">12,000</p>
        </Card>
      </div>

      <Card className="chart-card">
        <h3>Donaciones por Categoría</h3>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={datosGrafico}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cantidad" fill="#E8720C" /> {/* Naranja oficial  */}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default DashboardPage;