import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importamos el contexto
import { getCentros, registrarDonacion } from '../services/donacionService';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';
import './NuevaDonacionPage.css';

const NuevaDonacionPage = () => {
  const navigate = useNavigate();
  const { usuario } = useAuth(); // Obtenemos el usuario logueado
  const [centros, setCentros] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [donacion, setDonacion] = useState({
    recurso: '',
    categoria: 'ALIMENTO_NO_PERECIBLE',
    cantidad: '',
    unidad: '',
    centroAcopioId: '',
    origen: 'Plataforma Web' // Valor por defecto para el DTO
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
      // Validamos que el usuario exista (por seguridad)
      if (!usuario || !usuario.id) {
        toast.error("Debes estar logueado para donar");
        return;
      }

      // Construimos el Payload exacto para el DTO de Yesenia
      const payload = {
        recurso: donacion.recurso,
        categoria: donacion.categoria,
        cantidad: parseInt(donacion.cantidad), // Obligatorio: Integer
        unidad: donacion.unidad,
        origen: donacion.origen,
        centroAcopioId: parseInt(donacion.centroAcopioId), // Obligatorio: Long
        donadorId: parseInt(usuario.id) // Obligatorio: Long (lo sacamos del login)
      };

      console.log("Enviando payload validado al Gateway:", payload);
      
      await registrarDonacion(payload);
      
      toast.success("¡Donación registrada con éxito!");
      navigate('/donaciones');
      
    } catch (error) {
      console.error("Error 400 - Detalles de validación:", error.response?.data);
      // Si hay errores de validación (NotNull/NotBlank), Spring los manda aquí
      const mensaje = error.response?.data?.mensaje || "Error al validar los campos";
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
            <label>Recurso (ej: Arroz, Gasas, Mantas)</label>
            <input type="text" name="recurso" className="form-input" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Categoría</label>
            <select name="categoria" className="form-input" onChange={handleChange} value={donacion.categoria}>
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
            <select 
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
              {loading ? "Procesando..." : "Registrar Donación"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NuevaDonacionPage;