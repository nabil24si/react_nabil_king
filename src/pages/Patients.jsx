import { FaUserInjured, FaPlus, FaTimes } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import patientsData from "../data/PatientsData.json";
import { useState } from "react";

export default function Patients() {
  const [patients, setPatients] = useState(patientsData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ 
    patientId: "", 
    patientName: "", 
    email: "", 
    phone: "", 
    treatment: "Facial" 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPatients([formData, ...patients]);
    setIsModalOpen(false);
    setFormData({ patientId: "", patientName: "", email: "", phone: "", treatment: "Facial" });
  };

  // Helper untuk styling badge berdasarkan tipe treatment
  const getTreatmentStyle = (type) => {
    switch (type) {
      case 'Facial': return 'bg-[#ffb686]/20 text-[#63402f] border border-[#ffb686]/30';
      case 'Laser': return 'bg-[#3b7d86]/20 text-[#3b7d86] border border-[#3b7d86]/20';
      case 'Massage': return 'bg-[#66c5b4]/20 text-[#2d5a52] border border-[#66c5b4]/20';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="flex flex-col p-6 bg-gray-50 min-h-screen">
      <PageHeader title="Patients Management" breadcrumb={["Dashboard", "Patient List"]}>
        {/* Button menggunakan warna Teal Dark palette */}
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="bg-[#3b7d86] hover:bg-[#63402f] text-white px-5 py-2.5 rounded-xl flex items-center space-x-2 font-bold shadow-lg shadow-[#3b7d86]/20 transition-all duration-300 transform hover:-translate-y-0.5"
        >
          <FaPlus size={14} /> <span>Add Patient</span>
        </button>
      </PageHeader>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 mt-6">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-[#fcfaf9] border-b border-gray-100 text-[#a9a9a9] font-bold uppercase tracking-widest text-[10px]">
              <tr>
                <th className="px-8 py-5">Patient ID</th>
                <th className="px-8 py-5">Patient Name</th>
                <th className="px-8 py-5">Email</th>
                <th className="px-8 py-5">Phone</th>
                <th className="px-8 py-5">Last Treatment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {patients.map((patient, idx) => (
                <tr key={idx} className="hover:bg-[#66c5b4]/5 transition-colors group">
                  <td className="px-8 py-4 font-bold text-[#63402f]">{patient.patientId}</td>
                  <td className="px-8 py-4 font-semibold text-gray-700">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-[#63402f]/10 flex items-center justify-center text-[#63402f] mr-3 text-xs">
                        {patient.patientName.charAt(0)}
                      </div>
                      {patient.patientName}
                    </div>
                  </td>
                  <td className="px-8 py-4 text-gray-500 italic">{patient.email}</td>
                  <td className="px-8 py-4 text-gray-600 font-medium">{patient.phone}</td>
                  <td className="px-8 py-4">
                    <span className={`px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-tighter ${getTreatmentStyle(patient.treatment)}`}>
                      {patient.treatment}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL - Updated Colors */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#63402f]/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-8 relative shadow-2xl border border-white/20 animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute top-6 right-6 text-gray-400 hover:text-[#63402f] transition-colors"
            >
              <FaTimes size={20} />
            </button>
            
            <h2 className="text-2xl font-black text-[#63402f] mb-2 font-poppins">Add New Patient</h2>
            <p className="text-sm text-[#a9a9a9] mb-6 font-medium">Please enter the correct patient information.</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#63402f] uppercase mb-1.5 ml-1">Patient ID</label>
                <input 
                  type="text" name="patientId" value={formData.patientId} onChange={handleInputChange} required 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#3b7d86] focus:ring-2 focus:ring-[#3b7d86]/10 transition-all" 
                  placeholder="PAT-2026-001" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#63402f] uppercase mb-1.5 ml-1">Full Name</label>
                <input 
                  type="text" name="patientName" value={formData.patientName} onChange={handleInputChange} required 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#3b7d86] focus:ring-2 focus:ring-[#3b7d86]/10 transition-all" 
                  placeholder="Full Name" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#63402f] uppercase mb-1.5 ml-1">Email</label>
                <input 
                  type="email" name="email" value={formData.email} onChange={handleInputChange} required 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#3b7d86] focus:ring-2 focus:ring-[#3b7d86]/10 transition-all" 
                  placeholder="email@example.com" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#63402f] uppercase mb-1.5 ml-1">Treatment Category</label>
                <select 
                  name="treatment" value={formData.treatment} onChange={handleInputChange} 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#3b7d86] transition-all cursor-pointer"
                >
                  <option value="Facial">Facial Treatment</option>
                  <option value="Laser">Laser Treatment</option>
                  <option value="Massage">Professional Massage</option>
                </select>
              </div>

              <div className="pt-6 flex flex-col sm:flex-row-reverse gap-3">
                <button 
                  type="submit" 
                  className="w-full sm:w-auto px-8 py-3 bg-[#3b7d86] text-white rounded-xl hover:bg-[#63402f] font-bold shadow-lg shadow-[#3b7d86]/20 transition-all"
                >
                  Save Patient
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