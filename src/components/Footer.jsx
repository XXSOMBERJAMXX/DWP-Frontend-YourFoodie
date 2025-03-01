import React from "react";

export default function Footer() {
  return (
    <div className="bg-[#3b3b3b] text-white p-4">
      <div className="flex justify-center">
        <p className="text-center">
          &copy; {new Date().getFullYear()} YourFoodie. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}