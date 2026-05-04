import { Outlet } from "react-router-dom";
import { FaLeaf } from "react-icons/fa";

export default function AuthLayout() {
  return (
    // Background menggunakan gradasi Earthy (Cream ke Mint/Teal pucat)
    <div className="min-h-screen flex items-center justify-center bg-[#fcfaf9] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#66c5b4]/10 via-[#fcfaf9] to-[#ffb686]/5 p-4">
      
      {/* Card Container - Glassmorphism halus */}
      <div className="bg-white/80 backdrop-blur-sm p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md border border-white relative overflow-hidden">
        
        {/* Dekorasi Aksen di pojok card */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#3b7d86]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#ffb686]/10 rounded-full blur-3xl"></div>

        <div className="flex flex-col items-center justify-center mb-10 relative z-10">
          {/* Logo Badge - Menggunakan Teal & Earthy Brown */}
          <div className="bg-gradient-to-tr from-[#3b7d86] to-[#66c5b4] rounded-2xl p-4 mb-4 shadow-lg shadow-[#3b7d86]/30 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
            <FaLeaf className="text-white text-3xl" />
          </div>

          <h1 className="text-4xl font-poppins font-black text-[#63402f] tracking-tighter">
            GlowCare<span className="text-[#3b7d86]">.</span>
          </h1>
          
          <div className="flex items-center space-x-2 mt-2">
            <div className="h-[1px] w-4 bg-[#ffb686]"></div>
            <p className="text-[10px] font-bold text-[#a9a9a9] uppercase tracking-[0.2em]">
              Professional Esthetic
            </p>
            <div className="h-[1px] w-4 bg-[#ffb686]"></div>
          </div>
        </div>

        {/* Form Login (Outlet) */}
        <div className="relative z-10">
          <Outlet/>
        </div>

        {/* Footer Copyright */}
        <div className="mt-10 pt-6 border-t border-gray-100 relative z-10">
          <p className="text-center text-[10px] font-bold text-[#a9a9a9] uppercase tracking-widest">
            © 2026 GlowCare System
          </p>
          <p className="text-center text-[9px] text-gray-400 mt-1">
            Built for premium beauty management
          </p>
        </div>
      </div>
    </div>
  );
}