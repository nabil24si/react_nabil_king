// pages/Appointments.jsx
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import appointmentsData from "../data/AppointmentsData.json";

// Import komponen hasil pecahan
import AppointmentTable from "../components/AppointmentTable";
import AppointmentModal from "../components/AppointmentModal";
import AppointmentForm from "../components/AppointmentForm";

const initialFormState = { 
  appointmentId: "", 
  patientName: "", 
  service: "Facial", 
  date: "", 
  status: "Scheduled" 
};

export default function Appointments(props) {
  const [appointments, setAppointments] = useState(appointmentsData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAppointments([formData, ...appointments]);
    setIsModalOpen(false);
    setFormData(initialFormState);
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
          className="bg-[#CDEEDD] hover:bg-[#B8E2CC] text-black px-6 py-3 rounded-2xl flex items-center space-x-2 font-medium shadow-lg shadow-[#CDEEDD]/20 transition-all duration-300"
        >
          <FaPlus size={14} /> <span>New Appointment</span>
        </button>
      </PageHeader>

      {/* Tabel Utama */}
      <AppointmentTable appointments={appointments} />

      {/* Modal & Form Kontrol */}
      <AppointmentModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        title="New Appointment"
        description="Create a new schedule for your patient."
      >
        <AppointmentForm 
          formData={formData} 
          onChange={handleInputChange} 
          onSubmit={handleSubmit} 
        />
      </AppointmentModal>
    </div>
  );
}