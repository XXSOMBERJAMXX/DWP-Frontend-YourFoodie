import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SuggestionService from '../../services/SuggestionService';

export default function SuggestionPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null; // Obtener el usuario del contexto

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Debes iniciar sesión para enviar sugerencias');
      navigate('/auth');
      return;
    }

    if (!title || !description) {
      toast.error('Por favor completa todos los campos');
      return;
    }

    setIsSubmitting(true);
    try {
      await SuggestionService.sendSuggestion(title, description);
      toast.success('¡Sugerencia enviada con éxito!');
      setTitle('');
      setDescription('');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="w-full flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4">Sugerencias</h1>
        <div className="w-full mx-4 p-8 bg-[#635747] rounded-4xl shadow-lg text-white text-center">
          <p>Por favor inicia sesión para enviar sugerencias.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Sugerencias</h1>

      <div className="w-full mx-4 p-8 bg-[#635747] rounded-4xl shadow-lg text-white">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Título de la sugerencia
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-white text-black mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e39530] focus:border-[#e39530]"
              placeholder="Ingresa el título de tu sugerencia"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="suggestion" className="block text-sm font-medium mb-1">
              Describe la sugerencia
            </label>
            <textarea
              id="suggestion"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-white h-32 resize-none text-black mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e39530] focus:border-[#e39530]"
              placeholder="Ingresa tu sugerencia"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-[#e39530] text-white py-2 px-4 rounded-lg hover:bg-[#d07f27] focus:outline-none focus:ring-2 focus:ring-[#c77324] focus:ring-offset-2 transition duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Sugerencia'}
          </button>
        </form>
      </div>
    </div>
  );
}