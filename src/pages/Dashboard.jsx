import React from 'react';
import { FaUserInjured, FaDollarSign, FaCalendarAlt, FaStethoscope } from "react-icons/fa";

// Import komponen-komponen yang sudah dipisahkan
import StatsGrid from '../components/StatsGrid';
import RevenueChart from '../components/RevenueChart';
import PatientStatusTable from '../components/PatientStatusTable';
import PatientOverview from '../components/PatientOverview';
import PopularTreatments from '../components/PopularTreatments';

// Sumber data utama Dashboard
const dashboardData = {
  stats: [
    { title: "Earnings", value: "$125,000", icon: FaDollarSign, color: "peach", trend: "+12%" },
    { title: "Total Patients", value: "315", icon: FaUserInjured, color: "mint", trend: "+8%" },
    { title: "Appointments", value: "250", icon: FaCalendarAlt, color: "mint", trend: "Today" },
    { title: "Surgeries", value: "65", icon: FaStethoscope, color: "peach", trend: "Active" },
  ],
  patientOverview: {
    total: 3245,
    categories: [
      { label: "New Patient", value: 1460, percentage: 45, color: "peach" },
      { label: "In Treatment", value: 974, percentage: 30, color: "mint" },
      { label: "Recovered", value: 811, percentage: 25, color: "gray" },
    ]
  },
  recentPatients: [
    { id: "PB-001", name: "Sarah Miller", treatment: "Facial Rejuvenation", doctor: "Dr. Olivia Grant", time: "2028-09-12 09:00 AM", status: "Completed" },
    { id: "PB-002", name: "Maurice Galley", treatment: "Laser Hair Removal", doctor: "Dr. David Carter", time: "2028-09-12 12:00 PM", status: "In Progress" },
    { id: "PB-003", name: "Julia Watson", treatment: "Botox Injections", doctor: "Dr. Emily Ross", time: "2028-09-12 02:30 PM", status: "Scheduled" },
    { id: "PB-004", name: "Stephen Hawk", treatment: "Microdermabrasion", doctor: "Dr. James Lawson", time: "2028-09-12 04:30 PM", status: "Completed" },
    { id: "PB-005", name: "Emma Wilson", treatment: "Chemical Peels", doctor: "Dr. Sophia Clark", time: "2028-09-13 09:30 AM", status: "In Progress" },
  ],
  popularTreatments: [
    { rank: "#1", name: "Facial Rejuvenation", rating: 4.9, reviews: 2150 },
    { rank: "#2", name: "Laser Hair Removal", rating: 4.8, reviews: 1980 },
    { rank: "#3", name: "Botox Injections", rating: 4.7, reviews: 1750 },
    { rank: "#4", name: "Microdermabrasion", rating: 4.6, reviews: 1500 },
  ]
};

const colorMap = {
  peach: { bg: "bg-[#FFB686]/20", text: "text-black" },
  mint: { bg: "bg-[#CDEEDD]/40", text: "text-black" },
  gray: { bg: "bg-gray-100", text: "text-black" }
};

export default function Dashboard() {
  const { stats, patientOverview, recentPatients, popularTreatments } = dashboardData;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr,1fr] gap-8 p-2 font-poppins text-black">
      
      {/* --- LEFT COLUMN --- */}
      <div className="space-y-10">
        <StatsGrid stats={stats} colorMap={colorMap} />
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