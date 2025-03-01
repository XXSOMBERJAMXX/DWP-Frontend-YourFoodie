import React from "react";
import { useState } from 'react'
import HomePage from "../../views/HomePage/HomePage";
import Card from '../../components/Card';

export default function HomeLayout() {
  
  const recommendations = [
    {
      id: 1,
      image: "img/Reseñas/resena1.jpg",
      title: "Recomendación 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 2,
      image: "img/Reseñas/resena2.jpg",
      title: "Recomendación 2",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      id: 3,
      image: "img/Reseñas/resena3.webp",
      title: "Recomendación 3",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
  ];
  return (
    <div>
      <HomePage />
      <div className='w-full bg-white flex flex-wrap justify-center px-6 py-4 gap-4'>
        {recommendations.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            image={item.image}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
}