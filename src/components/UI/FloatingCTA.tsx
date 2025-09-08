import React, { useState } from 'react';
import { MessageCircle, X, Phone, Mail } from 'lucide-react';

const FloatingCTA: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isExpanded && (
        <div className="mb-4 bg-white rounded-lg shadow-2xl p-4 w-64 border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-900">Get in Touch</h3>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            <a
              href="tel:+919876543210"
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Phone className="w-5 h-5 text-emerald-600" />
              <div>
                <p className="font-medium text-gray-900">Call Us</p>
                <p className="text-sm text-gray-500">+91 98765 43210</p>
              </div>
            </a>
            <a
              href="mailto:info@namasteexim.com"
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Mail className="w-5 h-5 text-amber-600" />
              <div>
                <p className="font-medium text-gray-900">Email Us</p>
                <p className="text-sm text-gray-500">info@namasteexim.com</p>
              </div>
            </a>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-green-50 transition-colors"
            >
              <MessageCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-gray-900">WhatsApp</p>
                <p className="text-sm text-gray-500">Quick Response</p>
              </div>
            </a>
          </div>
        </div>
      )}
      
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-4 rounded-full shadow-2xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 transform hover:scale-110"
      >
        {isExpanded ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  );
};

export default FloatingCTA;