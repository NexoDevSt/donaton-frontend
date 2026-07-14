import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,           // Activa describe, test y expect globalmente
    environment: 'jsdom',    // Emula el entorno de navegador (document, window, etc.)
    setupFiles: './vitest.setup.js', // Apunta al archivo de configuración de abajo
    coverage: {
      provider: 'v8',        // Motor de cobertura
      reporter: ['text', 'json', 'html'], // Formatos de reporte
      include: ['src/**/*.{js,jsx}'],    // Solo archivos de código fuente
      exclude: ['src/main.jsx', 'src/App.jsx'], // Excluye puntos de entrada sin lógica
    },
  },
});