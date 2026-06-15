// pages/Users.jsx
import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react"; 
import PageHeader from "../components/PageHeader";

// Import Service API Supabase
import { usersAPI } from "../services/usersAPI";

// Import Komponen State UI dari Modul
import AlertBox from "../components/AlertBox";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";

// Import Komponen Pecahan Khusus User (Full Shadcn/ui)
import UserTable from "../components/UserTable";
import UserModal from "../components/UserModal";
import UserForm from "../components/UserForm";

const initialFormState = { 
  username: "", 
  email: "", 
  password: "" 
};

export default function Users(props) {
  // State Data & UI Status
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  // State Modal & Form Input
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormState);

  // Fetch data saat halaman dimuat
  useEffect(() => {
    loadUsers();
  }, []);

  // Ambil Data dari Supabase
  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await usersAPI.fetchUsers();
      setUsers(data);
    } catch (err) {
      setError("Gagal memuat daftar user dari database Supabase.");
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

      await usersAPI.createUser(formData);

      setSuccess("Akun user baru berhasil didaftarkan!");
      setIsModalOpen(false); 
      setFormData(initialFormState); 

      setTimeout(() => setSuccess(""), 3000);
      loadUsers(); // Refresh data tabel
    } catch (err) {
      setError(`Gagal menyimpan user: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Hapus Data User dari Supabase
  const handleDelete = async (id, username) => {
    const konfirmasi = confirm(`Yakin ingin menghapus akun user "${username}"?`);
    if (!konfirmasi) return;

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await usersAPI.deleteUser(id);
      setSuccess(`User "${username}" berhasil dihapus.`);
      
      setTimeout(() => setSuccess(""), 3000);
      loadUsers(); 
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
    <div className="flex flex-col p-4 min-h-screen font-poppins text-black bg-gray-50/50">
      <PageHeader 
        title={props.title || "Users Management"} 
        breadcrumb={["Dashboard", "Users List"]}
      >
        <button 
          onClick={() => setIsModalOpen(true)} 
          disabled={loading}
          className="bg-[#CDEEDD] hover:bg-[#B8E2CC] text-black px-6 py-3 rounded-2xl flex items-center space-x-2 font-medium shadow-lg shadow-[#CDEEDD]/20 transition-all duration-300 disabled:opacity-50"
        >
          <Plus size={16} /> <span>New User</span>
        </button>
      </PageHeader>

      {/* Sesi Status Alert Notifikasi */}
      <div className="mt-4">
        {error && <AlertBox type="error">{error}</AlertBox>}
        {success && <AlertBox type="success">{success}</AlertBox>}
      </div>

      {/* Kondisional Rendering Konten Tabel Shadcn */}
      {loading && users.length === 0 ? (
        <LoadingSpinner text="Sedang mengambil data dari Supabase..." />
      ) : !loading && users.length === 0 ? (
        <EmptyState text="Belum ada data user terdaftar. Silahkan klik 'New User'!" />
      ) : (
        /* Menggunakan UserTable bawaan Shadcn/ui */
        <UserTable 
          users={users} 
          onDelete={handleDelete} 
          loading={loading} 
        />
      )}

      {/* Modal & Form Pengisian Data Baru (Shadcn/ui) */}
      <UserModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        title="Create New User Account"
        description="Masukkan info akun user baru. Data akan langsung terunggah ke database."
      >
        <UserForm 
          formData={formData} 
          loading={loading}
          onChange={handleInputChange} 
          onSubmit={handleSubmit} 
        />
      </UserModal>
    </div>
  );
}