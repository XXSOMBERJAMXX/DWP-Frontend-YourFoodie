import { useState } from 'react';
import { toast } from 'react-toastify';

const ReportModal = ({ show, onClose, onReportSubmit, reviewId }) => {
  const [selectedReason, setSelectedReason] = useState('');
  const [additionalComments, setAdditionalComments] = useState('');

  const reportReasons = [
    "Contenido inapropiado",
    "Información falsa o engañosa",
    "Lenguaje ofensivo",
    "Spam o publicidad no deseada",
    "Conflicto de intereses (el autor tiene relación con el establecimiento)",
    "Reseña fuera de contexto",
    "Datos personales expuestos",
    "Violación de derechos de autor"
  ];

  const handleSubmit = () => {
    if (!selectedReason) {
      toast.error('Por favor selecciona un motivo');
      return;
    }

    onReportSubmit({
      reviewId,
      reason: selectedReason
    });

    // Reset form
    setSelectedReason('');
    setAdditionalComments('');
    onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#635747] rounded-lg p-6 w-full max-w-md">
        <h3 className="text-xl text-white font-bold mb-4">Reportar reseña ⚠️</h3>
        
        <div className="mb-4">
          <label className="block text-gray-200 mb-2">Motivo del reporte:</label>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {reportReasons.map((reason, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="radio"
                  id={`reason-${index}`}
                  name="reportReason"
                  value={reason}
                  checked={selectedReason === reason}
                  onChange={() => setSelectedReason(reason)}
                  className="mr-2 "
                />
                <label className='text-white ' htmlFor={`reason-${index}`}>{reason}</label>
              </div>
            ))}
          </div>
        </div>
        
        
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => {
              setSelectedReason('');
              setAdditionalComments('');
              onClose();
            }}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Enviar Reporte
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;