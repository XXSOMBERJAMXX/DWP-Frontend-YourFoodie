import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import RecomendationsService from "../../services/recomendationsService";
import ReviewService from "../../services/reviewService";
import ReviewForm from './components/ReviewForm';
import RecomendationsPage from './RecomendatiosPage';

export default function RecomendationsContainer() {
    // Estados
    const [reviews, setReviews] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [preferences, setPreferences] = useState([]);
    const [loadingPreferences, setLoadingPreferences] = useState(true);
    const [loadingReviews, setLoadingReviews] = useState(false);
    const [loadingLocation, setLoadingLocation] = useState(false);
    const [useLocation, setUseLocation] = useState(false);
    const [userLocation, setUserLocation] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    
    // Refs
    const nombreRef = useRef();
    const tipoComidaRef = useRef();
    const ubicacionRef = useRef();
    const tipoCategoriaRef = useRef();
    
    // Constantes
    const itemsPerPage = 9;
    const totalPages = Math.ceil(reviews.length / itemsPerPage);
    const navigator = useNavigate();

    // Efectos
    useEffect(() => {
        const loadPreferences = async () => {
            try {
                setLoadingPreferences(true);
                const preferences = await RecomendationsService.getPreferences();
                if (preferences) {
                    setPreferences(preferences);
                }
            } catch (error) {
                console.error('Error al cargar preferencias:', error);
                toast.error('Error al cargar las preferencias');
            } finally {
                setLoadingPreferences(false);
            }
        }
        loadPreferences();
    }, []);

    // Handlers
    const handleSearch = async () => {
        const searchData = {
            title: nombreRef.current.value,
            preference: tipoComidaRef.current.value,
            location: userLocation,
            category: tipoCategoriaRef.current.value
        };
        try {
            setLoadingReviews(true);
            const response = await ReviewService.getReviewsBySearch(
                searchData.title,
                searchData.preference,
                searchData.location,
                searchData.category
            );
            
            if (!response.error) {
                setReviews(response.data);
                setCurrentPage(1);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoadingReviews(false);
        }
    };

    const handleLocationChange = async (e) => {
        const isChecked = e.target.checked;
        setUseLocation(isChecked);
        
        if (isChecked) {
            try {
                setLoadingLocation(true);
                const position = await getCurrentPosition();
                setUserLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            } catch (error) {
                console.error("Error al obtener la ubicación:", error);
                setUseLocation(false);
                ubicacionRef.current.checked = false;
                toast.error("No se pudo obtener la ubicación. Por favor, asegúrate de haber dado los permisos necesarios.");
            } finally {
                setLoadingLocation(false);
            }
        } else {
            setUserLocation(null);
        }
    };

    const getCurrentPosition = () => {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error("Geolocation no es soportado por este navegador"));
            }
            
            navigator.geolocation.getCurrentPosition(
                (position) => resolve(position),
                (error) => reject(error)
            );
        });
    };

    const getCurrentReviews = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return reviews.slice(startIndex, endIndex);
    };

    // Props para el componente visual
    const viewProps = {
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
    };

    return (
        <>
            <RecomendationsPage {...viewProps} />
            {showForm && <ReviewForm onClose={() => setShowForm(false)} />}
        </>
    );
}