import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

// Import Service API Supabase
import { servicesAPI } from "../services/servicesAPI";

// Import Komponen State UI
import AlertBox from "../components/AlertBox";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";

// Import Komponen Pecahan (Shadcn/ui)
import ServiceModal from "../components/ServiceModal";
import ServiceForm from "../components/ServiceForm";

const initialFormState = { 
  serviceName: "", 
  price: "", 
  duration: "60", 
  category: "Facial" 
};

export default function Services(props) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await servicesAPI.fetchServices();
      setServices(data);
    } catch (err) {
      setError("Gagal memuat daftar layanan dari database Supabase.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const { editingId, ...serviceData } = formData;

      if (editingId) {
        await servicesAPI.updateService(editingId, serviceData);
        setSuccess("Layanan berhasil diperbarui!");
      } else {
        await servicesAPI.createService(serviceData);
        setSuccess("Layanan baru berhasil ditambahkan!");
      }

      setIsModalOpen(false);
      setFormData(initialFormState);

      setTimeout(() => setSuccess(""), 3000);
      loadServices();
    } catch (err) {
      setError(`Gagal menyimpan layanan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (service) => {
    setFormData({
      serviceName: service.servicename || "",
      price: service.price || "",
      duration: service.duration || "60",
      category: service.category || "Facial"
    });
    setFormData(prev => ({ ...prev, editingId: service.id }));
    setIsModalOpen(true);
  };

  const handleDelete = async (id, servicename) => {
    const konfirmasi = confirm(`Yakin ingin menghapus layanan "${servicename}"?`);
    if (!konfirmasi) return;

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await servicesAPI.deleteService(id);
      setSuccess(`Layanan "${servicename}" berhasil dihapus.`);

      setTimeout(() => setSuccess(""), 3000);
      loadServices();
    } catch (err) {
      setError(`Gagal menghapus data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData(initialFormState);
  };

  // Helper styling
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
          disabled={loading}
          className="bg-[#CDEEDD] hover:bg-[#B8E2CC] text-black px-6 py-3 rounded-2xl flex items-center space-x-2 font-medium shadow-lg shadow-[#CDEEDD]/20 transition-all duration-300 disabled:opacity-50"
        >
          <FaPlus size={14} /> <span>Add Service</span>
        </button>
      </PageHeader>

      <div className="mt-4">
        {error && <AlertBox type="error">{error}</AlertBox>}
        {success && <AlertBox type="success">{success}</AlertBox>}
      </div>

      {loading && services.length === 0 ? (
        <LoadingSpinner text="Sedang mengambil data dari Supabase..." />
      ) : !loading && services.length === 0 ? (
        <EmptyState text="Belum ada layanan. Silahkan klik 'Add Service'!" />
      ) : (
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm mt-6 overflow-hidden">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-700">ID</th>
                <th className="px-6 py-4 font-semibold text-gray-700">Service Name</th>
                <th className="px-6 py-4 font-semibold text-gray-700">Category</th>
                <th className="px-6 py-4 font-semibold text-gray-700">Duration</th>
                <th className="px-6 py-4 font-semibold text-gray-700 text-right">Price</th>
                <th className="px-6 py-4 font-semibold text-gray-700 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {services.map((svc, idx) => (
                <tr key={svc.id || idx} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-gray-500">#{svc.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{svc.servicename}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-medium tracking-wide ${getCategoryStyle(svc.category)}`}>
                      {svc.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{svc.duration} mins</td>
                  <td className="px-6 py-4 text-right font-medium text-gray-900">{svc.price}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => handleEdit(svc)}
                        disabled={loading}
                        className="p-2 hover:bg-blue-50 rounded-xl transition-colors group disabled:opacity-50"
                        title="Edit Service"
                      >
                        <FaEdit size={14} className="text-blue-400 group-hover:text-blue-600 transition-colors" />
                      </button>
                      <button
                        onClick={() => handleDelete(svc.id, svc.servicename)}
                        disabled={loading}
                        className="p-2 hover:bg-red-50 rounded-xl transition-colors group disabled:opacity-50"
                        title="Delete Service"
                      >
                        <FaTrash size={14} className="text-red-400 group-hover:text-red-600 transition-colors" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ServiceModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        title={formData.editingId ? "Edit Service" : "New Service"}
        description={formData.editingId ? "Update service information in Supabase." : "Define a new beauty treatment service. Data will be saved to Supabase."}
      >
        <ServiceForm 
          formData={formData} 
          loading={loading}
          onChange={handleInputChange} 
          onSubmit={handleSubmit} 
        />
      </ServiceModal>
    </div>
  );
}