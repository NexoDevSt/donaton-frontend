import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { FaBoxOpen, FaMapMarkerAlt, FaCheckCircle, FaClipboardList } from 'react-icons/fa';
import './DonacionesPage.css';

const DonacionesPage = () => {
  const pasos = [
    {
      icon: <FaClipboardList size={30} />,
      titulo: "1. Identifica qué puedes donar",
      descripcion: "Aceptamos alimentos no perecibles, ropa en buen estado e insumos médicos básicos."
    },
    {
      icon: <FaBoxOpen size={30} />,
      titulo: "2. Prepara tu donación",
      descripcion: "Asegúrate de que los productos no estén vencidos y la ropa esté limpia y embolsada."
    },
    {
      icon: <FaMapMarkerAlt size={30} />,
      titulo: "3. Elige un Centro de Acopio",
      descripcion: "Revisa nuestra lista de centros activos para encontrar el más cercano a tu ubicación."
    },
    {
      icon: <FaCheckCircle size={30} />,
      titulo: "4. Registra el envío",
      descripcion: "Completa el formulario en nuestra plataforma para generar el registro de tu aporte."
    }
  ];

  return (
    <div className="guia-donacion-container">
      <div className="guia-header">
        <h1>¿Cómo realizar una donación?</h1>
        <p>Sigue estos sencillos pasos para que tu ayuda llegue a quienes más la necesitan.</p>
      </div>

      <div className="pasos-grid">
        {pasos.map((paso, index) => (
          <Card key={index} className="paso-card">
            <div className="paso-icon-container">{paso.icon}</div>
            <h3>{paso.titulo}</h3>
            <p>{paso.descripcion}</p>
          </Card>
        ))}
      </div>

      <div className="guia-footer">
        <Card className="cta-card">
          <h2>¿Listo para ayudar?</h2>
          <p>Ya puedes registrar tu donación en nuestro sistema de forma rápida y segura.</p>
          <div className="cta-buttons">
            <Link to="/nueva-donacion">
              <Button variant="primary">Registrar Donación Ahora</Button>
            </Link>
            <Link to="/centros">
              <Button variant="secondary">Ver Centros de Acopio</Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DonacionesPage;