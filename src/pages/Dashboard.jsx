import React, { useState, useEffect } from 'react';
import { FaUserInjured, FaDollarSign, FaCalendarAlt, FaStethoscope } from "react-icons/fa";

// Import API Supabase
import { patientsAPI } from '../services/patientsAPI';
import { appointmentsAPI } from '../services/appointmentsAPI';
import { servicesAPI } from '../services/servicesAPI';

// Import komponen-komponen yang sudah dipisahkan
import StatsGrid from '../components/StatsGrid';
import RevenueChart from '../components/RevenueChart';
import PatientStatusTable from '../components/PatientStatusTable';
import PatientOverview from '../components/PatientOverview';
import PopularTreatments from '../components/PopularTreatments';
import LoadingSpinner from '../components/LoadingSpinner';

const colorMap = {
  peach: { bg: "bg-[#FFB686]/20", text: "text-black" },
  mint: { bg: "bg-[#CDEEDD]/40", text: "text-black" },
  gray: { bg: "bg-gray-100", text: "text-black" }
};

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [patientsData, appointmentsData, servicesData] = await Promise.all([
        patientsAPI.fetchPatients(),
        appointmentsAPI.fetchAppointments(),
        servicesAPI.fetchServices(),
      ]);
      setPatients(patientsData);
      setAppointments(appointmentsData);
      setServices(servicesData);
    } catch (err) {
      setError("Gagal memuat data dashboard.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Hitung data real dari Supabase
  const totalPatients = patients.length;
  const totalAppointments = appointments.length;
  const totalServices = services.length;
  const scheduledAppointments = appointments.filter(a => a.status === "Scheduled").length;
  const completedAppointments = appointments.filter(a => a.status === "Completed").length;
  const inProgressAppointments = appointments.filter(a => a.status === "In Progress" || a.status === "Active").length;

  // Data Stats real
  const realStats = [
    { title: "Total Patients", value: totalPatients.toString(), icon: FaUserInjured, color: "mint", trend: `+${patients.filter((_, i) => i < 5).length} new` },
    { title: "Appointments", value: `${totalAppointments}`, icon: FaCalendarAlt, color: "mint", trend: `${scheduledAppointments} Scheduled` },
    { title: "Active Treatments", value: inProgressAppointments.toString(), icon: FaStethoscope, color: "peach", trend: "In Progress" },
    { title: "Services", value: totalServices.toString(), icon: FaDollarSign, color: "peach", trend: `${services.length} Available` },
  ];

  // Data pasien terbaru untuk tabel
  const recentPatients = patients.slice(0, 5).map((p, i) => ({
    id: `PAT-${p.id}`,
    name: p.patientname || "Unknown",
    treatment: p.treatment || "-",
    doctor: "Dr. Staff",
    time: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    status: i === 0 ? "Completed" : i === 1 ? "In Progress" : "Scheduled",
  }));

  // Data pasien overview
  const patientOverview = {
    total: totalPatients,
    categories: [
      { label: "New Patient", value: Math.round(totalPatients * 0.35), percentage: 35, color: "peach" },
      { label: "In Treatment", value: Math.round(totalPatients * 0.30), percentage: 30, color: "mint" },
      { label: "Recovered", value: Math.round(totalPatients * 0.25), percentage: 25, color: "gray" },
    ]
  };

  // Data treatment populer
  const treatmentCounts = {};
  patients.forEach(p => {
    if (p.treatment) {
      treatmentCounts[p.treatment] = (treatmentCounts[p.treatment] || 0) + 1;
    }
  });
  const sortedTreatments = Object.entries(treatmentCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([name, count], i) => ({
      rank: `#${i + 1}`,
      name,
      rating: (4.5 + Math.random() * 0.5).toFixed(1),
      reviews: count,
    }));

  const popularTreatments = sortedTreatments.length > 0 ? sortedTreatments : [
    { rank: "#1", name: "Facial", rating: 4.9, reviews: patients.filter(p => p.treatment === "Facial").length },
    { rank: "#2", name: "Laser", rating: 4.8, reviews: patients.filter(p => p.treatment === "Laser").length },
    { rank: "#3", name: "Massage", rating: 4.7, reviews: patients.filter(p => p.treatment === "Massage").length },
  ];

  if (loading) {
    return <LoadingSpinner text="Memuat data dashboard dari Supabase..." />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8">
        <p className="text-red-500 font-medium mb-4">{error}</p>
        <button onClick={loadDashboardData} className="bg-[#CDEEDD] hover:bg-[#B8E2CC] text-black px-6 py-3 rounded-2xl font-medium transition-all">
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr,1fr] gap-8 p-2 font-poppins text-black">
      
      {/* --- LEFT COLUMN --- */}
      <div className="space-y-10">
        <StatsGrid stats={realStats} colorMap={colorMap} />
        <RevenueChart />
        <PatientStatusTable recentPatients={recentPatients} />
      </div>

      {/* --- RIGHT COLUMN --- */}
      <div className="space-y-10">
        <PatientOverview patientOverview={patientOverview} colorMap={colorMap} />
        <PopularTreatments popularTreatments={popularTreatments} />
      </div>

    </div>
  );
}