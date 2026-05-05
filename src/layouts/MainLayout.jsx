import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function MainLayout() {
  return (
    <div 
      id="app-container" 
      // Menggunakan warna latar belakang yang lebih bersih agar warna mint #CDEEDD menonjol
      className="bg-[#FCFAF9] min-h-screen flex font-poppins selection:bg-[#CDEEDD] selection:text-[#2D4F40] text-[#2D3134]"
    >
      <div id="layout-wrapper" className="flex flex-row flex-1 relative overflow-hidden">
        
        {/* Sidebar Section */}
        <Sidebar />

        {/* Main Content Area */}
        <div
          id="main-content"
          className="flex-1 flex flex-col min-h-screen max-h-screen overflow-hidden"
        >
          {/* Header */}
          <Header />

          {/* Page Content Container */}
          <main 
            className="flex-1 overflow-y-auto px-8 pb-10 custom-scrollbar"
          >
            <div className="max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-3 duration-700">
              <Outlet />
            </div>
            
            {/* Footer Subtle */}
            <footer className="mt-16 py-6 border-t border-gray-100/60 flex justify-between items-center text-[10px] font-bold text-[#A9A9A9] uppercase tracking-[0.2em]">
              <div className="flex items-center gap-2">
                {/* Indikator Status diubah menjadi warna Mint Green baru */}
                <div className="w-1.5 h-1.5 rounded-full bg-[#CDEEDD] shadow-[0_0_8px_#CDEEDD]"></div>
                <span>GlowCare Management System v2.0</span>
              </div>
              <span className="text-[#2D4F40]/40">System Operational</span>
            </footer>
          </main>
        </div>

        {/* Dekorasi Aksen Latar Belakang (Blurry Spot) - Disesuaikan dengan Palet Baru */}
        
        {/* Spot Mint (Warna Utama Baru) di Kanan Atas */}
        <div className="absolute top-[-100px] right-[-100px] w-[600px] h-[600px] bg-[#CDEEDD]/15 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
        
        {/* Spot Hijau Tua di Tengah Kiri (Lebih halus) */}
        <div className="absolute top-[30%] left-[-50px] w-[400px] h-[400px] bg-[#2D4F40]/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

        {/* Spot Aksen Tambahan di Kanan Bawah */}
        <div className="absolute bottom-[-50px] right-[10%] w-[400px] h-[400px] bg-[#CDEEDD]/10 rounded-full blur-[110px] -z-10 pointer-events-none"></div>
      </div>
    </div>
  );
}