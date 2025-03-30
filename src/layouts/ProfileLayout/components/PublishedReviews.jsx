import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReviewService from "../../../services/reviewService";

export default function PublishedReviews() {
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await ReviewService.getReviewsByUser();
                setRecommendations(response);
                console.log(response);
            } catch (error) {
                console.error('Error al obtener las recomendaciones:', error);
            }
        };
        fetchReviews();
    }, []);

    const navigate = useNavigate();

    const handleReviewClick = (id) => {
        navigate(`/recomendations&reviews/${btoa(id.toString())}`);
    };

    // Función para obtener el badge según la cantidad de recomendaciones
    const getBadge = (count) => {
        if (count < 10) return { label: "Principiante", color: "bg-gray-500" };
        if (count < 20) return { label: "Conocedor de la comida", color: "bg-blue-500" };
        if (count >= 30) return { label: "Experto de las reseñas", color: "bg-green-500" };
        return null;
    };

    const badge = getBadge(recommendations.length);

    return (
        <div className="flex w-full flex-col items-center justify-center">
            <div className="w-full max-w-3xl p-6 bg-[#635747] rounded-4xl shadow-lg text-white">
                <div className="flex flex-row items-center justify-evenly">
                    <h2 className="text-2xl font-bold mb-6 text-center">Mis Recomendaciones Publicadas</h2>

                    {/* Badge */}
                    {badge && (
                        <div className={`px-4 py-1 mb-4 text-sm font-semibold text-white ${badge.color} rounded-full text-center `}>
                            {badge.label}
                        </div>
                    )}
                </div>

                {recommendations?.length === 0 ? (
                    <p className="text-center text-lg text-gray-400">No hay recomendaciones publicadas.</p>
                ) : (
                    <div className="max-h-[540px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#e39530] scrollbar-track-[#7a6a58]">
                        {recommendations.map((recommendation) => (
                            <div 
                                key={recommendation.id} 
                                className="flex mb-4 bg-[#7a6a58] p-4 rounded-xl gap-4 transition duration-300 hover:shadow-md hover:bg-[#6e5d4a] cursor-pointer"
                                onClick={() => handleReviewClick(recommendation.id)}
                            >
                                <img
                                    src={recommendation.image}
                                    alt={`Recomendación ${recommendation.id}`}
                                    className="w-24 h-24 object-cover rounded-lg shadow-md"
                                />
                                <div className="flex flex-col flex-grow">
                                    <h3 className="text-lg font-medium text-[#e39530] mb-1">
                                        {recommendation.title}
                                    </h3>
                                    <p className="text-sm text-gray-200 mb-2 line-clamp-2">
                                        {recommendation.description}
                                    </p>
                                    <div className="flex gap-1 mt-auto">
                                        {[...Array(5)].map((_, index) => {
                                            const ratingValue = index + 1;
                                            return (
                                                <span
                                                    key={index}
                                                    className={`text-xl ${
                                                        recommendation.rate >= ratingValue
                                                            ? "text-[#e39530]"
                                                            : "text-gray-400"
                                                    }`}
                                                >
                                                    ★
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
