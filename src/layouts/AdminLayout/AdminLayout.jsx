import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import AdminPage from "../../views/AdminPage/AdminPage";

export default function AdminLayout({checkTokenValidity}) {
   
    // Verificar la validez del token al cargar el componente
    useEffect(() => {
        checkTokenValidity();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-full w-full px-4 py-4 md:px-10">
            <h1 className="text-4xl font-bold mb-2"> Administar Contenido </h1>
            <div className="flex flex-col md:flex-row w-full mt-2">
                
                {/* Mostrar la pantalla de Recomendations si no coincide*/}
                <AdminPage />
            </div>
        </div>
    );
}
