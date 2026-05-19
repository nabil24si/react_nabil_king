// components/PatientPagination.jsx
import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function PatientPagination() {
  return (
    <div className="px-8 py-6 flex justify-between items-center bg-[#fcfaf9]/30 border-t border-gray-50">
      <div className="flex items-center gap-2">
        <span className="text-xs text-black/30 font-medium uppercase tracking-wider">Showing</span>
        <select className="bg-white border border-gray-200 rounded-lg text-xs font-medium px-2 py-1 text-black outline-none cursor-pointer">
          <option>10</option>
          <option>20</option>
        </select>
        <span className="text-xs text-black/30 font-medium uppercase tracking-wider">out of 512</span>
      </div>
      <div className="flex items-center gap-2">
        <button className="p-2 text-black/20 hover:text-black transition-colors">
          <FaChevronLeft size={12} />
        </button>
        {[1, 2, 3, "...", 16].map((page, i) => (
          <button 
            key={i} 
            className={`w-8 h-8 rounded-full text-xs font-medium transition-all ${
              page === 1 ? 'bg-[#CDEEDD] text-black' : 'text-black/40 hover:bg-gray-100'
            }`}
          >
            {page}
          </button>
        ))}
        <button className="p-2 text-black/20 hover:text-black transition-colors">
          <FaChevronRight size={12} />
        </button>
      </div>
    </div>
  );
}