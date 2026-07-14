import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import Footer from './Footer';

describe('Componente Footer', () => {
  test('debe renderizar el nombre de la marca DONATON', () => {
    render(<Footer />);
    // Usamos una función para buscar el "DONATON" que está específicamente en un span
    const brandName = screen.getByText((content, element) => {
      return element.tagName.toLowerCase() === 'span' && content.includes('DONATON');
    });
    expect(brandName).toBeInTheDocument();
  });

  test('debe mostrar el texto del Equipo JAMBY', () => {
    render(<Footer />);
    expect(screen.getByText(/Desarrollado por Equipo JAMBY/i)).toBeInTheDocument();
  });

  test('debe mostrar el año actual dinámicamente', () => {
    render(<Footer />);
    const añoActual = new Date().getFullYear().toString();
    
    // Usamos getAllByText y verificamos que al menos uno contenga el año
    const elementosConAño = screen.getAllByText(new RegExp(añoActual, 'i'));
    expect(elementosConAño.length).toBeGreaterThan(0);
  });

  test('debe tener la estructura HTML semántica correcta (footer)', () => {
    const { container } = render(<Footer />);
    
    const footerElement = container.querySelector('footer');
    expect(footerElement).toBeInTheDocument();
    expect(footerElement).toHaveClass('footer');
  });

  test('debe renderizar el ícono de marca', () => {
    const { container } = render(<Footer />);
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });
});