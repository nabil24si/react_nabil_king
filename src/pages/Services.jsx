import { FaSpa, FaPlus, FaTimes, FaDollarSign, FaHourglassHalf } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import servicesData from "../data/ServicesData.json";
import { useState } from "react";

export default function Services() {
  const [services, setServices] = useState(servicesData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ 
    serviceId: "", 
    serviceName: "", 
    price: "", 
    duration: "60", 
    category: "Facial" 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setServices([formData, ...services]);
    setIsModalOpen(false);
    setFormData({ serviceId: "", serviceName: "", price: "", duration: "60", category: "Facial" });
  };

  // Helper styling untuk kategori layanan
  const getCategoryStyle = (cat) => {
    switch (cat) {
      case 'Facial': return 'bg-[#ffb686]/20 text-[#63402f] border border-[#ffb686]/30';
      case 'Laser': return 'bg-[#3b7d86]/20 text-[#3b7d86] border border-[#3b7d86]/20';
      case 'Massage': return 'bg-[#66c5b4]/20 text-[#2d5a52] border border-[#66c5b4]/20';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="flex flex-col p-6 bg-gray-50 min-h-screen">
      <PageHeader title="Service Catalog" breadcrumb={["Dashboard", "Services List"]}>
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="bg-[#3b7d86] hover:bg-[#63402f] text-white px-5 py-2.5 rounded-xl flex items-center space-x-2 font-bold shadow-lg shadow-[#3b7d86]/20 transition-all duration-300"
        >
          <FaPlus size={14} /> <span>Add Service</span>
        </button>
      </PageHeader>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 mt-6">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-[#fcfaf9] border-b border-gray-100 text-[#a9a9a9] font-bold uppercase tracking-widest text-[10px]">
              <tr>
                <th className="px-8 py-5">Service ID</th>
                <th className="px-8 py-5">Service Name</th>
                <th className="px-8 py-5">Category</th>
                <th className="px-8 py-5">Duration</th>
                <th className="px-8 py-5">Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {services.map((svc, idx) => (
                <tr key={idx} className="hover:bg-[#66c5b4]/5 transition-colors group">
                  <td className="px-8 py-5 font-bold text-[#63402f]">{svc.serviceId}</td>
                  <td className="px-8 py-5 font-semibold text-gray-700">
                    <div className="flex items-center">
                      <FaSpa className="mr-3 text-[#3b7d86] opacity-70" />
                      {svc.serviceName}
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-tighter ${getCategoryStyle(svc.category)}`}>
                      {svc.category}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-gray-500">
                    <div className="flex items-center">
                      <FaHourglassHalf className="mr-2 text-[10px] opacity-50" />
                      {svc.duration} mins
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="font-bold text-[#63402f]">{svc.price}</span>
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
              className="absolute top-6 right-6 text-gray-400 hover:text-[#63402f]"
            >
              <FaTimes size={20} />
            </button>
            
            <h2 className="text-2xl font-black text-[#63402f] mb-2 font-poppins">New Clinic Service</h2>
            <p className="text-sm text-[#a9a9a9] mb-6 font-medium">Define a new beauty treatment service.</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#63402f] uppercase mb-1.5 ml-1">Service ID</label>
                  <input 
                    type="text" name="serviceId" value={formData.serviceId} onChange={handleInputChange} required 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#3b7d86] transition-all" 
                    placeholder="SRV-001" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#63402f] uppercase mb-1.5 ml-1">Category</label>
                  <select 
                    name="category" value={formData.category} onChange={handleInputChange} 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#3b7d86] transition-all cursor-pointer"
                  >
                    <option value="Facial">Facial</option>
                    <option value="Laser">Laser</option>
                    <option value="Massage">Massage</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#63402f] uppercase mb-1.5 ml-1">Service Name</label>
                <input 
                  type="text" name="serviceName" value={formData.serviceName} onChange={handleInputChange} required 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#3b7d86] transition-all" 
                  placeholder="e.g. Gold Facial Detox" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#63402f] uppercase mb-1.5 ml-1">Duration (min)</label>
                  <input 
                    type="number" name="duration" value={formData.duration} onChange={handleInputChange} required 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#3b7d86] transition-all" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#63402f] uppercase mb-1.5 ml-1">Price</label>
                  <input 
                    type="text" name="price" value={formData.price} onChange={handleInputChange} required 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#3b7d86] transition-all" 
                    placeholder="Rp 500.000" 
                  />
                </div>
              </div>

              <div className="pt-6 flex flex-col sm:flex-row-reverse gap-3">
                <button 
                  type="submit" 
                  className="w-full sm:w-auto px-8 py-3 bg-[#3b7d86] text-white rounded-xl hover:bg-[#63402f] font-bold shadow-lg shadow-[#3b7d86]/20 transition-all"
                >
                  Save Service
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