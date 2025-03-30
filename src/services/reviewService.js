import api from './api';

const ReviewService = {

    createReview: async (reviewData) => {
        try {
            const userEmail = (localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')) : null);
            if (!userEmail) throw new Error('Usuario no autenticado');
            

            // Crear FormData para enviar la imagen
            const formData = new FormData();
            formData.append('title', reviewData.title);
            formData.append('description', reviewData.description);
            if (reviewData.image) {
                formData.append('image', reviewData.image);
            }
            formData.append('lat', reviewData.lat);
            formData.append('lng', reviewData.lng);
            formData.append('user_id', userEmail.email);
            formData.append('preference_id', reviewData.preference_id);
            formData.append('rating_service', reviewData.rating_service);
            formData.append('rating_food', reviewData.rating_food);
            formData.append('rating_ambience', reviewData.rating_ambience);
            formData.append('rating_price', reviewData.rating_price);

            const response = await api.post('/reviews/create', formData, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            });
            
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getReviewsBySearch: async (title,preference,location,category) => {
        try {
            const response = await api.post(`/reviews/getReviews`, {title, preference, location,category});
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Error al realizar la búsqueda.');
          }
    },

    getReviewById: async (id) => {
        try {
            const response = await api.post(`/reviews/getReview`, {id});
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Error al obtener los datos.');
          }
    },

    getCommentsByReview: async (id) => {
        try {
            const response = await api.post(`/reviews/getComments`, {id});
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Error al obtener los comentarios.');
          }
    },

    createComment: async (description, review_id) => {
        const user = (localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')) : null);
        const userEmail= user.email;
        try {
            const response = await api.post(`/reviews/createComment`, {description, userEmail, review_id});
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Error al crear el comentario.');
          }
    },
    getReviewsByUser: async () => {
        const user = (localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')) : null);
        const userEmail= user.email;
        try {
            const response = await api.post(`/reviews/getReviewUser`, {userEmail});
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Error al obtener las reseñas.');
          }
    },
    reportReview: async (review_id, reason) => {
        const user = (localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')) : null);
        const userEmail= user.email;
        try {
            const response = await api.post(`/reviews/reportReview`, {review_id, userEmail, reason});
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Error al reportar la reseña.');
          }
    },
    getReports: async () => {
        try {
            const response = await api.post(`/reviews/getReports`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Error al obtener las reseñas reseña.');
          }
    },
    
    deleteReport: async (id) => {
        try {
            const response = await api.post(`/reviews/deleteReport`, {id});
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Error al eliminar el reporte.');
          }
    },
    deleteReview: async (review_id) => {
        try {
            const response = await api.post(`/reviews/deleteReview`, {review_id});
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Error al eliminar el reseña.');
          }
    },
    homeReviews: async () => {
        try {
            const response = await api.get(`/reviews/ramdonReviews`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Error al reportar la reseña.');
          }
    },

};

export default ReviewService