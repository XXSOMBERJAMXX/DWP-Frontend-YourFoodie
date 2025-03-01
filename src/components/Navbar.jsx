import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className='fixed top-0 left-0 right-0 z-50 bg-[#fff4e6]'>

            <nav className=' flex flex-col md:flex-row justify-around bg-[#3b3b3b] text-white items-center mx-4 mt-4 mb-2 rounded-3xl px-4 text-lg'>
                <div className='flex items-center justify-between w-full md:w-1/3 p-2'>
                    <img onClick={() => {setIsMenuOpen(false); navigate("/"); }} src="/img/LOGO - YOURFOODIE.png" alt="" className='w-[50%] md:w-[80%] hover:scale-105 transition duration-150'/>
                    <button 
                        onClick={toggleMenu}
                        className='md:hidden text-white focus:outline-none'
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>
                </div>
                
                {/* Menú con animación */}
                <div
                    className={`${
                        isMenuOpen ? 'max-h-96 opacity-100 ' : 'max-h-0 opacity-0'
                    } md:max-h-full md:opacity-100 overflow-hidden transition-all duration-500 ease-in-out w-full  md:flex md:flex-row justify-around flex flex-col gap-4 p-0 md:p-4`}
                >
                    <Link onClick={() => setIsMenuOpen(false)} to="/" className={` flex justify-center font-semibold hover:scale-105 active:scale-95 transition duration-150`}>Inicio</Link>
                    <Link onClick={() => setIsMenuOpen(false)} to="/recomendations" className={` flex justify-center font-semibold hover:scale-105 active:scale-95 transition duration-150`}>Recomendaciones</Link>
                    <Link onClick={() => setIsMenuOpen(false)} to="/us" className={` flex justify-center font-semibold hover:scale-105 active:scale-95 transition duration-150`}>Nosotros</Link>
                </div>
                
                {/* Botón de inicio de sesión con animación */}
                <div
                    className={`${
                        isMenuOpen ? 'max-h-96 opacity-100 p-4' : 'max-h-0 opacity-0'
                    } flex justify-end md:max-h-full md:opacity-100 overflow-hidden transition-all duration-500 ease-in-out w-full md:w-1/3 p-0 md:p-4`}
                >
                    <button
                        onClick={() => {setIsMenuOpen(false); navigate("/login")}}
                        className='flex justify-center items-center bg-[#ff6b6b] text-white font-semibold py-2 px-4 md:px-2 rounded-3xl hover:bg-[#ff4c4c] active:bg-[#ff3b3b] transition duration-150 transform hover:scale-105 active:scale-95 w-full md:w-auto text-sm md:text-base lg:text-lg'
                    >
                        Inicia Sesión
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" width="24" height="24" stroke-width="2.25" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor">
                            <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
                            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                        </svg>
                    </button>
                </div>
            </nav>
        </div>
    );
}