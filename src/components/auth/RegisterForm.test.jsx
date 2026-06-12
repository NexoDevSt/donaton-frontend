import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { register as registerService } from '../../services/authService';
import RegisterForm from './RegisterForm';

// Mock del servicio de autenticación
vi.mock('../../services/authService');

describe('Componente RegisterForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('debe actualizar los valores de los inputs al escribir', () => {
    render(<RegisterForm />);
    
    const nombreInput = screen.getByLabelText(/nombre completo/i);
    const emailInput = screen.getByLabelText(/email/i);
    const rolSelect = screen.getByLabelText(/rol/i);

    fireEvent.change(nombreInput, { target: { value: 'Juan Perez', name: 'nombre' } });
    fireEvent.change(emailInput, { target: { value: 'juan@test.com', name: 'email' } });
    fireEvent.change(rolSelect, { target: { value: 'VOLUNTARIO', name: 'rol' } });

    expect(nombreInput.value).toBe('Juan Perez');
    expect(emailInput.value).toBe('juan@test.com');
    expect(rolSelect.value).toBe('VOLUNTARIO');
  });

  test('debe mostrar mensaje de éxito tras un registro correcto', async () => {
    registerService.mockResolvedValueOnce({ id: 1, email: 'test@test.com' });

    render(<RegisterForm />);
    
    // Llenamos campos mínimos requeridos
    fireEvent.change(screen.getByLabelText(/nombre completo/i), { target: { value: 'Matias', name: 'nombre' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'm@m.cl', name: 'email' } });
    fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: '1234', name: 'password' } });
    
    fireEvent.click(screen.getByRole('button', { name: /registrarse/i }));

    expect(screen.getByText(/procesando registro/i)).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText(/cuenta creada con éxito/i)).toBeInTheDocument();
      expect(registerService).toHaveBeenCalled();
    });
  });

  test('debe mostrar mensaje de error si el registro falla', async () => {
    const errorMsg = "El email ya está registrado";
    registerService.mockRejectedValueOnce({
      response: { data: { mensaje: errorMsg } }
    });

    render(<RegisterForm />);
    
    // Llenamos datos para que el formulario se envíe
    fireEvent.change(screen.getByLabelText(/nombre completo/i), { target: { value: 'Matias', name: 'nombre' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'm@m.cl', name: 'email' } });
    fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: '1234', name: 'password' } });

    fireEvent.click(screen.getByRole('button', { name: /registrarse/i }));

    await waitFor(() => {
      // Usamos regex con /i para ignorar mayúsculas y encontrar el texto aunque esté fragmentado
      expect(screen.getByText(new RegExp(errorMsg, 'i'))).toBeInTheDocument();
    });
  });

  test('debe usar mensaje por defecto si no hay respuesta del servidor', async () => {
    registerService.mockRejectedValueOnce(new Error("Network Error"));

    render(<RegisterForm />);
    
    // Llenamos datos para que el formulario se envíe
    fireEvent.change(screen.getByLabelText(/nombre completo/i), { target: { value: 'Matias', name: 'nombre' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'm@m.cl', name: 'email' } });
    fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: '1234', name: 'password' } });

    fireEvent.click(screen.getByRole('button', { name: /registrarse/i }));

    await waitFor(() => {
      // Buscamos el mensaje parcial para evitar problemas de concatenación
      expect(screen.getByText(/no se pudo conectar con el servidor/i)).toBeInTheDocument();
    });
  });
});