import { Link } from "react-router-dom"; // Asumsi menggunakan react-router untuk navigasi

export default function Register() {
  return (
    <div className="max-w-md w-full mx-auto">
      <h2 className="text-3xl font-black text-[#63402f] mb-2 text-center font-poppins">
        Join GlowCare
      </h2>
      <p className="text-center text-sm text-[#a9a9a9] mb-8 font-medium">
        Create an administrator account to start managing
      </p>

      <form className="space-y-5">
        <div>
          <label className="block text-xs font-bold text-[#63402f] uppercase tracking-wider mb-2 ml-1">
            Email Address
          </label>
          <input 
            type="email" 
            id="email" 
            className="w-full px-5 py-3 bg-white border border-gray-200 rounded-2xl shadow-sm placeholder-[#a9a9a9] text-sm focus:border-[#3b7d86] focus:ring-4 focus:ring-[#3b7d86]/5 transition-all outline-none" 
            placeholder="you@example.com" 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#63402f] uppercase tracking-wider mb-2 ml-1">
              Password
            </label>
            <input 
              type="password" 
              id="password" 
              className="w-full px-5 py-3 bg-white border border-gray-200 rounded-2xl shadow-sm placeholder-[#a9a9a9] text-sm focus:border-[#3b7d86] focus:ring-4 focus:ring-[#3b7d86]/5 transition-all outline-none" 
              placeholder="********" 
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#63402f] uppercase tracking-wider mb-2 ml-1">
              Confirm
            </label>
            <input 
              type="password" 
              id="confirmPassword" 
              className="w-full px-5 py-3 bg-white border border-gray-200 rounded-2xl shadow-sm placeholder-[#a9a9a9] text-sm focus:border-[#3b7d86] focus:ring-4 focus:ring-[#3b7d86]/5 transition-all outline-none" 
              placeholder="********" 
            />
          </div>
        </div>

        <div className="flex items-start space-x-2 px-1 py-2">
            <input type="checkbox" id="terms" className="mt-1 accent-[#3b7d86]" required />
            <label htmlFor="terms" className="text-[11px] text-[#a9a9a9] font-medium leading-tight">
                I agree to the <span className="text-[#3b7d86] font-bold underline cursor-pointer">Terms of Service</span> and <span className="text-[#3b7d86] font-bold underline cursor-pointer">Privacy Policy</span>.
            </label>
        </div>

        <button 
          type="submit" 
          className="w-full bg-[#3b7d86] hover:bg-[#63402f] text-white font-black py-4 px-4 rounded-2xl transition-all duration-300 shadow-xl shadow-[#3b7d86]/20 transform hover:-translate-y-1 active:scale-95 mt-2"
        >
          Create Administrator Account
        </button>
      </form>

      <div className="mt-8 text-center border-t border-gray-100 pt-6">
        <p className="text-xs text-[#a9a9a9] font-medium">
            Already have an account?{" "}
            <Link to="/login" className="text-[#3b7d86] font-black hover:text-[#63402f] transition-colors underline underline-offset-4">
                Sign In
            </Link>
        </p>
      </div>
    </div>
  );
}