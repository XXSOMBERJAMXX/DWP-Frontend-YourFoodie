import React, { useState } from 'react';
import AuthService from '../../services/AuthService';
import Loading from '../../components/Loading';
import { toast } from 'react-toastify';

export default function RegisterPage({ onToggleForm }) {
  const [full_name, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [number, setNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que el formulario se envíe
    setLoading(true);

    try {
      const response = await AuthService.register(full_name, email, password, number);
      toast.success("Usuario registrado con exito");
      clearForm();
      onToggleForm();
    } catch (error) {
      toast.error(error.message)      
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setFullName('');
    setEmail('');
    setPassword('');
    setNumber('');
  };

  return (
    <div className="w-full max-w-md mx-4 p-8 bg-[#635747] rounded-4xl shadow-lg text-white">
      {/* Logo */}
      <img
        className="w-1/5 mx-auto mb-2"
        src="/img/LOGO - YF.png"
        alt="Logo YourFoodie"
      />

      {/* Título */}
      <h2 className="text-3xl font-bold mb-6 text-center">Registro</h2>


      {/* Formulario */}
      <form onSubmit={handleSubmit}>
        {/* Campo de nombre completo */}
        <div className="mb-4">
          <label htmlFor="full_name" className="block text-sm font-medium mb-1">
            Nombre Completo
          </label>
          <input
            type="text"
            id="full_name"
            value={full_name}
            onChange={(e) => setFullName(e.target.value)}
            className="bg-white text-black mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e39530] focus:border-[#e39530]"
            placeholder="Ingresa tu nombre completo"
            required
          />
        </div>

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
        <div className="mb-4">
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

        {/* Campo de número de teléfono */}
        <div className="mb-6">
          <label htmlFor="number" className="block text-sm font-medium mb-1">
            Número de Teléfono
          </label>
          <input
            type="text"
            id="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="bg-white text-black mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e39530] focus:border-[#e39530]"
            placeholder="Ingresa tu número de teléfono"
            required
          />
        </div>

        {/* Botón de registro */}
        <button
          type="submit"
          className="w-full bg-[#e39530] text-white py-2 px-4 rounded-lg hover:bg-[#d07f27] focus:outline-none focus:ring-2 focus:ring-[#c77324] focus:ring-offset-2 transition duration-300"
          disabled={loading}
        >
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>

      {/* Enlace de inicio de sesión */}
      <p className="mt-6 text-center text-sm text-[#e68000]">
        ¿Ya tienes una cuenta?{' '}
        <button onClick={onToggleForm} className="text-[#ff8d00] hover:underline">
          Inicia sesión aquí
        </button>
      </p>

      {/* Mostrar loading */}
      {loading && <Loading />}
    </div>
  );
}