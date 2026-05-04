export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#fcfaf9]">
      {/* Container untuk Spinner */}
      <div className="relative flex items-center justify-center mb-6">
        
        {/* Ring Luar - Statis dengan opasitas rendah */}
        <div className="w-16 h-16 border-4 border-[#3b7d86]/10 rounded-full"></div>
        
        {/* Ring Dalam - Animasi Spin dengan warna Teal */}
        <div className="absolute w-16 h-16 border-4 border-transparent border-t-[#3b7d86] border-l-[#3b7d86] rounded-full animate-spin"></div>
        
        {/* Dot Tengah - Animasi Pulse dengan warna Peach */}
        <div className="absolute w-3 h-3 bg-[#ffb686] rounded-full animate-pulse shadow-[0_0_15px_rgba(255,182,134,0.8)]"></div>
      </div>

      {/* Text dengan gaya tipografi yang konsisten */}
      <div className="flex flex-col items-center">
        <p className="text-[#63402f] font-black text-xl tracking-widest uppercase animate-pulse">
          GlowCare
        </p>
        <div className="flex items-center space-x-1 mt-1">
          <span className="text-[#a9a9a9] text-xs font-bold uppercase tracking-tighter">
            Preparing your beauty dashboard
          </span>
          {/* Animasi titik-titik sederhana */}
          <span className="flex space-x-1">
            <span className="w-1 h-1 bg-[#3b7d86] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-1 h-1 bg-[#3b7d86] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-1 h-1 bg-[#3b7d86] rounded-full animate-bounce"></span>
          </span>
        </div>
      </div>

      {/* Decorative Blur Background - Menambah kesan premium */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#66c5b4]/5 rounded-full blur-3xl -z-10"></div>
    </div>
  );
}