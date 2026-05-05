import { FaSpa, FaPlus, FaTimes, FaHourglassHalf } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import servicesData from "../data/ServicesData.json";
import { useState } from "react";

export default function Services(props) {
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

  // Helper styling menggunakan palet CDEEDD & FFD9D0 dengan teks hitam murni
  const getCategoryStyle = (cat) => {
    switch (cat) {
      case 'Facial': return 'bg-[#CDEEDD]/50 text-black border border-[#CDEEDD]';
      case 'Laser': return 'bg-[#FFD9D0]/50 text-black border border-[#FFD9D0]';
      case 'Massage': return 'bg-gray-100 text-black/60 border border-gray-200';
      default: return 'bg-gray-50 text-black/40';
    }
  };

  return (
    <div className="flex flex-col p-2 min-h-screen font-poppins bg-transparent text-black">
      <PageHeader 
        title={props.title || "Service Catalog"} 
        breadcrumb={["Dashboard", "Services List"]}
      >
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="bg-[#CDEEDD] hover:bg-[#B8E2CC] text-black px-6 py-3 rounded-2xl flex items-center space-x-2 font-medium shadow-lg shadow-[#CDEEDD]/20 transition-all duration-300"
        >
          <FaPlus size={14} /> <span>Add Service</span>
        </button>
      </PageHeader>

      <div className="bg-white rounded-[32px] shadow-sm overflow-hidden border border-gray-100 mt-8">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-black/30 font-medium uppercase tracking-widest text-[10px] border-b border-gray-50">
              <tr>
                <th className="px-8 py-6 font-medium">Service ID</th>
                <th className="px-8 py-6 font-medium">Service Name</th>
                <th className="px-8 py-6 font-medium">Category</th>
                <th className="px-8 py-6 font-medium">Duration</th>
                <th className="px-8 py-6 font-medium text-right">Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {services.map((svc, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-5 text-black/50 font-normal">{svc.serviceId}</td>
                  <td className="px-8 py-5 text-black font-normal">
                    <div className="flex items-center">
                      <FaSpa className="mr-3 text-black/20" />
                      {svc.serviceName}
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-medium tracking-wide ${getCategoryStyle(svc.category)}`}>
                      {svc.category}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-black/50 font-normal">
                    <div className="flex items-center">
                      <FaHourglassHalf className="mr-2 text-[10px] opacity-30" />
                      {svc.duration} mins
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <span className="font-medium text-black">{svc.price}</span>
                  </td>
                </tr>
              ))}
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
            
            <h2 className="text-2xl font-medium text-black mb-2 tracking-tight">New Service</h2>
            <p className="text-sm text-black/40 mb-8">Define a new beauty treatment service.</p>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-medium text-black/40 uppercase ml-1 tracking-widest">Service ID</label>
                  <input 
                    type="text" name="serviceId" value={formData.serviceId} onChange={handleInputChange} required 
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-1 focus:ring-[#CDEEDD] transition-all text-black" 
                    placeholder="SRV-001" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-medium text-black/40 uppercase ml-1 tracking-widest">Category</label>
                  <select 
                    name="category" value={formData.category} onChange={handleInputChange} 
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3.5 focus:outline-none focus:ring-1 focus:ring-[#CDEEDD] transition-all cursor-pointer text-black"
                  >
                    <option value="Facial">Facial</option>
                    <option value="Laser">Laser</option>
                    <option value="Massage">Massage</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-medium text-black/40 uppercase ml-1 tracking-widest">Service Name</label>
                <input 
                  type="text" name="serviceName" value={formData.serviceName} onChange={handleInputChange} required 
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-1 focus:ring-[#CDEEDD] transition-all text-black" 
                  placeholder="e.g. Gold Facial Detox" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-medium text-black/40 uppercase ml-1 tracking-widest">Duration (min)</label>
                  <input 
                    type="number" name="duration" value={formData.duration} onChange={handleInputChange} required 
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-1 focus:ring-[#CDEEDD] transition-all text-black" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-medium text-black/40 uppercase ml-1 tracking-widest">Price</label>
                  <input 
                    type="text" name="price" value={formData.price} onChange={handleInputChange} required 
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-1 focus:ring-[#CDEEDD] transition-all text-black" 
                    placeholder="Rp 500.000" 
                  />
                </div>
              </div>

              <div className="pt-6">
                <button 
                  type="submit" 
                  className="w-full py-4 bg-[#CDEEDD] text-black rounded-2xl hover:bg-[#B8E2CC] font-medium shadow-xl shadow-[#CDEEDD]/20 transition-all duration-300"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}