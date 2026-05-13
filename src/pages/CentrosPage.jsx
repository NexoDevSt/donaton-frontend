import React, { useEffect, useState } from 'react';
import axiosInstance from '../services/axiosConfig'; 
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import './CentrosPage.css';

const CentrosPage = () => {
  const [centros, setCentros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCentros = async () => {
      try {
        console.log("Intentando conectar al Gateway en el puerto 8080...");
        
        const response = await axiosInstance.get('/gateway/centros');
        
        console.log("¡Conexión exitosa! Datos recibidos de Yesenia:", response.data);
        
        setCentros(response.data);
      } catch (error) {
        console.error("Error en la integración:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCentros();
  }, []);

  if (loading) return <div className="centros-container">Cargando centros desde el servidor...</div>;

  return (
    <div className="centros-container">
      <div className="centros-header">
        <h1>Centros de Acopio (Datos Reales)</h1>
      </div>

      <div className="centros-grid">
        {centros.length > 0 ? (
          centros.map(centro => (
            <Card key={centro.id}>
              <div className="centro-info">
                <h3>{centro.nombre}</h3>
                <p><strong>Dirección:</strong> {centro.direccion}</p>
                <p><strong>Región:</strong> {centro.region}</p>
              </div>
              <div className="centro-footer">
                <Badge variant={centro.activo ? "bodega" : "distribuida"}>
                  {centro.activo ? "ACTIVO" : "INACTIVO"}
                </Badge>
              </div>
            </Card>
          ))
        ) : (
          <p>No se encontraron centros en la base de datos de Yesenia.</p>
        )}
      </div>
    </div>
  );
};

export default CentrosPage;