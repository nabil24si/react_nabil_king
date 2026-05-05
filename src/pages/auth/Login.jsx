import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineEye } from "react-icons/hi";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    axios
      .post("https://dummyjson.com/user/login", {
        username: dataForm.email,
        password: dataForm.password,
      })
      .then((response) => {
        if (response.status === 200) {
          navigate("/");
        }
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Invalid credentials");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="w-full max-w-sm mx-auto font-poppins">
      {/* Header Text sesuai gambar */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-black mb-2">Welcome back</h2>
        <p className="text-sm text-black/40">Sign in to your account to continue</p>
      </div>

      {/* Error Info - Menggunakan aksen Salmon */}
      {error && (
        <div className="bg-[#FFD9D0]/20 mb-6 p-4 text-xs font-medium text-black rounded-xl flex items-center border border-[#FFD9D0]/40 animate-shake">
          <BsFillExclamationDiamondFill className="text-black/60 me-3 text-lg" />
          {error}
        </div>
      )}

      {/* Loading Info - Menggunakan aksen Mint */}
      {loading && (
        <div className="bg-[#CDEEDD]/30 mb-6 p-4 text-xs font-medium text-black rounded-xl flex items-center border border-[#CDEEDD]/50">
          <ImSpinner2 className="me-3 animate-spin text-lg text-black/60" />
          Authenticating... Please wait
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div>
          <label className="block text-sm font-semibold text-black mb-2 ml-1">
            Email
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-black/30 group-focus-within:text-black">
              <HiOutlineMail size={20} />
            </div>
            <input
              type="text"
              name="email"
              value={dataForm.email}
              onChange={handleChange}
              className="w-full pl-11 pr-5 py-3.5 bg-gray-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-[#CDEEDD] focus:ring-4 focus:ring-[#CDEEDD]/20 transition-all outline-none placeholder-black/20"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm font-semibold text-black mb-2 ml-1">
            Password
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-black/30 group-focus-within:text-black">
              <HiOutlineLockClosed size={20} />
            </div>
            <input
              type="password"
              name="password"
              value={dataForm.password}
              onChange={handleChange}
              className="w-full pl-11 pr-12 py-3.5 bg-gray-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-[#CDEEDD] focus:ring-4 focus:ring-[#CDEEDD]/20 transition-all outline-none placeholder-black/20"
              placeholder="Enter your password"
              required
            />
            <button type="button" className="absolute inset-y-0 right-0 pr-4 flex items-center text-black/20 hover:text-black transition-colors">
              <HiOutlineEye size={20} />
            </button>
          </div>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center space-x-2 cursor-pointer group">
            <input 
              type="checkbox" 
              className="w-4 h-4 rounded border-gray-300 text-black focus:ring-0 transition-all cursor-pointer"
            />
            <span className="text-black/70 font-medium group-hover:text-black transition-colors">Remember me</span>
          </label>
          <button type="button" className="font-medium text-black/70 hover:text-black transition-colors">
            Forgot password?
          </button>
        </div>

        {/* Sign In Button - Full Black sesuai gambar */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-4 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-black/10 active:scale-[0.98] mt-2"
        >
          {loading ? "Processing..." : "Sign in"}
        </button>
      </form>

      {/* Sign Up Link */}
      <div className="mt-10 text-center">
        <p className="text-sm text-black/40 font-medium">
          Don't have an account? <span className="text-black font-bold cursor-pointer hover:underline underline-offset-4">Sign up</span>
        </p>
      </div>
    </div>
  );
}