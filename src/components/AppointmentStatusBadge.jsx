// components/AppointmentStatusBadge.jsx
import React from "react";
import { FaCheckCircle, FaCalendarDay, FaTimesCircle } from "react-icons/fa";

export default function AppointmentStatusBadge({ status }) {
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Completed': 
        return { 
          class: 'bg-[#CDEEDD]/40 text-black', 
          icon: <FaCheckCircle className="mr-1.5 text-black/40" /> 
        };
      case 'Scheduled': 
        return { 
          class: 'bg-[#FFB686]/20 text-black', 
          icon: <FaCalendarDay className="mr-1.5 text-black/40" /> 
        };
      case 'Cancelled': 
        return { 
          class: 'bg-gray-100 text-black/40', 
          icon: <FaTimesCircle className="mr-1.5" /> 
        };
      default: 
        return { class: 'bg-gray-50 text-black/50', icon: null };
    }
  };

  const statusInfo = getStatusStyle(status);

  return (
    <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-medium border border-black/5 ${statusInfo.class}`}>
      {statusInfo.icon}
      {status}
    </span>
  );
}