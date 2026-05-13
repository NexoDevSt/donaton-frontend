import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getCentros, registrarDonacion } from '../services/donacionService';
import toast from 'react-hot-toast';
import NuevaDonacionPage from './NuevaDonacionPage';

// Mocks de servicios
vi.mock('../services/donacionService');
vi.mock('react-hot-toast');

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: () => mockNavigate };
});

describe('Página NuevaDonacionPage', () => {
  const mockUsuario = { usuarioId: 10, nombre: 'Matias' };
  const mockCentros = [{ id: 1, nombre: 'Centro Test' }];

  beforeEach(() => {
    vi.clearAllMocks();
    getCentros.mockResolvedValue(mockCentros);
  });

  const renderPage = (user = mockUsuario) => {
    return render(
      <AuthContext.Provider value={{ usuario: user }}>
        <BrowserRouter>
          <NuevaDonacionPage />
        </BrowserRouter>
      </AuthContext.Provider>
    );
  };

  test('debe cargar y listar los centros de acopio en el select', async () => {
    renderPage();
    await waitFor(() => {
      expect(screen.getByText('Centro Test')).toBeInTheDocument();
    });
  });

  test('debe registrar una donación exitosamente', async () => {
    registrarDonacion.mockResolvedValueOnce({ status: 'success' });
    renderPage();

    await waitFor(() => screen.getByText('Centro Test'));

    // Llenar formulario
    fireEvent.change(screen.getByLabelText(/recurso/i), { target: { value: 'Arroz', name: 'recurso' } });
    fireEvent.change(screen.getByLabelText(/unidad/i), { target: { value: 'kg', name: 'unidad' } });
    fireEvent.change(screen.getByLabelText(/cantidad/i), { target: { value: '5', name: 'cantidad' } });
    fireEvent.change(screen.getByLabelText(/centro de acopio/i), { target: { value: '1', name: 'centroAcopioId' } });

    fireEvent.click(screen.getByRole('button', { name: /registrar donación/i }));

    await waitFor(() => {
      expect(registrarDonacion).toHaveBeenCalledWith(expect.objectContaining({
        recurso: 'Arroz',
        donadorId: 10
      }));
      expect(toast.success).toHaveBeenCalledWith(expect.stringContaining("éxito"));
      expect(mockNavigate).toHaveBeenCalledWith('/donaciones');
    });
  });

  test('debe mostrar error si no hay usuarioId en el contexto', async () => {
    // Simulamos usuario sin usuarioId (o nulo)
    renderPage({}); 
    
    await waitFor(() => screen.getByText('Centro Test'));

    // MUY IMPORTANTE: Llenamos los campos para que la validación 'required' del HTML5 
    // no detenga el evento submit antes de llegar a la lógica de tu componente.
    fireEvent.change(screen.getByLabelText(/recurso/i), { target: { value: 'Test', name: 'recurso' } });
    fireEvent.change(screen.getByLabelText(/unidad/i), { target: { value: 'u', name: 'unidad' } });
    fireEvent.change(screen.getByLabelText(/cantidad/i), { target: { value: '1', name: 'cantidad' } });
    fireEvent.change(screen.getByLabelText(/centro de acopio/i), { target: { value: '1', name: 'centroAcopioId' } });

    fireEvent.click(screen.getByRole('button', { name: /registrar donación/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(expect.stringContaining("ID de usuario"));
    });
  });

  test('debe capturar errores del servidor al registrar', async () => {
    const errorMsg = "Error de validación";
    registrarDonacion.mockRejectedValueOnce({
      response: { data: { mensaje: errorMsg } }
    });

    renderPage();
    await waitFor(() => screen.getByText('Centro Test'));
    
    // Llenar datos mínimos para que pase el required
    fireEvent.change(screen.getByLabelText(/recurso/i), { target: { value: 'Test', name: 'recurso' } });
    fireEvent.change(screen.getByLabelText(/unidad/i), { target: { value: 'u', name: 'unidad' } });
    fireEvent.change(screen.getByLabelText(/cantidad/i), { target: { value: '1', name: 'cantidad' } });
    fireEvent.change(screen.getByLabelText(/centro de acopio/i), { target: { value: '1', name: 'centroAcopioId' } });

    fireEvent.click(screen.getByRole('button', { name: /registrar donación/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(errorMsg);
    });
  });
});