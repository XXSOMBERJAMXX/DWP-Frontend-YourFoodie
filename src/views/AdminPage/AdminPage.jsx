import ReviewService from "../../services/reviewService";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function AdminPage() {
    const [reviews, setReviews] = useState([]);
    const [loadingReviews, setLoadingReviews] = useState(false);
    const navigator = useNavigate();
    const [confirmationModal, setConfirmationModal] = useState({
        show: false,
        title: "",
        message: "",
        action: null,
        actionText: "",
        danger: false
    });

    // Paginación
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;
    const totalPages = reviews ? Math.ceil(reviews.length / itemsPerPage) : 0;
    
    useEffect(() => {
        getReports();
    }, []);

    const getReports = async () => {
        try {
            setLoadingReviews(true);
            const response = await ReviewService.getReports();
            
            if (!response.error) {
                setReviews(response);
                setCurrentPage(1);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoadingReviews(false);
        }
    };

    const getCurrentReviews = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return reviews.slice(startIndex, endIndex);
    };

    const showDeleteConfirmation = (reviewId, isReport = false) => {
        setConfirmationModal({
            show: true,
            title: isReport ? "Eliminar Reporte" : "Eliminar Publicación",
            message: isReport 
                ? "¿Estás seguro de que deseas eliminar este reporte? Esta acción no se puede deshacer." 
                : "¿Estás seguro de que deseas eliminar esta publicación? Todos los comentarios y reportes asociados también serán eliminados.",
            action: () => isReport 
                ? handleClearReports(reviewId) 
                : handleDeleteReview(reviewId),
            actionText: isReport ? "Eliminar Reporte" : "Eliminar Publicación",
            danger: true
        });
    };

    const handleDeleteReview = async (reviewId) => {
        try {
            const response = await ReviewService.deleteReview(reviewId);
            if (response){
                toast.success("Recomendación eliminada correctamente");
                getReports();
            }
        } catch (error) {
            toast.error("Error al eliminar la recomendación");
        } finally {
            setConfirmationModal({...confirmationModal, show: false});
        }
    };

    const handleClearReports = async (reportId) => {
        try {
            const response = await ReviewService.deleteReport(reportId);
            if (response) {
                toast.success("Reportes eliminados correctamente");
                getReports();
            }
        } catch (error) {
            toast.error("Error al eliminar los reportes");
        } finally {
            setConfirmationModal({...confirmationModal, show: false});
        }
    };

    return (
        <div className="flex flex-col h-full w-full py-4 md:px-10 gap-6">
            {/* Modal de Confirmación */}
            {confirmationModal.show && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">{confirmationModal.title}</h3>
                        <p className="text-gray-700 mb-6">{confirmationModal.message}</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setConfirmationModal({...confirmationModal, show: false})}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors duration-200"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={confirmationModal.action}
                                className={`px-4 py-2 text-white rounded transition-colors duration-200 ${
                                    confirmationModal.danger 
                                        ? 'bg-red-500 hover:bg-red-600' 
                                        : 'bg-blue-500 hover:bg-blue-600'
                                }`}
                            >
                                {confirmationModal.actionText}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Sección de resultados */}
            <div className="w-full">
                <h2 className="text-2xl font-bold mb-6 text-left text-black">Reportes Creados:</h2>
                
                {loadingReviews ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white rounded-lg overflow-hidden">
                            <thead>
                                <tr className="bg-[#635747] text-white">
                                    <th className="py-3 px-4 text-left">Imagen</th>
                                    <th className="py-3 px-4 text-left">Título</th>
                                    <th className="py-3 px-4 text-left hidden md:table-cell">Descripción</th>
                                    <th className="py-3 px-4 text-center">Usuario</th>
                                    <th className="py-3 px-4 text-center">Razón</th>
                                    <th className="py-3 px-4 text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[...Array(3)].map((_, index) => (
                                    <tr key={index} className="border-b border-gray-200 animate-pulse">
                                        <td className="py-4 px-4"><div className="bg-gray-300 h-20 w-20 rounded"></div></td>
                                        <td className="py-4 px-4"><div className="h-6 bg-gray-300 rounded w-3/4"></div></td>
                                        <td className="py-4 px-4"><div className="h-4 bg-gray-300 rounded w-full"></div></td>
                                        <td className="py-4 px-4"><div className="h-6 bg-gray-300 rounded-full w-8 mx-auto"></div></td>
                                        <td className="py-4 px-4"><div className="h-6 bg-gray-300 rounded-full w-8 mx-auto"></div></td>
                                        <td className="py-4 px-4">
                                            <div className="flex gap-2">
                                                <div className="h-8 bg-gray-300 rounded w-20"></div>
                                                <div className="h-8 bg-gray-300 rounded w-20"></div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : reviews?.length > 0 ? (
                    <>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-[#7a6a58] rounded-lg overflow-hidden shadow-md">
                                <thead>
                                    <tr className="bg-[#635747] text-white">
                                        <th className="py-3 px-4 text-left">Imagen</th>
                                        <th className="py-3 px-4 text-left">Título</th>
                                        <th className="py-3 px-4 text-left hidden md:table-cell">Descripción</th>
                                        <th className="py-3 px-4 text-center">Usuario</th>
                                        <th className="py-3 px-4 text-center">Razón</th>
                                        <th className="py-3 px-4 text-center">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {getCurrentReviews().map((review) => (
                                        <tr 
                                            key={review.id} 
                                            className="border-b border-gray-200 transition-colors hover:bg-[#6e5d4a]"
                                        >
                                            <td className="py-4 px-4">
                                                <img
                                                    onClick={() => navigator(`/recomendations&reviews/${btoa(review.review_id.toString())}`)}
                                                    src={review.image}
                                                    alt={`Recomendación ${review.id}`}
                                                    className="w-20 h-20 object-cover rounded-lg cursor-pointer"
                                                    onError={(e) => {
                                                        e.target.onerror = null; 
                                                        e.target.src = "https://via.placeholder.com/300x200?text=Imagen+no+disponible";
                                                    }}
                                                />
                                            </td>
                                            <td className="py-4 px-4 font-medium text-gray-200">
                                                {review.title}
                                                <p className="text-xs text-gray-400 md:hidden mt-1 line-clamp-2">
                                                    {review.description}
                                                </p>
                                            </td>
                                            <td className="py-4 px-4 hidden md:table-cell">
                                                <p className="text-sm text-gray-100 line-clamp-2">
                                                    {review.description}
                                                </p>
                                            </td>
                                            <td className="py-4 px-4 text-center">
                                                <p className="text-sm text-gray-100 line-clamp-2">
                                                    {review.email}
                                                </p>
                                            </td>
                                            <td className="py-4 px-4 text-center">
                                                <p className="text-sm text-gray-100">
                                                    {review.reason}
                                                </p>
                                            </td>
                                            <td className="py-4 px-4">
                                                <div className="flex flex-col md:flex-row gap-2 justify-center">
                                                    <button 
                                                        onClick={() => showDeleteConfirmation(btoa(review.review_id.toString()), false)}
                                                        className="cursor-pointer text-xs bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors duration-200 whitespace-nowrap"
                                                    >
                                                        Eliminar publicación
                                                    </button>
                                                    <button 
                                                        onClick={() => showDeleteConfirmation(btoa(review.id.toString()), true)}
                                                        className="cursor-pointer text-xs bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition-colors duration-200 whitespace-nowrap"
                                                    >
                                                        Eliminar reporte
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Paginación */}
                        {totalPages > 1 && (
                            <div className="flex justify-center mt-8">
                                <nav className="inline-flex rounded-md shadow">
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                        className="px-3 py-1 rounded-l-md border border-[#e39530] bg-white text-[#e39530] hover:bg-[#e39530] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Anterior
                                    </button>
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                        <button
                                            key={page}
                                            onClick={() => setCurrentPage(page)}
                                            className={`px-3 py-1 border-t border-b border-[#e39530] ${currentPage === page ? 'bg-[#e39530] text-white' : 'bg-white text-[#e39530] hover:bg-[#e39530]/20'}`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                        className="px-3 py-1 rounded-r-md border border-[#e39530] bg-white text-[#e39530] hover:bg-[#e39530] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Siguiente
                                    </button>
                                </nav>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-10">
                        <p className="text-gray-500 text-lg">No se encontraron recomendaciones.</p>
                    </div>
                )}
            </div>
        </div>
    );
}