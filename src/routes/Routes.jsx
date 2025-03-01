import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeLayout from '../layouts/HomeLayout/HomeLayout';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HomePage from "../views/HomePage/HomePage";
import UsPage from "../views/UsPage/UsPage";
import RecomendatiosPage from "../views/RecomendationsPage/RecomendatiosPage";
import ErrorPage from "../views/ErrorPage/ErrorPage";
import LoginLayout from '../layouts/LoginLayout/LoginLayout';

function AppRouter() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow mt-26 xs:mt-26"> {/* Ajusta el margen superior */}
          <Routes>
            {/* Ruta principal con subrutas */}
            <Route path="/" element={<HomeLayout />} />
            <Route path="/us" element={<UsPage />} />
            <Route path="/recomendations" element={<RecomendatiosPage />} />
            <Route path="/login" element={<LoginLayout />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default AppRouter;
