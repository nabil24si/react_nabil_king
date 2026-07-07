// pages/Patients.jsx
import React, { useState, useEffect, useRef } from "react";
import { FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

// Import Service API Supabase
import { patientsAPI } from "../services/patientsAPI";

// Import Komponen State UI dari Modul
import AlertBox from "../components/AlertBox";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";

// Import Komponen Pecahan Khusus Patient (Shadcn/ui)
import PatientTable from "../components/PatientTable";
import PatientModal from "../components/PatientModal";
import PatientForm from "../components/PatientForm";

const initialFormState = { 
  patientName: "", 
  email: "", 
  phone: "", 
  treatment: "Facial" 
};

export default function Patients(props) {
  // State Data & UI Status
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  // State Modal & Form Input
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [searchQuery, setSearchQuery] = useState("");

  // useRef untuk auto-focus
  const searchInputRef = useRef(null);

  // Fetch data saat halaman dimuat
  useEffect(() => {
    loadPatients();
  }, []);

  // Auto-focus ke kolom pencarian
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  // Ambil Data dari Supabase
  const loadPatients = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await patientsAPI.fetchPatients();
      setPatients(data);
    } catch (err) {
      setError("Gagal memuat daftar pasien dari database Supabase.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle Input Form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit Create Data Baru ke Supabase
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await patientsAPI.createPatient(formData);

      setSuccess("Data pasien baru berhasil ditambahkan!");
      setIsModalOpen(false); 
      setFormData(initialFormState); 

      setTimeout(() => setSuccess(""), 3000);
      loadPatients();
    } catch (err) {
      setError(`Gagal menyimpan pasien: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Hapus Data Pasien dari Supabase
  const handleDelete = async (id, name) => {
    const konfirmasi = confirm(`Yakin ingin menghapus data pasien "${name}"?`);
    if (!konfirmasi) return;

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await patientsAPI.deletePatient(id);
      setSuccess(`Data pasien "${name}" berhasil dihapus.`);
      
      setTimeout(() => setSuccess(""), 3000);
      loadPatients(); 
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

  // Logika filter data berdasarkan pencarian
  const filteredPatients = patients.filter((patient) =>
    patient.patientname?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col p-2 min-h-screen font-poppins bg-transparent text-black">
      <PageHeader 
        title={props.title || "Patients Management"} 
        breadcrumb={["Dashboard", "Patient List"]}
      >
        <button 
          onClick={() => setIsModalOpen(true)} 
          disabled={loading}
          className="bg-[#CDEEDD] hover:bg-[#B8E2CC] text-black px-6 py-3 rounded-2xl flex items-center space-x-2 font-medium shadow-lg shadow-[#CDEEDD]/20 transition-all duration-300 disabled:opacity-50"
        >
          <FaPlus size={14} /> <span>Add Patient</span>
        </button>
      </PageHeader>

      {/* Sesi Status Alert Notifikasi */}
      <div className="mt-4">
        {error && <AlertBox type="error">{error}</AlertBox>}
        {success && <AlertBox type="success">{success}</AlertBox>}
      </div>

      {/* Search Bar */}
      <div className="mb-6 flex items-center bg-white border border-gray-200 rounded-xl px-4 py-2 w-full max-w-md shadow-sm">
        <FaSearch className="text-gray-400 mr-3" size={16} />
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Quick search by patient name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent focus:outline-none text-sm text-gray-700"
        />
      </div>

      {/* Kondisional Rendering */}
      {loading && patients.length === 0 ? (
        <LoadingSpinner text="Sedang mengambil data dari Supabase..." />
      ) : !loading && filteredPatients.length === 0 ? (
        <EmptyState text="Belum ada data pasien terdaftar. Silahkan klik 'Add Patient'!" />
      ) : (
        <PatientTable 
          patients={filteredPatients} 
          onDelete={handleDelete} 
          loading={loading} 
        />
      )}

      {/* Modal & Form Pengisian Data Baru */}
      <PatientModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        title="New Patient"
        description="Add a new record to your clinic database. Data will be saved to Supabase."
      >
        <PatientForm 
          formData={formData} 
          loading={loading}
          onChange={handleInputChange} 
          onSubmit={handleSubmit} 
        />
      </PatientModal>
    </div>
  );
}