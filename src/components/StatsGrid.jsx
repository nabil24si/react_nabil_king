import React from 'react';

export default function StatsGrid({ stats, colorMap }) {
  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-4 rounded-2xl ${colorMap[stat.color].bg}`}>
              <stat.icon className="text-2xl text-black" />
            </div>
            <div>
              <p className="text-black/50 text-xs uppercase tracking-wider">{stat.title}</p>
              <p className="text-black text-2xl">{stat.value}</p>
            </div>
          </div>
          <span className={`text-xs ${colorMap[stat.color].bg} px-3 py-1 rounded-lg`}>{stat.trend}</span>
        </div>
      ))}
    </div>
  );
}