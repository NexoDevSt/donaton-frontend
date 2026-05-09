import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast'; 
import Layout from './components/layout/Layout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CentrosPage from './pages/CentrosPage';
import DonacionesPage from './pages/DonacionesPage';
import NuevaDonacionPage from './pages/NuevaDonacionPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" /> 
        
        <Routes>
          <Route path="/" element={<Layout />}>
            
            <Route index element={<LandingPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            
            <Route path="donaciones" element={<DonacionesPage />} />
            <Route path="donaciones/nueva" element={<NuevaDonacionPage />} />
            
            <Route path="centros" element={<CentrosPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            
            
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;