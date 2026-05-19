// components/PatientTableRow.jsx
import React from "react";

export default function PatientTableRow({ patient }) {
  return (
    <tr className="hover:bg-gray-50/50 transition-colors group">
      <td className="px-8 py-5 text-black/50 font-normal">{patient.patientId}</td>
      <td className="px-8 py-5 text-black font-normal">{patient.patientName}</td>
      <td className="px-8 py-5 text-black/40 font-normal italic">{patient.email}</td>
      <td className="px-8 py-5 text-black/50 font-normal">{patient.phone}</td>
      <td className="px-8 py-5 text-right">
        <span className="bg-[#CDEEDD]/30 text-black px-4 py-1.5 rounded-full text-[11px] font-medium border border-[#CDEEDD]/50">
          {patient.treatment}
        </span>
      </td>
    </tr>
  );
}