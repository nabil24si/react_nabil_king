import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; 

// 1. PASTIKAN ada kurung kurawal { patients = [] } untuk destructuring props
// Kita beri nilai default "= []" (array kosong) jika datanya undefined
export default function PatientTable({ patients = [] }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white shadow-sm mt-6 overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="w-[120px] font-semibold text-gray-700">Patient ID</TableHead>
            <TableHead className="font-semibold text-gray-700">Name</TableHead>
            <TableHead className="font-semibold text-gray-700">Email</TableHead>
            <TableHead className="font-semibold text-gray-700">Phone</TableHead>
            <TableHead className="text-right font-semibold text-gray-700">Treatment</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* 2. Gunakan optional chaining (?.) untuk memastikan aplikasi tidak crash */}
          {patients?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center text-gray-500">
                No patients found.
              </TableCell>
            </TableRow>
          ) : (
            patients?.map((patient, index) => (
              <TableRow key={patient.patientId || index} className="hover:bg-gray-50/50 transition-colors">
                <TableCell className="font-medium text-gray-600">{patient.patientId}</TableCell>
                <TableCell className="font-medium text-gray-900">{patient.patientName}</TableCell>
                <TableCell className="text-gray-600">{patient.email}</TableCell>
                <TableCell className="text-gray-600">{patient.phone}</TableCell>
                <TableCell className="text-right">
                  <span className="inline-block bg-[#CDEEDD]/50 text-emerald-800 text-xs px-3 py-1 rounded-full font-medium">
                    {patient.treatment}
                  </span>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}