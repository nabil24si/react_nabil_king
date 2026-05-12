import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { 
  FaArrowLeft, 
  FaStar, 
  FaTag, 
  FaWarehouse, 
  FaShoppingBag, 
  FaCheckCircle 
} from "react-icons/fa";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [id]);

  if (error) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-red-50 text-red-500 p-6 rounded-[32px] border border-red-100 italic">
        Error: {error}
      </div>
    </div>
  );

  if (!product) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-[#CDEEDD] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-black/30 tracking-widest text-[10px] uppercase font-medium">Loading Product...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-4 md:p-8 font-poppins bg-transparent text-black">
      {/* Tombol Kembali */}
      <button 
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center space-x-2 text-black/40 hover:text-black transition-all group"
      >
        <div className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100 group-hover:bg-[#CDEEDD]/30 transition-colors">
          <FaArrowLeft size={14} />
        </div>
        <span className="text-xs font-medium uppercase tracking-widest">Back to Catalog</span>
      </button>

      <div className="bg-white rounded-[48px] shadow-sm border border-gray-50 overflow-hidden max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          
          {/* BAGIAN KIRI: GAMBAR */}
          <div className="p-8 lg:p-12 bg-gray-50/50 flex items-center justify-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-[#FFD9D0] rounded-[32px] rotate-3 group-hover:rotate-6 transition-transform duration-500 opacity-20"></div>
              <img
                src={product.thumbnail}
                alt={product.title}
                className="relative z-10 rounded-[32px] w-full h-[400px] object-contain drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* BAGIAN KANAN: DETAIL */}
          <div className="p-8 lg:p-16 flex flex-col justify-center">
            {/* Label Kategori */}
            <div className="flex items-center space-x-3 mb-6">
              <span className="px-4 py-1.5 bg-[#CDEEDD] text-black text-[10px] font-bold uppercase tracking-widest rounded-full border border-[#B8E2CC]">
                {product.category}
              </span>
              <div className="flex items-center text-yellow-500 space-x-1">
                <FaStar size={12} />
                <span className="text-xs font-bold text-black/60">{product.rating}</span>
              </div>
            </div>

            <h1 className="text-4xl lg:text-5xl font-medium text-black mb-2 tracking-tight">
              {product.title}
            </h1>
            
            <p className="text-black/40 text-sm mb-8 flex items-center">
              <FaTag className="mr-2 opacity-20" /> 
              Brand: <span className="text-black ml-1 font-medium">{product.brand || "Authentic Makeup"}</span>
            </p>

            <div className="space-y-6 mb-10">
              <p className="text-black/60 leading-relaxed text-sm">
                {product.description}
              </p>

              <div className="flex items-center space-x-8">
                <div>
                  <p className="text-[10px] text-black/30 uppercase tracking-widest font-bold mb-1">Price</p>
                  <p className="text-3xl font-medium text-black">
                    Rp {(product.price * 15000).toLocaleString('id-ID')}
                  </p>
                </div>
                <div className="h-10 w-[1px] bg-gray-100"></div>
                <div>
                  <p className="text-[10px] text-black/30 uppercase tracking-widest font-bold mb-1">Availability</p>
                  <p className="text-sm font-medium flex items-center text-black">
                    <FaWarehouse className="mr-2 text-[#CDEEDD]" /> {product.stock} in stock
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <button className="flex-1 bg-[#FFD9D0] hover:bg-[#ffc8bc] text-black py-4 rounded-2xl font-medium flex items-center justify-center space-x-3 shadow-xl shadow-[#FFD9D0]/30 transition-all active:scale-95">
                <FaShoppingBag size={16} />
                <span>Add to Collection</span>
              </button>
              <button className="px-8 py-4 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors flex items-center justify-center">
                <FaCheckCircle className="text-[#CDEEDD] mr-2" />
                <span className="text-sm font-medium">Verify Product</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Footer Info Tambahan */}
      <div className="max-w-6xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/50 p-6 rounded-[24px] border border-gray-100">
             <p className="text-[10px] uppercase tracking-widest font-bold text-black/20 mb-2">Warranty</p>
             <p className="text-xs text-black/60">Official 1-year guarantee for all makeup tools.</p>
          </div>
          <div className="bg-white/50 p-6 rounded-[24px] border border-gray-100">
             <p className="text-[10px] uppercase tracking-widest font-bold text-black/20 mb-2">Shipping</p>
             <p className="text-xs text-black/60">Free eco-friendly shipping for premium members.</p>
          </div>
          <div className="bg-white/50 p-6 rounded-[24px] border border-gray-100">
             <p className="text-[10px] uppercase tracking-widest font-bold text-black/20 mb-2">Sustainability</p>
             <p className="text-xs text-black/60">Cruelty-free & 100% vegan ingredients certified.</p>
          </div>
      </div>
    </div>
  );
}