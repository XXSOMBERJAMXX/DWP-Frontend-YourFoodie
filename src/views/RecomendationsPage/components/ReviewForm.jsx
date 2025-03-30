import { useState, useRef, useEffect } from 'react';
import RecomendationsService from "../../../services/recomendationsService";
import MapComponent from './MapComponent';
import StarRating from './StarRating';
import FormInput from './FormInput';
import FormTextarea from './FormTextarea';
import FormSelect from './FormSelect';
import ImageUploader from './ImageUploader';
import Modal from './Modal';
import ReviewService from '../../../services/reviewService';
import { toast } from 'react-toastify';


export default function ReviewForm({ onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
    lat: null,
    lng: null,
    preference_id: '',
    rating_service: 0,
    rating_food: 0,
    rating_ambience: 0,
    rating_price: 0,
    previewImage: null,
    address: ''
  });

  const [activeRating, setActiveRating] = useState({
    service: 0,
    food: 0,
    ambience: 0,
    price: 0
  });

  const [preferences, setPreferences] = useState([]);
  const [loadingPreferences, setLoadingPreferences] = useState(true);
  const loadPreferences = async () => {
    try {
      setLoadingPreferences(true);
      const preferences = await RecomendationsService.getPreferences();
      if (preferences) {
        setPreferences(preferences);
      }
    } catch (error) {
      console.error('Error al cargar preferencias:', error);
    }finally {
      setLoadingPreferences(false);
    }
  };

  useEffect(() => {
    loadPreferences();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLocationChange = (locationData) => {
    setFormData(prev => ({
      ...prev,
      lat: locationData.lat,
      lng: locationData.lng,
      address: locationData.address || ''
    }));
  };

  const handleFileChange = (file, previewUrl) => {
    setFormData(prev => ({
      ...prev,
      image: file,
      previewImage: previewUrl
    }));
  };

  const handleRatingChange = (category, value) => {
    setFormData(prev => ({ ...prev, [`rating_${category}`]: value }));
    setActiveRating(prev => ({ ...prev, [category]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const result = await ReviewService.createReview(formData);
      console.log('Nueva reseña creada:', result);
      toast.success('Reseña creada exitosamente!');
      onClose();
    } catch (error) {
      toast.error(error.message || 'Error al crear la reseña');
      console.error('Error:', error);
    }
  };

  return (
    <Modal onClose={onClose} title="Crear Nueva Reseña">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Columna izquierda */}
          <div className="space-y-4">
            <FormInput
              label="Título"
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleInputChange}
            />

            <FormTextarea
              label="Descripción"
              id="description"
              name="description"
              required
              rows="4"
              value={formData.description}
              onChange={handleInputChange}
            />

            {loadingPreferences ? (
                <div className="w-full bg-gray-200 animate-pulse h-10 rounded-lg"></div>
            ) : (
              <FormSelect
                label="Tipo de establecimiento"
                id="preference_id"
                name="preference_id"
                required
                value={formData.preference_id}
                onChange={handleInputChange}
                options={preferences}
                defaultOption="Selecciona un tipo"
              />
            )}
            

            <FormInput
              label="Url de Imagen"
              id="image"
              name="image"
              required
              value={formData.image}
              onChange={handleInputChange}
            />

            
          </div>

          {/* Columna derecha */}
          <div className="space-y-4">
            <MapComponent 
              onLocationChange={handleLocationChange}
              initialLocation={formData.lat && formData.lng ? 
                { lat: formData.lat, lng: formData.lng } : null}
              address={formData.address}
            />

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-100 mb-1">
                Valoraciones <span className="text-red-700">*</span>
              </label>

              <div className="bg-[#7a6a58] p-3 rounded-lg">
                {['service', 'food', 'ambience', 'price'].map((category) => (
                  <div key={category} className="mb-3 last:mb-0">
                    <p className="text-sm text-gray-200 mb-1 capitalize">
                      {category === 'price' ? 'Precio/Calidad' : category}
                    </p>
                    <StarRating
                      category={category}
                      activeRating={activeRating[category]}
                      currentRating={formData[`rating_${category}`]}
                      onRatingChange={handleRatingChange}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition duration-200"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[#e39530] hover:bg-[#d18728] text-white rounded-lg shadow-md transition duration-200"
            disabled={!formData.lat || !formData.title || !formData.description || !formData.preference_id}
          >
            Crear Reseña
          </button>
        </div>
      </form>
    </Modal>
  );
}