import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ServiceModal({ isOpen, onClose, title, description, children }) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] bg-white rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold font-poppins">{title}</DialogTitle>
          <DialogDescription className="text-gray-500 font-poppins">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
}