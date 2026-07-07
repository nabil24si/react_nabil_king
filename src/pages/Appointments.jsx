// pages/Appointments.jsx
import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

// Import Service API Supabase
import { appointmentsAPI } from "../services/appointmentsAPI";

// Import Komponen State UI
import AlertBox from "../components/AlertBox";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";

// Import Komponen Pecahan (Shadcn/ui)
import AppointmentTable from "../components/AppointmentTable";
import AppointmentModal from "../components/AppointmentModal";
import AppointmentForm from "../components/AppointmentForm";

const initialFormState = { 
  patientName: "", 
  service: "Facial", 
  date: "", 
  status: "Scheduled" 
};

export default function Appointments(props) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await appointmentsAPI.fetchAppointments();
      setAppointments(data);
    } catch (err) {
      setError("Gagal memuat daftar janji dari database Supabase.");
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

      await appointmentsAPI.createAppointment(formData);

      setSuccess("Janji baru berhasil ditambahkan!");
      setIsModalOpen(false);
      setFormData(initialFormState);

      setTimeout(() => setSuccess(""), 3000);
      loadAppointments();
    } catch (err) {
      setError(`Gagal menyimpan janji: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, patientname) => {
    const konfirmasi = confirm(`Yakin ingin menghapus janji untuk "${patientname}"?`);
    if (!konfirmasi) return;

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await appointmentsAPI.deleteAppointment(id);
      setSuccess(`Janji untuk "${patientname}" berhasil dihapus.`);

      setTimeout(() => setSuccess(""), 3000);
      loadAppointments();
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

  return (
    <div className="flex flex-col p-2 min-h-screen font-poppins text-black">
      <PageHeader 
        title={props.title || "Appointments"} 
        breadcrumb={["Dashboard", "Appointments List"]}
      >
        <button 
          onClick={() => setIsModalOpen(true)} 
          disabled={loading}
          className="bg-[#CDEEDD] hover:bg-[#B8E2CC] text-black px-6 py-3 rounded-2xl flex items-center space-x-2 font-medium shadow-lg shadow-[#CDEEDD]/20 transition-all duration-300 disabled:opacity-50"
        >
          <FaPlus size={14} /> <span>Add Appointment</span>
        </button>
      </PageHeader>

      <div className="mt-4">
        {error && <AlertBox type="error">{error}</AlertBox>}
        {success && <AlertBox type="success">{success}</AlertBox>}
      </div>

      {loading && appointments.length === 0 ? (
        <LoadingSpinner text="Sedang mengambil data dari Supabase..." />
      ) : !loading && appointments.length === 0 ? (
        <EmptyState text="Belum ada janji. Silahkan klik 'Add Appointment'!" />
      ) : (
        <AppointmentTable 
          appointments={appointments} 
          onDelete={handleDelete} 
          loading={loading} 
        />
      )}

      <AppointmentModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        title="New Appointment"
        description="Add a new appointment to the schedule. Data will be saved to Supabase."
      >
        <AppointmentForm 
          formData={formData} 
          loading={loading}
          onChange={handleInputChange} 
          onSubmit={handleSubmit} 
        />
      </AppointmentModal>
    </div>
  );
}