// pages/Patients.jsx
import React, { useState, useEffect, useRef } from "react"; // ✨ 1. Mengimpor useEffect dan useRef
import { FaPlus, FaSearch } from "react-icons/fa"; // Menambahkan ikon Search untuk UI CRM
import PageHeader from "../components/PageHeader";
import patientsData from "../data/PatientsData.json";

// Import komponen pecahan
import PatientTable from "../components/PatientTable";
import PatientModal from "../components/PatientModal";
import PatientForm from "../components/PatientForm";

const initialFormState = { 
  patientId: "", 
  patientName: "", 
  email: "", 
  phone: "", 
  treatment: "Facial Rejuvenation" 
};

export default function Patients(props) {
  // ==========================================
  // A. IMPLEMENTASI USESTATE
  // ==========================================
  const [patients, setPatients] = useState(patientsData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [searchQuery, setSearchQuery] = useState(""); // State tambahan untuk filter pencarian

  // ==========================================
  // C. IMPLEMENTASI USEREF
  // ==========================================
  // Membuat referensi langsung ke elemen DOM input pencarian
  const searchInputRef = useRef(null);

  // ==========================================
  // B. IMPLEMENTASI USEEFFECT
  // ==========================================
  // Efek 1: Auto-focus ke kolom pencarian saat pertama kali halaman CRM dibuka
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []); // Kosong [] = Hanya berjalan 1x saat mount

  // Efek 2: Mengubah judul Tab Browser dinamis berdasarkan jumlah pasien terdaftar
  useEffect(() => {
    document.title = `CRM Clinic - ${patients.length} Active Patients`;
  }, [patients]); // Berjalan setiap kali state 'patients' berubah

  // ==========================================
  // HANDLER FUNCTIONS
  // ==========================================
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPatients([formData, ...patients]); // Menambah pasien baru ke baris paling atas
    setIsModalOpen(false);
    setFormData(initialFormState);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData(initialFormState);
  };

  // Logika filter data pasien berdasarkan input pencarian
  const filteredPatients = patients.filter((patient) =>
    patient.patientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col p-2 min-h-screen font-poppins bg-transparent text-black">
      {/* Header Halaman */}
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

      {/* 🔍 FITUR BARU: Search Bar memanfaatkan useRef */}
      <div className="mb-6 flex items-center bg-white border border-gray-200 rounded-xl px-4 py-2 w-full max-w-md shadow-sm">
        <FaSearch className="text-gray-400 mr-3" size={16} />
        <input
          ref={searchInputRef} // 🔗 Menghubungkan variabel useRef ke elemen DOM ini
          type="text"
          placeholder="Quick search by patient name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent focus:outline-none text-sm text-gray-700"
        />
      </div>

      {/* Tabel & Konten (Menggunakan filteredPatients agar pencarian berfungsi) */}
      <PatientTable patients={filteredPatients} />

      {/* Komponen Modal */}
      <PatientModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        title="New Patient"
        description="Add a new record to your clinic database."
      >
        <PatientForm 
          formData={formData} 
          onChange={handleInputChange} 
          onSubmit={handleSubmit} 
        />
      </PatientModal>
    </div>
  );
}