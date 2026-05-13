# 📑 Documentación Técnica: Donatón Frontend

## 🚀 Nexo Dev Studio | Proyecto de Ayuda Humanitaria
**Desarrollador:** Matías - Estudiante de Ingeniería en Informática (Duoc UC)

Este repositorio contiene la interfaz de usuario de **Donatón**, una plataforma diseñada para la gestión eficiente de donaciones (alimentos, ropa e insumos médicos). El proyecto destaca por una arquitectura de componentes escalable, un sistema de diseño propio y una suite de pruebas automatizadas que garantiza la integridad del código.

---

## 🛠️ Stack Tecnológico

* **Core:** React.js (Vite)
* **Estado Global:** React Context API (`AuthContext`)
* **Navegación:** React Router DOM v6
* **Gráficos:** Recharts (Visualización de métricas en Dashboard)
* **Notificaciones:** React Hot Toast
* **Iconografía:** React Icons (FontAwesome)
* **Testing:** Vitest + React Testing Library
* **Cobertura:** V8 Coverage Tool

---

## 🏗️ Arquitectura de Carpetas y Archivos

El proyecto sigue una estructura modular de co-ubicación, donde cada módulo agrupa su lógica, estilos y pruebas unitarias.

```text
src/
├── assets/             # Recursos estáticos (hero.png, logos SVG)
├── components/
│   ├── auth/           # Módulo de Autenticación
│   │   ├── AuthForm.css
│   │   ├── LoginForm.jsx / .test.jsx
│   │   └── RegisterForm.jsx / .test.jsx
│   ├── layout/         # Estructura Global
│   │   ├── Footer.jsx / .css / .test.jsx
│   │   ├── Layout.jsx / .css / .test.jsx
│   │   └── Navbar.jsx / .css / .test.jsx
│   └── ui/             # Componentes Atómicos (Design System)
│       ├── Badge.jsx / .css / .test.jsx
│       ├── Button.jsx / .css / .test.jsx
│       └── Card.jsx / .css / .test.jsx
├── context/            # Manejo de Estado Global
│   └── AuthContext.jsx / .test.jsx
├── pages/              # Vistas de la Aplicación
│   ├── CentrosPage.jsx / .css / .test.jsx
│   ├── DashboardPage.jsx / .css / .test.jsx
│   ├── DonacionesPage.jsx (Guía Informativa) / .css / .test.jsx
│   ├── LandingPage.jsx / .css / .test.jsx
│   ├── LoginPage.jsx / .css / .test.jsx
│   ├── NuevaDonacionPage.jsx / .css / .test.jsx
│   └── RegisterPage.jsx
├── services/           # Capa de Comunicación (Axios)
│   ├── authService.js / .test.js
│   ├── axiosConfig.js / .test.js
│   └── donacionService.js / .test.js
├── App.jsx             # Router y Proveedores
├── main.jsx            # Punto de entrada
└── setupTest.js        # Configuración de Testing Library

🧪 Calidad de Software (QA)
Se ha implementado una estrategia de pruebas exhaustiva, alcanzando un indicador de cobertura superior al 80% (Lines Coverage).

Ejecución de Pruebas
Para ejecutar la suite completa de 60 tests:

Bash
npm run test
Reporte de Cobertura
Para generar el informe detallado de cobertura:

Bash
npm run coverage
Hitos de QA:

Mocks de Servicios: Intercepción de llamadas a la API de Yesenia/Gateway mediante Vitest Vi.

Pruebas de Integración: Validación del flujo completo desde el Login hasta el registro de una donación.

Accesibilidad: Uso de getByLabelText y getByRole para asegurar que el DOM sea navegable y testeable.

🔌 Integración con el Backend
La aplicación se comunica con un API Gateway centralizado:

Base URL: Configurada dinámicamente en axiosConfig.js.

Seguridad: Uso de interceptores para adjuntar el Bearer Token obtenido desde el AuthContext.

Validación de Datos: Conversión de tipos (Data Transformation) antes del envío al backend (DNR/DTO).

⚙️ Instalación y Configuración
Clonar el repositorio.

Instalar dependencias:

Bash
npm install
Lanzar el servidor de desarrollo:

Bash
npm run dev
✒️ Autor
Matías - Nexo Dev Studio
Ingeniería en Informática | Duoc UC