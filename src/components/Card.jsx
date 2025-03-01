import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ id, image, title, description }) => {
  const navigate = useNavigate();

  const truncatedDescription =
    description.length > 100 ? `${description.substring(0, 100)}...` : description;

  const handleClick = () => {
    navigate(`/recomendaciones/${id}`);
  };

  return (
    <div
      className="flex flex-col items-center justify-center max-w-sm rounded-xl overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition duration-500 ease-in-out transform hover:scale-105"
      onClick={handleClick}
    >
      <img className="w-full h-48 object-cover" src={image} alt={title} />
      <div className="px-6 py-4 text-center">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base text-justify">{truncatedDescription}</p>
      </div>
    </div>
  );
};

export default Card;
