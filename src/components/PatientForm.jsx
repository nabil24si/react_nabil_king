import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function PatientForm({ formData, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4 font-poppins">
      <div className="space-y-1">
        <Label htmlFor="patientName">Patient Name</Label>
        <Input
          id="patientName"
          name="patientName"
          type="text"
          placeholder="e.g. John Doe"
          value={formData.patientName}
          onChange={onChange}
          required
          className="rounded-xl"
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="name@example.com"
          value={formData.email}
          onChange={onChange}
          required
          className="rounded-xl"
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          name="phone"
          type="text"
          placeholder="+62 812-3456-7890"
          value={formData.phone}
          onChange={onChange}
          required
          className="rounded-xl"
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="treatment">Treatment</Label>
        <select
          id="treatment"
          name="treatment"
          value={formData.treatment}
          onChange={onChange}
          required
          className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#CDEEDD] transition-all cursor-pointer text-black"
        >
          <option value="Facial">Facial</option>
          <option value="Laser">Laser</option>
          <option value="Massage">Massage</option>
          <option value="Facial Rejuvenation">Facial Rejuvenation</option>
          <option value="Microdermabrasion">Microdermabrasion</option>
          <option value="Chemical Peels">Chemical Peels</option>
        </select>
      </div>

      <div className="pt-2">
        <Button type="submit" className="w-full bg-[#CDEEDD] hover:bg-[#B8E2CC] text-black rounded-xl font-medium shadow-md transition-all">
          Save Patient Record
        </Button>
      </div>
    </form>
  );
}