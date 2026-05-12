import { render, screen, waitFor } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import axiosInstance from '../services/axiosConfig';
import CentrosPage from './CentrosPage';

// Mock de axiosInstance
vi.mock('../services/axiosConfig', () => ({
  default: {
    get: vi.fn(),
  },
}));

describe('Página CentrosPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('debe mostrar el estado de carga inicialmente', () => {
    // Simulamos una promesa pendiente para que se quede en loading
    axiosInstance.get.mockReturnValue(new Promise(() => {}));
    
    render(<CentrosPage />);
    expect(screen.getByText(/cargando centros/i)).toBeInTheDocument();
  });

  test('debe renderizar la lista de centros cuando la petición es exitosa', async () => {
    const mockCentros = [
      { id: 1, nombre: 'Centro Melipilla', direccion: 'Calle 1', region: 'Metropolitana', activo: true },
      { id: 2, nombre: 'Centro Talagante', direccion: 'Calle 2', region: 'Metropolitana', activo: false },
    ];

    axiosInstance.get.mockResolvedValueOnce({ data: mockCentros });

    render(<CentrosPage />);

    // Esperamos a que los datos se rendericen
    await waitFor(() => {
      expect(screen.getByText('Centro Melipilla')).toBeInTheDocument();
      expect(screen.getByText('Centro Talagante')).toBeInTheDocument();
      expect(screen.getByText(/Calle 1/i)).toBeInTheDocument();
    });

    // Verificamos que los Badges se apliquen según el estado activo
    expect(screen.getByText('ACTIVO')).toBeInTheDocument();
    expect(screen.getByText('INACTIVO')).toBeInTheDocument();
  });

  test('debe mostrar mensaje de error en consola si la petición falla', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    axiosInstance.get.mockRejectedValueOnce(new Error('Network Error'));

    render(<CentrosPage />);

    await waitFor(() => {
      expect(screen.getByText(/no se encontraron centros/i)).toBeInTheDocument();
    });

    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  test('debe mostrar mensaje cuando la lista de centros viene vacía', async () => {
    axiosInstance.get.mockResolvedValueOnce({ data: [] });

    render(<CentrosPage />);

    await waitFor(() => {
      expect(screen.getByText(/no se encontraron centros/i)).toBeInTheDocument();
    });
  });
});