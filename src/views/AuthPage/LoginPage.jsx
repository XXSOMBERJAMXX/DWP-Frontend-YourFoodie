// pages/LoginPage.js
import React, { useState } from 'react';
import AuthService from '../../services/AuthService';
import Loading from '../../components/Loading';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function LoginPage({ onToggleForm, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que el formulario se envíe
    setLoading(true);

    try {
      const user = await AuthService.login(email, password);
      console.log('Usuario logueado:', user);
      toast.success("¡Bienvenido " + user.user.full_name + "!");
      onLogin(user.user); // Actualizar el estado del usuario en AppRouter
      navigate('/');
      
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-4 p-8 bg-[#635747] rounded-4xl shadow-lg text-white">
      {/* Logo */}
      <img
        className="w-1/2 mx-auto mb-6"
        src="/img/LOGO - YF.png"
        alt="Logo YourFoodie"
      />

      {/* Título */}
      <h2 className="text-3xl font-bold mb-6 text-center">Iniciar Sesión</h2>

      {/* Formulario */}
      <form onSubmit={handleSubmit}>
        {/* Campo de correo electrónico */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white text-black mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e39530] focus:border-[#e39530]"
            placeholder="Ingresa tu correo electrónico"
            required
          />
        </div>

        {/* Campo de contraseña */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white text-black mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e39530] focus:border-[#e39530]"
            placeholder="Ingresa tu contraseña"
            required
          />
        </div>

        {/* Botón de inicio de sesión */}
        <button
          type="submit"
          className="w-full bg-[#e39530] text-white py-2 px-4 rounded-lg hover:bg-[#d07f27] focus:outline-none focus:ring-2 focus:ring-[#c77324] focus:ring-offset-2 transition duration-300"
          disabled={loading}
        >
          {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </button>
      </form>

      {/* Enlace de registro */}
      <p className="mt-6 text-center text-sm text-[#e68000]">
        ¿No tienes una cuenta?{' '}
        <button onClick={onToggleForm} className="text-[#ff8d00] hover:underline">
          Regístrate aquí
        </button>
      </p>

      {/* Mostrar loading */}
      {loading && <Loading />}
    </div>
  );
}