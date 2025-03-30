export default function ImageUploader({ label, required, previewImage, onChange }) {
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          onChange(file, reader.result);
        };
        reader.readAsDataURL(file);
      }
    };
  
    return (
      <div>
        <label className="block text-sm font-medium text-gray-100 mb-1">
          {label} {required && <span className="text-red-700">*</span>}
        </label>
        <div className="flex items-center">
          <label className="cursor-pointer bg-[#e39530] hover:bg-[#d18728] text-white font-medium py-2 px-4 rounded-lg shadow-md transition duration-200">
            Seleccionar imagen
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
          {previewImage && (
            <span className="ml-3 text-sm text-white">Imagen seleccionada</span>
          )}
        </div>
        {previewImage && (
          <div className="mt-2">
            <img 
              src={previewImage} 
              alt="Vista previa" 
              className="h-32 object-cover rounded-lg"
            />
          </div>
        )}
      </div>
    );
  }