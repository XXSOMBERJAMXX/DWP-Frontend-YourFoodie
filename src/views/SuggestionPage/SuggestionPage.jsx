export default function SuggestionPage() {
    return (
        <div className="w-full flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-4">Sugerencias</h1>

            <div className="w-full mx-4 p-8 bg-[#635747] rounded-4xl shadow-lg text-white">
                {/* Formulario */}
                <form onSubmit={(e) => e.preventDefault()}>
                    {/* Campo de correo electrónico */}
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium mb-1">
                            Titulo de la sugerencia
                        </label>
                        <input
                            type="text"
                            id="title"
                            onChange={(e) => e.target.value}
                            className="bg-white text-black mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e39530] focus:border-[#e39530]"
                            placeholder="Ingresa tu nombre completo"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="suggestion" className="block text-sm font-medium mb-1">
                            Describa la sugerencia
                        </label>
                        <textarea
                            type="text"
                            id="suggestion"
                            onChange={(e) => e.target.value}
                            className="bg-white h-32 resize-none text-black mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e39530] focus:border-[#e39530]"
                            placeholder="Ingresa tu sugerencia"
                            required
                        />
                    </div>


                    {/* Botón de inicio de sesión */}
                    <button
                    type="submit"
                    className="w-full bg-[#e39530] text-white py-2 px-4 rounded-lg hover:bg-[#d07f27] focus:outline-none focus:ring-2 focus:ring-[#c77324] focus:ring-offset-2 transition duration-300"
                    >
                        Enviar Sugerencia
                    </button>
                </form>

            </div>

        </div>
    );
}