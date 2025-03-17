import { useState } from "react";

export default function Recommendations() {
    const recommendations = [
        { id: 1, img: "img/Reseñas/resena1.jpg", description: "Descripción de la recomendación 1 con texto que podría ser más largo para mostrar cómo se maneja el overflow.", text: "Recomendación 1", rate: 3 },
        { id: 2, img: "img/Reseñas/resena2.jpg", description: "Descripción de la recomendación 2 que explica detalles sobre este lugar.", text: "Recomendación 2", rate: 4 },
        { id: 3, img: "img/Reseñas/resena3.webp", description: "Descripción de la recomendación 3 con información relevante.", text: "Recomendación 3", rate: 4 },
        { id: 4, img: "img/Reseñas/resena4.jpg", description: "Descripción de la recomendación 4 que proporciona detalles importantes.", text: "Recomendación 4", rate: 5 },
        { id: 5, img: "img/Reseñas/resena5.jpg", description: "Descripción de la recomendación 5 con opiniones sobre este lugar.", text: "Recomendación 5", rate: 1 },
    ];

    return (
        <div className="flex w-full flex-col items-center justify-center">
            <div className="w-full max-w-3xl p-6 bg-[#635747] rounded-4xl shadow-lg text-white">
                <h2 className="text-2xl font-bold mb-6 text-center">Mis Recomendaciones</h2>
                
                <div className="max-h-[550px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#e39530] scrollbar-track-[#7a6a58]">
                    {recommendations.map((recommendation) => (
                        <div 
                            key={recommendation.id} 
                            className="flex mb-4 bg-[#7a6a58] p-4 rounded-xl gap-4 transition duration-300 hover:shadow-md hover:bg-[#6e5d4a]"
                        >
                            <img
                                src={recommendation.img}
                                alt={`Recomendación ${recommendation.id}`}
                                className="w-24 h-24 object-cover rounded-lg shadow-md"
                            />
                            <div className="flex flex-col flex-grow">
                                <h3 className="text-lg font-medium text-[#e39530] mb-1">
                                    {recommendation.text}
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
            </div>
            
            
        </div>
    );
}