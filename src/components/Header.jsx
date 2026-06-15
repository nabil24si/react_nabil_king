// Header.jsx
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; // ✨ Tambahkan useNavigate untuk redirect
import { FaBell, FaSearch, FaSignOutAlt } from "react-icons/fa"; // Tambahkan ikon logout

export default function Header({ title }) {
  const navigate = useNavigate();
  
  // State untuk data user
  const [currentUser, setCurrentUser] = useState({
    username: "Admin View",
    email: "",
  });

  // ✨ State baru untuk mengontrol kemunculan dropdown menu
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Mengambil data session saat komponen dimuat
  useEffect(() => {
    const sessionData = localStorage.getItem("user_session");
    if (sessionData) {
      try {
        const parsedUser = JSON.parse(sessionData);
        setCurrentUser(parsedUser);
      } catch (error) {
        console.error("Gagal membaca session user:", error);
      }
    }

    // Fungsi untuk menutup dropdown jika pengguna mengklik di luar area avatar/dropdown
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✨ Fungsi untuk menangani proses Logout
  const handleLogout = () => {
    // 1. Hapus data session dari penyimpanan lokal browser
    localStorage.removeItem("user_session");
    
    // 2. Tendang user kembali ke halaman login secara bersih
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center px-8 py-4 bg-white border-b border-gray-100 shadow-sm transition-all duration-300">
      {/* Pojok Kiri Atas */}
      <div>
        <h1 className="text-xl font-medium text-black tracking-tight">
          {title || "Admin View"}
        </h1>
      </div>

      {/* Pojok Kanan Atas */}
      <div className="flex items-center space-x-4">
        {/* Tombol Search */}
        <button className="w-10 h-10 flex items-center justify-center bg-[#CDEEDD]/30 text-black rounded-full hover:bg-[#CDEEDD] transition-all">
          <FaSearch size={16} />
        </button>

        {/* Tombol Notifikasi */}
        <div className="relative">
          <button className="w-10 h-10 flex items-center justify-center bg-[#CDEEDD]/30 text-black rounded-full hover:bg-[#CDEEDD] transition-all">
            <FaBell size={18} />
          </button>
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#FFD9D0] border-2 border-white rounded-full"></span>
        </div>

        {/* Sesi User Profile + Dropdown Logout */}
        <div className="flex items-center space-x-3 pl-4 border-l border-gray-100 ml-2 relative" ref={dropdownRef}>
          <div className="flex flex-col text-right hidden sm:flex">
            <span className="text-black font-medium text-sm leading-tight capitalize">
              {currentUser.username || "Guest User"}
            </span>
            <span className="text-black/30 text-[9px] font-medium uppercase tracking-widest block max-w-[120px] truncate">
              {currentUser.email ? "Administrator" : "Admin"}
            </span>
          </div>
          
          {/* ✨ Tombol Avatar Klik-able */}
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="focus:outline-none relative active:scale-95 transition-transform"
            title="Klik untuk opsi akun"
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80" 
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-[#FFD9D0] p-0.5 bg-gray-50 hover:ring-[#3b7d86] transition-all"
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${currentUser.username}&background=CDEEDD&color=000000`;
              }}
            />
          </button>

          {/* ✨ MENU DROPDOWN LOGOUT (Akan muncul jika avatar diklik) */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl py-2 z-50 animate-fadeIn font-poppins">
              {/* Info ringkas user di dalam dropdown (berguna di mobile view) */}
              <div className="px-4 py-2 border-b border-gray-50 sm:hidden">
                <p className="text-sm font-semibold text-black capitalize truncate">{currentUser.username}</p>
                <p className="text-xs text-black/40 truncate">{currentUser.email}</p>
              </div>

              {/* Tombol Aksi Logout */}
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2 transition-colors"
              >
                <FaSignOutAlt size={14} />
                <span className="font-medium">Sign Out / Logout</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}