const FloatingReportButton = ({ onClick }) => {
    return (
      <button 
        onClick={onClick}
        className="fixed bottom-8 right-8 bg-red-500 hover:bg-red-600 text-white p-4 rounded-full shadow-lg z-50 flex items-center justify-center"
        title="Reportar esta reseña"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </button>
    );
  };
  
  export default FloatingReportButton;