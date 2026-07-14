import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import DashboardPage from './DashboardPage';

// Mock de Recharts completo para que no intente renderizar el SVG real
vi.mock('recharts', () => ({
  BarChart: ({ children }) => <div data-testid="bar-chart">{children}</div>,
  Bar: () => <div />,
  XAxis: () => <div />,
  YAxis: () => <div />,
  CartesianGrid: () => <div />,
  Tooltip: () => <div />,
  ResponsiveContainer: ({ children }) => <div>{children}</div>,
}));

describe('Página DashboardPage', () => {
  test('debe renderizar el título del panel de control', () => {
    render(<DashboardPage />);
    expect(screen.getByText(/panel de control/i)).toBeInTheDocument();
  });

  test('debe mostrar las tarjetas con estadísticas básicas', () => {
    render(<DashboardPage />);
    expect(screen.getByText(/total donaciones/i)).toBeInTheDocument();
    expect(screen.getByText('1,520')).toBeInTheDocument();
    expect(screen.getByText(/kilos entregados/i)).toBeInTheDocument();
    expect(screen.getByText('12,000')).toBeInTheDocument();
  });

  test('debe renderizar el contenedor del gráfico', () => {
    render(<DashboardPage />);
    // Verificamos que el título del gráfico esté presente
    expect(screen.getByText(/donaciones por categoría/i)).toBeInTheDocument();
    // Verificamos que nuestro Mock del gráfico se haya renderizado
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
  });

  test('debe contener la clase CSS principal', () => {
    const { container } = render(<DashboardPage />);
    expect(container.firstChild).toHaveClass('dashboard-container');
  });
});