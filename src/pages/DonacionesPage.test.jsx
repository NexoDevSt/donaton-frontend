import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import DonacionesPage from './DonacionesPage';

describe('Página DonacionesPage (Guía Informativa)', () => {
  const renderPage = () => {
    return render(
      <BrowserRouter>
        <DonacionesPage />
      </BrowserRouter>
    );
  };

  test('debe renderizar el título y la descripción de la guía', () => {
    renderPage();
    expect(screen.getByText(/¿Cómo realizar una donación?/i)).toBeInTheDocument();
    expect(screen.getByText(/Sigue estos sencillos pasos/i)).toBeInTheDocument();
  });

  test('debe listar los 4 pasos para donar utilizando el array de datos', () => {
    renderPage();
    
    // Verificamos que los títulos de los pasos existan
    expect(screen.getByText(/1. Identifica qué puedes donar/i)).toBeInTheDocument();
    expect(screen.getByText(/2. Prepara tu donación/i)).toBeInTheDocument();
    expect(screen.getByText(/3. Elige un Centro de Acopio/i)).toBeInTheDocument();
    expect(screen.getByText(/4. Registra el envío/i)).toBeInTheDocument();
  });

  test('debe mostrar la tarjeta de llamado a la acción (CTA) con sus botones', () => {
    renderPage();
    
    expect(screen.getByText(/¿Listo para ayudar?/i)).toBeInTheDocument();
    
    // Verificamos que los botones de navegación estén presentes
    const btnRegistrar = screen.getByRole('button', { name: /registrar donación ahora/i });
    const btnCentros = screen.getByRole('button', { name: /ver centros de acopio/i });

    expect(btnRegistrar).toBeInTheDocument();
    expect(btnCentros).toBeInTheDocument();
  });

  test('debe tener las clases de CSS correctas para el diseño', () => {
    const { container } = renderPage();
    
    // Verificamos el contenedor principal
    expect(container.firstChild).toHaveClass('guia-donacion-container');
    
    // Verificamos que se rendericen las 4 tarjetas de pasos
    const pasoCards = container.querySelectorAll('.paso-card');
    expect(pasoCards.length).toBe(4);
  });
});