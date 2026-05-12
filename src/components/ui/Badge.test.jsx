import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import Badge from './Badge';

describe('Componente Badge', () => {
  test('debe renderizar el texto interno correctamente', () => {
    render(<Badge>Pendiente</Badge>);
    expect(screen.getByText(/pendiente/i)).toBeInTheDocument();
  });

  test('debe aplicar la clase de variante por defecto "badge-recibida"', () => {
    const { container } = render(<Badge>Recibido</Badge>);
    // Verificamos que tenga la clase base y la variante default
    expect(container.firstChild).toHaveClass('badge');
    expect(container.firstChild).toHaveClass('badge-recibida');
  });

  test('debe convertir la variante a minúsculas para la clase CSS', () => {
    // Caso crítico: Enviamos "ENTREGADO" en mayúsculas
    const { container } = render(<Badge variant="ENTREGADO">Éxito</Badge>);
    
    // El componente debe haberlo convertido a "badge-entregado"
    expect(container.firstChild).toHaveClass('badge-entregado');
    expect(container.firstChild).not.toHaveClass('badge-ENTREGADO');
  });

  test('debe funcionar correctamente con diferentes variantes', () => {
    const { container, rerender } = render(<Badge variant="en-camino">Proceso</Badge>);
    expect(container.firstChild).toHaveClass('badge-en-camino');

    rerender(<Badge variant="cancelada">Error</Badge>);
    expect(container.firstChild).toHaveClass('badge-cancelada');
  });
});