import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import Widget from './Widget';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 font-sans">
      {/* Chat Widget */}
      <Widget
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      {/* Toggle Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`bg-primary-solid text-white p-3 sm:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 ${isOpen ? 'rotate-0' : 'rotate-0'
            }`}
          style={{ marginTop: isOpen ? '1rem' : '0' }}
        >
          {isOpen ? <X size={20} className="sm:w-6 sm:h-6" /> : <MessageCircle size={20} className="sm:w-6 sm:h-6" />}
        </button>
      </div>
    </div>
  );
};

export default ChatbotWidget;