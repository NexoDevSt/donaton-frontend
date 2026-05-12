import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { login as loginService } from '../../services/authService';
import toast from 'react-hot-toast';
import LoginForm from './LoginForm';

// Mocks de servicios y navegación
vi.mock('../../services/authService');

// Mock mejorado de react-hot-toast para capturar llamadas correctamente
vi.mock('react-hot-toast', () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  }
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: () => mockNavigate };
});

describe('Componente LoginForm', () => {
  const mockLogin = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderForm = () => {
    return render(
      <AuthContext.Provider value={{ login: mockLogin }}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </AuthContext.Provider>
    );
  };

  test('debe actualizar los campos de email y contraseña al escribir', () => {
    renderForm();
    const emailInput = screen.getByLabelText(/email/i);
    const passInput = screen.getByLabelText(/contraseña/i);

    fireEvent.change(emailInput, { target: { value: 'matias@nexo.cl', name: 'email' } });
    fireEvent.change(passInput, { target: { value: '123456', name: 'password' } });

    expect(emailInput.value).toBe('matias@nexo.cl');
    expect(passInput.value).toBe('123456');
  });

  test('debe iniciar sesión exitosamente y navegar al inicio', async () => {
    const mockData = { token: 'fake-jwt', user: { nombre: 'Matias' } };
    loginService.mockResolvedValueOnce(mockData);

    renderForm();
    
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@test.com', name: 'email' } });
    fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: 'password', name: 'password' } });
    
    fireEvent.click(screen.getByRole('button', { name: /ingresar/i }));

    await waitFor(() => {
      expect(loginService).toHaveBeenCalledWith({ email: 'test@test.com', password: 'password' });
      expect(mockLogin).toHaveBeenCalledWith(mockData.user, mockData.token);
      expect(toast.success).toHaveBeenCalledWith("¡Bienvenido a Donaton!");
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  test('debe mostrar error si el servidor no devuelve un token', async () => {
    loginService.mockResolvedValueOnce({ user: { nombre: 'Matias' } }); 

    renderForm();
    
    // IMPORTANTE: Llenar los campos para evitar que el 'required' detenga el submit
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@test.com', name: 'email' } });
    fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: 'password', name: 'password' } });
    
    fireEvent.click(screen.getByRole('button', { name: /ingresar/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
    });
  });

  test('debe capturar y mostrar mensaje de error cuando las credenciales son inválidas', async () => {
    const errorMsg = "Usuario no encontrado";
    loginService.mockRejectedValueOnce({
      response: { data: { mensaje: errorMsg } }
    });

    renderForm();
    
    // Llenar los campos obligatorios
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@test.com', name: 'email' } });
    fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: 'password', name: 'password' } });
    
    fireEvent.click(screen.getByRole('button', { name: /ingresar/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(errorMsg);
    });
  });

  test('debe usar mensaje por defecto si el error no trae mensaje específico', async () => {
    loginService.mockRejectedValueOnce(new Error("Network Error"));

    renderForm();
    
    // Llenar los campos obligatorios
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@test.com', name: 'email' } });
    fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: 'password', name: 'password' } });
    
    fireEvent.click(screen.getByRole('button', { name: /ingresar/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Credenciales inválidas");
    });
  });
});