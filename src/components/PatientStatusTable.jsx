import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Sesuaikan path alias-mu

export default function PatientStatusTable({ recentPatients = [] }) {
  
  // Helper styling untuk status badge agar lebih ciamik
  const getStatusStyle = (status) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "In Progress":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Scheduled":
        return "bg-blue-50 text-blue-700 border-blue-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Appointments</h3>
        <span className="text-xs text-gray-500 font-medium">Live Updates</span>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-100">
        <Table>
          <TableHeader className="bg-gray-50/70">
            <TableRow>
              <TableHead className="font-semibold text-gray-700">ID</TableHead>
              <TableHead className="font-semibold text-gray-700">Patient</TableHead>
              <TableHead className="font-semibold text-gray-700">Treatment</TableHead>
              <TableHead className="font-semibold text-gray-700">Doctor</TableHead>
              <TableHead className="text-right font-semibold text-gray-700">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentPatients.map((patient) => (
              <TableRow key={patient.id} className="hover:bg-gray-50/40 transition-colors">
                <TableCell className="font-medium text-gray-500 text-xs">{patient.id}</TableCell>
                <TableCell className="font-semibold text-gray-900">{patient.name}</TableCell>
                <TableCell className="text-gray-600 text-sm">{patient.treatment}</TableCell>
                <TableCell className="text-gray-500 text-sm">{patient.doctor}</TableCell>
                <TableCell className="text-right">
                  <span className={`inline-block text-xs px-2.5 py-1 rounded-full font-medium border ${getStatusStyle(patient.status)}`}>
                    {patient.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}