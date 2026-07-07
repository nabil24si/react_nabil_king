import React from "react";
import { Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; 

export default function PatientTable({ patients = [], onDelete, loading }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white shadow-sm mt-6 overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="w-[100px] font-semibold text-gray-700">Patient ID</TableHead>
            <TableHead className="font-semibold text-gray-700">Name</TableHead>
            <TableHead className="font-semibold text-gray-700">Email</TableHead>
            <TableHead className="font-semibold text-gray-700">Phone</TableHead>
            <TableHead className="font-semibold text-gray-700">Treatment</TableHead>
            <TableHead className="w-[80px] font-semibold text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center text-gray-500">
                No patients found.
              </TableCell>
            </TableRow>
          ) : (
            patients?.map((patient, index) => (
              <TableRow key={patient.id || patient.patientId || index} className="hover:bg-gray-50/50 transition-colors">
                <TableCell className="font-mono text-xs text-gray-500">#{patient.id}</TableCell>
                <TableCell className="font-medium text-gray-900">{patient.patientname}</TableCell>
                <TableCell className="text-gray-600">{patient.email}</TableCell>
                <TableCell className="text-gray-600">{patient.phone}</TableCell>
                <TableCell>
                  <span className="inline-block bg-[#CDEEDD]/50 text-emerald-800 text-xs px-3 py-1 rounded-full font-medium">
                    {patient.treatment}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <button
                    onClick={() => onDelete(patient.id, patient.patientname)}
                    disabled={loading}
                    className="p-2 hover:bg-red-50 rounded-xl transition-colors group disabled:opacity-50"
                    title="Delete Patient"
                  >
                    <Trash2 size={16} className="text-red-400 group-hover:text-red-600 transition-colors" />
                  </button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
