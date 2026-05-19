import React from 'react';
import { FaStar } from "react-icons/fa";

export default function PopularTreatments({ popularTreatments }) {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-black">
      <h2 className="text-xl mb-6">Most Popular</h2>
      <div className="space-y-6">
        {popularTreatments.map((t, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-sm text-black/60">
              {t.rank}
            </div>
            <div className="flex-1">
              <p className="text-sm">{t.name}</p>
              <p className="text-[10px] text-black/40 flex items-center gap-1">
                <FaStar className="text-yellow-400" size={10}/> {t.rating} ({t.reviews} reviews)
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}