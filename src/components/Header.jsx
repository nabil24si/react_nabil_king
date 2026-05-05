import { FaBell, FaSearch } from "react-icons/fa";

export default function Header({ title }) { // Menggunakan destructuring props
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
        <button className="w-10 h-10 flex items-center justify-center bg-[#CDEEDD]/30 text-black rounded-full hover:bg-[#CDEEDD] transition-all">
          <FaSearch size={16} />
        </button>

        <div className="relative">
          <button className="w-10 h-10 flex items-center justify-center bg-[#CDEEDD]/30 text-black rounded-full hover:bg-[#CDEEDD] transition-all">
            <FaBell size={18} />
          </button>
          {/* Dot Notifikasi Salmon */}
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#FFD9D0] border-2 border-white rounded-full"></span>
        </div>

        <div className="flex items-center space-x-3 pl-4 border-l border-gray-100 ml-2">
          <div className="flex flex-col text-right">
            <span className="text-black font-medium text-sm leading-tight">Nabil Sahendra</span>
            <span className="text-black/30 text-[9px] font-medium uppercase tracking-widest">Admin</span>
          </div>
          <img
            src="https://www.bing.com/images/search?view=detailV2&ccid=WsJwogYa&id=E324177ED2848A42F0EA93BF7C0F30A538B88CE5&thid=OIP.WsJwogYayo9zv1sChZGphgHaE7&mediaurl=https%3a%2f%2fwallpapercave.com%2fwp%2fwp5173670.jpg&exph=2991&expw=4500&q=jokowi&FORM=IRPRST&ck=BBA8F3D4B36174936B17219FE345D8E5&selectedIndex=2&itb=0" // Sesuai foto di referensi
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover ring-2 ring-[#FFD9D0] p-0.5"
          />
        </div>
      </div>
    </div>
  );
}