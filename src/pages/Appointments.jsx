import { FaPlus, FaTimes, FaClock, FaCheckCircle, FaCalendarDay, FaTimesCircle } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import appointmentsData from "../data/AppointmentsData.json";
import { useState } from "react";

export default function Appointments(props) {
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

  // Helper styling menggunakan warna hitam murni & minimalis
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Completed': 
        return { 
          class: 'bg-[#CDEEDD]/40 text-black', 
          icon: <FaCheckCircle className="mr-1.5 text-black/40" /> 
        };
      case 'Scheduled': 
        return { 
          class: 'bg-[#FFB686]/20 text-black', 
          icon: <FaCalendarDay className="mr-1.5 text-black/40" /> 
        };
      case 'Cancelled': 
        return { 
          class: 'bg-gray-100 text-black/40', 
          icon: <FaTimesCircle className="mr-1.5" /> 
        };
      default: 
        return { class: 'bg-gray-50 text-black/50', icon: null };
    }
  };

  return (
    <div className="flex flex-col p-2 min-h-screen font-poppins text-black">
      <PageHeader 
        title={props.title || "Appointments"} 
        breadcrumb={["Dashboard", "Appointments List"]}
      >
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="bg-[#CDEEDD] hover:bg-[#B8E2CC] text-black px-6 py-3 rounded-2xl flex items-center space-x-2 font-medium shadow-lg shadow-[#CDEEDD]/20 transition-all duration-300"
        >
          <FaPlus size={14} /> <span>New Appointment</span>
        </button>
      </PageHeader>

      <div className="bg-white rounded-[32px] shadow-sm overflow-hidden border border-gray-100 mt-8">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-black/30 font-medium uppercase tracking-widest text-[10px] border-b border-gray-50">
              <tr>
                <th className="px-8 py-6 font-medium">Appointment ID</th>
                <th className="px-8 py-6 font-medium">Patient Name</th>
                <th className="px-8 py-6 font-medium">Service</th>
                <th className="px-8 py-6 font-medium">Date & Time</th>
                <th className="px-8 py-6 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {appointments.map((apt, idx) => {
                const statusInfo = getStatusStyle(apt.status);
                return (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-8 py-5 text-black/50 font-normal">{apt.appointmentId}</td>
                    <td className="px-8 py-5 text-black font-normal">{apt.patientName}</td>
                    <td className="px-8 py-5">
                      <span className="bg-gray-50 text-black/60 px-3 py-1 rounded-lg text-[11px] border border-gray-100">
                        {apt.service}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-black/50">
                      <div className="flex items-center">
                        <FaClock className="mr-2 text-black/20" /> {apt.date}
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-medium border border-black/5 ${statusInfo.class}`}>
                        {statusInfo.icon}
                        {apt.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL SECTION */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[32px] w-full max-w-md p-10 relative shadow-2xl animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute top-8 right-8 text-black/20 hover:text-black transition-colors"
            >
              <FaTimes size={20} />
            </button>
            
            <h2 className="text-2xl font-medium text-black mb-2 tracking-tight">New Appointment</h2>
            <p className="text-sm text-black/40 mb-8">Create a new schedule for your patient.</p>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-medium text-black/40 uppercase ml-1 tracking-widest">Appointment ID</label>
                <input 
                  type="text" name="appointmentId" value={formData.appointmentId} onChange={handleInputChange} required 
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-1 focus:ring-[#CDEEDD] transition-all text-black" 
                  placeholder="e.g. APT-001" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-medium text-black/40 uppercase ml-1 tracking-widest">Patient Name</label>
                <input 
                  type="text" name="patientName" value={formData.patientName} onChange={handleInputChange} required 
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-1 focus:ring-[#CDEEDD] transition-all text-black" 
                  placeholder="Full name" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-medium text-black/40 uppercase ml-1 tracking-widest">Service</label>
                  <select 
                    name="service" value={formData.service} onChange={handleInputChange} 
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3.5 focus:outline-none focus:ring-1 focus:ring-[#CDEEDD] transition-all cursor-pointer text-black"
                  >
                    <option value="Facial">Facial</option>
                    <option value="Laser">Laser</option>
                    <option value="Massage">Massage</option>
                    <option value="Botox">Botox</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-medium text-black/40 uppercase ml-1 tracking-widest">Status</label>
                  <select 
                    name="status" value={formData.status} onChange={handleInputChange} 
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3.5 focus:outline-none focus:ring-1 focus:ring-[#CDEEDD] transition-all cursor-pointer text-black"
                  >
                    <option value="Scheduled">Scheduled</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-medium text-black/40 uppercase ml-1 tracking-widest">Date & Time</label>
                <input 
                  type="datetime-local" name="date" value={formData.date} onChange={handleInputChange} required 
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-1 focus:ring-[#CDEEDD] transition-all text-black" 
                />
              </div>

              <div className="pt-6">
                <button 
                  type="submit" 
                  className="w-full py-4 bg-[#CDEEDD] text-black rounded-2xl hover:bg-[#B8E2CC] font-medium shadow-xl shadow-[#CDEEDD]/20 transition-all duration-300"
                >
                  Create Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}