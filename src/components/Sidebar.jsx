import { FaHome, FaUserInjured, FaSpa, FaCalendarAlt, FaPlus, FaBan } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  // Update logika warna berdasarkan palette
  const menuClass = ({ isActive }) =>
    `flex cursor-pointer items-center rounded-xl p-4 transition-all duration-300 space-x-2
    ${isActive ?
      "text-white bg-[#3b7d86] font-bold shadow-md shadow-[#3b7d86]/30" : // Teal Dark untuk Active
      "text-gray-500 hover:text-[#3b7d86] hover:bg-[#66c5b4]/10 hover:font-semibold" // Teal Light transparan untuk Hover
    }`;

  return (
    <div id="sidebar" className="flex flex-col min-h-screen w-80 bg-white p-8 border-r border-gray-100 shadow-xl">
      {/* Logo Section */}
      <div id="sidebar-logo" className="flex flex-col mb-10 group cursor-pointer">
        <span id="logo-title" className="font-poppins text-[40px] text-[#63402f] font-black leading-none tracking-tight">
          GlowCare<b id="logo-dot" className="text-[#3b7d86]">.</b>
        </span>
        <span id="logo-subtitle" className="font-medium text-[#a9a9a9] text-xs uppercase tracking-widest mt-1">
          Beauty Clinic Admin
        </span>
      </div>

      {/* Menu Section */}
      <div id="sidebar-menu" className="mt-4 flex-1">
        <ul id="menu-list" className="space-y-2">
          <li>
            <NavLink to="/" className={menuClass}>
              <FaHome className="mr-3 text-lg" /> <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/patients" className={menuClass}>
              <FaUserInjured className="mr-3 text-lg" /> <span>Patient List</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/appointments" className={menuClass}>
              <FaCalendarAlt className="mr-3 text-lg" /> <span>Appointments</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/services" className={menuClass}>
              <FaSpa className="mr-3 text-lg" /> <span>Services</span>
            </NavLink>
          </li>
          
          {/* Divider */}
          <div className="pt-4 pb-2 text-[10px] font-bold text-[#a9a9a9] uppercase tracking-widest">System Errors</div>
          
          <li>
            <NavLink to="/error-400" className={menuClass}>
              <FaBan className="mr-3 text-lg" /> <span>Error 400</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/error-401" className={menuClass}>
              <FaBan className="mr-3 text-lg" /> <span>Error 401</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Footer Section */}
      <div id="sidebar-footer" className="mt-auto">
        {/* Footer Card menggunakan warna Peach & Teal Dark */}
        <div id="footer-card" className="bg-[#ffb686]/20 border border-[#ffb686]/30 px-5 py-6 rounded-2xl mb-6 relative overflow-hidden group">
          {/* Dekorasi lingkaran di background card */}
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-[#3b7d86]/10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
          
          <div id="footer-text" className="text-[#63402f] text-xs font-medium text-center mb-4 relative z-10">
            <span>Ready to grow? Add more services to your clinic catalog.</span>
          </div>
          
          <button id="add-menu-button" className="flex justify-center items-center p-3 bg-[#3b7d86] hover:bg-[#63402f] transition-colors duration-300 rounded-xl space-x-2 text-white w-full shadow-lg shadow-[#3b7d86]/20 relative z-10">
            <FaPlus size={12}/> <span className="text-sm font-bold">Add Service</span>
          </button>
        </div>

        <div className="px-2">
          <p id="footer-brand" className="font-bold text-[#63402f] text-[11px] opacity-70">GlowCare Beauty Clinic</p>
          <p id="footer-copyright" className="font-medium text-[#a9a9a9] text-[10px] mt-0.5">&copy; 2026 Admin Suite v1.0</p>
        </div>
      </div>
    </div>
  );
}