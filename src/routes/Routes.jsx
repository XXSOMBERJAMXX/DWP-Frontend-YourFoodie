import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeLayout from '../layouts/HomeLayout/HomeLayout';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AboutUsLayout from "../layouts/AboutUsLayout/AboutUsLayout";
import RecomendatiosPage from "../views/RecomendationsPage/RecomendatiosPage";
import ErrorPage from "../views/ErrorPage/ErrorPage";
import AuthLayout from '../layouts/AuthLayout/AuthLayout';
import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import AuthService from '../services/AuthService';
import ProfileLayout from '../layouts/ProfileLayout/ProfileLayout';
import RecomendationsLayout from '../layouts/RecomendationsLayout/RecomendationsLayout';

function AppRouter() {
  const [user, setUser] = useState(null);

  // Verificar si hay un usuario logueado al cargar la aplicación
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    checkTokenValidity();

  }, []);

  // Función para actualizar el estado del usuario
  const handleLogin = (userData) => {
    setUser(userData);
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    AuthService.logout();
    setUser(null);
  };

  const checkTokenValidity = async () => {
    const tokenIsValid = await AuthService.validateToken();
    if (!tokenIsValid) {
      AuthService.logout();
    }     
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar user={user} onLogout={handleLogout}  />
        <div className="flex-grow mt-24 md:mt-26">
          <Routes>
            <Route path="/" element={<HomeLayout />} />
            <Route path="/about-us" element={<AboutUsLayout />} />
            <Route path="/auth" element={<AuthLayout onLogin={handleLogin} />}/>
            <Route path="/profile" element={<ProfileLayout />}/>
            <Route path="/recomendations&reviews/:id" element={<RecomendationsLayout />} />
            <Route path="/recomendations&reviews/" element={<RecomendationsLayout />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
        <Footer />
        <ToastContainer />
      </div>
    </Router>
  );
}

export default AppRouter;