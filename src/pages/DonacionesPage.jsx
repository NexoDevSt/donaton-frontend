import React from 'react';
import { Link } from 'react-router-dom';
import Badge from '../components/ui/Badge'; 
import Button from '../components/ui/Button';
import './DonacionesPage.css';

const DonacionesPage = () => {
  const donacionesPrueba = [
    { id: 1, recurso: "Arroz", categoria: "ALIMENTO_NO_PERECIBLE", cantidad: 50, unidad: "kg", estado: "RECIBIDA" },
    { id: 2, recurso: "Cobijas", categoria: "ROPA", cantidad: 20, unidad: "unidades", estado: "EN_BODEGA" }
  ];

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
          {donacionesPrueba.map(d => (
            <tr key={d.id}>
              <td>{d.recurso}</td>
              <td>{d.categoria.replace(/_/g, ' ')}</td>
              <td>{d.cantidad} {d.unidad}</td>
              <td>
                <Badge variant={d.estado === 'RECIBIDA' ? 'recibida' : 'bodega'}>
                  {d.estado}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DonacionesPage;