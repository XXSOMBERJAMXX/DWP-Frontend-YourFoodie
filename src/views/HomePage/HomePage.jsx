import { useState } from 'react'
import Carousel from '../../components/Carousel';
import { useNavigate } from "react-router-dom";


export default function HomePage() {
  const navigate = useNavigate();
  const images = [
    'img/Carousel/lugar1.webp',
    'img/Carousel/lugar2.webp',
    'img/Carousel/lugar3.jpg',
  ];

  

  return (
    <div>
      <Carousel images={images}/>
      <div className='flex justify-center py-4'>
        <button  onClick={() => navigate("/login")} className='bg-[#ff6b6b] text-white font-semibold py-2 px-4 md:px-2 rounded-xl hover:bg-[#ff4c4c] active:bg-[#ff3b3b] transition duration-150 transform hover:scale-105 active:scale-95 w-1/2 md:w-1/4'>
          Entra Aquí
        </button>
      </div>
    </div>
  )
}


