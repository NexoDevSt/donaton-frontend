import React, { useState } from 'react';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';
import './NuevaDonacionPage.css';

const NuevaDonacionPage = () => {
  const [donacion, setDonacion] = useState({
    recurso: '',
    categoria: 'ALIMENTO_NO_PERECIBLE',
    cantidad: '',
    unidad: '',
    centroAcopio: ''
  });

  const handleChange = (e) => {
    setDonacion({ ...donacion, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Solicitud de donación enviada correctamente");
    console.log("Datos para el ms-donaciones:", donacion);
  };

  return (
    <div className="form-page-container">
      <div className="form-card">
        <h2 style={{ marginBottom: '20px', color: 'var(--color-dark)' }}>Nueva Donación</h2>
        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-group full-width">
            <label>Recurso (ej: Arroz, Gasas, Mantas)</label>
            <input type="text" name="recurso" className="form-input" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Categoría</label>
            <select name="categoria" className="form-input" onChange={handleChange}>
              <option value="ALIMENTO_NO_PERECIBLE">Alimento</option>
              <option value="ROPA">Ropa</option>
              <option value="INSUMO_MEDICO">Insumo Médico</option>
            </select>
          </div>

          <div className="form-group">
            <label>Unidad (kg, unidades, cajas)</label>
            <input type="text" name="unidad" className="form-input" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Cantidad</label>
            <input type="number" name="cantidad" className="form-input" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Centro de Acopio</label>
            <select name="centroAcopio" className="form-input" onChange={handleChange} required>
              <option value="">Seleccionar centro...</option>
              <option value="Centro Melipilla">Centro Melipilla</option>
              <option value="Centro Talagante">Centro Talagante</option>
            </select>
          </div>

          <div className="form-group full-width" style={{ marginTop: '10px' }}>
            <Button type="submit" variant="primary" style={{ width: '100%' }}>
              Registrar Donación
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NuevaDonacionPage;