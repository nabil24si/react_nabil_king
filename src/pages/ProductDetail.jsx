import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// Import file JSON lokal yang berisi 30 data makeup tadi
import productsData from "../data/ProductsData.json"; 
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

  useEffect(() => {
    // Cari produk di dalam array lokal berdasarkan ID dari URL
    // Kita gunakan Number(id) karena useParams mengembalikan string
    const foundProduct = productsData.find((item) => item.id === Number(id));
    
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id]);

  if (!product) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-[#CDEEDD] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-black/30 tracking-widest text-[10px] uppercase font-medium">Product Not Found...</p>
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
          
          {/* BAGIAN KIRI: VISUAL (Placeholder karena JSON lokal tidak ada gambar) */}
          <div className="p-8 lg:p-12 bg-gray-50/50 flex items-center justify-center">
            <div className="relative group w-full flex justify-center">
              <div className="absolute inset-0 bg-[#FFD9D0] rounded-[32px] rotate-3 group-hover:rotate-6 transition-transform duration-500 opacity-20"></div>
              {/* Karena JSON kita tidak punya URL gambar, kita pakai placeholder estetik */}
              <div className="relative z-10 rounded-[32px] w-full h-[400px] bg-white flex items-center justify-center border border-gray-100 shadow-xl">
                 <div className="text-center">
                    <FaShoppingBag className="mx-auto text-[#FFD9D0] mb-4" size={80} />
                    <p className="text-black/20 font-bold uppercase tracking-widest text-xs">Premium Product</p>
                 </div>
              </div>
            </div>
          </div>

          {/* BAGIAN KANAN: DETAIL */}
          <div className="p-8 lg:p-16 flex flex-col justify-center">
            {/* Label Kategori & Code */}
            <div className="flex items-center space-x-3 mb-6">
              <span className="px-4 py-1.5 bg-[#CDEEDD] text-black text-[10px] font-bold uppercase tracking-widest rounded-full border border-[#B8E2CC]">
                {product.category}
              </span>
              <span className="text-[10px] font-bold text-black/30 tracking-widest uppercase italic">
                Ref: {product.code}
              </span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-medium text-black mb-2 tracking-tight">
              {product.title}
            </h1>
            
            <p className="text-black/40 text-sm mb-8 flex items-center">
              <FaTag className="mr-2 opacity-20" /> 
              Brand: <span className="text-black ml-1 font-semibold">{product.brand}</span>
            </p>

            <div className="space-y-6 mb-10">
              <p className="text-black/60 leading-relaxed text-sm">
                Produk premium dari {product.brand} untuk kategori {product.category}. 
                Dibuat dengan bahan berkualitas tinggi untuk hasil makeup yang profesional dan tahan lama.
              </p>

              <div className="flex items-center space-x-8">
                <div>
                  <p className="text-[10px] text-black/30 uppercase tracking-widest font-bold mb-1">Price</p>
                  <p className="text-3xl font-medium text-black">
                    {product.price}
                  </p>
                </div>
                <div className="h-10 w-[1px] bg-gray-100"></div>
                <div>
                  <p className="text-[10px] text-black/30 uppercase tracking-widest font-bold mb-1">Stock Status</p>
                  <p className="text-sm font-medium flex items-center text-black">
                    <FaWarehouse className="mr-2 text-[#CDEEDD]" /> {product.stock} units
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <button className="flex-1 bg-[#FFD9D0] hover:bg-[#ffc8bc] text-black py-4 rounded-2xl font-medium flex items-center justify-center space-x-3 shadow-xl shadow-[#FFD9D0]/30 transition-all active:scale-95">
                <FaShoppingBag size={16} />
                <span>Add to Cart</span>
              </button>
              <button className="px-8 py-4 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors flex items-center justify-center group">
                <FaCheckCircle className="text-[#CDEEDD] mr-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">Verify Quality</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Footer Info Tambahan */}
      <div className="max-w-6xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 italic">
          <div className="bg-white/50 p-6 rounded-[24px] border border-gray-100">
             <p className="text-[10px] uppercase tracking-widest font-bold text-black/20 mb-2">Quality</p>
             <p className="text-xs text-black/60">Terjamin asli dari brand {product.brand}.</p>
          </div>
          <div className="bg-white/50 p-6 rounded-[24px] border border-gray-100">
             <p className="text-[10px] uppercase tracking-widest font-bold text-black/20 mb-2">Category</p>
             <p className="text-xs text-black/60">Koleksi terbaik untuk pecinta {product.category}.</p>
          </div>
          <div className="bg-white/50 p-6 rounded-[24px] border border-gray-100">
             <p className="text-[10px] uppercase tracking-widest font-bold text-black/20 mb-2">Availability</p>
             <p className="text-xs text-black/60">Stok terbatas, tersisa {product.stock} barang lagi.</p>
          </div>
      </div>
    </div>
  );
}