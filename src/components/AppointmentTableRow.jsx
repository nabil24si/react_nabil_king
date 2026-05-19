// components/AppointmentTableRow.jsx
import React from "react";
import { FaClock } from "react-icons/fa";
import AppointmentStatusBadge from "./AppointmentStatusBadge";

export default function AppointmentTableRow({ apt }) {
  return (
    <tr className="hover:bg-gray-50/50 transition-colors group">
      <td className="px-8 py-5 text-black/50 font-normal">{apt.appointmentId}</td>
      <td className="px-8 py-5 text-black font-normal">{apt.patientName}</td>
      <td className="px-8 py-5">
        <span className="bg-gray-50 text-black/60 px-3 py-1 rounded-lg text-[11px] border border-gray-100">
          {apt.service}
        </span>
      </td>
      <td className="px-8 py-5 text-black/50">
        <div className="flex items-center">
          <FaClock className="mr-2 text-black/20" /> {apt.date}
        </div>
      </td>
      <td className="px-8 py-5 text-right">
        <AppointmentStatusBadge status={apt.status} />
      </td>
    </tr>
  );
}