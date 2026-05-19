import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Data statis grafik dipindahkan ke sini agar Dashboard.jsx tetap bersih
const revenueData = [
  { name: 'Jan', income: 5500, expenses: 2200 },
  { name: 'Feb', income: 6100, expenses: 1800 },
  { name: 'Mar', income: 5800, expenses: 3000 },
  { name: 'Apr', income: 6300, expenses: 2500 },
  { name: 'May', income: 5900, expenses: 2100 },
  { name: 'Jun', income: 7200, expenses: 3800 },
  { name: 'Jul', income: 7800, expenses: 3200 },
  { name: 'Aug', income: 6500, expenses: 3900 },
  { name: 'Sep', income: 6800, expenses: 2800 },
  { name: 'Oct', income: 7100, expenses: 3500 },
  { name: 'Nov', income: 8200, expenses: 4500 },
  { name: 'Dec', income: 7900, expenses: 3800 },
];

export default function RevenueChart() {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl text-black">Revenue</h2>
        <div className="flex gap-4 items-center text-xs text-black/40 uppercase">
          <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#CDEEDD]"></div> Income</span>
          <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#FFB686]"></div> Expenses</span>
        </div>
      </div>
      <div className="h-[300px] w-full text-black">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#CDEEDD" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#CDEEDD" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#000000', fontSize: 12, opacity: 0.5}} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#000000', fontSize: 12, opacity: 0.5}} tickFormatter={(value) => `${value/1000}k`} />
            <Tooltip contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
            <Area type="monotone" dataKey="income" stroke="#34D399" fillOpacity={1} fill="url(#colorIncome)" strokeWidth={2} />
            <Area type="monotone" dataKey="expenses" stroke="#FFB686" fill="transparent" strokeWidth={2} strokeDasharray="5 5" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}