import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Sesuaikan path alias jika berbeda

export default function PatientForm({ formData, onChange, onSubmit }) {
  
  // Karena Shadcn Select mengembalikan nilai langsung (bukan event object),
  // kita manipulasi sedikit agar tetap sinkron dengan fungsi handleInputChange di Patients.jsx
  const handleSelectChange = (value) => {
    onChange({
      target: {
        name: "treatment",
        value: value,
      },
    });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium text-gray-700">Patient ID</label>
        <input
          type="text"
          name="patientId"
          value={formData.patientId}
          onChange={onChange}
          placeholder="e.g. PAT-3010"
          className="w-full mt-1 p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#CDEEDD]"
          required
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Patient Name</label>
        <input
          type="text"
          name="patientName"
          value={formData.patientName}
          onChange={onChange}
          placeholder="Full Name"
          className="w-full mt-1 p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#CDEEDD]"
          required
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          placeholder="name@example.com"
          className="w-full mt-1 p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#CDEEDD]"
          required
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={onChange}
          placeholder="+62 8..."
          className="w-full mt-1 p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#CDEEDD]"
          required
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Treatment</label>
        {/* IMPLEMENTASI SHADCN UI SELECT */}
        <Select value={formData.treatment} onValueChange={handleSelectChange}>
          <SelectTrigger className="w-full mt-1 p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#CDEEDD]">
            <SelectValue placeholder="Select Treatment" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="Facial">Facial</SelectItem>
            <SelectItem value="Laser">Laser</SelectItem>
            <SelectItem value="Massage">Massage</SelectItem>
            <SelectItem value="Facial Rejuvenation">Facial Rejuvenation</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <button
        type="submit"
        className="w-full bg-[#CDEEDD] hover:bg-[#B8E2CC] text-black font-medium py-3 rounded-xl mt-6 transition-all duration-300"
      >
        Save Patient
      </button>
    </form>
  );
}