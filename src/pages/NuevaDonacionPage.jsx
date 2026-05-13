import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import { getCentros, registrarDonacion } from '../services/donacionService';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';
import './NuevaDonacionPage.css';

const NuevaDonacionPage = () => {
  const navigate = useNavigate();
  const { usuario } = useAuth(); 
  const [centros, setCentros] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [donacion, setDonacion] = useState({
    recurso: '',
    categoria: 'ALIMENTO_NO_PERECIBLE',
    cantidad: '',
    unidad: '',
    centroAcopioId: '',
    origen: 'Plataforma Web' 
  });

  useEffect(() => {
    const cargarCentros = async () => {
      try {
        const data = await getCentros();
        setCentros(data);
      } catch (error) {
        console.error("Error al cargar centros:", error);
      }
    };
    cargarCentros();
  }, []);

  const handleChange = (e) => {
    setDonacion({ ...donacion, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!usuario || !usuario.usuarioId) {
        toast.error("Error: No se encontró tu ID de usuario. Reintenta el login.");
        setLoading(false);
        return;
      }

      const payload = {
        recurso: donacion.recurso,
        categoria: donacion.categoria,
        cantidad: parseInt(donacion.cantidad), 
        unidad: donacion.unidad,
        origen: donacion.origen,
        centroAcopioId: parseInt(donacion.centroAcopioId), 
        donadorId: parseInt(usuario.usuarioId)
      };

      console.log("Enviando donación validada:", payload);
      await registrarDonacion(payload);
      
      toast.success("¡Donación registrada con éxito!");
      navigate('/donaciones');
      
    } catch (error) {
      console.error("Detalles del error:", error.response?.data);
      const mensaje = error.response?.data?.mensaje || "Error al registrar la donación";
      toast.error(mensaje);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page-container">
      <div className="form-card">
        <h2 style={{ marginBottom: '20px', color: 'var(--color-dark)' }}>Nueva Donación</h2>
        <form onSubmit={handleSubmit} className="form-grid">
          
          <div className="form-group full-width">
            {/* Agregado htmlFor e id para que el test encuentre el input */}
            <label htmlFor="recurso">Recurso (ej: Arroz, Gasas, Mantas)</label>
            <input 
              id="recurso"
              type="text" 
              name="recurso" 
              className="form-input" 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="categoria">Categoría</label>
            <select 
              id="categoria"
              name="categoria" 
              className="form-input" 
              onChange={handleChange} 
              value={donacion.categoria}
            >
              <option value="ALIMENTO_NO_PERECIBLE">Alimento</option>
              <option value="ROPA">Ropa</option>
              <option value="INSUMO_MEDICO">Insumo Médico</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="unidad">Unidad (kg, unidades, cajas)</label>
            <input 
              id="unidad"
              type="text" 
              name="unidad" 
              className="form-input" 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="cantidad">Cantidad</label>
            <input 
              id="cantidad"
              type="number" 
              name="cantidad" 
              className="form-input" 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="centroAcopioId">Centro de Acopio</label>
            <select 
              id="centroAcopioId"
              name="centroAcopioId" 
              className="form-input" 
              onChange={handleChange} 
              required
              value={donacion.centroAcopioId}
            >
              <option value="">Seleccionar centro...</option>
              {centros.map(centro => (
                <option key={centro.id} value={centro.id}>
                  {centro.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group full-width" style={{ marginTop: '10px' }}>
            <Button type="submit" variant="primary" style={{ width: '100%' }} disabled={loading}>
              {loading ? "Registrando..." : "Registrar Donación"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NuevaDonacionPage;