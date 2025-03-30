// services/AuthService.js
import api from './api';

const AuthService = {
  // Iniciar sesión
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      //const { token, user } = response.data;
      
      //// Almacenar el token y los datos del usuario en el localStorage
      //localStorage.setItem('token', token);
      //localStorage.setItem('user', JSON.stringify(user));

      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al iniciar sesión');
    }
  },
  verifyMfa: async (email, code) => {
    try {
      const response = await api.post('/auth/verifyMfa', { email, code });
      const { token, user } = response.data
      
      // Almacenar el token y los datos del usuario en el localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al iniciar sesión');
    }
  },

  register: async (full_name, email, password, number) => {
    try {
      const response = await api.post('/auth/register', {
        full_name: full_name
          .trim()
          .split(' ')
          .map(word => word[0].toUpperCase() + word.slice(1))
          .join(' '),
        email: email.toLowerCase(),
        password,
        number,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al registrar el usuario');
    }
  },

  // Validar si el token está activo
  validateToken: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return false;

      // Verificar el token con el servidor
      const response = await api.get('/auth/validate');
      return response.data.valid;
    } catch (error) {
      return false;
    }
  },

  // Solicitar restablecimiento de contraseña
  requestPasswordReset: async (email) => {
    try {
      const response = await api.post('/auth/request-reset', { email });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al solicitar el restablecimiento');
    }
  },

  // Verificar código de recuperación
  verifyResetCode: async (email, code) => {
    try {
      const response = await api.post('/auth/verify-code', { email, code });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al verificar el código');
    }
  },

  // Restablecer contraseña
  resetPassword: async (email, code, newPassword) => {
    try {
      const response = await api.post('/auth/reset-password', { email, code, newPassword });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al restablecer la contraseña');
    }
  },

  // Cerrar sesión
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  

};

export default AuthService;
