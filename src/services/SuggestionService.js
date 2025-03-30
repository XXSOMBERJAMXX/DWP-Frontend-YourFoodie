import api from './api';

const SuggestionService = {
  // Enviar una sugerencia
  sendSuggestion: async (title, description) => {
    try {
      const response = await api.post('/suggestions', {
        title,
        description
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al enviar la sugerencia');
    }
  },

  // Obtener todas las sugerencias (opcional)
  getSuggestions: async () => {
    try {
      const response = await api.get('/suggestions');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al obtener las sugerencias');
    }
  }
};

export default SuggestionService;