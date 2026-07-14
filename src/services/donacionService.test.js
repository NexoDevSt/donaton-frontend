import { describe, test, expect, vi, beforeEach } from 'vitest';
import axiosInstance from './axiosConfig';
import { getCentros, registrarDonacion, getDonacionesByUser } from './donacionService';

// Mock de la instancia de axios
vi.mock('./axiosConfig', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn()
  }
}));

describe('donacionService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getCentros', () => {
    test('debe obtener la lista de centros desde el gateway', async () => {
      const mockCentros = [{ id: 1, nombre: 'Centro Melipilla' }, { id: 2, nombre: 'Centro Talagante' }];
      axiosInstance.get.mockResolvedValueOnce({ data: mockCentros });

      const resultado = await getCentros();

      expect(axiosInstance.get).toHaveBeenCalledWith('/gateway/centros');
      expect(resultado).toEqual(mockCentros);
    });
  });

  describe('registrarDonacion', () => {
    test('debe enviar el payload de la donación correctamente', async () => {
      const mockPayload = { recurso: 'Arroz', cantidad: 10, donadorId: 1 };
      const mockResponse = { data: { mensaje: 'Donación registrada' } };
      axiosInstance.post.mockResolvedValueOnce(mockResponse);

      const resultado = await registrarDonacion(mockPayload);

      expect(axiosInstance.post).toHaveBeenCalledWith('/gateway/donaciones', mockPayload);
      expect(resultado).toEqual(mockResponse.data);
    });
  });

  describe('getDonacionesByUser', () => {
    test('debe llamar al endpoint con el userId correcto', async () => {
      const userId = 123;
      const mockDonaciones = [{ id: 1, recurso: 'Gasas' }];
      axiosInstance.get.mockResolvedValueOnce({ data: mockDonaciones });

      const resultado = await getDonacionesByUser(userId);

      // Verificamos que la URL construida sea la correcta
      expect(axiosInstance.get).toHaveBeenCalledWith(`/gateway/donaciones/usuario/${userId}`);
      expect(resultado).toEqual(mockDonaciones);
    });

    test('debe propagar el error si la petición falla', async () => {
      axiosInstance.get.mockRejectedValueOnce(new Error('Error de conexión'));

      await expect(getDonacionesByUser(1)).rejects.toThrow('Error de conexión');
    });
  });
});