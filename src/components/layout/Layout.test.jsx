import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Layout from './Layout';

// Hacemos Mock de los subcomponentes para que el test de Layout sea unitario y rápido
vi.mock('./Navbar', () => ({
  default: () => <nav data-testid="mock-navbar">Navbar Mock</nav>
}));

vi.mock('./Footer', () => ({
  default: () => <footer data-testid="mock-footer">Footer Mock</footer>
}));

// Mock de Outlet de react-router-dom para simular el contenido de las páginas
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    Outlet: () => <div data-testid="mock-outlet">Contenido de la página</div>
  };
});

describe('Componente Layout', () => {
  test('debe renderizar Navbar, Footer y el contenido (Outlet)', () => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );

    // Verificamos que los tres pilares del Layout estén presentes
    expect(screen.getByTestId('mock-navbar')).toBeInTheDocument();
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
    expect(screen.getByTestId('mock-outlet')).toBeInTheDocument();
  });

  test('debe tener la estructura de clases correcta', () => {
    const { container } = render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );

    // Verificamos que el wrapper y el main existan para asegurar que el CSS se aplique
    expect(container.firstChild).toHaveClass('layout-wrapper');
    const mainContent = container.querySelector('main');
    expect(mainContent).toHaveClass('main-content');
  });
});