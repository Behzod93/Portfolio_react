
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity">
      <div className="bg-[#1e293b] w-full max-w-2xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h3 className="text-xl font-bold text-emerald-400">{title}</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-2xl"
          >
            &times;
          </button>
        </div>
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {children}
        </div>
        <div className="p-4 bg-[#0f172a] flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-lg font-medium transition-all"
          >
            Yopish.
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
