import api from './api';

const AuthService = {
  // Iniciar sesión
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;

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

  // Cerrar sesión
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

};

export default AuthService;
