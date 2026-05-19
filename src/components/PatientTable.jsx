// components/PatientTable.jsx
import React from "react";
import PatientTableRow from "./PatientTableRow";
import PatientPagination from "./PatientPagination";

export default function PatientTable({ patients }) {
  return (
    <div className="bg-white rounded-[32px] shadow-sm overflow-hidden border border-gray-100 mt-8">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="text-black/30 font-medium uppercase tracking-widest text-[10px] border-b border-gray-50">
            <tr>
              <th className="px-8 py-6 font-medium">Patient ID</th>
              <th className="px-8 py-6 font-medium">Name</th>
              <th className="px-8 py-6 font-medium">Email</th>
              <th className="px-8 py-6 font-medium">Phone</th>
              <th className="px-8 py-6 font-medium text-right">Treatment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {patients.map((patient, idx) => (
              <PatientTableRow key={patient.patientId || idx} patient={patient} />
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Bagian Pagination */}
      <PatientPagination />
    </div>
  );
}