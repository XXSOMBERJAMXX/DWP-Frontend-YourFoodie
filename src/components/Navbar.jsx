import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ user}) {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    return (
        <div className='fixed top-0 left-0 right-0 z-50 bg-[#fff4e6]'>
            <nav className='flex flex-col md:flex-row justify-around bg-[#3b3b3b] text-white items-center mx-1 md:mx-4 mt-2 mb-1  md:mt-4 rounded-3xl px-4 text-lg'>
                <div className='flex items-center justify-between w-full md:w-1/3 p-2'>
                    <img onClick={() => { setIsMenuOpen(false); navigate("/"); }} src="/img/LOGO - YOURFOODIE.png" alt="Logo" className='w-[50%] md:w-[80%] hover:scale-105 transition duration-150' />
                    <button onClick={toggleMenu} className='md:hidden text-white focus:outline-none'>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>

                <div className={`${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} md:max-h-full md:opacity-100 overflow-hidden transition-all duration-500 ease-in-out w-full md:flex md:flex-row justify-around flex flex-col gap-4 p-0 md:p-4`}>
                    <Link onClick={() => setIsMenuOpen(false)} to="/recomendations&reviews" className='flex justify-center font-semibold hover:scale-105 active:scale-95 transition duration-150'>Recomendaciones</Link>
                    <Link onClick={() => setIsMenuOpen(false)} to="/" className='flex justify-center font-semibold hover:scale-105 active:scale-95 transition duration-150'>Inicio</Link>
                    <Link onClick={() => setIsMenuOpen(false)} to="/about-us" className='flex justify-center font-semibold hover:scale-105 active:scale-95 transition duration-150'>Nosotros</Link>
                    {user?.role === 'A' ? (
                        <Link onClick={() => setIsMenuOpen(false)} to="/admin" className='flex justify-center font-semibold hover:scale-105 active:scale-95 transition duration-150'>Administrador</Link>
                    ) : (
                        <></>
                    ) }
                </div>

                {user ? (
                    <div className={`${isMenuOpen ? 'max-h-96 opacity-100 my-4' : 'max-h-0 opacity-0 '} relative flex gap-2 justify-center md:max-h-full md:opacity-100 overflow-hidden transition-all duration-500 ease-in-out w-full md:w-1/3 p-0 md:p-2`}>
                        <div className='flex items-center'>
                            <img src={user.avatar} alt="Avatar" className='w-8 h-8 rounded-full mr-2' />
                            <p
                                className='font-bold cursor-pointer relative'
                                onClick={() =>{ navigate(`/profile`); setIsMenuOpen(false);}}
                            >
                                {user.full_name.length > 20 ? `${user.full_name.substring(0, 20)}...` : user.full_name}
                            </p>
                        </div>
                                                
                    </div>
                ) : (
                    <div className={`${isMenuOpen ? 'max-h-96 opacity-100 !justify-center my-2' : 'max-h-0 opacity-0'} flex my-0 justify-end md:max-h-full md:opacity-100 overflow-hidden transition-all duration-500 ease-in-out w-full md:w-1/3 p-0 md:p-4`}>
                        <button
                            onClick={() => { setIsMenuOpen(false); navigate("/auth"); }}
                            className='flex justify-center items-center bg-[#ff6b6b] text-white font-semibold py-2 px-4 rounded-3xl hover:bg-[#ff4c4c] active:bg-[#ff3b3b] transition duration-150 transform hover:scale-105 active:scale-95 w-full mx-4'
                        >
                            Inicia Sesión
                        </button>
                    </div>
                )}

            </nav>
        </div>
    );
}
