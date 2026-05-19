import React from 'react';
import { FaCheckCircle, FaSpinner, FaHistory } from "react-icons/fa";

// Sub-component StatusBadge diletakkan di sini karena hanya dipakai oleh tabel ini
const StatusBadge = ({ status }) => {
  const styles = {
    "Completed": { bg: "bg-[#CDEEDD]/40", text: "text-black", icon: FaCheckCircle },
    "In Progress": { bg: "bg-[#FFB686]/20", text: "text-black", icon: FaSpinner },
    "Scheduled": { bg: "bg-gray-100", text: "text-black", icon: FaHistory },
  };
  const { bg, text, icon: Icon } = styles[status] || styles["Scheduled"];
  return (
    <span className={`flex items-center gap-1.5 ${bg} ${text} px-3 py-1.5 rounded-full text-xs`}>
      <Icon className={status === "In Progress" ? "animate-spin" : ""} size={12} /> {status}
    </span>
  );
};

export default function PatientStatusTable({ recentPatients }) {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
      <div className="flex justify-between mb-6">
        <h2 className="text-xl text-black">Patient Status</h2>
        <button className="text-sm text-black bg-gray-50 px-4 py-2 rounded-full border border-gray-100 hover:bg-gray-100 transition-colors">View All</button>
      </div>
      <table className="w-full">
        <thead>
          <tr className="text-black/30 text-[10px] uppercase tracking-widest border-b border-gray-50">
            <th className="pb-4 text-left font-medium">Patient</th>
            <th className="pb-4 text-left font-medium">Treatment</th>
            <th className="pb-4 text-left font-medium">Date & Time</th>
            <th className="pb-4 text-left font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50 text-black">
          {recentPatients.map((p, i) => (
            <tr key={i}>
              <td className="py-4">
                <p className="text-sm">{p.name}</p>
                <p className="text-[10px] text-black/40">{p.id}</p>
              </td>
              <td className="py-4 text-sm text-black/70">{p.treatment}</td>
              <td className="py-4 text-sm text-black/50">{p.time}</td>
              <td className="py-4"><StatusBadge status={p.status}/></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}