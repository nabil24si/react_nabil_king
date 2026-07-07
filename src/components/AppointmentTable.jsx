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
import AppointmentStatusBadge from "./AppointmentStatusBadge";

export default function AppointmentTable({ appointments = [], onDelete, loading }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white shadow-sm mt-6 overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="w-[80px] font-semibold text-gray-700">ID</TableHead>
            <TableHead className="font-semibold text-gray-700">Patient Name</TableHead>
            <TableHead className="font-semibold text-gray-700">Service</TableHead>
            <TableHead className="font-semibold text-gray-700">Date & Time</TableHead>
            <TableHead className="font-semibold text-gray-700">Status</TableHead>
            <TableHead className="w-[80px] font-semibold text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center text-gray-500">
                No appointments found.
              </TableCell>
            </TableRow>
          ) : (
            appointments.map((apt, idx) => (
              <TableRow key={apt.id || apt.appointmentId || idx} className="hover:bg-gray-50/50 transition-colors">
                <TableCell className="font-mono text-xs text-gray-500">#{apt.id}</TableCell>
                <TableCell className="font-medium text-gray-900">{apt.patientname}</TableCell>
                <TableCell>
                  <span className="bg-gray-50 text-black/60 px-3 py-1 rounded-lg text-[11px] border border-gray-100">
                    {apt.service}
                  </span>
                </TableCell>
                <TableCell className="text-gray-600">{apt.date}</TableCell>
                <TableCell>
                  <AppointmentStatusBadge status={apt.status} />
                </TableCell>
                <TableCell className="text-center">
                  <button
                    onClick={() => onDelete(apt.id, apt.patientname)}
                    disabled={loading}
                    className="p-2 hover:bg-red-50 rounded-xl transition-colors group disabled:opacity-50"
                    title="Delete Appointment"
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