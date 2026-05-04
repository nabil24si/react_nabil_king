import { FaUserInjured, FaCalendarCheck, FaSpa, FaDollarSign, FaHeart, FaClock, FaStar } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

export default function Dashboard() {
  return (
    <div id="dashboard-container" className="flex flex-col p-6 bg-gray-50 min-h-screen">
      
      {/* Welcome Banner - Earthy Palette */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#63402f] to-[#3b7d86] rounded-3xl p-8 mb-8 shadow-xl shadow-[#3b7d86]/20 text-white">
        {/* Dekorasi Aksen Lingkaran */}
        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-[#66c5b4]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-20%] left-[-5%] w-48 h-48 bg-[#ffb686]/10 rounded-full blur-2xl"></div>
        
        <div className="relative z-10"> 
          <h1 className="text-4xl font-black mb-2 tracking-tight">Welcome to GlowCare 👋</h1>
          <p className="text-[#ffb686] font-medium opacity-90 max-w-md">
            Manage your beauty clinic appointments and patients with ease in a professional atmosphere.
          </p>
        </div>
      </div>

      <PageHeader title="Dashboard Overview"/>

      {/* Stats Cards - Earthy & Teal Mix */}
      <div id="dashboard-grid" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* Total Patients - Peach Theme */}
        <div className="bg-white rounded-2xl p-6 border-b-4 border-[#ffb686] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-[#ffb686]/20 rounded-xl p-3 text-[#63402f]">
              <FaUserInjured className="text-2xl" />
            </div>
            <span className="text-xs font-bold text-[#63402f] bg-[#ffb686]/30 px-2 py-1 rounded-lg">+12%</span>
          </div>
          <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider">Total Patients</h3>
          <span className="text-3xl font-black text-[#63402f]">128</span>
        </div>

        {/* Appointments Today - Teal Theme */}
        <div className="bg-white rounded-2xl p-6 border-b-4 border-[#3b7d86] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-[#3b7d86]/10 rounded-xl p-3 text-[#3b7d86]">
              <FaCalendarCheck className="text-2xl" />
            </div>
            <span className="text-xs font-bold text-[#3b7d86] bg-[#3b7d86]/10 px-2 py-1 rounded-lg">Today</span>
          </div>
          <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider">Appointments</h3>
          <span className="text-3xl font-black text-[#63402f]">45</span>
        </div>

        {/* Services - Gray/Light Teal Theme */}
        <div className="bg-white rounded-2xl p-6 border-b-4 border-[#a9a9a9] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-gray-100 rounded-xl p-3 text-gray-500">
              <FaSpa className="text-2xl" />
            </div>
            <span className="text-xs font-bold text-gray-500 bg-gray-200 px-2 py-1 rounded-lg">Active</span>
          </div>
          <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider">Services</h3>
          <span className="text-3xl font-black text-[#63402f]">24</span>
        </div>

        {/* Revenue - Dark Brown Theme */}
        <div className="bg-white rounded-2xl p-6 border-b-4 border-[#63402f] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-[#63402f]/10 rounded-xl p-3 text-[#63402f]">
              <FaDollarSign className="text-2xl" />
            </div>
            <span className="text-xs font-bold text-[#63402f] bg-[#63402f]/10 px-2 py-1 rounded-lg">+8.5%</span>
          </div>
          <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider">Monthly Revenue</h3>
          <span className="text-3xl font-black text-[#63402f]">$2.5K</span>
        </div>
      </div>

      {/* Recent Appointments Table */}
      <div className="mb-8">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-white px-8 py-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-xl font-black text-[#63402f] font-poppins">Recent Appointments</h2>
            <button className="text-sm text-[#3b7d86] font-bold hover:underline">View All Schedule</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#fcfaf9] text-[#a9a9a9] text-[10px] uppercase tracking-widest font-bold">
                  <th className="px-8 py-4">Appointment ID</th>
                  <th className="px-8 py-4">Patient Name</th>
                  <th className="px-8 py-4">Service</th>
                  <th className="px-8 py-4">Date & Time</th>
                  <th className="px-8 py-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-50">
                {/* Row Item */}
                <tr className="hover:bg-[#66c5b4]/5 transition-colors group">
                  <td className="px-8 py-5 font-bold text-[#63402f]">#APT-001</td>
                  <td className="px-8 py-5">
                    <div className="flex items-center">
                      <div className="w-9 h-9 rounded-full bg-[#ffb686] flex items-center justify-center text-white font-bold mr-3 shadow-sm">SN</div>
                      <span className="font-bold text-gray-700">Siti Nurhaliza</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="flex items-center text-gray-600 font-medium">
                      <FaSpa className="text-[#3b7d86] mr-2" /> Facial Treatment
                    </span>
                  </td>
                  <td className="px-8 py-5 text-gray-500 italic">
                    <div className="flex items-center">
                      <FaClock className="mr-2 text-xs text-[#a9a9a9]" /> 2026-05-04 10:00
                    </div>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <span className="bg-[#66c5b4]/20 text-[#3b7d86] px-4 py-1.5 rounded-full text-xs font-black uppercase">✓ Completed</span>
                  </td>
                </tr>
                {/* Baris lain bisa diulang dengan pola yang sama */}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick Actions Section - Modern Glassmorphism */}
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        <h3 className="text-lg font-black text-[#63402f] mb-6 tracking-tight">Management Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="group bg-gray-50 hover:bg-[#63402f] p-6 rounded-2xl transition-all duration-300 flex flex-col items-center">
            <FaUserInjured className="text-2xl mb-3 text-[#3b7d86] group-hover:text-[#ffb686]" />
            <span className="text-xs font-bold text-[#63402f] group-hover:text-white uppercase tracking-tighter">Add Patient</span>
          </button>
          <button className="group bg-gray-50 hover:bg-[#63402f] p-6 rounded-2xl transition-all duration-300 flex flex-col items-center">
            <FaCalendarCheck className="text-2xl mb-3 text-[#3b7d86] group-hover:text-[#ffb686]" />
            <span className="text-xs font-bold text-[#63402f] group-hover:text-white uppercase tracking-tighter">New Appt</span>
          </button>
          <button className="group bg-gray-50 hover:bg-[#63402f] p-6 rounded-2xl transition-all duration-300 flex flex-col items-center">
            <FaSpa className="text-2xl mb-3 text-[#3b7d86] group-hover:text-[#ffb686]" />
            <span className="text-xs font-bold text-[#63402f] group-hover:text-white uppercase tracking-tighter">Add Service</span>
          </button>
          <button className="group bg-gray-50 hover:bg-[#63402f] p-6 rounded-2xl transition-all duration-300 flex flex-col items-center">
            <FaDollarSign className="text-2xl mb-3 text-[#3b7d86] group-hover:text-[#ffb686]" />
            <span className="text-xs font-bold text-[#63402f] group-hover:text-white uppercase tracking-tighter">Reports</span>
          </button>
        </div>
      </div>
    </div>
  );
}