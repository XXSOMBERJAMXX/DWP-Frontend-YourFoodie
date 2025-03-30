import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import CryptoJS from "crypto-js";
import Review from "../../views/ReviewPage/ReviewPage";
import RecomendationsContainer from "../../views/RecomendationsPage/RecomendationsContainer";

export default function RecomendationsLayout({checkTokenValidity}) {
    // Obtener el parámetro de la ruta (id hasheado)
    const { id: hashedId } = useParams();

    // Deshashar el id solo si existe
    const originalId = hashedId ? atob(hashedId) : null; // Decodificar desde Base64 solo si existe

    // Verificar la validez del token al cargar el componente
    useEffect(() => {
        checkTokenValidity();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-full w-full px-4 py-4 md:px-10">
            <h1 className="text-4xl font-bold mb-2 text-gray-500 text-center"> Reseñas y recomendaciones </h1>
            <div className="flex flex-col md:flex-row w-full mt-2">
                {hashedId ? (
                    // Mostrar la pantalla de Review si el hash coincide
                    <Review id={hashedId} />
                ) : (
                    // Mostrar la pantalla de Recomendations si no coincide
                    <RecomendationsContainer />
                )}
            </div>
        </div>
    );
}
