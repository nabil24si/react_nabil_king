import { FaPlus, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import patientsData from "../data/PatientsData.json";
import { useState } from "react";

export default function Patients(props) {
  const [patients, setPatients] = useState(patientsData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ 
    patientId: "", 
    patientName: "", 
    email: "", 
    phone: "", 
    treatment: "Facial Rejuvenation" 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPatients([formData, ...patients]);
    setIsModalOpen(false);
    setFormData({ patientId: "", patientName: "", email: "", phone: "", treatment: "Facial Rejuvenation" });
  };

  return (
    <div className="flex flex-col p-2 min-h-screen font-poppins bg-transparent text-black">
      <PageHeader 
        title={props.title || "Patients Management"} 
        breadcrumb={["Dashboard", "Patient List"]}
      >
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="bg-[#CDEEDD] hover:bg-[#B8E2CC] text-black px-6 py-3 rounded-2xl flex items-center space-x-2 font-medium shadow-lg shadow-[#CDEEDD]/20 transition-all duration-300"
        >
          <FaPlus size={14} /> <span>Add Patient</span>
        </button>
      </PageHeader>

      <div className="bg-white rounded-[32px] shadow-sm overflow-hidden border border-gray-100 mt-8">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-black/30 font-medium uppercase tracking-widest text-[10px] border-b border-gray-50">
              <tr>
                {/* Checkbox sudah dihapus */}
                <th className="px-8 py-6 font-medium">Patient ID</th>
                <th className="px-8 py-6 font-medium">Name</th>
                <th className="px-8 py-6 font-medium">Email</th>
                <th className="px-8 py-6 font-medium">Phone</th>
                <th className="px-8 py-6 font-medium text-right">Treatment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {patients.map((patient, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-5 text-black/50 font-normal">{patient.patientId}</td>
                  <td className="px-8 py-5 text-black font-normal">{patient.patientName}</td>
                  <td className="px-8 py-5 text-black/40 font-normal italic">{patient.email}</td>
                  <td className="px-8 py-5 text-black/50 font-normal">{patient.phone}</td>
                  <td className="px-8 py-5 text-right">
                    <span className="bg-[#CDEEDD]/30 text-black px-4 py-1.5 rounded-full text-[11px] font-medium border border-[#CDEEDD]/50">
                      {patient.treatment}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-8 py-6 flex justify-between items-center bg-[#fcfaf9]/30 border-t border-gray-50">
          <div className="flex items-center gap-2">
            <span className="text-xs text-black/30 font-medium uppercase tracking-wider">Showing</span>
            <select className="bg-white border border-gray-200 rounded-lg text-xs font-medium px-2 py-1 text-black outline-none cursor-pointer">
              <option>10</option>
              <option>20</option>
            </select>
            <span className="text-xs text-black/30 font-medium uppercase tracking-wider">out of 512</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-black/20 hover:text-black transition-colors"><FaChevronLeft size={12}/></button>
            {[1, 2, 3, "...", 16].map((page, i) => (
              <button 
                key={i} 
                className={`w-8 h-8 rounded-full text-xs font-medium transition-all ${page === 1 ? 'bg-[#CDEEDD] text-black' : 'text-black/40 hover:bg-gray-100'}`}
              >
                {page}
              </button>
            ))}
            <button className="p-2 text-black/20 hover:text-black transition-colors"><FaChevronRight size={12}/></button>
          </div>
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
            
            <h2 className="text-2xl font-medium text-black mb-2 tracking-tight">New Patient</h2>
            <p className="text-sm text-black/40 mb-8">Add a new record to your clinic database.</p>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-medium text-black/40 uppercase ml-1 tracking-widest">Full Name</label>
                <input 
                  type="text" name="patientName" value={formData.patientName} onChange={handleInputChange} required 
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-1 focus:ring-[#CDEEDD] transition-all text-black" 
                  placeholder="John Doe" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-medium text-black/40 uppercase ml-1 tracking-widest">Patient ID</label>
                  <input 
                    type="text" name="patientId" value={formData.patientId} onChange={handleInputChange} required 
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-1 focus:ring-[#CDEEDD] transition-all text-black" 
                    placeholder="PB-001" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-medium text-black/40 uppercase ml-1 tracking-widest">Phone</label>
                  <input 
                    type="text" name="phone" value={formData.phone} onChange={handleInputChange} required 
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-1 focus:ring-[#CDEEDD] transition-all text-black" 
                    placeholder="0812..." 
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-medium text-black/40 uppercase ml-1 tracking-widest">Email Address</label>
                <input 
                  type="email" name="email" value={formData.email} onChange={handleInputChange} required 
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-1 focus:ring-[#CDEEDD] transition-all text-black" 
                  placeholder="name@mail.com" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-medium text-black/40 uppercase ml-1 tracking-widest">Treatment Category</label>
                <select 
                  name="treatment" value={formData.treatment} onChange={handleInputChange} 
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3.5 focus:outline-none focus:ring-1 focus:ring-[#CDEEDD] transition-all cursor-pointer text-black"
                >
                  <option value="Facial Rejuvenation">Facial Rejuvenation</option>
                  <option value="Laser Hair Removal">Laser Hair Removal</option>
                  <option value="Botox Injections">Botox Injections</option>
                  <option value="Body Contouring">Body Contouring</option>
                </select>
              </div>

              <div className="pt-6">
                <button 
                  type="submit" 
                  className="w-full py-4 bg-[#CDEEDD] text-black rounded-2xl hover:bg-[#B8E2CC] font-medium shadow-xl shadow-[#CDEEDD]/20 transition-all duration-300"
                >
                  Save Patient Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}