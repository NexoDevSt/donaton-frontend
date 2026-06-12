import { render, screen, waitFor } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom'; 
import { AuthContext } from '../context/AuthContext';
import { getDonacionesByUser } from '../services/donacionService';
import MisDonacionesPage from './MisDonacionesPage';

// Mock del servicio
vi.mock('../services/donacionService', () => ({
  getDonacionesByUser: vi.fn(),
}));

describe('Página DonacionesPage (Historial)', () => {
  const mockUsuario = { usuarioId: 10, nombre: 'Matías' };
  const mockLista = [
    { id: 1, recurso: 'Arroz', cantidad: 5, unidad: 'kg', categoria: 'ALIMENTOS', fecha: '2026-05-12' }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('debe mostrar las donaciones del usuario logueado', async () => {
    getDonacionesByUser.mockResolvedValueOnce(mockLista);

    render(
      <AuthContext.Provider value={{ usuario: mockUsuario }}>
        <BrowserRouter>
          <MisDonacionesPage />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Arroz')).toBeInTheDocument();
      expect(screen.getByText(/5 kg/i)).toBeInTheDocument();
    });
    
    expect(getDonacionesByUser).toHaveBeenCalledWith(10);
  });
});