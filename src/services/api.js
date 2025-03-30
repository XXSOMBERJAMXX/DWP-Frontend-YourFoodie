// services/api.js
const API_URL = import.meta.env.VITE_API_URL;
import axios from 'axios';
// Crear una instancia de axios
const api = axios.create({
  baseURL: API_URL, // URL del servidor desde .env
});

// Interceptor para agregar el token JWT a las cabeceras
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Obtener el token del localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Agregar el token a las cabeceras
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Si el token expira, redirigir al login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

export default api;