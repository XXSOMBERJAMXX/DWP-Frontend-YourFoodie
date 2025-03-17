import { useState, useEffect } from "react";

export default function UserPage() {
    const [full_name, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [description, setDescription] = useState('');
    const [selectedAvatar, setSelectedAvatar] = useState('/img/avatars/1.jpg');
    const [avatars, setAvatars] = useState([]);
    const [isEditing, setIsEditing] = useState(false); // Estado para controlar la edición

    useEffect(() => {
        // Simulación de carga de avatares desde la carpeta img/avatars/
        const loadedAvatars = [
            '/img/avatars/default.jpg',
            '/img/avatars/1.jpg',
            '/img/avatars/2.jpg',
            '/img/avatars/3.jpg',
            '/img/avatars/4.jpg',
            '/img/avatars/5.jpg',
        ];
        setAvatars(loadedAvatars);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita que el formulario se envíe
        setIsEditing(false); // Deshabilitar la edición después de actualizar
    };

    return (
        <div className="flex w-full flex-col items-center justify-center">
            <div className="w-full w-full max-w-3xl p-6 bg-[#635747] rounded-4xl shadow-lg text-white">
                {/* Título */}
                <h2 className="text-2xl font-bold mb-4 text-center">Perfil de Usuario</h2>

                {/* Botón de lápiz para habilitar/deshabilitar la edición */}
                <div className="absolute left-1/3 mb-4">
                    <button
                        type="button"
                        onClick={() => setIsEditing(!isEditing)}
                        className={`${isEditing ? 'bg-[#e39530]' : 'bg-[#e39588]'} p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#c77324] focus:ring-offset-2 transition duration-300`}
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

                {/* Formulario */}
                <form onSubmit={handleSubmit}>
                    {/* Selección de avatar */}
                    <div className="mb-4 flex flex-col items-center justify-center">
                        <div className="flex items-center justify-center">
                            <img src={selectedAvatar} alt="Avatar" className="w-24 h-24 rounded-full mr-4" />
                        </div>
                        <label htmlFor="avatar" className="text-center text-xl mb-1">
                            Selecciona un Avatar
                        </label>
                        <div className="flex flex-wrap justify-center gap-2">
                            {avatars.map((avatar, index) => (
                                <img
                                    key={index}
                                    src={avatar}
                                    alt={`Avatar ${index + 1}`}
                                    className={`w-10 h-10 rounded-full cursor-pointer ${selectedAvatar === avatar ? 'border-2 border-[#e39530]' : ''}`}
                                    onClick={() => setSelectedAvatar(avatar)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Campo de nombre completo */}
                    <div className="mb-3">
                        <label htmlFor="full_name" className="block text-sm font-medium mb-1">
                            Nombre Completo
                        </label>
                        <input
                            autoComplete="off"
                            type="text"
                            id="full_name"
                            value={full_name}
                            onChange={(e) => setFullName(e.target.value)}
                            className="bg-white text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e39530] focus:border-[#e39530]"
                            placeholder="Ingresa tu nombre completo"
                            required
                            disabled={!isEditing}
                        />
                    </div>

                    {/* Campo de correo electrónico */}
                    <div className="mb-3">
                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            autoComplete="off"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-white text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e39530] focus:border-[#e39530]"
                            placeholder="Ingresa tu correo electrónico"
                            required
                            disabled={!isEditing}
                        />
                    </div>

                    {/* Campo de número de teléfono */}
                    <div className="mb-3">
                        <label htmlFor="number" className="block text-sm font-medium mb-1">
                            Número de Teléfono
                        </label>
                        <input
                            type="text"
                            id="number"
                            autoComplete="off"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            className="bg-white text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e39530] focus:border-[#e39530]"
                            placeholder="Ingresa tu número de teléfono"
                            required
                            disabled={!isEditing}
                        />
                    </div>

                    {/* Campo de descripción */}
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium mb-1">
                            Descripción
                        </label>
                        <textarea
                            id="description"
                            autoComplete="off"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="bg-white text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e39530] focus:border-[#e39530]"
                            placeholder="Ingresa una descripción"
                            rows="3"
                            disabled={!isEditing}
                        />
                    </div>

                    {/* Botón de actualización (solo visible en modo edición) */}
                    {isEditing && (
                        <button
                            type="submit"
                            className="w-full bg-[#e39530] text-white py-2 px-4 rounded-lg hover:bg-[#d07f27] focus:outline-none focus:ring-2 focus:ring-[#c77324] focus:ring-offset-2 transition duration-300"
                        >
                            Actualizar
                        </button>
                    )}
                </form>
            </div>

            {/* Botón de cerrar sesión */}
            <button
                className="my-4 w-8/12 bg-[#ff6b6b] text-white py-2 px-4 rounded-lg hover:bg-[#ff4c4c] focus:outline-none focus:ring-2 focus:ring-[#ff3b3b] focus:ring-offset-2 transition duration-300"
            >
                Cerrar Sesión
            </button>
        </div>
    );
}