import axiosInstance from './axiosConfig';

export const getCentros = async () => {
  const response = await axiosInstance.get('/gateway/centros'); 
  return response.data;
};

export const registrarDonacion = async (payload) => {
  const response = await axiosInstance.post('/gateway/donaciones', payload);
  return response.data;
};

export const getDonacionesByUser = async (userId) => {
  const response = await axiosInstance.get(`/gateway/donaciones/usuario/${userId}`);
  return response.data;
};