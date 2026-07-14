import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import Button from './Button';

describe('Componente Button', () => {
  test('debe renderizar el contenido correctamente', () => {
    render(<Button>Registrar</Button>);
    const boton = screen.getByRole('button', { name: /registrar/i });
    expect(boton).toBeInTheDocument();
  });

  test('debe aplicar la clase de variante correctamente', () => {
    const { rerender } = render(<Button variant="secondary">Botón</Button>);
    let boton = screen.getByRole('button');
    expect(boton).toHaveClass('btn-secondary');

    rerender(<Button variant="danger">Borrar</Button>);
    expect(boton).toHaveClass('btn-danger');
  });

  test('debe ejecutar la función onClick al hacer clic', () => {
    const mockOnClick = vi.fn(); 
    render(<Button onClick={mockOnClick}>Click me</Button>);
    
    const boton = screen.getByRole('button');
    fireEvent.click(boton);

    // Verificamos que la función se llamó exactamente una vez
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('no debe ejecutar onClick si el botón está deshabilitado', () => {
    const mockOnClick = vi.fn();
    render(<Button onClick={mockOnClick} disabled={true}>No click</Button>);
    
    const boton = screen.getByRole('button');
    expect(boton).toBeDisabled();
    
    fireEvent.click(boton);
    
    // La función NO debe haberse llamado
    expect(mockOnClick).toHaveBeenCalledTimes(0);
  });

  test('debe tener el atributo type correcto', () => {
    const { rerender } = render(<Button type="submit">Enviar</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');

    rerender(<Button type="button">Cancelar</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });
});