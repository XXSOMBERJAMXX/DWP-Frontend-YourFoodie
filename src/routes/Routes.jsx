import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import HomeLayout from '../layouts/HomeLayout/HomeLayout';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AboutUsLayout from "../layouts/AboutUsLayout/AboutUsLayout";
import ErrorPage from "../views/ErrorPage/ErrorPage";
import AuthLayout from '../layouts/AuthLayout/AuthLayout';
import { toast, ToastContainer } from 'react-toastify';
import { useState, useEffect } from 'react';
import AuthService from '../services/AuthService';
import ProfileLayout from '../layouts/ProfileLayout/ProfileLayout';
import RecomendationsLayout from '../layouts/RecomendationsLayout/RecomendationsLayout';
import AdminLayout from '../layouts/AdminLayout/AdminLayout';

function AppRouter() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

function AppRoutes() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    checkTokenValidity();
  }, []);

  const checkTokenValidity = async () => {
    const tokenIsValid = await AuthService.validateToken();
    if (!tokenIsValid) {
      AuthService.logout();
      navigate('/auth');
    }     
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    AuthService.logout();
    setUser(null);
    navigate('/auth');
  };

  const handleUserUpdate = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} onLogout={handleLogout} />
      <div className="flex-grow mt-24 md:mt-26">
        <Routes>
          <Route path="/" element={<HomeLayout />} />
          <Route path="/about-us" element={<AboutUsLayout />} />
          <Route path="/auth" element={<AuthLayout onLogin={handleLogin} />} />
          <Route path="/profile" element={<ProfileLayout onLogout={handleLogout} onUserUpdate={handleUserUpdate} checkTokenValidity={checkTokenValidity}/>} />
          <Route path="/recomendations&reviews/:id" element={<RecomendationsLayout checkTokenValidity={checkTokenValidity}/>} />
          <Route path="/recomendations&reviews/" element={<RecomendationsLayout checkTokenValidity={checkTokenValidity}/>} />
          <Route path="/admin" element={<AdminLayout checkTokenValidity={checkTokenValidity}/>} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      <Footer />
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        theme="dark"
        style={{ top: '75px' }}
        toastStyle={{ backgroundColor: '#2e2e2e' }}
      />
    </div>
  );
}

export default AppRouter;
