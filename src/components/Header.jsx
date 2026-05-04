import { FaBell, FaSearch } from "react-icons/fa";
import { FcAreaChart } from "react-icons/fc";
import { SlSettings } from "react-icons/sl";

export default function Header() {
  return (
    <div id="header-container" className="flex justify-between items-center p-6 mb-4 bg-transparent">
      {/* Search Bar - Modern Earthy Style */}
      <div id="search-bar" className="relative w-full max-w-lg group">
        <input
          id="search-input"
          type="text"
          placeholder="Search for patients, services, or appointments..."
          className="border-none p-4 pr-12 bg-white w-full rounded-2xl outline-none shadow-sm focus:ring-2 focus:ring-[#3b7d86]/20 transition-all duration-300 text-sm text-[#63402f] placeholder-[#a9a9a9]"
        />
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#3b7d86]/10 p-2 rounded-lg group-focus-within:bg-[#3b7d86] transition-colors duration-300">
          <FaSearch id="search-icon" className="text-[#3b7d86] group-focus-within:text-white text-sm" />
        </div>
      </div>

      <div id="icons-container" className="flex items-center space-x-8">
        {/* Action Icons */}
        <div className="flex space-x-4">
          {/* Notification Icon - Teal Theme */}
          <div id="notification-icon" className="relative p-3 bg-white border border-gray-100 rounded-xl text-[#3b7d86] cursor-pointer hover:bg-[#3b7d86] hover:text-white transition-all duration-300 shadow-sm">
            <FaBell className="text-lg" />
            <span id="notification-badge" className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3 
            bg-[#ffb686] text-[#63402f] font-black rounded-full w-5 h-5 flex items-center justify-center text-[10px] ring-4 ring-gray-50 animate-bounce">
              12
            </span>
          </div>

          {/* Chart Icon */}
          <div id="chart-icon" className="p-3 bg-white border border-gray-100 rounded-xl cursor-pointer hover:bg-[#66c5b4]/10 transition-all shadow-sm">
            <FcAreaChart className="text-lg" />
          </div>

          {/* Settings Icon - Brown/Earthy Theme */}
          <div id="settings-icon" className="p-3 bg-white border border-gray-100 rounded-xl text-[#63402f] cursor-pointer hover:bg-[#63402f] hover:text-white transition-all duration-300 shadow-sm">
            <SlSettings className="text-lg" />
          </div>
        </div>

        {/* Profile Section - Refined with Earthy Colors */}
        <div id="profile-container" className="flex items-center space-x-4 border-l-2 pl-8 border-gray-200">
          <div className="flex flex-col items-end">
            <span id="profile-text" className="text-[#a9a9a9] text-[11px] font-bold uppercase tracking-widest leading-none mb-1">
              Administrator
            </span>
            <span className="text-[#63402f] font-black text-sm">
              Nabil Sahendra
            </span>
          </div>
          <div className="relative">
            <img
              id="profile-avatar"
              src="https://avatar.iran.liara.run/public/28"
              className="w-12 h-12 rounded-2xl shadow-md border-2 border-white ring-2 ring-[#ffb686]/30 object-cover"
              alt="Profile"
            />
            {/* Status Online Dot */}
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#66c5b4] border-2 border-white rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}