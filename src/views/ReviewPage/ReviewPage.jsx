import { useEffect, useState } from 'react';
import ReviewService from '../../services/reviewService';
import { toast } from 'react-toastify';
import ReportModal from './components/ReportModal';
import FloatingReportButton from './components/FloatingReportButton';

export default function ReviewsPage({ id }) {
  const [review, setReview] = useState(null);
  const [comments, setComments] = useState([]);
  const [showReportModal, setShowReportModal] = useState(false);

  useEffect(() => {
    // Importar el JSON local
    getReviewById(id);
    getCommentsByReview(id);
  }, [id]);

  const getReviewById = async (id) => {
    try {
      const response = await ReviewService.getReviewById(id);
      setReview(response.data);
    } catch (error) {
      toast.error('Error al obtener la reseña');
    }
  };

  const getCommentsByReview = async (id) => {
    try {
      const response = await ReviewService.getCommentsByReview(id);
      setComments(response.data);
    } catch (error) {
      toast.error('Error al obtener los comentarios');
      
    }
  };

  const handleReportSubmit = async (reportData) => {
    try {
      const response = await ReviewService.reportReview(
        reportData.reviewId, 
        reportData.reason, 
        reportData.additionalComments
      );
      if (response?.code == 'DUPLICATE_REPORT') {
        toast.warning(response.error);
      }else{
        toast.success('Reporte enviado correctamente');
      }
      
    } catch (error) {
      console.error('Error al enviar el reporte:', error);      
        toast.error('Error al enviar el reporte');
    }
  };

  if (!review) return <div className='text-center text-2xl'> Cargando... </div>;

  return (
    <div className="flex flex-col w-full mt-2 px-6 md:px-14">
      {/* Botón flotante para reportar */}
      <FloatingReportButton onClick={() => setShowReportModal(true)} />
      
      {/* Modal de Reporte */}
      <ReportModal 
        show={showReportModal} 
        onClose={() => setShowReportModal(false)} 
        onReportSubmit={handleReportSubmit}
        reviewId={id}
      />
      <div className="w-full flex flex-col md:flex-row items-center  gap-8 mb-2">
        <div className="w-full md:w-1/2">
          {/* Título */}
          <h2 className="text-3xl font-bold mb-4 text-center">{review.title}</h2>

          {/* Descripción */}
          <p className="mt-2 text-font-medium">{review.description}</p>

          {/* Imagen */}
          {review.image && (
            <img
              src={review.image}
              alt={review.title}
              className="mt-4 w-full h-[400px] object-cover rounded-lg"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          )}
        </div>

        <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4 text-center">Ubicación</h2>
          {/* Mapa de Google */}
          <div className="bg-[#3b3b3b] p-3 w-full " style={{ borderRadius: '18px'}}>
            
            <GoogleMap latitude={review.lat} longitude={review.lng} />
          </div>
        </div>
        
      </div>
      {/* Calificación */}
      <div className='flex w-full flex-wrap items-center justify-center gap-2 mb-8  p-2 rounded-3xl'>
        <div className="flex items-center mt-4 w-fit bg-[#3b3b3b] p-2 rounded-3xl">
          <p className='mr-2 text-white'>Servicio:</p>
          <span className="text-yellow-500 text-2xl">
            
            {'★'.repeat(Math.floor(review.rating_service))}
            {'☆'.repeat(5 - Math.floor(review.rating_service))}
          </span>
          <span className="ml-2 text-white">({review.rating_service})</span>
        </div>
        <div className="flex items-center mt-4 w-fit bg-[#3b3b3b] p-2 rounded-3xl">
          <p className='mr-2 text-white'>Comida:</p>
          <span className="text-yellow-500 text-2xl">
            
            {'★'.repeat(Math.floor(review.rating_food))}
            {'☆'.repeat(5 - Math.floor(review.rating_food))}
          </span>
          <span className="ml-2 text-white">({review.rating_food})</span>
        </div>
        <div className="flex items-center mt-4 w-fit bg-[#3b3b3b] p-2 rounded-3xl">
          <p className='mr-2 text-white'>Ambiente:</p>
          <span className="text-yellow-500 text-2xl">
            
            {'★'.repeat(Math.floor(review.rating_ambience))}
            {'☆'.repeat(5 - Math.floor(review.rating_ambience))}
          </span>
          <span className="ml-2 text-white">({review.rating_ambience})</span>
        </div>
        <div className="flex items-center mt-4 w-fit bg-[#3b3b3b] p-2 rounded-3xl">
          <p className='mr-2 text-white'>Precio:</p>
          <span className="text-yellow-500 text-2xl">
            
            {'★'.repeat(Math.floor(review.rating_price))}
            {'☆'.repeat(5 - Math.floor(review.rating_price))}
          </span>
          <span className="ml-2 text-white">({review.rating_price})</span>
        </div>
      </div>

      {/* Componente de Comentarios */}
      <CommentSection comments={comments}  id={id} getCommentsByReview={getCommentsByReview}/>
    </div>
  );
}

// Componente de Comentarios
function CommentSection({ comments, id, getCommentsByReview }) {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newComment === '') {
      toast.error('Por favor, ingresa un comentario');
      return;
    }
   
    try {
      const response = await ReviewService.createComment(newComment, id);
      if(response){
        toast.success('Comentario creado exitosamente!');
        setNewComment('');
        getCommentsByReview(id);
      }
    } catch (error) {
      toast.error('Error al obtener los comentarios');
      
    }

    
  };

  return (
    <div className="w-full p-2 md:px-14 py-6 rounded-xl" style={{ backgroundColor: '#635747'}}>
      <h3 className="text-xl font-bold mb-4 text-white">Comentarios</h3>
      {comments?.length > 0 ? (
          <div className="space-y-4 ">
            {comments.map((comment, index) => (
              <div key={index} className="p-4 bg-[#7a6a58] transition duration-300 hover:shadow-md hover:bg-[#6e5d4a] rounded-xl">
                <p className="text-white font-bold text-lg">{comment.full_name}</p>
                <p className="text-white">{comment.description}</p>
                <p className="text-right text-sm text-gray-300">{new Date(comment.created_at).toLocaleString()}</p>
              </div>
            ))}
        </div>
      ):(
        <>
          <p className="text-gray-300">Aún no hay comentarios.</p>
        </>
      )}
      
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
            className="md:w-1/5 w-full mt-4 bg-[#e39530] text-white py-2 px-4 rounded-lg hover:bg-[#d07f27] focus:outline-none focus:ring-2 focus:ring-[#c77324] focus:ring-offset-2 transition duration-300"
            >
            Enviar
            </button>
        </div>
      </form>
    </div>
  );
}

// Componente de Google Maps con Pin Personalizado
function GoogleMap({ latitude, longitude }) {
  const lat = Number(latitude);
  const lng = Number(longitude);
  useEffect(() => {
    
    const apiKey =  import.meta.env.VITE_APP_MAPS; // Reemplaza con tu API Key
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat, lng },
        zoom: 13,
      });

      // Icono personalizado (puedes cambiar la URL por la de tu icono)
      const icon = {
        url: 'https://cdn-icons-png.flaticon.com/512/3754/3754255.png', // Icono de local
        scaledSize: new window.google.maps.Size(60, 60),
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

  return <div id="map" style={{ width: '100%', height: '500px', borderRadius: '18px', padding: '8px', backgroundColor: '#3b3b3b' }}></div>;
}