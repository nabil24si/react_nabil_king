export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white">
      {/* Container untuk Spinner */}
      <div className="relative flex items-center justify-center mb-8">
        
        {/* Ring Luar - Halus (Hitam dengan opasitas sangat rendah) */}
        <div className="w-14 h-14 border-[3px] border-black/5 rounded-full"></div>
        
        {/* Ring Dalam - Animasi Spin (Menggunakan Hijau CDEEDD) */}
        <div className="absolute w-14 h-14 border-[3px] border-transparent border-t-[#CDEEDD] border-l-[#CDEEDD] rounded-full animate-spin"></div>
        
        {/* Dot Tengah - Animasi Pulse (Menggunakan Salmon FFD9D0) */}
        <div className="absolute w-2.5 h-2.5 bg-[#FFD9D0] rounded-full animate-pulse shadow-[0_0_10px_rgba(255,217,208,0.6)]"></div>
      </div>

      {/* Text Section */}
      <div className="flex flex-col items-center">
        <p className="text-black font-medium text-lg tracking-[0.2em] uppercase">
          GlowCare
        </p>
        <div className="flex items-center space-x-1.5 mt-2">
          <span className="text-black/30 text-[10px] font-medium uppercase tracking-widest">
            Preparing your beauty dashboard
          </span>
          {/* Animasi titik-titik (Warna Hitam Soft) */}
          <span className="flex space-x-1">
            <span className="w-0.5 h-0.5 bg-black/40 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-0.5 h-0.5 bg-black/40 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-0.5 h-0.5 bg-black/40 rounded-full animate-bounce"></span>
          </span>
        </div>
      </div>

      {/* Decorative Blur Background - Sangat tipis untuk kesan premium */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#CDEEDD]/10 rounded-full blur-[80px] -z-10"></div>
    </div>
  );
}