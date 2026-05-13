import { render, screen, act } from '@testing-library/react';
import { describe, test, expect, beforeEach, vi } from 'vitest';
import { AuthProvider, useAuth } from './AuthContext';

const TestComponent = () => {
  const { usuario, login, logout, isAuthenticated } = useAuth();
  return (
    <div>
      <div data-testid="user-name">{usuario?.nombre || 'null'}</div>
      <div data-testid="auth-status">{isAuthenticated ? 'logged' : 'out'}</div>
      <button onClick={() => login({ nombre: 'Matias', usuarioId: 1 }, 'fake-token')}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  test('debe inicializar con usuario null si no hay datos en localStorage', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('user-name').textContent).toBe('null');
    expect(screen.getByTestId('auth-status').textContent).toBe('out');
  });

  test('debe cargar datos desde localStorage al iniciar', () => {
    const mockUser = { nombre: 'Matias', usuarioId: 1 };
    localStorage.setItem('usuario', JSON.stringify(mockUser));
    localStorage.setItem('token', 'valid-token');

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('user-name').textContent).toBe('Matias');
    expect(screen.getByTestId('auth-status').textContent).toBe('logged');
  });

  test('login debe guardar datos en localStorage y actualizar el estado', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const loginBtn = screen.getByText('Login');
    
    act(() => {
      loginBtn.click();
    });

    expect(localStorage.getItem('token')).toBe('fake-token');
    expect(JSON.parse(localStorage.getItem('usuario')).nombre).toBe('Matias');
    expect(screen.getByTestId('user-name').textContent).toBe('Matias');
  });

  test('logout debe limpiar localStorage y el estado', () => {
    localStorage.setItem('token', 'some-token');
    
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const logoutBtn = screen.getByText('Logout');
    
    act(() => {
      logoutBtn.click();
    });

    expect(localStorage.getItem('token')).toBeNull();
    expect(screen.getByTestId('auth-status').textContent).toBe('out');
    expect(screen.getByTestId('user-name').textContent).toBe('null');
  });

  test('debe ejecutar logout si los datos en localStorage son inválidos ("undefined")', () => {
    localStorage.setItem('usuario', 'undefined');
    localStorage.setItem('token', 'valid-token');

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(localStorage.getItem('token')).toBeNull();
    expect(screen.getByTestId('auth-status').textContent).toBe('out');
  });
});