import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import toast from 'react-hot-toast';
import './AuthForm.css';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { login } = useAuth();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulación de login por ahora
    if (credentials.email && credentials.password) {
      toast.success("¡Bienvenido a Donaton!");
      console.log("Login exitoso");
    } else {
      toast.error("Credenciales inválidas");
    }
  };

  return (
    <div className="auth-form-container">
      <h2 className="auth-form-title">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" className="form-input" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input type="password" name="password" className="form-input" onChange={handleChange} required />
        </div>
        <Button type="submit" variant="primary" style={{ width: '100%' }}>
          Ingresar
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;