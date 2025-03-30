import React from "react";
import HomePage from "../../views/HomePage/HomePage";
import Card from '../../components/Card';

export default function HomeLayout() {
  return (
    <div className="flex flex-col items-center">
      <HomePage />
      <div className="w-full bg-white px-6 py-4">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Recomendaciones Recientes
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          <Card />                    
        </div>
      </div>
    </div>
  );
}