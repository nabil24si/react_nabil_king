import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ServiceForm({ formData, onChange, onSubmit }) {

  const handleSelectChange = (value) => {
    onChange({ target: { name: "category", value } });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 font-poppins">
      <div className="space-y-1">
        <Label htmlFor="serviceName">Service Name</Label>
        <Input
          id="serviceName"
          name="serviceName"
          type="text"
          placeholder="e.g. Gold Facial Detox"
          value={formData.serviceName}
          onChange={onChange}
          required
          className="rounded-xl"
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="category">Category</Label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={onChange}
          required
          className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#CDEEDD] transition-all cursor-pointer text-black"
        >
          <option value="Facial">Facial</option>
          <option value="Laser">Laser</option>
          <option value="Massage">Massage</option>
        </select>
      </div>

      <div className="space-y-1">
        <Label htmlFor="duration">Duration (minutes)</Label>
        <Input
          id="duration"
          name="duration"
          type="number"
          placeholder="60"
          value={formData.duration}
          onChange={onChange}
          required
          className="rounded-xl"
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          name="price"
          type="text"
          placeholder="Rp 500.000"
          value={formData.price}
          onChange={onChange}
          required
          className="rounded-xl"
        />
      </div>

      <div className="pt-2">
        <Button type="submit" className="w-full bg-[#CDEEDD] hover:bg-[#B8E2CC] text-black rounded-xl font-medium shadow-md transition-all">
          Save Service
        </Button>
      </div>
    </form>
  );
}