// components/AppointmentTable.jsx
import React from "react";
import AppointmentTableRow from "./AppointmentTableRow";

export default function AppointmentTable({ appointments }) {
  return (
    <div className="bg-white rounded-[32px] shadow-sm overflow-hidden border border-gray-100 mt-8">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="text-black/30 font-medium uppercase tracking-widest text-[10px] border-b border-gray-50">
            <tr>
              <th className="px-8 py-6 font-medium">Appointment ID</th>
              <th className="px-8 py-6 font-medium">Patient Name</th>
              <th className="px-8 py-6 font-medium">Service</th>
              <th className="px-8 py-6 font-medium">Date & Time</th>
              <th className="px-8 py-6 font-medium text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {appointments.map((apt, idx) => (
              <AppointmentTableRow key={apt.appointmentId || idx} apt={apt} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}