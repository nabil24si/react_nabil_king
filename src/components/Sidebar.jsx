import { FaHome, FaUserInjured, FaSpa, FaCalendarAlt, FaPlus, FaBan, FaUserMd, FaStar, FaCreditCard, FaRegEnvelope } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  // Logic class untuk menu (Font Poppins & Hover Mint)
  const menuClass = ({ isActive }) =>
    `flex cursor-pointer items-center rounded-2xl px-5 py-4 transition-all duration-300 group
    ${isActive ?
      "text-black bg-[#CDEEDD] font-medium shadow-sm" : 
      "text-[#666666] hover:text-black hover:bg-[#CDEEDD]/20 font-normal"
    }`;

  return (
    <div id="sidebar" className="flex flex-col min-h-screen w-72 bg-white p-6 border-r border-gray-50 font-poppins">
      
      {/* Logo Section - Mempertahankan Gaya Teks GlowCare */}
      <div id="sidebar-logo" className="flex flex-col mb-12 px-4 group cursor-pointer">
        <span className="text-[32px] text-black font-semibold leading-none tracking-tight">
          GlowCare<span className="text-[#CDEEDD]">.</span>
        </span>
        <span className="font-medium text-black/20 text-[10px] uppercase tracking-[0.2em] mt-2">
          Beauty Clinic Admin
        </span>
      </div>

      {/* Menu Section */}
      <div id="sidebar-menu" className="flex-1 overflow-y-auto custom-scrollbar">
        <ul id="menu-list" className="space-y-1">
          <li>
            <NavLink to="/" className={menuClass}>
              <FaHome className="mr-4 text-lg opacity-70 group-hover:opacity-100" /> 
              <span className="text-[15px]">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/patients" className={menuClass}>
              <FaUserInjured className="mr-4 text-lg opacity-70 group-hover:opacity-100" /> 
              <span className="text-[15px]">Patients</span>
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/doctors" className={menuClass}>
              <FaUserMd className="mr-4 text-lg opacity-70 group-hover:opacity-100" /> 
              <span className="text-[15px]">Doctors</span>
            </NavLink>
          </li> */}
          <li>
            <NavLink to="/appointments" className={menuClass}>
              <FaCalendarAlt className="mr-4 text-lg opacity-70 group-hover:opacity-100" /> 
              <span className="text-[15px]">Appointments</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/services" className={menuClass}>
              <FaSpa className="mr-4 text-lg opacity-70 group-hover:opacity-100" /> 
              <span className="text-[15px]">Services</span>
            </NavLink>
          </li>
           <li>
           <NavLink to="/product" className={menuClass}>
              <FaStar className="mr-4 text-lg opacity-70 group-hover:opacity-100" /> 
              <span className="text-[15px]">Product</span>
            </NavLink>
          </li> 
          {/* <li>
            <NavLink to="/payments" className={menuClass}>
              <FaCreditCard className="mr-4 text-lg opacity-70 group-hover:opacity-100" /> 
              <span className="text-[15px]">Payments</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/messages" className={menuClass}>
              <FaRegEnvelope className="mr-4 text-lg opacity-70 group-hover:opacity-100" /> 
              <span className="text-[15px]">Messages</span>
            </NavLink>
          </li> */}
          
          {/* Divider System */}
          <div className="pt-8 pb-3 px-5 text-[9px] font-semibold text-black/20 uppercase tracking-[0.25em]">
            System Error
          </div>
          
          <li>
            <NavLink to="/error-400" className={menuClass}>
              <FaBan className="mr-4 text-lg opacity-70 group-hover:opacity-100" /> 
              <span className="text-[15px]">Error 400</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Footer Section */}
      <div id="sidebar-footer" className="mt-auto pt-6">
        <div id="footer-card" className="bg-[#FFD9D0]/30 px-5 py-6 rounded-[28px] mb-6 relative overflow-hidden group">
          <p className="text-black text-[11px] font-medium leading-relaxed mb-4 relative z-10">
            Ready to grow? Add more services to your clinic catalog.
          </p>
          <button className="flex justify-center items-center py-3 bg-white hover:bg-black hover:text-white transition-all duration-300 rounded-xl space-x-2 text-black w-full shadow-sm relative z-10 font-medium text-sm">
            <FaPlus size={10}/> <span>Add Service</span>
          </button>
        </div>

        <div className="px-2 flex flex-col items-center">
          <p className="font-medium text-black text-[10px] opacity-30 uppercase tracking-[0.2em]">
            GlowCare v1.0
          </p>
        </div>
      </div>
    </div>
  );
}