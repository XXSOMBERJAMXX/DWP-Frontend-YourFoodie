import { useNavigate } from "react-router-dom";

export default function RecomendationsPage({
    reviews,
    showForm,
    preferences,
    loadingPreferences,
    loadingReviews,
    loadingLocation,
    useLocation,
    currentPage,
    totalPages,
    itemsPerPage,
    nombreRef,
    tipoComidaRef,
    ubicacionRef,
    tipoCategoriaRef,
    getCurrentReviews,
    handleSearch,
    handleLocationChange,
    setShowForm,
    setCurrentPage,
    navigator
}) {
    return (
        <div className="flex flex-col h-full w-full py-4 md:px-10 gap-6">
            {/* Sección de búsqueda mejorada */}
            <div className="bg-[#635747] p-4 md:p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-100 mb-4">Filtros de búsqueda</h2>
                    <button 
                        onClick={() => setShowForm(true)} 
                        className="bg-green-700 cursor-pointer hover:bg-green-800 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300"
                    >
                        Crear Reseña
                    </button>
                </div>

                <hr className="border-gray-300 my-4"/>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                    {/* Input para buscar por nombre */}
                    <div className="md:col-span-1">
                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-100 mb-1">
                            Título
                        </label>
                        <input 
                            type="text" 
                            id="nombre"
                            ref={nombreRef}
                            placeholder="Ej: Título XYZ" 
                            className="bg-white w-full p-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e39530] focus:border-[#e39530] transition duration-200"
                        />
                    </div>
                    
                    {/* Select para categoria de comida */}
                    <div className="md:col-span-1">
                        <label htmlFor="tipo-comida" className="block text-sm font-medium text-gray-100 mb-1">
                            Tipo de categoria
                        </label>
                        <select 
                            id="tipo-comida"
                            ref={tipoCategoriaRef}
                            className="w-full bg-white p-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e39530] focus:border-[#e39530] transition duration-200"
                        >
                            <option value="">Todos los tipos</option>
                            <option value="rating_service">Calidad de servicio </option>
                            <option value="rating_price">Precios</option>
                            <option value="rating_ambience">Ambiente</option>
                        </select>
                    </div>
                    
                    {/* Select para tipo de comida */}
                    <div className="md:col-span-1">
                        <label htmlFor="tipo-comida" className="block text-sm font-medium text-gray-100 mb-1">
                            Tipo de comida
                        </label>
                        {loadingPreferences ? (
                            <div className="w-full bg-gray-200 animate-pulse h-10 rounded-lg"></div>
                        ) : (
                            <select 
                                id="tipo-comida"
                                ref={tipoComidaRef}
                                className="w-full bg-white p-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e39530] focus:border-[#e39530] transition duration-200"
                                disabled={loadingPreferences}
                            >
                                <option value="">Todos los tipos</option>
                                {preferences.map((preference) => (
                                    <option key={preference.id} value={preference.id}>{preference.name}</option>
                                ))}
                            </select>
                        )}
                    </div>
                    
                    {/* Checkbox para buscar por ubicación */}
                    <div className="md:col-span-1 flex items-center h-full">
                        <label htmlFor="ubicacion" className="relative flex items-center cursor-pointer mt-5">
                            <input 
                                type="checkbox" 
                                id="ubicacion" 
                                ref={ubicacionRef}
                                onChange={handleLocationChange}
                                className="sr-only peer"
                                disabled={loadingLocation}
                            />
                            <div className={`w-11 h-6 ${loadingLocation ? 'bg-gray-500' : 'bg-gray-400'} peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#e39530] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#e39530]`}></div>
                            <div className="ml-3 flex items-center">
                                <span className="text-sm font-medium text-gray-100">
                                    {loadingLocation ? 'Obteniendo ubicación...' : 'Mi ubicación'}
                                </span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                        </label>
                    </div>
                    
                    {/* Botón de búsqueda */}
                    <div className="md:col-span-1">
                        <button
                            onClick={handleSearch}
                            disabled={loadingReviews}
                            className={`w-full cursor-pointer ${loadingReviews ? 'bg-[#e39530]/70' : 'bg-[#e39530] hover:bg-[#d18728]'} text-white font-medium py-2 px-4 rounded-lg shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#e39530] focus:ring-opacity-50 flex justify-center items-center`}
                        >
                            {loadingReviews ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Buscando...
                                </>
                            ) : 'Buscar'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Sección de resultados */}
            <div className="w-full">
                <h2 className="text-2xl font-bold mb-6 text-left text-black">Resultados:</h2>
                
                {loadingReviews ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className="bg-[#7a6a58] p-4 rounded-xl animate-pulse h-96">
                                <div className="bg-gray-500 h-48 rounded-lg mb-3"></div>
                                <div className="h-6 bg-gray-500 rounded mb-2 w-3/4"></div>
                                <div className="h-4 bg-gray-500 rounded mb-1"></div>
                                <div className="h-4 bg-gray-500 rounded mb-1 w-5/6"></div>
                                <div className="h-4 bg-gray-500 rounded mb-3 w-2/3"></div>
                                <div className="flex justify-between mt-4">
                                    <div className="h-6 bg-gray-500 rounded-full w-16"></div>
                                    <div className="h-6 bg-gray-500 rounded-full w-16"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : reviews.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {getCurrentReviews().map((review) => (
                                <div 
                                    key={review.id}
                                    onClick={() => navigator(`/recomendations&reviews/${btoa(review.id.toString())}`)}
                                    className="bg-[#7a6a58] p-4 rounded-xl transition duration-300 hover:shadow-md hover:bg-[#6e5d4a] flex flex-col h-full cursor-pointer"
                                >   
                                    <p className="text-right mb-2 text-xs text-gray-300">{review.date}</p>
                                    
                                    <img
                                        src={review.image}
                                        alt={`Recomendación ${review.id}`}
                                        className="w-full h-48 object-cover rounded-lg shadow-md mb-3"
                                        onError={(e) => {
                                            e.target.onerror = null; 
                                            e.target.src = "https://via.placeholder.com/300x200?text=Imagen+no+disponible";
                                        }}
                                    />
                                    
                                    <div className="flex flex-col flex-grow">
                                        <h3 className="text-xl font-medium text-[#e39530] mb-2">
                                            {review.title}
                                        </h3>
                                        <p className="text-sm text-gray-200 mb-3 line-clamp-3 flex-grow">
                                            {review.description}
                                        </p>
                                        
                                        <div className="mt-auto">
                                            <div className="flex justify-between items-center pt-2 border-t border-[#635747]">
                                                <div className="flex gap-1 items-center bg-[#3b3b3b] p-2 rounded-3xl">
                                                    <p className="text-xs font-light text-gray-200">
                                                        Valoración general:
                                                    </p>
                                                    
                                                    {[...Array(5)].map((_, i) => {
                                                        const fullStars = Math.floor(review.rate);
                                                        const hasHalfStar = review.rate % 1 >= 0.5 && i === fullStars;
                                                        
                                                        return (
                                                            <span 
                                                                key={i} 
                                                                className={`text-sm ${
                                                                    i < fullStars ? 'text-[#e39530]' : 
                                                                    hasHalfStar ? 'text-[#6c6c6c]' : 
                                                                    'text-gray-300'
                                                                }`}
                                                            >
                                                                ★
                                                            </span>
                                                        );
                                                    })}
                                                    <p className="text-xs font-medium text-gray-200">
                                                         ({review.rate})
                                                    </p>
                                                </div>
                                                <div className="flex items-center text-xs text-gray-300">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    {review.distance || 'N/A'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
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
                        <p className="text-gray-400 mt-2">Prueba con otros filtros de búsqueda</p>
                    </div>
                )}
            </div>
        </div>
    );
}