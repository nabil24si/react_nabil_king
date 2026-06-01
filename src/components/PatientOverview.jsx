import React from "react";
import { Progress } from "@/components/ui/progress"; // Sesuaikan dengan path alias-mu

export default function PatientOverview({ patientOverview, colorMap }) {
  const { total, categories } = patientOverview;

  return (
    <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Patient Overview</h3>
      <div className="mb-6">
        <span className="text-3xl font-bold text-gray-900">{total.toLocaleString()}</span>
        <span className="text-sm text-gray-500 ml-2">Total Patients</span>
      </div>

      <div className="space-y-5">
        {categories.map((category, index) => {
          // Ambil warna background dasar dari colorMap
          const baseColor = colorMap[category.color]?.bg || "bg-gray-100";
          
          return (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-gray-600">{category.label}</span>
                <span className="text-gray-900">{category.value} ({category.percentage}%)</span>
              </div>
              
              {/* IMPLEMENTASI SHADCN UI PROGRESS */}
              {/* Tips: Kita override warna indikatornya menggunakan inline class Tailwind */}
              <Progress 
                value={category.percentage} 
                className={`h-2 w-full bg-gray-100 [&>div]:${baseColor.replace('/40', '').replace('/20', '')}`} 
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}