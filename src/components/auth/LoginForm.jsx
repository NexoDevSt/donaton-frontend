import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { login as loginService } from '../../services/authService';
import Button from '../ui/Button';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './AuthForm.css';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const data = await loginService(credentials);
      
      console.log("Respuesta completa del servidor:", data);

 
      const usuarioParaGuardar = data.user ? data.user : data;
      const tokenParaGuardar = data.token;

      if (!tokenParaGuardar) {
        throw new Error("El servidor no devolvió un token");
      }

      login(usuarioParaGuardar, tokenParaGuardar); 
      
      toast.success("¡Bienvenido a Donaton!");
      navigate('/');
      
    } catch (error) {
      console.error("Error en login:", error);
      const mensaje = error.response?.data?.mensaje || "Credenciales inválidas";
      toast.error(mensaje);
    }
  };

  return (
    <div className="auth-form-container">
      <h2 className="auth-form-title">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            name="email" 
            className="form-input" 
            value={credentials.email}
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input 
            type="password" 
            name="password" 
            className="form-input" 
            value={credentials.password}
            onChange={handleChange} 
            required 
          />
        </div>
        <Button type="submit" variant="primary" style={{ width: '100%' }}>
          Ingresar
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;