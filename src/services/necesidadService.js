import axiosInstance from './axiosConfig';

const validarRespuesta = (response) => {
  if (response.data && response.data.error === true) {
    throw new Error(response.data.mensaje || 'Servicio temporalmente fuera de línea');
  }
  return response.data;
};

export const crearNecesidad = async (necesidadDTO) => {
  const response = await axiosInstance.post('/gateway/necesidades', necesidadDTO);
  return validarRespuesta(response);
};

export const listarNecesidades = async () => {
  const response = await axiosInstance.get('/gateway/necesidades');
  return validarRespuesta(response);
};

export const obtenerNecesidadPorId = async (id) => {
  const response = await axiosInstance.get(`/gateway/necesidades/${id}`);
  return validarRespuesta(response);
};

export const filtrarNecesidadesPorEstado = async (estado) => {
  const response = await axiosInstance.get(`/gateway/necesidades/estado/${estado}`);
  return validarRespuesta(response);
};