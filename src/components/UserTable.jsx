import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, Edit3 } from "lucide-react";

export default function UserTable({ users, onDelete, onEdit, loading }) {
  return (
    <div className="rounded-xl border bg-white shadow-sm overflow-hidden mt-6">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="w-[100px] font-semibold">ID User</TableHead>
            <TableHead className="font-semibold">Username</TableHead>
            <TableHead className="font-semibold">Email Address</TableHead>
            <TableHead className="font-semibold">Created At</TableHead>
            <TableHead className="w-[80px] font-semibold text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className="hover:bg-gray-50/50 transition-colors">
              <TableCell className="font-mono text-xs text-gray-500">#{user.id}</TableCell>
              <TableCell className="font-medium text-gray-900">{user.username}</TableCell>
              <TableCell className="text-gray-600">{user.email}</TableCell>
              <TableCell className="text-gray-500 text-xs">
                {new Date(user.created_at).toLocaleString("id-ID")}
              </TableCell>
              <TableCell className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <button
                    onClick={() => onEdit(user)}
                    disabled={loading}
                    className="p-2 hover:bg-blue-50 rounded-xl transition-colors group disabled:opacity-50"
                    title="Edit User"
                  >
                    <Edit3 size={16} className="text-blue-400 group-hover:text-blue-600 transition-colors" />
                  </button>
                  <button
                    onClick={() => onDelete(user.id, user.username)}
                    disabled={loading}
                    className="p-2 hover:bg-red-50 rounded-xl transition-colors group disabled:opacity-50"
                    title="Delete User"
                  >
                    <Trash2 size={16} className="text-red-400 group-hover:text-red-600 transition-colors" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}