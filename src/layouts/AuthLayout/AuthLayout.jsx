//layouts/AuthLayout.jsx
import React, { useState } from 'react';
import LoginPage from '../../views/AuthPage/LoginPage';
import RegisterPage from '../../views/AuthPage/RegisterPage';

export default function LoginLayout({onLogin}) {
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl w-full">
        <div className="flex items-center justify-center">
          {showLogin ? (
            <LoginPage onToggleForm={toggleForm} onLogin={onLogin}/>
          ) : (
            <RegisterPage onToggleForm={toggleForm} />
          )}
        </div>

        <div className="hidden lg:flex items-center justify-center">
          <img
            className="rounded-4xl object-cover w-full h-full max-h-[570px]"
            src="/img/comidalogin.jpg"
            alt="comidalogin"
          />
        </div>
      </div>
    </div>
  );
}