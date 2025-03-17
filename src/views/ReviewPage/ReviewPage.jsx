import { useEffect, useState } from 'react';

export default function ReviewsPage({ id }) {
  const [review, setReview] = useState(null);

  useEffect(() => {
    // Importar el JSON local
    import('./data.json')
      .then((data) => setReview(data.default))
      .catch((error) => console.error('Error importing data:', error));
  }, [id]);

  if (!review) return <div>Cargando...</div>;

  return (
    <div className="flex flex-col w-full mt-4 md:px-14">
      <div className="w-full flex flex-col md:flex-row items-center  gap-8 mb-8">
        <div className="w-full md:w-1/2">
          {/* Título */}
          <h2 className="text-3xl font-bold mb-4 text-center">{review.titulo}</h2>

          {/* Descripción */}
          <p className="mt-2 text-font-medium">{review.descripcion}</p>

          {/* Calificación */}
          <div className="flex items-center mt-4 w-fit bg-[#3b3b3b] p-2 rounded-3xl">
            <span className="text-yellow-500 text-2xl">
              {'★'.repeat(Math.floor(review.calificacion))}
              {'☆'.repeat(5 - Math.floor(review.calificacion))}
            </span>
            <span className="ml-2 text-white">({review.calificacion})</span>
          </div>

          {/* Imagen */}
          <img
            src={review.imagen}
            alt={review.titulo}
            className="mt-4 w-full h-[400px] object-cover rounded-lg"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4 text-center">Ubicación</h2>
          {/* Mapa de Google */}
          <GoogleMap lat={review.coordenadas.lat} lng={review.coordenadas.lng} />
        </div>
      </div>

      {/* Componente de Comentarios */}
      <CommentSection comments={review.comentarios} />
    </div>
  );
}

// Componente de Comentarios
function CommentSection({ comments }) {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Comentario enviado: ${newComment}`);
    setNewComment('');
  };

  return (
    <div className="w-full p-2 md:px-14 py-6 rounded-xl" style={{ backgroundColor: '#635747'}}>
      <h3 className="text-xl font-bold mb-4 text-white">Comentarios</h3>
      <div className="space-y-4 ">
        {comments.map((comment, index) => (
          <div key={index} className="p-4 bg-[#7a6a58] transition duration-300 hover:shadow-md hover:bg-[#6e5d4a] rounded-xl">
            <p className="text-white font-bold text-lg">{comment.usuario}</p>
            <p className="text-white">{comment.comentario}</p>
            <p className="text-right text-sm text-gray-300">{new Date(comment.date).toLocaleString()}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="mt-6 ">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Añade un comentario..."
          className="bg-white text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e39530] focus:border-[#e39530]"
          rows="3"
        />
        <div className='flex justify-end'>
            <button
            type="submit"
            className="w-1/5 mt-4 bg-[#e39530] text-white py-2 px-4 rounded-lg hover:bg-[#d07f27] focus:outline-none focus:ring-2 focus:ring-[#c77324] focus:ring-offset-2 transition duration-300"
            >
            Enviar
            </button>
        </div>
      </form>
    </div>
  );
}

// Componente de Google Maps con Pin Personalizado
function GoogleMap({ lat, lng }) {
  useEffect(() => {
    const apiKey = 'AIzaSyCjGUkXcGR53W0mkMxcpdDe-qZcQJZQ-ew'; // Reemplaza con tu API Key
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat, lng },
        zoom: 15,
      });

      // Icono personalizado (puedes cambiar la URL por la de tu icono)
      const icon = {
        url: 'https://cdn-icons-png.flaticon.com/512/3754/3754255.png', // Icono de local
        scaledSize: new window.google.maps.Size(40, 40),
      };

      new window.google.maps.Marker({
        position: { lat, lng },
        map,
        icon,
        title: 'Ubicación del local',
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [lat, lng]);

  return <div id="map" style={{ width: '100%', height: '500px', borderRadius: '8px', padding: '8px', backgroundColor: '#3b3b3b' }}></div>;
}