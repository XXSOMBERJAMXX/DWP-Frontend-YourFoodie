import React, { useState, useEffect } from "react";

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative w-[90%] md:w-[70%] h-[200px] md:h-[500px]  mx-auto overflow-hidden rounded-3xl shadow-lg">
      {/* Contenedor del carrusel */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <img
              src={image}
              alt={`Imagen ${index + 1}`}
              className="w-full h-[200px] md:h-[500px] object-cover "
            />
          </div>
        ))}
      </div>

      {/* Botones de navegación */}
      <button
        onClick={goToPrev}
        className="hover:scale-110 active:scale-95 absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-75 rounded-full p-2 shadow-md hover:bg-opacity-100"
      >
        &larr;
      </button>
      <button
        onClick={goToNext}
        className="hover:scale-110 active:scale-95 absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-75 rounded-full p-2 shadow-md hover:bg-opacity-100"
      >
        &rarr;
      </button>
    </div>
  );
};

export default Carousel;
