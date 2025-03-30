import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ReviewService from "../services/reviewService";

const Card = () => {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const truncatedDescription = (string) => {
    return string?.length > 100 ? `${string.substring(0, 100)}...` : string;
  };

  const handleClick = (id) => {
    const hashId = btoa(id.toString());
    navigate(`/recomendations&reviews/${hashId}`);
  };

  const fetchRecommendations = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await ReviewService.homeReviews();
      setRecommendations(response);
      setError(null);
    } catch (err) {
      console.error('Error fetching recommendations:', err);
      setError('Error al cargar recomendaciones');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Cargar datos inmediatamente al montar
    fetchRecommendations();

    // Configurar intervalo para long polling cada 2 minutos
    const intervalId = setInterval(fetchRecommendations, 1 * 60 * 100);

    // Limpiar intervalo al desmontar
    return () => clearInterval(intervalId);
  }, [fetchRecommendations]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#e39530]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        {error}
      </div>
    );
  }

  if (recommendations.length === 0) {
    return (
      <div className="text-center text-gray-500 p-4">
        No hay recomendaciones disponibles
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recommendations.map((item) => (
        <div
          key={item.id}
          className="flex flex-col items-center justify-center max-w-sm rounded-xl overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition duration-500 ease-in-out transform hover:scale-105"
          onClick={() => handleClick(item.id)}
        >
          <img 
            className="w-full h-48 object-cover" 
            src={item.image} 
            alt={item.title}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/300x200?text=Imagen+no+disponible";
            }}
          />
          <div className="px-6 py-4 text-center">
            <div className="font-bold text-xl mb-2">{item.title}</div>
            <p className="text-gray-700 text-base text-justify">
              {truncatedDescription(item.description)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;