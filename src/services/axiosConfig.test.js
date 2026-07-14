import { describe, test, expect, vi } from 'vitest';
import axios from 'axios';

// Mock de axios ANTES de importar axiosInstance
vi.mock('axios', () => {
  const mockAxios = {
    create: vi.fn(() => mockAxios),
    interceptors: {
      request: { use: vi.fn(), handlers: [] },
      response: { use: vi.fn(), handlers: [] }
    }
  };
  return { default: mockAxios };
});

import axiosInstance from './axiosConfig';

describe('axiosConfig', () => {
  test('debe configurar la instancia de axios correctamente', () => {
    expect(axios.create).toHaveBeenCalled();
  });

  test('el interceptor debe manejar el token correctamente', () => {
    // Obtenemos la función que se pasó a interceptors.request.use
    const interceptorCallback = axiosInstance.interceptors.request.use.mock.calls[0][0];
    
    localStorage.setItem('token', 'token-test');
    const config = { headers: {} };
    const modifiedConfig = interceptorCallback(config);
    
    expect(modifiedConfig.headers.Authorization).toBe('Bearer token-test');
  });
});