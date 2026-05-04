import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { FaLeaf } from "react-icons/fa"; // Mengganti FaHeart dengan FaLeaf agar lebih Earthy

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
        if (response.status !== 200) {
          setError(response.data.message);
          return;
        }
        navigate("/");
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.message || "Invalid credentials");
        } else {
          setError(err.message || "Connection error");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Error Info Component - Earthy Red/Brown style
  const errorInfo = error ? (
    <div className="bg-[#ffb686]/20 mb-6 p-4 text-xs font-bold text-[#63402f] rounded-xl flex items-center border border-[#ffb686]/40 animate-shake">
      <BsFillExclamationDiamondFill className="text-[#63402f] me-3 text-lg" />
      {error}
    </div>
  ) : null;

  // Loading Info Component - Teal Style
  const loadingInfo = loading ? (
    <div className="bg-[#3b7d86]/10 mb-6 p-4 text-xs font-bold text-[#3b7d86] rounded-xl flex items-center border border-[#3b7d86]/20">
      <ImSpinner2 className="me-3 animate-spin text-lg" />
      Authenticating... Please wait
    </div>
  ) : null;

  return (
    <div className="max-w-md w-full mx-auto">
      {/* Logo / Icon Section */}
      <div className="flex justify-center mb-4">
      </div>

      <p className="text-center text-sm text-[#a9a9a9] mb-8 font-medium">
        Sign in to access your professional dashboard
      </p>

      {errorInfo}
      {loadingInfo}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-bold text-[#63402f] uppercase tracking-wider mb-2 ml-1">
            Email Address / Username
          </label>
          <input
            type="text" id="email" name="email" value={dataForm.email} onChange={handleChange}
            className="w-full px-5 py-3 bg-white border border-gray-200 rounded-2xl shadow-sm placeholder-[#a9a9a9] text-sm focus:border-[#3b7d86] focus:ring-4 focus:ring-[#3b7d86]/5 transition-all outline-none"
            placeholder="Enter your username" required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#63402f] uppercase tracking-wider mb-2 ml-1">
            Secure Password
          </label>
          <input
            type="password" id="password" name="password" value={dataForm.password} onChange={handleChange}
            className="w-full px-5 py-3 bg-white border border-gray-200 rounded-2xl shadow-sm placeholder-[#a9a9a9] text-sm focus:border-[#3b7d86] focus:ring-4 focus:ring-[#3b7d86]/5 transition-all outline-none"
            placeholder="••••••••" required
          />
        </div>

        <div className="flex justify-end pt-1">
            <button type="button" className="text-xs font-bold text-[#3b7d86] hover:text-[#63402f] transition-colors">
                Forgot Password?
            </button>
        </div>

        <button
          type="submit" disabled={loading}
          className="w-full bg-[#3b7d86] hover:bg-[#63402f] text-white font-black py-4 px-4 rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-[#3b7d86]/20 transform hover:-translate-y-1 active:scale-95 mt-4"
        >
          {loading ? "Verifying..." : "Sign In to Dashboard"}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-xs text-[#a9a9a9] font-medium">
            Don't have access? <span className="text-[#63402f] font-bold cursor-pointer underline underline-offset-4">Contact Administrator</span>
        </p>
      </div>
    </div>
  );
}