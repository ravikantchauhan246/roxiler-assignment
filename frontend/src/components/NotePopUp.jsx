import { useState, useEffect } from 'react';

const NotePopUp = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasShown = localStorage.getItem('NotePopUpShown');
    if (!hasShown) {
      setIsVisible(true);
      localStorage.setItem('NotePopUpShown', 'true');
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md">
        <h2 className="text-2xl font-bold text-orange-600 mb-4">Note</h2>
        <p className="text-gray-700 mb-4">
        Data may take some time to load as the website is hosted on free servers. Thank you for your patience and understanding!
        </p>
        <button 
          onClick={() => setIsVisible(false)}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
};

export default NotePopUp;