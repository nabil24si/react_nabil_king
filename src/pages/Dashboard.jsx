import { FaUserInjured, FaDollarSign, FaCalendarAlt, FaStethoscope, FaCheckCircle, FaSpinner, FaHistory, FaStar } from "react-icons/fa";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Data untuk Grafik Revenue
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

const pieData = [
  { name: 'New Patient', value: 45, color: '#FFB686' },
  { name: 'In Treatment', value: 30, color: '#CDEEDD' },
  { name: 'Recovered', value: 25, color: '#E5E7EB' },
];

const dashboardData = {
  stats: [
    { title: "Earnings", value: "$125,000", icon: FaDollarSign, color: "peach", trend: "+12%" },
    { title: "Total Patients", value: "315", icon: FaUserInjured, color: "mint", trend: "+8%" },
    { title: "Appointments", value: "250", icon: FaCalendarAlt, color: "mint", trend: "Today" },
    { title: "Surgeries", value: "65", icon: FaStethoscope, color: "peach", trend: "Active" },
  ],
  patientOverview: {
    total: 3245,
    categories: [
      { label: "New Patient", value: 1460, percentage: 45, color: "peach" },
      { label: "In Treatment", value: 974, percentage: 30, color: "mint" },
      { label: "Recovered", value: 811, percentage: 25, color: "gray" },
    ]
  },
  recentPatients: [
    { id: "PB-001", name: "Sarah Miller", treatment: "Facial Rejuvenation", doctor: "Dr. Olivia Grant", time: "2028-09-12 09:00 AM", status: "Completed" },
    { id: "PB-002", name: "Maurice Galley", treatment: "Laser Hair Removal", doctor: "Dr. David Carter", time: "2028-09-12 12:00 PM", status: "In Progress" },
    { id: "PB-003", name: "Julia Watson", treatment: "Botox Injections", doctor: "Dr. Emily Ross", time: "2028-09-12 02:30 PM", status: "Scheduled" },
    { id: "PB-004", name: "Stephen Hawk", treatment: "Microdermabrasion", doctor: "Dr. James Lawson", time: "2028-09-12 04:30 PM", status: "Completed" },
    { id: "PB-005", name: "Emma Wilson", treatment: "Chemical Peels", doctor: "Dr. Sophia Clark", time: "2028-09-13 09:30 AM", status: "In Progress" },
  ],
  popularTreatments: [
    { rank: "#1", name: "Facial Rejuvenation", rating: 4.9, reviews: 2150 },
    { rank: "#2", name: "Laser Hair Removal", rating: 4.8, reviews: 1980 },
    { rank: "#3", name: "Botox Injections", rating: 4.7, reviews: 1750 },
    { rank: "#4", name: "Microdermabrasion", rating: 4.6, reviews: 1500 },
  ]
};

const StatusBadge = ({ status }) => {
  const styles = {
    "Completed": { bg: "bg-[#CDEEDD]/40", text: "text-black", icon: FaCheckCircle },
    "In Progress": { bg: "bg-[#FFB686]/20", text: "text-black", icon: FaSpinner },
    "Scheduled": { bg: "bg-gray-100", text: "text-black", icon: FaHistory },
  };
  const { bg, text, icon: Icon } = styles[status] || styles["Scheduled"];
  return (
    <span className={`flex items-center gap-1.5 ${bg} ${text} px-3 py-1.5 rounded-full text-xs`}>
      <Icon className={status === "In Progress" ? "animate-spin" : ""} size={12} /> {status}
    </span>
  );
};

export default function Dashboard() {
  const { stats, patientOverview, recentPatients, popularTreatments } = dashboardData;
  const colorMap = {
    peach: { bg: "bg-[#FFB686]/20", text: "text-black" },
    mint: { bg: "bg-[#CDEEDD]/40", text: "text-black" },
    gray: { bg: "bg-gray-100", text: "text-black" }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr,1fr] gap-8 p-2 font-poppins text-black">
      
      {/* --- LEFT COLUMN --- */}
      <div className="space-y-10">
        
        {/* Stats Grid */}
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

        {/* Revenue Chart */}
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

        {/* Patient Status Table */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="flex justify-between mb-6">
            <h2 className="text-xl text-black">Patient Status</h2>
            <button className="text-sm text-black bg-gray-50 px-4 py-2 rounded-full border border-gray-100 hover:bg-gray-100 transition-colors">View All</button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-black/30 text-[10px] uppercase tracking-widest border-b border-gray-50">
                <th className="pb-4 text-left font-medium">Patient</th>
                <th className="pb-4 text-left font-medium">Treatment</th>
                <th className="pb-4 text-left font-medium">Date & Time</th>
                <th className="pb-4 text-left font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-black">
              {recentPatients.map((p, i) => (
                <tr key={i}>
                  <td className="py-4"><p className="text-sm">{p.name}</p><p className="text-[10px] text-black/40">{p.id}</p></td>
                  <td className="py-4 text-sm text-black/70">{p.treatment}</td>
                  <td className="py-4 text-sm text-black/50">{p.time}</td>
                  <td className="py-4"><StatusBadge status={p.status}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- RIGHT COLUMN --- */}
      <div className="space-y-10">
        
        {/* Patient Overview */}
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

        {/* Popular Treatments */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-black">
          <h2 className="text-xl mb-6">Most Popular</h2>
          <div className="space-y-6">
            {popularTreatments.map((t, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-sm text-black/60">
                  {t.rank}
                </div>
                <div className="flex-1">
                  <p className="text-sm">{t.name}</p>
                  <p className="text-[10px] text-black/40 flex items-center gap-1">
                    <FaStar className="text-yellow-400" size={10}/> {t.rating} ({t.reviews} reviews)
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}