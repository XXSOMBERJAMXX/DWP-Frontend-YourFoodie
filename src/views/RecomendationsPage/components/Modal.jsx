export default function Modal({ children, onClose, title }) {
    return (
      <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-[#635747] rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-100">{title}</h2>
              <button 
                onClick={onClose}
                className="text-gray-300 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <hr className="border-gray-500 my-4" />
            {children}
          </div>
        </div>
      </div>
    );
}