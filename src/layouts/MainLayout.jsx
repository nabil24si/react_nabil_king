import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function MainLayout() {
  return (
    <div 
      id="app-container" 
      className="bg-[#fcfaf9] min-h-screen flex font-poppins selection:bg-[#3b7d86]/10 selection:text-[#3b7d86]"
    >
      <div id="layout-wrapper" className="flex flex-row flex-1 relative">
        
        {/* Sidebar Section */}
        <Sidebar />

        {/* Main Content Area */}
        <div
          id="main-content"
          className="flex-1 flex flex-col min-h-screen max-h-screen overflow-hidden"
        >
          {/* Header - Fixed or Sticky if needed */}
          <Header />

          {/* Page Content Container */}
          <main 
            className="flex-1 overflow-y-auto px-6 pb-8 custom-scrollbar"
          >
            {/* Wrapper untuk menjaga konsistensi lebar konten */}
            <div className="max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-2 duration-700">
              <Outlet />
            </div>
            
            {/* Footer Tipis Opsional di dalam Dashboard */}
            <footer className="mt-12 py-6 border-t border-gray-100 flex justify-between items-center text-[10px] font-bold text-[#a9a9a9] uppercase tracking-[0.2em]">
              <span>GlowCare Management System v2.0</span>
              <span className="text-[#3b7d86]/50">Status: System Operational</span>
            </footer>
          </main>
        </div>

        {/* Dekorasi Aksen Latar Belakang (Blurry Spot) */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#66c5b4]/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-[300px] w-[300px] h-[300px] bg-[#ffb686]/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
      </div>
    </div>
  );
}