import React, { useEffect, useState } from 'react';
import { listarNecesidades } from '../services/necesidadService';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import './NecesidadesPage.css'; 

const NecesidadesPage = () => {
  const [necesidades, setNecesidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const cargarNecesidades = async () => {
      try {
        const data = await listarNecesidades();
        setNecesidades(data);
      } catch (err) {
        console.error("Error cargando necesidades:", err.message);
        setErrorMsg(err.message);
      } finally {
        setLoading(false);
      }
    };

    cargarNecesidades();
  }, []);

  if (loading) return <div className="loader">Cargando requerimientos de urgencia...</div>;

  if (errorMsg) {
    return (
      <div className="error-container">
        <Card className="error-card">
          <h2>Aviso del Sistema</h2>
          <p>{errorMsg}</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="necesidades-container">
      <header className="necesidades-header">
        <h1>Necesidades Críticas de los Centros</h1>
        <p>Revisa qué insumos o recursos hacen falta urgentemente en las regiones.</p>
      </header>

      <div className="necesidades-grid">
        {necesidades.length === 0 ? (
          <p>No hay necesidades críticas reportadas en este momento.</p>
        ) : (
          necesidades.map((item) => (
            <Card key={item.id} className="necesidad-item-card">
              <div className="necesidad-info">
                <h3>{item.tipoRecurso}</h3>
                
                <p><strong>Cantidad solicitada:</strong> {item.cantidadSolicitada}</p>
                <p><strong>Región:</strong> {item.region}</p>
                <p><strong>Centro / Ubicación:</strong> {item.ubicacion}</p>
                
                {/* CORREGIDO: Ahora incluye su etiqueta correspondiente */}
                {item.descripcion && (
                  <p className="necesidad-descripcion" style={{ marginTop: '5px' }}>
                    <strong>Descripción:</strong> {item.descripcion}
                  </p>
                )}
              </div>
              
              <div className="necesidad-status">
                <Badge 
                  text={item.urgencia} 
                  variant={item.urgencia === 'ALTA' ? 'danger' : 'warning'} 
                />
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default NecesidadesPage;