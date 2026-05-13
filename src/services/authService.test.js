import { describe, test, expect, vi, beforeEach } from 'vitest';
import axiosInstance from './axiosConfig';
import { login, register } from './authService';

// Hacemos mock de la instancia de axios para no hacer peticiones reales
vi.mock('./axiosConfig', () => ({
  default: {
    post: vi.fn()
  }
}));

describe('authService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Función login', () => {
    test('debe llamar a /gateway/usuarios/login con las credenciales correctas', async () => {
      const mockCredentials = { email: 'matias@nexo.cl', password: '123' };
      const mockResponse = { data: { token: 'jwt-123', nombre: 'Matias' } };
      
      // Simulamos que axios responde con éxito
      axiosInstance.post.mockResolvedValueOnce(mockResponse);

      const resultado = await login(mockCredentials);

      expect(axiosInstance.post).toHaveBeenCalledWith('/gateway/usuarios/login', mockCredentials);
      expect(resultado).toEqual(mockResponse.data);
    });

    test('debe propagar el error si la petición falla', async () => {
      const mockError = new Error('401 Unauthorized');
      axiosInstance.post.mockRejectedValueOnce(mockError);

      await expect(login({})).rejects.toThrow('401 Unauthorized');
    });
  });

  describe('Función register', () => {
    test('debe llamar a /gateway/usuarios/registro con los datos de usuario', async () => {
      const mockUserData = { nombre: 'Matias', email: 'm@m.cl', password: '123', rol: 'DONANTE' };
      const mockResponse = { data: { mensaje: 'Usuario creado' } };
      
      axiosInstance.post.mockResolvedValueOnce(mockResponse);

      const resultado = await register(mockUserData);

      expect(axiosInstance.post).toHaveBeenCalledWith('/gateway/usuarios/registro', mockUserData);
      expect(resultado).toEqual(mockResponse.data);
    });

    test('debe propagar el error si el registro falla', async () => {
      axiosInstance.post.mockRejectedValueOnce(new Error('500 Internal Server Error'));

      await expect(register({})).rejects.toThrow('500 Internal Server Error');
    });
  });
});