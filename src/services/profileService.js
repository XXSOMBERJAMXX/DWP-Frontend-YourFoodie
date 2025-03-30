import api from './api';

const ProfileService = {
  // Obtener datos del perfil
  getProfile: async () => {
    try {
      const response = await api.get('/profile');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al obtener el perfil');
    }
  },

  // Actualizar perfil
  updateProfile: async (profileData) => {
    try {
      const response = await api.put('/profile', profileData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al actualizar el perfil');
    }
  },

  // Actualizar avatar
  updateAvatar: async (avatar) => {
    try {
      const response = await api.put('/profile/avatar', { avatar });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al actualizar el avatar');
    }
  }
};

export default ProfileService;