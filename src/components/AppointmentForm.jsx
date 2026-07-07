// components/AppointmentForm.jsx
import React from "react";

export default function AppointmentForm({ formData, onChange, onSubmit }) {
  const labelClass = "text-[10px] font-medium text-black/40 uppercase ml-1 tracking-widest";
  const inputClass = "w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-1 focus:ring-[#CDEEDD] transition-all text-black";
  const selectClass = "w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3.5 focus:outline-none focus:ring-1 focus:ring-[#CDEEDD] transition-all cursor-pointer text-black";

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="space-y-1.5">
        <label className={labelClass}>Patient Name</label>
        <input 
          type="text" name="patientName" value={formData.patientName} onChange={onChange} required 
          className={inputClass} placeholder="Full name" 
        />
      </div>
      
      <div className="space-y-1.5">
        <label className={labelClass}>Service</label>
        <select name="service" value={formData.service} onChange={onChange} className={selectClass}>
          <option value="Facial">Facial</option>
          <option value="Laser">Laser</option>
          <option value="Massage">Massage</option>
          <option value="Botox">Botox</option>
        </select>
      </div>
      
      <div className="space-y-1.5">
        <label className={labelClass}>Date & Time</label>
        <input 
          type="text" name="date" value={formData.date} onChange={onChange} required 
          className={inputClass} placeholder="e.g. 2028-09-12 09:00 AM" 
        />
      </div>

      <div className="space-y-1.5">
        <label className={labelClass}>Status</label>
        <select name="status" value={formData.status} onChange={onChange} className={selectClass}>
          <option value="Scheduled">Scheduled</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="pt-6">
        <button 
          type="submit" 
          className="w-full py-4 bg-[#CDEEDD] text-black rounded-2xl hover:bg-[#B8E2CC] font-medium shadow-xl shadow-[#CDEEDD]/20 transition-all duration-300"
        >
          Create Appointment
        </button>
      </div>
    </form>
  );
}