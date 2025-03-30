import React, { useState } from 'react';
import AuthService from '../../services/AuthService';
import Loading from '../../components/Loading';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PasswordResetModal from '../../components/PasswordResetModal';

export default function LoginPage({ onToggleForm, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [mfaCode, setMfaCode] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [showMfaModal, setShowMfaModal] = useState(false);
  const [mfaError, setMfaError] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await AuthService.login(email, password);
      if (response.qrCodeUrl) {
        setQrCodeUrl(response.qrCodeUrl); 
        setShowMfaModal(true);
      } else{
        toast.error('Intente nuevamente.');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const closeMfaModal = () => {
    setShowMfaModal(false);
    setQrCodeUrl('');
    setMfaCode('');
    setMfaError('');
  };

  const handleMfaVerify = async (e) => {
    e.preventDefault();
    if (!mfaCode || mfaCode.length !== 6) {
      setMfaError('Por favor ingresa un código válido de 6 dígitos');
      return;
    }

    try {
      setLoading(true);


      const response = await AuthService.verifyMfa(email, mfaCode);
      console.log(response.token);

      if (response.token) {
        toast.success("¡Bienvenido " + response.user.full_name + "!");
        onLogin(response.user);
        navigate('/');
      } 


    } catch (err) {
      console.error(err);
      setMfaError(err.response?.data?.error || 'Error al verificar el código MFA');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-4 p-8 bg-[#635747] rounded-3xl shadow-lg text-white relative">
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
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Iniciando sesión...
            </span>
          ) : 'Iniciar Sesión'}
        </button>
      </form>

      {/* Enlace de registro */}
      <p className="mt-6 text-center text-sm text-[#e68000]">
        ¿No tienes una cuenta?{' '}
        <button 
          onClick={onToggleForm} 
          className="text-[#ff8d00] hover:underline focus:outline-none"
        >
          Regístrate aquí
        </button>
      </p>

      {/* Enlace para recuperar contraseña */}
      <div className="mb-4 text-center">
        <button 
          type="button" 
          onClick={() => setShowResetModal(true)}
          className="text-sm font-medium text-[#e39530] hover:underline transition duration-300 focus:outline-none"
        >
          ¿Olvidaste tu contraseña?
        </button>
      </div>

      {/* Modal MFA */}
      {showMfaModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[#635747] rounded-xl p-6 w-full max-w-md border border-[#7a6a58]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Verificación en Dos Pasos</h3>
              <button 
                onClick={closeMfaModal}
                className="text-gray-300 hover:text-white text-2xl focus:outline-none"
                aria-label="Cerrar modal"
              >
                &times;
              </button>
            </div>

            <div className="text-center mb-6">
              <p className="text-gray-200 mb-4">
                Escanea este código QR con tu aplicación de autenticación
              </p>
              {qrCodeUrl && (
                <div className="flex justify-center mb-4 p-2 bg-white rounded-lg inline-block">
                  <img 
                    src={qrCodeUrl} 
                    alt="QR Code MFA" 
                    className="w-48 h-48"
                  />
                </div>
              )}
              <p className="text-gray-300 text-sm mb-4">
                O ingresa manualmente el código secreto en tu aplicación
              </p>
            </div>

            <form onSubmit={handleMfaVerify}>
              <div className="mb-4">
                <label htmlFor="mfaCode" className="block text-sm font-medium text-gray-200 mb-1">
                  Código de Verificación (6 dígitos)
                </label>
                <input
                  type="text"
                  id="mfaCode"
                  value={mfaCode}
                  onChange={(e) => {
                    // Solo permitir números y limitar a 6 caracteres
                    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                    setMfaCode(value);
                    setMfaError('');
                  }}
                  className="w-full px-3 py-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e39530] text-center text-xl tracking-widest"
                  placeholder="------"
                  maxLength="6"
                  inputMode="numeric"
                  pattern="\d{6}"
                  required
                />
                {mfaError && (
                  <p className="text-red-400 text-sm mt-1">{mfaError}</p>
                )}
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeMfaModal}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#e39530] text-white rounded-lg hover:bg-[#d07f27] transition-colors focus:outline-none focus:ring-2 focus:ring-[#c77324]"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Verificando...
                    </span>
                  ) : 'Verificar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de recuperación de contraseña */}
      <PasswordResetModal 
        isOpen={showResetModal} 
        onClose={() => setShowResetModal(false)} 
      />

      {/* Loading overlay */}
      {loading && !showMfaModal && <Loading />}
    </div>
  );
}