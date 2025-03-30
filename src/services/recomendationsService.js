import api from './api';

const RecomendationsService = {
  // Obtener preferencias
  getPreferences: async () => {
    try {
      const response = await api.get('/recomendations/preferences');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al obtener las preferencias');
    }
  },
};

export default RecomendationsService;