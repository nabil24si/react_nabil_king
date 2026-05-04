import { FaCalendarAlt, FaPlus, FaTimes, FaClock } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import appointmentsData from "../data/AppointmentsData.json";
import { useState } from "react";

export default function Appointments() {
  const [appointments, setAppointments] = useState(appointmentsData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ 
    appointmentId: "", 
    patientName: "", 
    service: "Facial", 
    date: "", 
    status: "Scheduled" 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAppointments([formData, ...appointments]);
    setIsModalOpen(false);
    setFormData({ appointmentId: "", patientName: "", service: "Facial", date: "", status: "Scheduled" });
  };

  // Helper styling untuk status janji temu
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Completed': return 'bg-[#66c5b4]/20 text-[#3b7d86] border border-[#66c5b4]/30';
      case 'Scheduled': return 'bg-[#ffb686]/20 text-[#63402f] border border-[#ffb686]/30';
      case 'Cancelled': return 'bg-gray-100 text-[#a9a9a9] border border-gray-200';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="flex flex-col p-6 bg-gray-50 min-h-screen">
      <PageHeader title="Appointments" breadcrumb={["Dashboard", "Appointments List"]}>
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="bg-[#3b7d86] hover:bg-[#63402f] text-white px-5 py-2.5 rounded-xl flex items-center space-x-2 font-bold shadow-lg shadow-[#3b7d86]/20 transition-all duration-300"
        >
          <FaPlus size={14} /> <span>Add Appointment</span>
        </button>
      </PageHeader>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 mt-6">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-[#fcfaf9] border-b border-gray-100 text-[#a9a9a9] font-bold uppercase tracking-widest text-[10px]">
              <tr>
                <th className="px-8 py-5">Appointment ID</th>
                <th className="px-8 py-5">Patient Name</th>
                <th className="px-8 py-5">Service</th>
                <th className="px-8 py-5">Date & Time</th>
                <th className="px-8 py-5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {appointments.map((apt, idx) => (
                <tr key={idx} className="hover:bg-[#66c5b4]/5 transition-colors group">
                  <td className="px-8 py-4 font-bold text-[#63402f]">{apt.appointmentId}</td>
                  <td className="px-8 py-4 font-semibold text-gray-700">{apt.patientName}</td>
                  <td className="px-8 py-4 text-gray-600 font-medium">{apt.service}</td>
                  <td className="px-8 py-4 text-gray-500 italic">
                    <div className="flex items-center">
                      <FaClock className="mr-2 text-xs text-[#a9a9a9]" /> {apt.date}
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <span className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-tighter ${getStatusStyle(apt.status)}`}>
                      {apt.status === 'Completed' ? '✓ ' : apt.status === 'Scheduled' ? '📅 ' : '✕ '} 
                      {apt.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL SECTION */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#63402f]/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-8 relative shadow-2xl border border-white/20 animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute top-6 right-6 text-gray-400 hover:text-[#63402f] transition-colors"
            >
              <FaTimes size={20} />
            </button>
            
            <h2 className="text-2xl font-black text-[#63402f] mb-2 font-poppins">New Appointment</h2>
            <p className="text-sm text-[#a9a9a9] mb-6 font-medium">Schedule a new beauty session.</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#63402f] uppercase mb-1.5 ml-1">Appointment ID</label>
                <input 
                  type="text" name="appointmentId" value={formData.appointmentId} onChange={handleInputChange} required 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#3b7d86] focus:ring-2 focus:ring-[#3b7d86]/10 transition-all" 
                  placeholder="APT-2026-XXX" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#63402f] uppercase mb-1.5 ml-1">Patient Name</label>
                <input 
                  type="text" name="patientName" value={formData.patientName} onChange={handleInputChange} required 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#3b7d86] focus:ring-2 focus:ring-[#3b7d86]/10 transition-all" 
                  placeholder="Patient Name" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#63402f] uppercase mb-1.5 ml-1">Service</label>
                  <select 
                    name="service" value={formData.service} onChange={handleInputChange} 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#3b7d86] transition-all cursor-pointer"
                  >
                    <option value="Facial">Facial</option>
                    <option value="Laser">Laser</option>
                    <option value="Massage">Massage</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#63402f] uppercase mb-1.5 ml-1">Status</label>
                  <select 
                    name="status" value={formData.status} onChange={handleInputChange} 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#3b7d86] transition-all cursor-pointer"
                  >
                    <option value="Scheduled">Scheduled</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#63402f] uppercase mb-1.5 ml-1">Date & Time</label>
                <input 
                  type="datetime-local" name="date" value={formData.date} onChange={handleInputChange} required 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#3b7d86] focus:ring-2 focus:ring-[#3b7d86]/10 transition-all text-gray-600" 
                />
              </div>

              <div className="pt-6 flex flex-col sm:flex-row-reverse gap-3">
                <button 
                  type="submit" 
                  className="w-full sm:w-auto px-8 py-3 bg-[#3b7d86] text-white rounded-xl hover:bg-[#63402f] font-bold shadow-lg shadow-[#3b7d86]/20 transition-all"
                >
                  Save Schedule
                </button>
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="w-full sm:w-auto px-8 py-3 text-gray-500 font-bold hover:bg-gray-100 rounded-xl transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}