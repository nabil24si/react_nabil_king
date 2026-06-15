import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function UserForm({ formData, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4 font-poppins">
      <div className="space-y-1">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          type="text"
          placeholder="e.g. jondoe22"
          value={formData.username}
          onChange={onChange}
          required
          className="rounded-xl"
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="email">Email Address</Label>
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
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={onChange}
          required
          className="rounded-xl"
        />
      </div>

      <div className="pt-2">
        <Button type="submit" className="w-full bg-[#CDEEDD] hover:bg-[#B8E2CC] text-black rounded-xl font-medium shadow-md transition-all">
          Save User Account
        </Button>
      </div>
    </form>
  );
}