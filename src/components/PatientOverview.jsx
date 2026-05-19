import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const pieData = [
  { name: 'New Patient', value: 45, color: '#FFB686' },
  { name: 'In Treatment', value: 30, color: '#CDEEDD' },
  { name: 'Recovered', value: 25, color: '#E5E7EB' },
];

export default function PatientOverview({ patientOverview, colorMap }) {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-black">
      <h2 className="text-xl mb-6">Patient Overview</h2>
      <div className="h-[200px] relative flex justify-center items-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={pieData} innerRadius={65} outerRadius={80} paddingAngle={8} dataKey="value" cornerRadius={10}>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute flex flex-col items-center">
          <span className="text-2xl text-black">85%</span>
          <span className="text-[10px] text-black/40 uppercase tracking-tighter">Capacity</span>
        </div>
      </div>
      <div className="mt-8 space-y-4">
        {patientOverview.categories.map((cat, i) => (
          <div key={i} className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs ${colorMap[cat.color].bg}`}>
                {cat.percentage}%
              </div>
              <span className="text-sm text-black/60">{cat.label}</span>
            </div>
            <span className="text-black">{cat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}