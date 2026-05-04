import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function Forgot() {
  return (
    <div className="max-w-md w-full mx-auto">
      {/* Header Halaman */}
      <h2 className="text-3xl font-black text-[#63402f] mb-3 text-center font-poppins">
        Lost Your Access?
      </h2>
      <p className="text-center text-sm text-[#a9a9a9] mb-8 font-medium leading-relaxed">
        Don't worry, it happens. Enter your registered email and we'll send a recovery link.
      </p>

      <form className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-[#63402f] uppercase tracking-wider mb-2 ml-1">
            Recovery Email Address
          </label>
          <div className="relative group">
            <input 
              type="email" 
              id="email" 
              className="w-full px-5 py-3 bg-white border border-gray-200 rounded-2xl shadow-sm placeholder-[#a9a9a9] text-sm focus:border-[#3b7d86] focus:ring-4 focus:ring-[#3b7d86]/5 transition-all outline-none" 
              placeholder="Enter your email" 
              required
            />
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full bg-[#3b7d86] hover:bg-[#63402f] text-white font-black py-4 px-4 rounded-2xl transition-all duration-300 shadow-xl shadow-[#3b7d86]/20 transform hover:-translate-y-1 active:scale-95"
        >
          Send Recovery Link
        </button>
      </form>

      {/* Navigasi Kembali */}
      <div className="mt-8 text-center border-t border-gray-100 pt-6">
        <Link 
          to="/login" 
          className="inline-flex items-center text-xs font-black text-[#3b7d86] hover:text-[#63402f] transition-colors group"
        >
          <FaArrowLeft className="mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Login
        </Link>
      </div>

      {/* Note Tambahan */}
      <div className="mt-6 p-4 bg-[#ffb686]/10 rounded-2xl border border-[#ffb686]/20">
        <p className="text-[10px] text-[#63402f] font-bold leading-normal text-center">
          Note: If you don't see the email in your inbox, please check your spam folder.
        </p>
      </div>
    </div>
  );
}