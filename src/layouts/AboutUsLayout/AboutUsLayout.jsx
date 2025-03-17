import React from "react";
import SuggestionPage from "../../views/SuggestionPage/SuggestionPage";

export default function AboutUsLayout() {
    return (
        <div className="flex flex-col items-center justify-center h-full w-full py-4 md:px-10">
            <h1 className="text-4xl font-bold mb-4">Sobre Nosotros</h1>
            <div className="flex flex-col md:flex-row w-full mt-4 md:mt-10">

                <div className="w-full flex flex-col items-center md:px-14 gap-8">
                    <div className="w-full">
                        <h2 className="text-3xl font-bold mb-4 text-center">¿Quien Somos?</h2>
                        <p className="mt-2 text-font-medium">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas possimus eius temporibus ducimus voluptatum molestiae quisquam totam animi amet, cum architecto a nihil eum deserunt ab! Ratione doloremque quas at!</p>
                        <p className="mt-2 text-font-medium">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas possimus eius temporibus ducimus voluptatum molestiae quisquam totam animi amet, cum architecto a nihil eum deserunt ab! Ratione doloremque quas at!</p>
                        <p className="mt-2 text-font-medium">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas possimus eius temporibus ducimus voluptatum molestiae quisquam totam animi amet, cum architecto a nihil eum deserunt ab! Ratione doloremque quas at!</p>
                    </div>
                    <div className="w-full">
                        <SuggestionPage />
                    </div>
                    
                </div>

                <div className="w-full md:flex items-center justify-center  md:px-14 hidden">
                    <img src="/img/comidalogin.jpg" alt="img" className="object-cover w-full h-full  rounded-4xl"/>
                </div>

            </div>
        </div>
    );
}