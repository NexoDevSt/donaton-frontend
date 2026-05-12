import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import LandingPage from './LandingPage';

describe('Página LandingPage', () => {
  const renderWithAuth = (usuario = null) => {
    return render(
      <AuthContext.Provider value={{ usuario }}>
        <BrowserRouter>
          <LandingPage />
        </BrowserRouter>
      </AuthContext.Provider>
    );
  };

  test('debe renderizar el contenido para visitantes anónimos', () => {
    renderWithAuth(null);

    // Verifica el título principal
    expect(screen.getByText(/Dona. Transforma. Salva Vidas./i)).toBeInTheDocument();
    
    // Verifica que existan los botones de registro e inicio de sesión
    expect(screen.getByRole('button', { name: /comenzar a donar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
  });

  test('debe saludar al usuario cuando está autenticado', () => {
    const mockUsuario = { nombre: 'Matias' };
    renderWithAuth(mockUsuario);

    // Verifica el saludo personalizado
    expect(screen.getByText(/¡Hola de nuevo, Matias!/i)).toBeInTheDocument();
    
    // Verifica que el botón cambie a "Ir al Dashboard"
    expect(screen.getByRole('button', { name: /ir al dashboard/i })).toBeInTheDocument();
    
    // Verifica que NO aparezca el texto de registro
    expect(screen.queryByText(/comenzar a donar/i)).not.toBeInTheDocument();
  });

  test('debe mostrar las tarjetas de estadísticas globales', () => {
    renderWithAuth(null);

    // Verifica que los números de impacto social estén presentes
    expect(screen.getByText('+1,500')).toBeInTheDocument();
    expect(screen.getByText('12,000 kg')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
  });
});