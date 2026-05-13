import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import Card from './Card';

describe('Componente Card', () => {
  test('debe renderizar los elementos hijos (children)', () => {
    render(
      <Card>
        <span data-testid="test-child">Contenido de prueba</span>
      </Card>
    );

    // Verificamos que el hijo exista dentro de la Card
    const child = screen.getByTestId('test-child');
    expect(child).toBeInTheDocument();
    expect(child.textContent).toBe('Contenido de prueba');
  });

  test('debe aplicar la clase CSS base "card"', () => {
    const { container } = render(<Card>Contenido</Card>);
    
    // El primer div debe tener la clase 'card'
    expect(container.firstChild).toHaveClass('card');
  });

  test('debe aplicar clases adicionales pasadas por props', () => {
    const claseExtra = "clase-personalizada";
    const { container } = render(<Card className={claseExtra}>Contenido</Card>);
    
    // Verificamos que tenga AMBAS clases
    expect(container.firstChild).toHaveClass('card');
    expect(container.firstChild).toHaveClass('clase-personalizada');
  });

  test('no debe fallar si no se proporciona una className', () => {
    const { container } = render(<Card>Contenido</Card>);
    
    // Verificamos que la clase sea exactamente "card " o "card" (sin undefined)
    expect(container.firstChild.className).toBe('card ');
  });
});