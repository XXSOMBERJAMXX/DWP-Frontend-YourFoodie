import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import ProfileService from '../../services/profileService';
import RecomendationsService from "../../services/recomendationsService";
import { toast } from 'react-toastify';

export default function UserPage({ onLogout, onUserUpdate }) {
    const [profile, setProfile] = useState({
        full_name: '',
        email: '',
        number: '',
        description: '',
        avatar: '/img/avatars/default.jpg',
        preferences: []
    });
    const [avatars, setAvatars] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [preferences, setPreferences] = useState([]);
    const navigate = useNavigate();

    // Cargar datos del perfil y avatares al montar el componente
    useEffect(() => {
        const loadPreferences = async () => {
            try {
                const preferences = await RecomendationsService.getPreferences();
                console.log(preferences);
                if (preferences) {
                    setPreferences(preferences);
                }else{
                    toast.error('Error al cargar preferencias');
                }
            } catch (error) {
                console.error('Error al cargar preferencias:', error);
            }
        }

        const loadProfile = async () => {
            try {
                // Cargar datos del perfil
                const profileData = await ProfileService.getProfile();
                setProfile(prev => ({
                    ...prev,
                    ...profileData,
                    avatar: profileData.avatar || '/img/avatars/default.jpg',
                    preferences: profileData.preferences ? JSON.parse(profileData.preferences) : []
                }));
                console.log(profileData.preferences);

                // Simulación de carga de avatares
                const loadedAvatars = [
                    '/img/avatars/default.jpg',
                    '/img/avatars/1.jpg',
                    '/img/avatars/2.jpg',
                    '/img/avatars/3.jpg',
                    '/img/avatars/4.jpg',
                    '/img/avatars/5.jpg',
                ];
                setAvatars(loadedAvatars);
            } catch (error) {
                toast.error(error.message);
                navigate('/auth');
            } finally {
                setIsLoading(false);
            }
        };
        loadPreferences();
        loadProfile();
    }, [navigate, onLogout]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleAvatarSelect = (avatar) => {
        setProfile(prev => ({ ...prev, avatar }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            // Actualizar datos del perfil
            await ProfileService.updateProfile({
                full_name: profile.full_name,
                email: profile.email,
                number: profile.number,
                description: profile.description,
                preferences: JSON.stringify(profile.preferences) // Guardar como string JSON
            });
    
            // Actualizar avatar si es diferente al actual
            if (profile.avatar !== profile.originalAvatar) {
                await ProfileService.updateAvatar(profile.avatar);
            }
    
            // Actualizar localStorage con los nuevos datos
            const currentUser = JSON.parse(localStorage.getItem('user'));
            const updatedUser = {
                ...currentUser,
                full_name: profile.full_name,
                email: profile.email,
                avatar: profile.avatar,
               
            };
            localStorage.setItem('user', JSON.stringify(updatedUser));
    
            // Opcional: Actualizar el estado global si es necesario
            onUserUpdate(updatedUser);
    
            toast.success('Perfil actualizado correctamente');
            setIsEditing(false);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const togglePreference = (prefName) => {
        if (!isEditing) return; // No permitir cambios si no está en modo edición

        setProfile(prev => {
            const updatedPreferences = prev.preferences.includes(prefName)
                ? prev.preferences.filter(p => p !== prefName) // Quitar si ya está seleccionada
                : [...prev.preferences, prefName]; // Agregar si no está

            return { ...prev, preferences: updatedPreferences };
        });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#e39530]"></div>
            </div>
        );
    }

    return (
        <div className="flex w-full flex-col items-center justify-center">
            <div className="w-full max-w-3xl p-6 bg-[#635747] rounded-4xl shadow-lg text-white relative">
                <h2 className="text-2xl font-bold mb-4 text-center">Perfil de Usuario</h2>

                <div className="absolute top-6 right-6">
                    <button
                        type="button"
                        onClick={() => setIsEditing(!isEditing)}
                        className={`${isEditing ? 'bg-[#e39530]' : 'bg-[#e39588]'} p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#c77324] focus:ring-offset-2 transition duration-300`}
                        disabled={isLoading}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4 flex flex-col items-center justify-center">
                        <div className="flex items-center justify-center mb-2">
                            <img 
                                src={profile.avatar} 
                                alt="Avatar" 
                                className="w-24 h-24 rounded-full object-cover border-2 border-[#e39530]" 
                            />
                        </div>
                        {isEditing && (
                            <>
                                <label htmlFor="avatar" className="text-center text-xl mb-1">
                                    Selecciona un Avatar
                                </label>
                                <div className="flex flex-wrap justify-center gap-2">
                                    {avatars.map((avatar, index) => (
                                        <img
                                            key={index}
                                            src={avatar}
                                            alt={`Avatar ${index + 1}`}
                                            className={`w-10 h-10 rounded-full cursor-pointer ${profile.avatar === avatar ? 'border-2 border-[#e39530]' : ''}`}
                                            onClick={() => handleAvatarSelect(avatar)}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="full_name" className="block text-sm font-medium mb-1">
                            Nombre Completo
                        </label>
                        <input
                            type="text"
                            id="full_name"
                            name="full_name"
                            value={profile.full_name}
                            onChange={handleInputChange}
                            className="bg-white text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e39530] focus:border-[#e39530]"
                            required
                            disabled={!isEditing || isLoading}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={profile.email}
                            onChange={handleInputChange}
                            className="bg-white text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e39530] focus:border-[#e39530]"
                            required
                            disabled={!isEditing || isLoading}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="number" className="block text-sm font-medium mb-1">
                            Número de Teléfono
                        </label>
                        <input
                            type="text"
                            id="number"
                            name="number"
                            value={profile.number}
                            onChange={handleInputChange}
                            className="bg-white text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e39530] focus:border-[#e39530]"
                            required
                            disabled={!isEditing || isLoading}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium mb-1">
                            Descripción
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={profile.description || ''}
                            onChange={handleInputChange}
                            className="bg-white text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e39530] focus:border-[#e39530]"
                            rows="3"
                            disabled={!isEditing || isLoading}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Preferencias</label>
                        <div className="flex flex-wrap gap-2">
                            {preferences.map(pref => (
                                <button
                                    key={pref.name}
                                    type="button"
                                    className={`px-4 py-2 rounded-lg border transition ${
                                        profile.preferences.includes(pref.name)
                                            ? 'bg-[#e39530] text-white border-[#c77324]'
                                            : 'bg-gray-200 text-black border-gray-300'
                                    }`}
                                    onClick={() => togglePreference(pref.name)}
                                >
                                    {pref.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {isEditing && (
                        <button
                            type="submit"
                            className="w-full bg-[#e39530] text-white py-2 px-4 rounded-lg hover:bg-[#d07f27] focus:outline-none focus:ring-2 focus:ring-[#c77324] focus:ring-offset-2 transition duration-300 disabled:opacity-50"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Actualizando...' : 'Actualizar'}
                        </button>
                    )}
                </form>
            </div>

            <button
                className="my-4 w-8/12 bg-[#ff6b6b] text-white py-2 px-4 rounded-lg hover:bg-[#ff4c4c] focus:outline-none focus:ring-2 focus:ring-[#ff3b3b] focus:ring-offset-2 transition duration-300"
                onClick={onLogout}
                disabled={isLoading}
            >
                Cerrar Sesión
            </button>
        </div>
    );
}