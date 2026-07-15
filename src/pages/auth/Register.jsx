// Register.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import axios from "axios";
import { ImSpinner2 } from "react-icons/im";
import { BsFillExclamationDiamondFill } from "react-icons/bs";

// Konfigurasi endpoint Supabase
const API_URL = "https://qovurxrovzstbawkswnj.supabase.co/rest/v1/users";
const API_KEY = "sb_publishable_JGk5Hx18sBrMOWwxuQ6Ztg_xID5Yepl";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export default function Register() {
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [dataForm, setDataForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "customer" // Default role: customer
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({
      ...dataForm,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validasi kecocokan password
    if (dataForm.password !== dataForm.confirmPassword) {
      setError("Konfirmasi password tidak cocok.");
      setLoading(false);
      return;
    }

    try {
      // Menyusun payload data mentah langsung dari input pengguna
      const payload = {
        username: dataForm.username,
        email: dataForm.email,
        password: dataForm.password,
        role: dataForm.role // Kirim role ke database
      };

      // Mengirim POST request ke database Supabase
      await axios.post(API_URL, payload, { headers });

      setSuccess("Registrasi akun berhasil! Mengalihkan ke halaman login...");
      setDataForm({ username: "", email: "", password: "", confirmPassword: "" });

      // Berpindah ke login secara halus setelah 2 detik
      setTimeout(() => {
        navigate("/login");
      }, 2000);
 
    } catch (err) {
      setError(err.response?.data?.message || `Gagal mendaftar: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-4 pt-12">
      <h2 className="text-3xl font-black text-[#63402f] mb-2 text-center font-poppins">
        Join GlowCare
      </h2>
      <p className="text-center text-sm text-[#a9a9a9] mb-8 font-medium">
        Create your account to get started with GlowCare
      </p>

      {/* Sesi Status Alert Notifikasi */}
      <div className="mb-4">
        {error && (
          <div className="bg-[#FFD9D0]/20 p-4 text-xs font-medium text-black rounded-2xl flex items-center border border-[#FFD9D0]/40 mb-4">
            <BsFillExclamationDiamondFill className="text-black/60 me-3 text-lg shrink-0" />
            <span>{error}</span>
          </div>
        )}
        
        {success && (
          <div className="bg-[#CDEEDD]/40 p-4 text-xs font-medium text-black rounded-2xl flex items-center border border-[#CDEEDD]/60 mb-4">
            <span>{success}</span>
          </div>
        )}
        
        {loading && (
          <div className="bg-[#3b7d86]/10 p-4 text-xs font-medium text-[#3b7d86] rounded-2xl flex items-center border border-[#3b7d86]/20 mb-4">
            <ImSpinner2 className="me-3 animate-spin text-lg shrink-0" />
            Creating account... Please wait
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* ✨ BARU: Input Field Username */}
        <div>
          <label className="block text-xs font-bold text-[#63402f] uppercase tracking-wider mb-2 ml-1">
            Username
          </label>
          <input 
            type="text" 
            name="username" 
            id="username" 
            value={dataForm.username}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full px-5 py-3 bg-white border border-gray-200 rounded-2xl shadow-sm placeholder-[#a9a9a9] text-sm focus:border-[#3b7d86] focus:ring-4 focus:ring-[#3b7d86]/5 transition-all outline-none" 
            placeholder="johndoe" 
          />
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-xs font-bold text-[#63402f] uppercase tracking-wider mb-2 ml-1">
            Email Address
          </label>
          <input 
            type="email" 
            name="email" 
            id="email" 
            value={dataForm.email}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full px-5 py-3 bg-white border border-gray-200 rounded-2xl shadow-sm placeholder-[#a9a9a9] text-sm focus:border-[#3b7d86] focus:ring-4 focus:ring-[#3b7d86]/5 transition-all outline-none" 
            placeholder="you@example.com" 
          />
        </div>

        {/* Role Selection */}
        <div>
          <label className="block text-xs font-bold text-[#63402f] uppercase tracking-wider mb-3 ml-1">
            Register as
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className={`flex items-center justify-center gap-2 p-3 rounded-2xl border-2 cursor-pointer transition-all ${dataForm.role === "customer" ? "border-[#3b7d86] bg-[#3b7d86]/5" : "border-gray-200 bg-white hover:border-gray-300"}`}>
              <input
                type="radio"
                name="role"
                value="customer"
                checked={dataForm.role === "customer"}
                onChange={handleChange}
                className="hidden"
              />
              <span className="text-lg">👤</span>
              <div className="text-left">
                <p className="text-xs font-bold text-[#63402f]">Customer</p>
                <p className="text-[9px] text-gray-400">Akses Member Area</p>
              </div>
            </label>
            <label className={`flex items-center justify-center gap-2 p-3 rounded-2xl border-2 cursor-pointer transition-all ${dataForm.role === "admin" ? "border-[#3b7d86] bg-[#3b7d86]/5" : "border-gray-200 bg-white hover:border-gray-300"}`}>
              <input
                type="radio"
                name="role"
                value="admin"
                checked={dataForm.role === "admin"}
                onChange={handleChange}
                className="hidden"
              />
              <span className="text-lg">🔧</span>
              <div className="text-left">
                <p className="text-xs font-bold text-[#63402f]">Admin</p>
                <p className="text-[9px] text-gray-400">Manage System</p>
              </div>
            </label>
          </div>
        </div>

        {/* Password Group */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#63402f] uppercase tracking-wider mb-2 ml-1">
              Password
            </label>
            <input 
              type="password" 
              name="password" 
              id="password" 
              value={dataForm.password}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full px-5 py-3 bg-white border border-gray-200 rounded-2xl shadow-sm placeholder-[#a9a9a9] text-sm focus:border-[#3b7d86] focus:ring-4 focus:ring-[#3b7d86]/5 transition-all outline-none" 
              placeholder="********" 
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#63402f] uppercase tracking-wider mb-2 ml-1">
              Confirm
            </label>
            <input 
              type="password" 
              name="confirmPassword" 
              id="confirmPassword" 
              value={dataForm.confirmPassword}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full px-5 py-3 bg-white border border-gray-200 rounded-2xl shadow-sm placeholder-[#a9a9a9] text-sm focus:border-[#3b7d86] focus:ring-4 focus:ring-[#3b7d86]/5 transition-all outline-none" 
              placeholder="********" 
            />
          </div>
        </div>

        {/* Terms and Conditions Checkbox */}
        <div className="flex items-start space-x-2 px-1 py-2">
            <input 
              type="checkbox" 
              id="terms" 
              className="mt-1 accent-[#3b7d86]" 
              required 
              disabled={loading}
            />
            <label htmlFor="terms" className="text-[11px] text-[#a9a9a9] font-medium leading-tight">
                I agree to the <span className="text-[#3b7d86] font-bold underline cursor-pointer">Terms of Service</span> and <span className="text-[#3b7d86] font-bold underline cursor-pointer">Privacy Policy</span>.
            </label>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-[#3b7d86] hover:bg-[#63402f] text-white font-black py-4 px-4 rounded-2xl transition-all duration-300 shadow-xl shadow-[#3b7d86]/20 transform hover:-translate-y-1 active:scale-95 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Processing Register..." : "Create Account"}
        </button>
      </form>

      {/* Footer Link Kembali ke Sign In */}
      <div className="mt-8 text-center border-t border-gray-100 pt-6">
        <p className="text-xs text-[#a9a9a9] font-medium">
            Already have an account?{" "}
            <Link to="/login" className="text-[#3b7d86] font-black hover:text-[#63402f] transition-colors underline underline-offset-4">
                Sign In
            </Link>
        </p>
      </div>
    </div>
  );
}