import axiosInstance from './axiosConfig';

export const login = async (credentials) => {
  const response = await axiosInstance.post('/gateway/usuarios/login', credentials);
  return response.data;
};

// NUEVA: Función de Registro
export const register = async (userData) => {
  const response = await axiosInstance.post('/gateway/usuarios/registro', userData);
  return response.data;
};