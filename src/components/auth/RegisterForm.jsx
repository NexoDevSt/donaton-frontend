import React, { useState } from 'react';
import Button from '../ui/Button';
import './AuthForm.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    rol: 'DONANTE'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos de registro:", formData);
  };

  return (
    <div className="auth-form-container">
      <h2 className="auth-form-title">Crear Cuenta</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre Completo</label>
          <input type="text" name="nombre" className="form-input" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" className="form-input" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input type="password" name="password" className="form-input" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Rol</label>
          <select name="rol" className="form-input" onChange={handleChange}>
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