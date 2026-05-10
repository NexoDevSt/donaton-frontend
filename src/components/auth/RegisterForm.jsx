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
      
      // Opcional: Limpiar el formulario tras éxito
      // setFormData({ nombre: '', email: '', password: '', rol: 'DONANTE' });
      
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
          <label>Nombre Completo</label>
          <input 
            type="text" 
            name="nombre" 
            className="form-input" 
            value={formData.nombre} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            name="email" 
            className="form-input" 
            value={formData.email} 
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
            value={formData.password} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Rol</label>
          <select name="rol" className="form-input" value={formData.rol} onChange={handleChange}>
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