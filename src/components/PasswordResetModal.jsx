import React, { useState, useEffect } from 'react';
import AuthService from '../services/AuthService';
import { toast } from 'react-toastify';
import Loading from './Loading';

const PasswordResetModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1); // 1: email, 2: code, 3: new password
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [processStarted, setProcessStarted] = useState(false);
  const [showExitWarning, setShowExitWarning] = useState(false);

  // Resetear el proceso cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setEmail('');
      setCode('');
      setNewPassword('');
      setConfirmPassword('');
      setLoading(false);
      setProcessStarted(false);
      setShowExitWarning(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    if (processStarted) {
      setShowExitWarning(true);
    } else {
      onClose();
    }
  };

  const confirmClose = (confirmed) => {
    setShowExitWarning(false);
    if (confirmed) {
      setProcessStarted(false);
      onClose();
    }
  };

  const handleRequestReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setProcessStarted(true);
    
    try {
      await AuthService.requestPasswordReset(email);
      toast.success('Código enviado a tu correo electrónico');
      setStep(2);
    } catch (error) {
      toast.error(error.message || 'Error al enviar el código');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await AuthService.verifyResetCode(email, code);
      toast.success('Código verificado');
      setStep(3);
    } catch (error) {
      toast.error(error.message || 'Código inválido o expirado');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }
    
    setLoading(true);
    
    try {
      await AuthService.resetPassword(email, code, newPassword);
      toast.success('Contraseña actualizada exitosamente');
      setProcessStarted(false);
      onClose();
    } catch (error) {
      toast.error(error.message || 'Error al actualizar la contraseña');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#635747] rounded-lg p-6 w-full max-w-md relative">
        <button 
          onClick={handleClose}
          className="absolute top-2 right-2 text-white hover:text-[#e39530]"
        >
          &times;
        </button>
        
        <h2 className="text-2xl font-bold mb-4 text-white">Recuperar Contraseña</h2>
        
        {processStarted && (
          <div className="mb-4 p-3 bg-yellow-500/20 border border-yellow-500/50 text-yellow-300 text-sm rounded-lg flex items-start">
            <span className="mr-2">⚠️</span>
            <span>Por favor no cierres esta ventana hasta completar el proceso de recuperación</span>
          </div>
        )}
        
        {showExitWarning && (
          <div className="mb-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
            <p className="text-white mb-3">¿Estás seguro de que quieres cancelar el proceso de recuperación?</p>
            <div className="flex justify-end space-x-2">
              <button 
                onClick={() => confirmClose(false)}
                className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Continuar
              </button>
              <button 
                onClick={() => confirmClose(true)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Cancelar proceso
              </button>
            </div>
          </div>
        )}
        
        {!showExitWarning && (
          <>
            {step === 1 && (
              <form onSubmit={handleRequestReset}>
                <div className="mb-4">
                  <label className="block text-white mb-2">Correo Electrónico</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-white text-black"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#e39530] text-white py-2 px-4 rounded hover:bg-[#d07f27]"
                  disabled={loading}
                >
                  {loading ? 'Enviando...' : 'Enviar Código'}
                </button>
              </form>
            )}
            
            {step === 2 && (
              <form onSubmit={handleVerifyCode}>
                <div className="mb-4">
                  <p className="text-white mb-4">
                    Hemos enviado un código de 6 dígitos a <span className="font-bold">{email}</span>
                  </p>
                  <label className="block text-white mb-2">Código de Verificación</label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-white text-black"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#e39530] text-white py-2 px-4 rounded hover:bg-[#d07f27]"
                  disabled={loading}
                >
                  {loading ? 'Verificando...' : 'Verificar Código'}
                </button>
              </form>
            )}
            
            {step === 3 && (
              <form onSubmit={handleResetPassword}>
                <div className="mb-4">
                  <label className="block text-white mb-2">Nueva Contraseña</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-white text-black"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-white mb-2">Confirmar Contraseña</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-white text-black"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#e39530] text-white py-2 px-4 rounded hover:bg-[#d07f27]"
                  disabled={loading}
                >
                  {loading ? 'Actualizando...' : 'Actualizar Contraseña'}
                </button>
              </form>
            )}
          </>
        )}
        
        {loading && <Loading />}
      </div>
    </div>
  );
};

export default PasswordResetModal;