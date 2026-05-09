import React from 'react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import './CentrosPage.css';

const CentrosPage = () => {
  // Datos de prueba (hardcoded) mientras Alexis termina el BFF
  const centrosPrueba = [
    { id: 1, nombre: "Centro Melipilla", direccion: "Ortúzar 456", region: "Metropolitana", activo: true },
    { id: 2, nombre: "Centro Talagante", direccion: "Bernardo O'Higgins 12", region: "Metropolitana", activo: false }
  ];

  return (
    <div className="centros-container">
      <div className="centros-header">
        <h1>Centros de Acopio</h1>
        <p>Encuentra el lugar más cercano para entregar tu ayuda.</p>
      </div>

      <div className="centros-grid">
        {centrosPrueba.map(centro => (
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
        ))}
      </div>
    </div>
  );
};

export default CentrosPage;