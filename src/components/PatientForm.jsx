// components/PatientForm.jsx
import React from "react";

export default function PatientForm({ formData, onChange, onSubmit }) {
  const labelClass = "text-[10px] font-medium text-black/40 uppercase ml-1 tracking-widest";
  const inputClass = "w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-1 focus:ring-[#CDEEDD] transition-all text-black";

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="space-y-1.5">
        <label className={labelClass}>Full Name</label>
        <input 
          type="text" name="patientName" value={formData.patientName} onChange={onChange} required 
          className={inputClass} placeholder="John Doe" 
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className={labelClass}>Patient ID</label>
          <input 
            type="text" name="patientId" value={formData.patientId} onChange={onChange} required 
            className={inputClass} placeholder="PB-001" 
          />
        </div>
        <div className="space-y-1.5">
          <label className={labelClass}>Phone</label>
          <input 
            type="text" name="phone" value={formData.phone} onChange={onChange} required 
            className={inputClass} placeholder="0812..." 
          />
        </div>
      </div>
      
      <div className="space-y-1.5">
        <label className={labelClass}>Email Address</label>
        <input 
          type="email" name="email" value={formData.email} onChange={onChange} required 
          className={inputClass} placeholder="name@mail.com" 
        />
      </div>
      
      <div className="space-y-1.5">
        <label className={labelClass}>Treatment Category</label>
        <select 
          name="treatment" value={formData.treatment} onChange={onChange} 
          className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3.5 focus:outline-none focus:ring-1 focus:ring-[#CDEEDD] transition-all cursor-pointer text-black"
        >
          <option value="Facial Rejuvenation">Facial Rejuvenation</option>
          <option value="Laser Hair Removal">Laser Hair Removal</option>
          <option value="Botox Injections">Botox Injections</option>
          <option value="Body Contouring">Body Contouring</option>
        </select>
      </div>

      <div className="pt-6">
        <button 
          type="submit" 
          className="w-full py-4 bg-[#CDEEDD] text-black rounded-2xl hover:bg-[#B8E2CC] font-medium shadow-xl shadow-[#CDEEDD]/20 transition-all duration-300"
        >
          Save Patient Data
        </button>
      </div>
    </form>
  );
}