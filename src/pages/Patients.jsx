// pages/Patients.jsx
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import patientsData from "../data/PatientsData.json";

// Import komponen-komponen pecahan baru
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
  const [patients, setPatients] = useState(patientsData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPatients([formData, ...patients]);
    setIsModalOpen(false);
    setFormData(initialFormState);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData(initialFormState);
  };

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

      {/* Tabel & Konten Pagination */}
      <PatientTable patients={patients} />

      {/* Komponen Modal */}
      <PatientModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        title="New Patient"
        description="Add a new record to your clinic database."
      >
        {/* Formulir Input Pasien di dalam Modal */}
        <PatientForm 
          formData={formData} 
          onChange={handleInputChange} 
          onSubmit={handleSubmit} 
        />
      </PatientModal>
    </div>
  );
}