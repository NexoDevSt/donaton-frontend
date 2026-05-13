import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Navbar from './Navbar';

// Mock de useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Componente Navbar', () => {
  const mockLogout = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderNavbar = (usuario = null) => {
    return render(
      <AuthContext.Provider value={{ usuario, logout: mockLogout }}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </AuthContext.Provider>
    );
  };

  test('debe mostrar el botón de "Ingresar" cuando no hay usuario logueado', () => {
    renderNavbar(null);
    
    expect(screen.getByText(/ingresar/i)).toBeInTheDocument();
    expect(screen.queryByText(/mi historial/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/salir/i)).not.toBeInTheDocument();
  });

  test('debe mostrar links privados y nombre del usuario cuando está logueado', () => {
    const usuarioMock = { nombre: 'Matias' };
    renderNavbar(usuarioMock);

    expect(screen.getByText('Matias')).toBeInTheDocument();
    
    expect(screen.getByText(/mi historial/i)).toBeInTheDocument();
    
    expect(screen.getByText(/nueva donación/i)).toBeInTheDocument();
    expect(screen.getByText(/como donar/i)).toBeInTheDocument();
    expect(screen.getByText(/salir/i)).toBeInTheDocument();
    
    expect(screen.queryByText(/ingresar/i)).not.toBeInTheDocument();
  });

  test('debe ejecutar logout y navegar al inicio al hacer clic en "Salir"', () => {
    const usuarioMock = { nombre: 'Matias' };
    renderNavbar(usuarioMock);

    const btnSalir = screen.getByRole('button', { name: /salir/i });
    fireEvent.click(btnSalir);

    expect(mockLogout).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  test('el logo debe redirigir a la página de inicio', () => {
    renderNavbar(null);
    const logoLink = screen.getByRole('link', { name: /donaton/i });
    expect(logoLink).toHaveAttribute('href', '/');
  });
});