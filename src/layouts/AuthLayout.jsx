import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    // Background Putih Bersih dengan aksen radial tipis
    <div className="min-h-screen flex items-center justify-center bg-white bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#CDEEDD]/20 via-white to-[#FFD9D0]/10 p-4 font-poppins">
      
      {/* Card Container - Fokus pada kebersihan (Pure White) */}
      <div className="bg-white p-12 rounded-[3rem] shadow-[0_32px_64px_-15px_rgba(0,0,0,0.05)] w-full max-w-md border border-gray-50 relative overflow-hidden">
        
        {/* Dekorasi Aksen Soft di pojok card */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#CDEEDD]/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-[#FFD9D0]/20 rounded-full blur-3xl"></div>

        <div className="flex flex-col items-center justify-center mb-12 relative z-10">
          {/* Logo Section - Mempertahankan gaya logo teks Anda */}
          <div className="mb-4">
            <div className="w-12 h-12 bg-[#CDEEDD] rounded-2xl flex items-center justify-center shadow-sm">
              <div className="w-5 h-5 border-[2.5px] border-black rounded-md"></div>
            </div>
          </div>

          <h1 className="text-3xl font-semibold text-black tracking-tight">
            GlowCare<span className="text-[#CDEEDD]">.</span>
          </h1>
          
          <div className="flex items-center space-x-3 mt-3">
            <div className="h-[1px] w-5 bg-[#FFD9D0]"></div>
            <p className="text-[10px] font-medium text-black/30 uppercase tracking-[0.25em]">
              Professional Esthetic
            </p>
            <div className="h-[1px] w-5 bg-[#FFD9D0]"></div>
          </div>
        </div>

        {/* Form Login (Outlet) */}
        <div className="relative z-10">
          <Outlet/>
        </div>

        {/* Footer Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-50 relative z-10 text-center">
          <p className="text-[10px] font-semibold text-black/20 uppercase tracking-[0.2em]">
            © 2026 GlowCare System
          </p>
          <p className="text-[9px] text-black/10 mt-1.5 font-medium tracking-wide">
            Built for premium beauty management
          </p>
        </div>
      </div>
    </div>
  );
}