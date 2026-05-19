// components/PatientModal.jsx
import React from "react";
import { FaTimes } from "react-icons/fa";

export default function PatientModal({ isOpen, onClose, title, description, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-[32px] w-full max-w-md p-10 relative shadow-2xl animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose} 
          className="absolute top-8 right-8 text-black/20 hover:text-black transition-colors"
        >
          <FaTimes size={20} />
        </button>
        
        <h2 className="text-2xl font-medium text-black mb-2 tracking-tight">{title}</h2>
        {description && <p className="text-sm text-black/40 mb-8">{description}</p>}
        
        {children}
      </div>
    </div>
  );
}