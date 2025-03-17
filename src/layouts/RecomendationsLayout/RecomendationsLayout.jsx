import React from "react";
import { useParams } from "react-router-dom";
import CryptoJS from "crypto-js";
import Review from "../../views/ReviewPage/ReviewPage";
import RecomendatiosPage from "../../views/RecomendationsPage/RecomendatiosPage";

export default function RecomendationsLayout() {
    // Obtener el parámetro de la ruta (id hasheado)
    const { id: hashedId } = useParams();

    // Deshashar el id solo si existe
    const originalId = hashedId ? atob(hashedId) : null; // Decodificar desde Base64 solo si existe

    return (
        <div className="flex flex-col items-center justify-center h-full w-full py-4 md:px-10">
            <h1 className="text-4xl font-bold mb-4"> Reseñas y recomendaciones </h1>
            <div className="flex flex-col md:flex-row w-full mt-4 md:mt-10">
                {originalId ? (
                    // Mostrar la pantalla de Review si el hash coincide
                    <Review id={originalId} />
                ) : (
                    // Mostrar la pantalla de Recomendations si no coincide
                    <RecomendatiosPage />
                )}
            </div>
        </div>
    );
}
