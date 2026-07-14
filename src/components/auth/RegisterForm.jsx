import React, { useState } from 'react';
import { register } from '../../services/authService';
import Button from '../ui/Button';
import './AuthForm.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    rol: 'DONANTE'
  });

  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje({ texto: 'Procesando registro...', tipo: 'info' });

    try {
      // Llamamos a la función del service que conecta con el Gateway
      const data = await register(formData);
      
      console.log("Registro exitoso en el backend:", data);
      setMensaje({ texto: '¡Cuenta creada con éxito!', tipo: 'success' });
      
    } catch (error) {
      console.error("Error al registrar:", error);
      const errorMsg = error.response?.data?.mensaje || "No se pudo conectar con el servidor";
      setMensaje({ texto: `Error: ${errorMsg}`, tipo: 'error' });
    }
  };

  return (
    <div className="auth-form-container">
      <h2 className="auth-form-title">Crear Cuenta</h2>
      
      {/* Feedback para el usuario */}
      {mensaje.texto && (
        <div className={`alert alert-${mensaje.tipo}`} style={{ marginBottom: '15px', textAlign: 'center' }}>
          {mensaje.texto}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          {/* Vinculamos el label al input mediante reg-nombre */}
          <label htmlFor="reg-nombre">Nombre Completo</label>
          <input 
            id="reg-nombre"
            type="text" 
            name="nombre" 
            className="form-input" 
            value={formData.nombre} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="reg-email">Email</label>
          <input 
            id="reg-email"
            type="email" 
            name="email" 
            className="form-input" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="reg-password">Contraseña</label>
          <input 
            id="reg-password"
            type="password" 
            name="password" 
            className="form-input" 
            value={formData.password} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="reg-rol">Rol</label>
          <select 
            id="reg-rol"
            name="rol" 
            className="form-input" 
            value={formData.rol} 
            onChange={handleChange}
          >
            <option value="DONANTE">Donante</option>
            <option value="VOLUNTARIO">Voluntario</option>
          </select>
        </div>
        <Button type="submit" variant="primary" style={{ width: '100%' }}>
          Registrarse
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;