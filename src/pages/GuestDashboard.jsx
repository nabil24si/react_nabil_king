// pages/GuestDashboard.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { 
  HiOutlineSparkles, 
  HiOutlineCalendar, 
  HiOutlineUserGroup, 
  HiOutlineShieldCheck,
  HiOutlineArrowRight,
  HiOutlineLocationMarker,
  HiOutlineClock,
  HiOutlineStar,
  HiOutlineChevronDown,
  HiOutlineBadgeCheck,
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineChatAlt2,
  HiSparkles,
  HiOutlineGlobe,
  HiOutlineShoppingBag,
  HiOutlineCheckCircle,
  HiX,
  HiOutlineKey
} from "react-icons/hi";

// --- ANIMATION VARIANTS ---
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", bounce: 0.4 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function GuestDashboard() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [openFaq, setOpenFaq] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // State Baru untuk Fungsionalitas Interaktif
  const [toast, setToast] = useState(null);
  const [isDoctorModalOpen, setIsDoctorModalOpen] = useState(false);
  const [crmEmail, setCrmEmail] = useState("");

  // --- SERVICES AUTOMATION STATE ---
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    patientName: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: ""
  });
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState("");

  // --- API CONFIG ---
  const API_URL = "https://qovurxrovzstbawkswnj.supabase.co/rest/v1/appointments";
  const API_KEY = "sb_publishable_JGk5Hx18sBrMOWwxuQ6Ztg_xID5Yepl";
  const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
    Prefer: "return=representation"
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fungsi Global Toast (Notifikasi)
  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3500);
  };

  const handleCrmSubmit = (e) => {
    e.preventDefault();
    if(crmEmail) {
      showToast(`Terima kasih! Voucher diskon telah dikirim ke ${crmEmail}`);
      setCrmEmail("");
    }
  };

  // --- SERVICES AUTOMATION: AUTO BOOKING ---
  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingForm({ ...bookingForm, [name]: value });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingLoading(true);
    setBookingSuccess("");

    try {
      const payload = {
        patientname: bookingForm.patientName,
        service: bookingForm.service,
        date: `${bookingForm.date} ${bookingForm.time}`,
        status: "Scheduled"
      };

      await axios.post(API_URL, payload, { headers });
      
      setBookingSuccess("Booking berhasil! Kami akan menghubungi Anda untuk konfirmasi.");
      setBookingForm({ patientName: "", email: "", phone: "", service: "", date: "", time: "" });
      setTimeout(() => setBookingSuccess(""), 5000);
    } catch (err) {
      showToast("Gagal melakukan booking. Silakan coba lagi.");
      console.error(err);
    } finally {
      setBookingLoading(false);
    }
  };

  // --- DATA MOCKUP LAMA & BARU ---
  const treatments = [
    { id: 1, category: "facial", title: "Organic Facial Glow", desc: "Facial organik dengan bahan alami pilihan untuk kulit cerah alami.", price: "350k", icon: <HiOutlineSparkles />, img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=500&q=80", tag: "Facial Premium" },
    { id: 2, category: "laser", title: "Pico Laser Premium", desc: "Teknologi laser pikodetik untuk hasil maksimal tanpa downtime.", price: "1,500k", icon: <HiOutlineShieldCheck />, img: "https://images.unsplash.com/photo-1614859324967-bdf461fcf769?auto=format&fit=crop&w=500&q=80", tag: "Laser Tech" },
    { id: 3, category: "anti-aging", title: "Anti-Aging Therapy", desc: "Peremajaan kulit dengan metode terbaru untuk tampil lebih muda.", price: "2,500k", icon: <HiOutlineStar />, img: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=500&q=80", tag: "Rejuvenation" },
    { id: 4, category: "body", title: "Body Contouring", desc: "Bentuk tubuh ideal dengan teknologi non-invasif terpercaya.", price: "3,200k", icon: <HiOutlineCalendar />, img: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=500&q=80", tag: "Body Care" },
    { id: 5, category: "facial", title: "VIP Facial Gold", desc: "Facial eksklusif dengan serum emas 24K untuk kilau mewah.", price: "850k", icon: <HiOutlineUserGroup />, img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=500&q=80", tag: "Gold Series" },
    { id: 6, category: "konsultasi", title: "Konsultasi Privat", desc: "Konsultasi 1-on-1 dengan dokter spesialis kulit terpercaya.", price: "200k", icon: <HiOutlineBadgeCheck />, img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=500&q=80", tag: "Exclusive" }
  ];

  const testimonials = [
    { id: 1, name: "Alinea Putri", role: "Aktris & Model", text: "GlowCare bukan sekadar klinik, tapi tempat pelarian saya. Hasil Pico Laser mereka luar biasa. Wajah saya glowing maksimal sebelum syuting.", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" },
    { id: 2, name: "Dinda Kirana", role: "Entrepreneur", text: "Pelayanan mewah dan private. Ultherapy di sini adalah investasi terbaik untuk kulit saya! Kulit terasa 5 tahun lebih muda.", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80" },
    { id: 3, name: "Michelle Tan", role: "Beauty Vlogger", text: "Peralatan tercanggih yang pernah saya lihat. Sentuhan dokter-dokternya sangat profesional dan teliti. Sangat direkomendasikan!", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&q=80" }
  ];

  const faqs = [
    { q: "Apakah seluruh tindakan di GlowCare ditangani langsung oleh dokter?", a: "Ya, 100% tindakan medis invasif seperti laser tingkat tinggi dan injeksi dilakukan langsung oleh Dokter Spesialis Dermatologi (Sp.DVE) bersertifikasi." },
    { q: "Berapa lama waktu downtime setelah melakukan perawatan Pico Laser?", a: "PicoGold Tech kami meminimalkan kerusakan permukaan kulit. Downtime biasanya hanya berupa kemerahan ringan selama 2-4 jam saja." },
    { q: "Bagaimana sistem reservasi dan pembatalan jadwal?", a: "Anda dapat menjadwalkan ulang maksimal 24 jam sebelum waktu janji temu melalui portal digital ini atau dengan menghubungi Concierge kami." }
  ];

  const products = [
    { id: 1, name: "Luminous Rose Serum", category: "Brightening", price: "Rp 450.000", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80", isBestSeller: true },
    { id: 2, name: "GlowCare Sunscreen SPF 50+", category: "Protection", price: "Rp 185.000", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=400&q=80", isBestSeller: true },
    { id: 3, name: "Retinol Night Repair", category: "Anti-Aging", price: "Rp 320.000", image: "https://images.unsplash.com/photo-1608248593802-8eb3a13775e1?auto=format&fit=crop&w=400&q=80", isBestSeller: false },
    { id: 4, name: "Soothing Aloe Cleanser", category: "Cleansing", price: "Rp 120.000", image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=400&q=80", isBestSeller: false },
  ];

  const memberships = [
    { tier: "Silver Member", condition: "Daftar Akun Gratis", icon: "✨", color: "from-slate-200 to-slate-100", textColor: "text-slate-700", benefits: ["Poin setiap transaksi", "Diskon 5% Facial Basic", "Promo Ulang Tahun"] },
    { tier: "Gold Member", condition: "Min. Belanja 5 Juta", icon: "🌟", color: "from-amber-200 to-amber-100", textColor: "text-amber-800", benefits: ["Semua benefit Silver", "Diskon 10% Laser & Produk", "Bebas Antre VIP", "Akses event eksklusif"] },
    { tier: "Platinum VIP", condition: "Min. Belanja 15 Juta", icon: "💎", color: "from-[#12243A] to-slate-800", textColor: "text-white", benefits: ["Semua benefit Gold", "Diskon 20% Semua Layanan", "Private Room Upgrade", "Dedicated Concierge 24/7"] },
  ];

  const expertDoctors = [
    { name: "dr. Adrian Hardian, Sp.DVE", spec: "Advanced Aesthetics Laser", img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80", edu: "Harvard Medical Fellowship" },
    { name: "dr. Valerie Amanda, Sp.DVE", spec: "Injectable Fillers & Collagen", img: "https://images.unsplash.com/photo-1594824813573-246434e3b96f?auto=format&fit=crop&w=300&q=80", edu: "Seoul National Aesthetic Science" },
    { name: "dr. Jeremy Christian, Sp.DVE", spec: "Chronic Acne Management", img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&q=80", edu: "Universitas Indonesia" },
    { name: "dr. Sarah Wijaya, Sp.KK", spec: "Anti-Aging Rejuvenation", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80", edu: "Tokyo Dermatology Center" }
  ];

  const filteredTreatments = activeCategory === "all" ? treatments : treatments.filter(t => t.category === activeCategory);

  return (
    <div className="w-full min-h-screen bg-[#F2F6F4] font-sans text-[#12243A] overflow-x-hidden selection:bg-[#E5806A] selection:text-white scroll-smooth relative">
      
      {/* --- GLOBAL STYLE: CSS VARIABLES & ANIMATIONS --- */}
      <style>{`
        :root {
          --primary: #E5806A;
          --primary-dark: #D46B54;
          --navy: #12243A;
          --cream: #F2F6F4;
          --soft-peach: #FFF0EC;
          --blush-border: #FFE4DC;
        }
        .text-gradient-coral {
          background: linear-gradient(135deg, #E5806A, #ff9b86);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(20px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 5s ease-in-out infinite;
        }
        @keyframes mesh-blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(30px, -20px) scale(1.1); }
          50% { transform: translate(-20px, 30px) scale(0.9); }
          75% { transform: translate(20px, 20px) scale(1.05); }
        }
        .mesh-blob {
          animation: mesh-blob 20s ease-in-out infinite;
        }
        .mesh-blob-2 {
          animation: mesh-blob 25s ease-in-out infinite reverse;
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .shimmer-badge {
          background: linear-gradient(90deg, transparent, rgba(229, 128, 106, 0.1), transparent);
          background-size: 200% 100%;
          animation: shimmer 3s ease-in-out infinite;
        }
      `}</style>

      {/* Background Ornaments */}
      <div className="fixed top-[-10%] right-[-5%] w-[800px] h-[800px] bg-[#E5806A]/10 rounded-full blur-[150px] pointer-events-none -z-10 mesh-blob"></div>
      <div className="fixed top-[40%] left-[-15%] w-[600px] h-[600px] bg-[#12243A]/5 rounded-full blur-[150px] pointer-events-none -z-10 mesh-blob-2"></div>
      <div className="fixed bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-[#FFF0EC]/50 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      {/* --- GLOBAL TOAST NOTIFICATION --- */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 50, x: '-50%' }} animate={{ opacity: 1, y: 0, x: '-50%' }} exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-10 left-1/2 z-[300] bg-[#12243A] text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 font-medium text-sm border border-slate-700 whitespace-nowrap"
          >
            <HiOutlineCheckCircle size={18} className="text-[#E5806A]" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MODAL DAFTAR DOKTER --- */}
      <AnimatePresence>
        {isDoctorModalOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsDoctorModalOpen(false)} className="fixed inset-0 bg-[#12243A]/60 backdrop-blur-sm z-[200]" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-2xl bg-white z-[250] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-[#F2F6F4]">
                <h3 className="font-bold text-[#12243A] text-xl flex items-center gap-2"><HiOutlineUserGroup className="text-[#E5806A]"/> Profil Dokter Spesialis</h3>
                <button onClick={() => setIsDoctorModalOpen(false)} className="p-2 bg-white text-slate-400 hover:text-[#E5806A] rounded-full shadow-sm"><HiX size={20} /></button>
              </div>
              <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
                {expertDoctors.map((doc, idx) => (
                  <div key={idx} className="flex gap-4 items-center bg-white border border-slate-100 p-4 rounded-2xl hover:shadow-md transition-shadow">
                    <img src={doc.img} alt={doc.name} className="w-16 h-16 rounded-xl object-cover" />
                    <div>
                      <h4 className="font-bold text-[#12243A] text-sm">{doc.name}</h4>
                      <p className="text-[10px] text-[#E5806A] font-bold uppercase tracking-wider">{doc.spec}</p>
                      <p className="text-[10px] text-slate-400 mt-1">{doc.edu}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ==========================================
          1. NAVIGATION — REDESIGN ELEGANT MINIMALIS
         ========================================== */}
      <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${isScrolled ? 'pt-0 pb-0 shadow-sm' : 'pt-0 pb-0'}`}>
        <nav className={`max-w-full px-6 sm:px-8 lg:px-12 flex justify-between items-center transition-all duration-500 ${isScrolled ? 'bg-[rgba(242,246,244,0.85)] backdrop-blur-xl border-b border-[rgba(18,36,58,0.08)]' : 'bg-[rgba(242,246,244,0)] backdrop-blur-none border-b border-transparent'}`}>
          <div className="flex items-center space-x-3 py-4 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <motion.div whileHover={{ rotate: 15 }} className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-[rgba(229,128,106,0.2)]">
              <HiOutlineSparkles className="text-[#E5806A] text-xl" />
            </motion.div>
            <span className="text-xl font-serif font-black tracking-tight text-[#12243A]">Glow<span className="text-gradient-coral font-medium">Care</span></span>
          </div>

          <div className="hidden md:flex items-center space-x-8 text-xs font-bold tracking-wider text-[#12243A]/70">
            <a href="#hero" className="hover:text-[#E5806A] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#E5806A] after:transition-all hover:after:w-full">Beranda</a>
            <a href="#services" className="hover:text-[#E5806A] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#E5806A] after:transition-all hover:after:w-full">Layanan</a>
            <a href="#products" className="hover:text-[#E5806A] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#E5806A] after:transition-all hover:after:w-full">Produk</a>
            <a href="#testimonials" className="hover:text-[#E5806A] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#E5806A] after:transition-all hover:after:w-full">Testimoni</a>
            <a href="#footer" className="hover:text-[#E5806A] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#E5806A] after:transition-all hover:after:w-full">Kontak</a>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/login" className="hidden sm:block text-xs font-bold text-[#12243A] hover:bg-[#FFF0EC] hover:text-[#E5806A] px-5 py-2.5 rounded-full transition-all">Masuk</Link>
            <Link to="/register" className="bg-[#12243A] hover:bg-[#E5806A] text-white text-xs font-bold px-6 py-3.5 rounded-full transition-all shadow-lg active:scale-95 flex items-center gap-2">
              Daftar <HiOutlineArrowRight size={14} />
            </Link>
          </div>
        </nav>
      </header>

      {/* ==========================================
          2. HERO SECTION — REDESIGN
         ========================================== */}
      <section id="hero" className="max-w-7xl mx-auto px-6 sm:px-8 pt-44 pb-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-8 text-center lg:text-left">
          <motion.div variants={fadeUp} className="inline-flex items-center bg-[#FFF0EC] border border-[#FFE4DC] px-5 py-2.5 rounded-full text-[10px] font-black tracking-widest uppercase text-[#E5806A] shadow-sm">
            <HiOutlineSparkles className="mr-2" size={14} /> KLINIK KECANTIKAN PREMIUM SEJAK 2026
          </motion.div>
          
          <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl lg:text-[72px] font-serif text-[#12243A] leading-[1.05] tracking-tight">
            Temukan <br />
            <span className="text-gradient-coral italic font-bold">Pesona Alami</span> <br />
            Anda Bersama Kami
          </motion.h1>

          <motion.p variants={fadeUp} className="text-base text-slate-500 font-medium max-w-lg mx-auto lg:mx-0 leading-relaxed">Perawatan eksklusif dengan sentuhan dermatologi modern dan bahan premium pilihan untuk kulit yang sehat bercahaya.</motion.p>

          <motion.div variants={fadeUp} className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <motion.button onClick={() => showToast("Silakan Daftar/Masuk ke Dashboard Member untuk memulai reservasi.")} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto bg-[#12243A] text-white text-sm font-bold px-8 py-4.5 rounded-full shadow-xl shadow-[#12243A]/20 flex items-center justify-center space-x-3 transition-colors hover:bg-[#E5806A]">
              <HiOutlineCalendar size={18} /> <span>Booking Konsultasi</span>
            </motion.button>
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#services" className="w-full sm:w-auto text-center bg-transparent border border-[#12243A]/20 hover:border-[#E5806A] text-[#12243A] text-sm font-bold px-8 py-4.5 rounded-full transition-colors">
              Lihat Layanan
            </motion.a>
          </motion.div>

          <motion.div variants={fadeUp} className="flex items-center justify-center lg:justify-start gap-4 pt-6">
            <div className="flex -space-x-3">
              <img className="w-10 h-10 rounded-full border-2 border-[#F2F6F4] object-cover shadow-sm" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Patient" />
              <img className="w-10 h-10 rounded-full border-2 border-[#F2F6F4] object-cover shadow-sm" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80" alt="Patient" />
              <img className="w-10 h-10 rounded-full border-2 border-[#F2F6F4] object-cover shadow-sm" src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&q=80" alt="Patient" />
            </div>
            <div>
              <div className="flex text-[#E5806A] text-xs"><HiStar/><HiStar/><HiStar/><HiStar/><HiStar/></div>
              <p className="text-xs font-bold text-slate-500 mt-1">Dipercaya 5,000+ Pasien</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="relative flex justify-center items-center">
          <div className="absolute inset-0 bg-[#E5806A]/20 blur-[80px] rounded-full"></div>
          <div className="relative w-[90%] max-w-[420px] aspect-[4/5] bg-white rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white z-20">
            <img src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80" alt="Facial Treatment" className="w-full h-full object-cover" />
          </div>
          <div className="absolute top-8 -left-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-[#FFE4DC] z-30 flex items-center gap-3 animate-float">
            <div className="w-10 h-10 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center"><HiSparkles size={20}/></div>
            <div><p className="text-xs font-bold text-[#12243A]">4.9/5 Rating</p><p className="text-[10px] text-slate-400 font-medium">Kepuasan Pasien</p></div>
          </div>
          <div className="absolute bottom-16 -right-6 bg-[#FFF0EC]/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-[#FFE4DC] z-30 flex items-center gap-3 animate-float-slow">
            <div className="w-10 h-10 bg-[#FFF0EC] text-[#E5806A] rounded-xl flex items-center justify-center"><HiOutlineBadgeCheck size={20}/></div>
            <div><p className="text-xs font-bold text-[#12243A]">100% Organic</p><p className="text-[10px] text-slate-400 font-medium">Bahan Premium</p></div>
          </div>
        </motion.div>
      </section>

      {/* ==========================================
          3. STATS — REDESIGN
         ========================================== */}
      <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="max-w-6xl mx-auto px-6 sm:px-8 mb-24 relative z-10">
        <div className="bg-[#FDFCFA] rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-[rgba(201,169,97,0.2)] flex flex-wrap md:flex-nowrap justify-around items-center gap-6">
          <div className="text-center px-4 w-1/2 md:w-auto group hover:-translate-y-2 transition-transform duration-300">
            <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-[#E5806A] to-[#9CAF88] rounded-2xl flex items-center justify-center text-white shadow-sm">
              <HiOutlineUserGroup size={22} />
            </div>
            <h3 className="text-4xl font-serif font-bold text-[#12243A] mb-1">15<span className="text-[#E5806A]">+</span></h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">DOKTER SPESIALIS</p>
          </div>
          <div className="hidden md:block w-px h-12 bg-slate-200/50"></div>
          <div className="text-center px-4 w-1/2 md:w-auto group hover:-translate-y-2 transition-transform duration-300">
            <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-[#E5806A] to-[#9CAF88] rounded-2xl flex items-center justify-center text-white shadow-sm">
              <HiOutlineSparkles size={22} />
            </div>
            <h3 className="text-4xl font-serif font-bold text-[#12243A] mb-1">50<span className="text-[#E5806A]">+</span></h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">TREATMENT PREMIUM</p>
          </div>
          <div className="hidden md:block w-px h-12 bg-slate-200/50"></div>
          <div className="text-center px-4 w-1/2 md:w-auto group hover:-translate-y-2 transition-transform duration-300">
            <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-[#E5806A] to-[#9CAF88] rounded-2xl flex items-center justify-center text-white shadow-sm">
              <HiOutlineStar size={22} />
            </div>
            <h3 className="text-4xl font-serif font-bold text-[#12243A] mb-1">10K<span className="text-[#E5806A]">+</span></h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">PASIEN BAHAGIA</p>
          </div>
          <div className="hidden md:block w-px h-12 bg-slate-200/50"></div>
          <div className="text-center px-4 w-1/2 md:w-auto group hover:-translate-y-2 transition-transform duration-300">
            <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-[#E5806A] to-[#9CAF88] rounded-2xl flex items-center justify-center text-white shadow-sm">
              <HiOutlineBadgeCheck size={22} />
            </div>
            <h3 className="text-4xl font-serif font-bold text-[#12243A] mb-1">100<span className="text-[#E5806A]">%</span></h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">BAHAN ORGANIK</p>
          </div>
        </div>
      </motion.section>

      {/* ==========================================
          4. WHY CHOOSE US — NEW SECTION
         ========================================== */}
      <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="max-w-7xl mx-auto px-6 sm:px-8 py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Kolom Kiri — Image & Floating Badges */}
          <motion.div variants={fadeUp} className="relative flex justify-center items-center">
            <div className="absolute inset-0 bg-[#E5806A]/15 blur-[80px] rounded-full"></div>
            <div className="relative w-full max-w-[480px] aspect-[4/5] bg-white rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white z-20">
              <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80" alt="GlowCare Clinic Interior" className="w-full h-full object-cover" />
            </div>
            <div className="absolute top-8 -left-4 bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl shadow-xl border border-[#FFE4DC] z-30 flex items-center gap-3 animate-float">
              <HiOutlineBadgeCheck size={22} className="text-[#E5806A]" />
              <div>
                <p className="text-xs font-bold text-[#12243A]">Best Clinic 2025</p>
                <p className="text-[10px] text-slate-400 font-medium">Award Winner</p>
              </div>
            </div>
            <div className="absolute bottom-16 -right-4 bg-[#FFF0EC]/95 backdrop-blur-md px-5 py-3 rounded-2xl shadow-xl border border-[#FFE4DC] z-30 flex items-center gap-3 animate-float-slow">
              <HiOutlineCheckCircle size={22} className="text-[#9CAF88]" />
              <div>
                <p className="text-xs font-bold text-[#12243A]">✓ BPOM Certified</p>
                <p className="text-[10px] text-slate-400 font-medium">Terdaftar Resmi</p>
              </div>
            </div>
          </motion.div>

          {/* Kolom Kanan — Content */}
          <motion.div variants={fadeUp} className="space-y-8 text-center lg:text-left">
            <span className="inline-flex items-center bg-[#FFF0EC] border border-[#FFE4DC] px-4 py-2 rounded-full text-[10px] font-black tracking-widest uppercase text-[#E5806A] shadow-sm">
              WHY CHOOSE US
            </span>
            
            <h2 className="text-4xl sm:text-5xl font-serif text-[#12243A] leading-tight">
              Mengapa <br />
              <span className="text-gradient-coral italic font-bold">Memilih</span> <br />
              GlowCare?
            </h2>

            <p className="text-base text-slate-500 font-medium max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Kami menggabungkan keahlian medis dengan bahan premium untuk memberikan hasil terbaik bagi kulit Anda.
            </p>

            <div className="space-y-6 pt-4">
              {[
                { icon: HiOutlineShieldCheck, title: "Dermatolog Bersertifikat", desc: "Ditangani langsung oleh Sp.DVE berpengalaman" },
                { icon: HiOutlineSparkles, title: "Teknologi Terkini", desc: "Menggunakan peralatan estetika paling modern" },
                { icon: HiOutlineUserGroup, title: "Pendekatan Personal", desc: "Setiap treatment disesuaikan dengan kebutuhan kulit Anda" },
                { icon: HiOutlineBadgeCheck, title: "Bahan Premium 100%", desc: "Hanya menggunakan bahan organik dan aman" }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF0EC] text-[#E5806A] flex items-center justify-center shrink-0">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#12243A] text-sm">{item.title}</h4>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ==========================================
          5. SERVICES GRID — REDESIGN
         ========================================== */}
      <motion.section id="services" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="max-w-7xl mx-auto px-6 sm:px-8 py-10 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#E5806A] bg-[#FFF0EC] px-4 py-2 rounded-full border border-[#FFE4DC]">Layanan Premium</span>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#12243A] pt-4">Eksklusif Untuk <span className="text-[#E5806A] italic">Kebutuhan</span> Anda</h2>
          <p className="text-sm text-slate-500 font-medium pt-2">Rasakan pengalaman perawatan bertaraf internasional dengan privasi maksimal dan hasil yang memukau.</p>
        </div>

        <div className="flex justify-center mb-10">
          <div className="flex flex-wrap justify-center gap-2 bg-white/50 backdrop-blur-sm p-2 rounded-full border border-white/60 shadow-sm">
            {["all", "facial", "laser", "anti-aging", "body", "konsultasi"].map((cat) => (
              <button
                key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 relative ${activeCategory === cat ? "text-white" : "text-slate-500 hover:text-[#12243A]"}`}
              >
                {activeCategory === cat && <motion.div layoutId="activeTab" className="absolute inset-0 bg-[#12243A] rounded-full -z-10" />}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredTreatments.map((treatment) => (
              <motion.div 
                key={treatment.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }}
                className="bg-[#FDFCFA] rounded-[2.5rem] shadow-sm border border-[rgba(154,175,136,0.2)] overflow-hidden hover:-translate-y-2 hover:shadow-lg hover:border-[#E5806A]/30 transition-all duration-300 flex flex-col group"
              >
                <div className="relative h-52 overflow-hidden">
                  <img src={treatment.img} alt={treatment.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                  <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-[#12243A] text-[10px] font-black tracking-wider uppercase px-4 py-2 rounded-xl shadow-sm">{treatment.tag}</span>
                </div>
                <div className="p-6 space-y-3 flex flex-col flex-1">
                  <h4 className="font-black text-lg text-[#12243A] tracking-tight group-hover:text-[#E5806A] transition-colors">{treatment.title}</h4>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed flex-1">{treatment.desc}</p>
                  <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Starting from</p>
                      <p className="font-black text-lg text-[#12243A]">IDR {treatment.price}</p>
                    </div>
                    <button onClick={() => showToast("Login untuk memesan layanan ini.")} className="w-10 h-10 bg-[#F2F6F4] rounded-2xl flex items-center justify-center text-[#12243A] hover:bg-[#E5806A] hover:text-white transition-colors shadow-sm"><HiOutlineArrowRight size={18} /></button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.section>

      {/* ==========================================
          6. OUR PROCESS — NEW SECTION
         ========================================== */}
      <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="max-w-7xl mx-auto px-6 sm:px-8 py-24 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="inline-flex items-center bg-[#FFF0EC] border border-[#FFE4DC] px-4 py-2 rounded-full text-[10px] font-black tracking-widest uppercase text-[#E5806A] shadow-sm">
            OUR PROCESS
          </span>
          <h2 className="text-4xl sm:text-5xl font-serif text-[#12243A] pt-4">
            Langkah Mudah Menuju <span className="text-gradient-coral italic font-bold">Kulit Impian</span>
          </h2>
          <p className="text-sm text-slate-500 font-medium pt-2">Empat langkah sederhana untuk memulai perjalanan kecantikan Anda bersama GlowCare.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { step: "01", icon: HiOutlineCalendar, title: "Konsultasi Online", desc: "Jadwalkan konsultasi via video call dengan dokter kami" },
            { step: "02", icon: HiOutlineShieldCheck, title: "Diagnosa Kulit", desc: "Analisis kulit menyeluruh dengan teknologi AI terkini" },
            { step: "03", icon: HiOutlineSparkles, title: "Treatment Premium", desc: "Nikmati perawatan eksklusif yang dipersonalisasi" },
            { step: "04", icon: HiOutlineBadgeCheck, title: "Hasil Memukau", desc: "Dapatkan kulit sehat bercahaya yang Anda impikan" }
          ].map((item, idx) => (
            <motion.div key={idx} variants={fadeUp} className="text-center p-8 bg-[#FDFCFA] rounded-[2.5rem] border border-[rgba(229,128,106,0.15)] shadow-sm hover:-translate-y-2 hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-4 right-6 text-6xl font-serif font-bold text-[#E5806A]/10 select-none">{item.step}</div>
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[#E5806A] to-[#9CAF88] rounded-2xl flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300">
                <item.icon size={28} />
              </div>
              <h4 className="font-bold text-lg text-[#12243A] mb-3">{item.title}</h4>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ==========================================
          7. NEW SECTION: PRODUCTS & BEST SELLERS
         ========================================== */}
      <motion.section id="products" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="max-w-7xl mx-auto px-6 sm:px-8 py-24 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#E5806A] bg-[#FFF0EC] px-4 py-2 rounded-full border border-[#FFE4DC]">GlowCare Shop</span>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#12243A] pt-4">Rangkaian <span className="text-[#E5806A] italic">Produk</span> Ahli</h2>
          <p className="text-sm text-slate-500 font-medium pt-2">Diformulasikan secara medis untuk mempertahankan hasil perawatan Anda di rumah.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <motion.div key={product.id} variants={fadeUp} className="bg-white p-6 rounded-[2.5rem] shadow-sm hover:shadow-xl border border-slate-50 transition-all duration-300 relative group flex flex-col">
              {product.isBestSeller && (
                <div className="absolute top-4 left-4 z-10 bg-[#E5806A] text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md">
                  Best Seller
                </div>
              )}
              <div className="h-48 rounded-[1.5rem] overflow-hidden bg-[#F2F6F4] mb-6 relative">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">{product.category}</p>
                  <h3 className="text-base font-bold text-[#12243A] leading-tight mb-2 group-hover:text-[#E5806A] transition-colors">{product.name}</h3>
                </div>
                <div>
                  <p className="text-lg font-black text-[#12243A] mt-4 mb-4">{product.price}</p>
                  <button onClick={() => showToast(`Login untuk menambahkan ${product.name} ke keranjang.`)} className="w-full bg-[#12243A] text-white py-3 rounded-xl text-xs font-bold hover:bg-[#E5806A] transition-colors flex justify-center items-center gap-2">
                    <HiOutlineShoppingBag size={16} /> Beli Produk
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ==========================================
          8. MEMBERSHIP TIERS (LOYALTY)
         ========================================== */}
      <motion.section id="membership" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="max-w-7xl mx-auto px-6 sm:px-8 pb-24 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#12243A] bg-slate-200 px-4 py-2 rounded-full border border-slate-300">GlowCare Club</span>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#12243A] pt-4">Tingkatkan <span className="text-[#E5806A] italic">Keuntungan</span> Anda</h2>
          <p className="text-sm text-slate-500 font-medium pt-2">Bergabung dengan membership kami dan nikmati privilege eksklusif setiap kali Anda berkunjung.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
          {memberships.map((membership, idx) => (
            <motion.div key={idx} variants={fadeUp} className={`p-8 rounded-[2.5rem] shadow-lg border relative flex flex-col h-full ${idx === 2 ? 'bg-[#12243A] border-slate-800 transform md:-translate-y-4' : 'bg-white border-slate-100'}`}>
              {idx === 2 && <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#E5806A] text-white text-[10px] font-black uppercase px-4 py-1.5 rounded-full shadow-md">Most Exclusive</div>}
              
              <div className="text-center mb-8 pt-4">
                <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${membership.color} flex items-center justify-center text-3xl mb-4 shadow-sm`}>{membership.icon}</div>
                <h3 className={`text-2xl font-black ${membership.textColor}`}>{membership.tier}</h3>
                <p className={`text-xs font-bold mt-2 px-3 py-1 inline-block rounded-full ${idx === 2 ? 'bg-white/10 text-white/80' : 'bg-slate-100 text-slate-500'}`}>{membership.condition}</p>
              </div>

              <ul className="space-y-4 flex-1">
                {membership.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <HiOutlineCheckCircle className={`shrink-0 ${idx === 2 ? 'text-[#E5806A]' : 'text-emerald-500'}`} size={20} />
                    <span className={`text-sm font-medium ${idx === 2 ? 'text-slate-300' : 'text-slate-600'}`}>{benefit}</span>
                  </li>
                ))}
              </ul>

              <Link to="/register" className={`w-full mt-10 py-4 rounded-xl text-sm font-bold transition-all text-center ${idx === 2 ? 'bg-[#E5806A] text-white hover:bg-[#D46B54]' : 'bg-[#F2F6F4] text-[#12243A] hover:bg-[#12243A] hover:text-white'}`}>
                Daftar Sekarang
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ==========================================
          9. BEFORE & AFTER GALLERY
         ========================================== */}
      <motion.section id="results" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="max-w-7xl mx-auto px-6 sm:px-8 py-24 bg-white border border-slate-100 rounded-[40px] shadow-sm relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#E5806A] bg-[#FFF0EC] px-4 py-2 rounded-full border border-[#FFE4DC]">Clinical Proof</span>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#12243A]">Real Patient Transformations</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div whileHover={{ y: -5 }} className="bg-[#F2F6F4] p-6 sm:p-8 rounded-[3rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] group">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5]"><img src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80" alt="Before" className="w-full h-full object-cover grayscale opacity-90 transition-all duration-500 group-hover:grayscale-0" /><span className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md text-[#12243A] text-[9px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full shadow-sm">BEFORE</span></div>
              <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] shadow-md border-2 border-white"><img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80" alt="After" className="w-full h-full object-cover" /><span className="absolute bottom-4 left-4 bg-[#E5806A] text-white text-[9px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full shadow-md">AFTER</span></div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-50">
              <h4 className="font-bold text-[#12243A] text-base tracking-tight">Acne Vulgaris Eradication</h4>
              <p className="text-xs text-slate-500 mt-1">2x PicoGold Pore-Eraser Tech + Serum Infusion</p>
            </div>
          </motion.div>
          <motion.div whileHover={{ y: -5 }} className="bg-[#F2F6F4] p-6 sm:p-8 rounded-[3rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] group">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5]"><img src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80" alt="Before" className="w-full h-full object-cover opacity-80 filter contrast-125 transition-all duration-500 group-hover:contrast-100" /><span className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md text-[#12243A] text-[9px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full shadow-sm">BEFORE</span></div>
              <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] shadow-md border-2 border-white"><img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" alt="After" className="w-full h-full object-cover" /><span className="absolute bottom-4 left-4 bg-[#E5806A] text-white text-[9px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full shadow-md">AFTER</span></div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-50">
              <h4 className="font-bold text-[#12243A] text-base tracking-tight">Volume Restoration</h4>
              <p className="text-xs text-slate-500 mt-1">1x DNA Salmon Booster + Anti-Aging Lifting</p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ==========================================
          8. TESTIMONIALS — REDESIGN
         ========================================== */}
      <motion.section id="testimonials" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="max-w-7xl mx-auto px-6 sm:px-8 py-24 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#E5806A] bg-[#FFF0EC] px-4 py-2 rounded-full border border-[#FFE4DC]">TESTIMONI</span>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#12243A]">Cerita dari <span className="text-gradient-coral italic font-bold">Klien</span> Kami</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testi) => (
            <motion.div key={testi.id} variants={fadeUp} className="bg-[#FDFCFA] p-10 rounded-[3rem] shadow-sm border border-[rgba(255,228,220,0.5)] hover:-translate-y-2 hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-8 left-8 text-5xl text-[#E5806A]/10 font-serif leading-none z-0">“</div>
              <div className="relative z-10 pt-4">
                <div className="flex text-amber-400 text-sm mb-6"><HiStar/><HiStar/><HiStar/><HiStar/><HiStar/></div>
                <p className="text-sm text-slate-600 font-medium italic leading-relaxed mb-10">"{testi.text}"</p>
              </div>
              <div className="flex items-center gap-4 relative z-10 border-t border-[#FFE4DC] pt-6">
                <img src={testi.avatar} alt={testi.name} className="w-14 h-14 rounded-full object-cover shadow-sm border-2 border-[#FFE4DC]" />
                <div>
                  <h4 className="font-bold text-[#12243A] text-sm">{testi.name}</h4>
                  <p className="text-[10px] font-bold text-[#E5806A] uppercase tracking-widest mt-0.5">{testi.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ==========================================
          9. GALLERY PREVIEW — NEW SECTION
         ========================================== */}
      <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="max-w-7xl mx-auto px-6 sm:px-8 py-24 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="inline-flex items-center bg-[#FFF0EC] border border-[#FFE4DC] px-4 py-2 rounded-full text-[10px] font-black tracking-widest uppercase text-[#E5806A] shadow-sm">
            GALLERY
          </span>
          <h2 className="text-4xl sm:text-5xl font-serif text-[#12243A] pt-4">
            Inspirasi <span className="text-gradient-coral italic font-bold">Kecantikan</span> Dari Kami
          </h2>
          <p className="text-sm text-slate-500 font-medium pt-2">Lihat sendiri hasil dan suasana perawatan di GlowCare Clinic.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80"
          ].map((url, idx) => (
            <motion.div key={idx} variants={fadeUp} className="relative rounded-[2rem] overflow-hidden group cursor-pointer aspect-[4/5]">
              <img src={url} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-[#12243A]/0 group-hover:bg-[#12243A]/40 transition-all duration-500"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                <HiOutlineSparkles className="text-white text-3xl" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ==========================================
          11. DOCTORS & FAQ
         ========================================== */}
      <motion.section id="doctors" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="max-w-7xl mx-auto px-6 sm:px-8 pt-10 pb-20 relative z-10">
        <div className="bg-[#12243A] rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative shadow-2xl">
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#E5806A]/30 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="md:w-1/2 space-y-6 relative z-10 text-center md:text-left">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#E5806A] border border-[#E5806A]/30 px-4 py-2 rounded-full bg-white/5">MEDICAL EXPERTS</span>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white leading-tight">Board of <br/><span className="text-[#FFF0EC] italic">Dermatologists.</span></h2>
            <p className="text-slate-300 font-medium text-sm leading-relaxed max-w-md mx-auto md:mx-0">Semua tindakan di GlowCare dipimpin oleh akademisi klinis murni lulusan institusi top global demi akurasi diagnosa tanpa tebak-tebakan.</p>
            <button onClick={() => setIsDoctorModalOpen(true)} className="bg-[#E5806A] text-white px-8 py-4 rounded-full text-sm font-bold mt-4 hover:bg-[#D46B54] transition-colors shadow-lg shadow-[#E5806A]/20">Lihat Profil Dokter</button>
          </div>
          
          <div className="md:w-1/2 relative z-10 w-full max-w-md">
             <div className="space-y-4">
              {faqs.slice(0, 3).map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={index} className={`backdrop-blur-md rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen ? 'bg-white/20 border-white/30' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                    <button onClick={() => setOpenFaq(isOpen ? null : index)} className="w-full px-6 py-5 flex justify-between items-center text-left text-white text-sm font-bold">
                      <span className="pr-4">{faq.q}</span>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'bg-[#E5806A]' : 'bg-white/10'}`}>
                        <HiOutlineChevronDown size={18} className={`transform transition-transform ${isOpen ? "rotate-180" : ""}`} />
                      </div>
                    </button>
                    <div className={`transition-all duration-300 ease-in-out ${isOpen ? "max-h-48 p-6 pt-0 opacity-100" : "max-h-0 opacity-0 p-0"}`}>
                      <p className="text-xs text-slate-200 leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.section>

      {/* ==========================================
          12. CRM LEAD GENERATION (NEWSLETTER)
         ========================================== */}
      <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="max-w-4xl mx-auto px-6 sm:px-8 mb-20 relative z-10">
        <div className="bg-white rounded-[3rem] p-10 sm:p-14 shadow-lg border border-slate-100 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#E5806A]/10 rounded-full blur-2xl"></div>
          <div className="w-16 h-16 mx-auto bg-[#FFF0EC] text-[#E5806A] rounded-2xl flex items-center justify-center mb-6 shadow-sm"><HiOutlineKey size={28}/></div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#12243A] mb-3">Dapatkan Analisa Kulit <span className="text-[#E5806A] italic">Gratis</span></h2>
          <p className="text-sm text-slate-500 font-medium mb-8 max-w-lg mx-auto">Berlangganan newsletter GlowCare sekarang dan klaim voucher potongan Rp 50.000 untuk transaksi pertama Anda.</p>
          
          <form onSubmit={handleCrmSubmit} className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
            <input 
              type="email" 
              required
              placeholder="Alamat Email Anda" 
              className="flex-1 px-6 py-4 bg-[#F2F6F4] rounded-full text-sm outline-none focus:ring-2 focus:ring-[#E5806A] border-none text-[#12243A]"
              value={crmEmail}
              onChange={(e) => setCrmEmail(e.target.value)}
            />
            <button type="submit" className="bg-[#12243A] hover:bg-[#E5806A] text-white px-8 py-4 rounded-full font-bold text-sm transition-colors shadow-md">Klaim</button>
          </form>
        </div>
      </motion.section>

      {/* ==========================================
           12. SERVICES AUTOMATION — AUTO BOOKING SYSTEM
          ========================================== */}
      <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="max-w-5xl mx-auto px-6 sm:px-8 mb-24 relative z-10">
        <div className="bg-white rounded-[3rem] p-8 sm:p-14 shadow-xl border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#E5806A]/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
              <span className="inline-flex items-center bg-[#FFF0EC] border border-[#FFE4DC] px-4 py-2 rounded-full text-[10px] font-black tracking-widest uppercase text-[#E5806A] shadow-sm">
                SERVICES AUTOMATION
              </span>
              <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#12243A] pt-4">Booking <span className="text-[#E5806A] italic">Otomatis</span></h2>
              <p className="text-sm text-slate-500 font-medium pt-2">Pilih treatment, isi data, dan dapatkan konfirmasi instan. Sistem kami akan mengatur jadwal untuk Anda.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              {/* Kolom Kiri: Info */}
              <div className="space-y-6">
                <div className="bg-[#F2F6F4] p-6 rounded-2xl border border-slate-100">
                  <h3 className="font-bold text-[#12243A] mb-4 flex items-center gap-2">
                    <HiOutlineClock className="text-[#E5806A]" size={20} />
                    Jam Operasional
                  </h3>
                  <div className="space-y-2 text-sm text-slate-600">
                    <div className="flex justify-between">
                      <span className="font-medium">Senin - Jumat</span>
                      <span className="font-bold text-[#12243A]">09:00 - 20:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Sabtu</span>
                      <span className="font-bold text-[#12243A]">10:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Minggu</span>
                      <span className="font-bold text-[#E5806A]">Tutup</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#F2F6F4] p-6 rounded-2xl border border-slate-100">
                  <h3 className="font-bold text-[#12243A] mb-4 flex items-center gap-2">
                    <HiOutlineUserGroup className="text-[#E5806A]" size={20} />
                    Layanan Tersedia
                  </h3>
                  <div className="space-y-2 text-sm">
                    {[
                      { name: "PicoGold Pore-Eraser", price: "Rp 1.500.000", duration: "60 menit" },
                      { name: "Anti-Aging Ultherapy", price: "Rp 2.500.000", duration: "90 menit" },
                      { name: "DNA Salmon Booster", price: "Rp 3.200.000", duration: "75 menit" },
                      { name: "Royal Oxygen Facial", price: "Rp 850.000", duration: "45 menit" }
                    ].map((svc, idx) => (
                      <div key={idx} className="flex justify-between items-center py-2 border-b border-slate-200 last:border-0">
                        <div>
                          <p className="font-medium text-[#12243A]">{svc.name}</p>
                          <p className="text-[10px] text-slate-500">{svc.duration}</p>
                        </div>
                        <span className="font-bold text-[#E5806A] text-xs">{svc.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Kolom Kanan: Form Booking */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold text-[#12243A] mb-6">Form Booking Otomatis</h3>
                
                {bookingSuccess && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 bg-[#CDEEDD]/40 text-black rounded-xl flex items-center gap-3 border border-[#CDEEDD]/60">
                    <HiOutlineCheckCircle size={20} className="text-emerald-600 shrink-0" />
                    <span className="text-sm font-medium">{bookingSuccess}</span>
                  </motion.div>
                )}

                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#12243A] uppercase tracking-wider mb-2">Nama Lengkap</label>
                    <input 
                      type="text" 
                      name="patientName" 
                      value={bookingForm.patientName}
                      onChange={handleBookingChange}
                      required
                      className="w-full px-4 py-3 bg-[#F2F6F4] border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E5806A] transition-all"
                      placeholder="Masukkan nama Anda"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#12243A] uppercase tracking-wider mb-2">Email</label>
                      <input 
                        type="email" 
                        name="email" 
                        value={bookingForm.email}
                        onChange={handleBookingChange}
                        required
                        className="w-full px-4 py-3 bg-[#F2F6F4] border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E5806A] transition-all"
                        placeholder="email@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#12243A] uppercase tracking-wider mb-2">No. Telepon</label>
                      <input 
                        type="tel" 
                        name="phone" 
                        value={bookingForm.phone}
                        onChange={handleBookingChange}
                        required
                        className="w-full px-4 py-3 bg-[#F2F6F4] border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E5806A] transition-all"
                        placeholder="+62 812-3456-7890"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#12243A] uppercase tracking-wider mb-2">Pilih Treatment</label>
                    <select 
                      name="service" 
                      value={bookingForm.service}
                      onChange={handleBookingChange}
                      required
                      className="w-full px-4 py-3 bg-[#F2F6F4] border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E5806A] transition-all cursor-pointer"
                    >
                      <option value="">-- Pilih Layanan --</option>
                      <option value="PicoGold Pore-Eraser">PicoGold Pore-Eraser - Rp 1.500.000</option>
                      <option value="Anti-Aging Ultherapy">Anti-Aging Ultherapy - Rp 2.500.000</option>
                      <option value="DNA Salmon Booster">DNA Salmon Booster - Rp 3.200.000</option>
                      <option value="Royal Oxygen Facial">Royal Oxygen Facial - Rp 850.000</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#12243A] uppercase tracking-wider mb-2">Tanggal</label>
                      <input 
                        type="date" 
                        name="date" 
                        value={bookingForm.date}
                        onChange={handleBookingChange}
                        required
                        className="w-full px-4 py-3 bg-[#F2F6F4] border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E5806A] transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#12243A] uppercase tracking-wider mb-2">Waktu</label>
                      <input 
                        type="time" 
                        name="time" 
                        value={bookingForm.time}
                        onChange={handleBookingChange}
                        required
                        className="w-full px-4 py-3 bg-[#F2F6F4] border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E5806A] transition-all"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={bookingLoading}
                    className="w-full mt-6 py-4 bg-[#12243A] text-white rounded-xl text-sm font-bold hover:bg-[#E5806A] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center gap-2"
                  >
                    {bookingLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Memproses...</span>
                      </>
                    ) : (
                      <>
                        <HiOutlineCheckCircle size={18} />
                        <span>Konfirmasi Booking</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ==========================================
           13. GRAND FINAL CONVERSION BANNER — REDESIGN
          ========================================== */}
      <motion.section id="booking-cta" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="max-w-5xl mx-auto px-6 sm:px-8 mb-32 relative z-10">
        <div className="w-full bg-gradient-to-br from-[#E5806A] to-[#9CAF88] rounded-[3rem] p-12 sm:p-20 relative overflow-hidden shadow-2xl text-center flex flex-col items-center">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/10 rounded-full blur-[100px] pointer-events-none"></div>

          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="w-16 h-16 mb-6 text-white flex items-center justify-center relative z-10 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
            <HiOutlineSparkles className="w-8 h-8 animate-pulse" />
          </motion.div>

          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-2 relative z-10 tracking-tight">Mulai Transformasi</h2>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold italic text-white/90 mb-6 relative z-10 tracking-tight">Eksklusif Anda</h2>
          
          <p className="text-sm text-white/80 font-medium max-w-lg mx-auto leading-relaxed relative z-10 mb-10">
            Jadwalkan konsultasi Anda bersama kami dan rasakan perawatan berstandar internasional dengan hasil yang memukau.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10 w-full sm:w-auto">
            <motion.button onClick={() => showToast("Silakan Daftar/Masuk ke Dashboard Member untuk memulai reservasi.")} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto bg-white text-[#12243A] hover:bg-[#FFF0EC] text-sm font-bold px-10 py-4.5 rounded-full shadow-xl transition-colors flex items-center justify-center gap-2">
              Booking Konsultasi <HiOutlineArrowRight size={18} />
            </motion.button>
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="https://wa.me/6285767858151" target="_blank" rel="noreferrer" className="w-full sm:w-auto bg-transparent border border-white/40 hover:border-white text-white text-sm font-bold px-8 py-4.5 rounded-full transition-colors flex items-center justify-center gap-3">
              <HiOutlinePhone size={18} /> Hubungi Concierge
            </motion.a>
          </div>
        </div>
      </motion.section>

      {/* ==========================================
           14. FOOTER — REDESIGN SOFT ELEGANT
          ========================================== */}
      <footer id="footer" className="bg-[#F5EFE6] pt-20 pb-10 relative z-10 border-t border-[rgba(18,36,58,0.08)]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 text-sm text-slate-500 mb-16">
          <div className="md:col-span-1 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-[rgba(229,128,106,0.2)]">
                <HiOutlineSparkles className="text-[#E5806A] text-xl" />
              </div>
              <span className="text-2xl font-serif font-black tracking-tight text-[#12243A]">Glow<span className="text-gradient-coral">Care</span></span>
            </div>
            <p className="leading-relaxed text-xs pr-4 font-medium text-slate-500">
              Mendefinisikan ulang standar kecantikan dan estetika medis melalui keahlian tanpa kompromi.
            </p>
          </div>

          <div className="md:col-span-1 space-y-5">
            <h5 className="text-[10px] font-black text-[#12243A] uppercase tracking-widest">NAVIGASI</h5>
            <ul className="space-y-4 text-xs font-medium">
              <li><a href="#hero" className="text-slate-500 hover:text-[#E5806A] transition-colors">Beranda</a></li>
              <li><a href="#services" className="text-slate-500 hover:text-[#E5806A] transition-colors">Layanan</a></li>
              <li><a href="#products" className="text-slate-500 hover:text-[#E5806A] transition-colors">Produk</a></li>
              <li><a href="#membership" className="text-slate-500 hover:text-[#E5806A] transition-colors">Membership</a></li>
            </ul>
          </div>

          <div className="md:col-span-1 space-y-5">
            <h5 className="text-[10px] font-black text-[#12243A] uppercase tracking-widest">LAYANAN POPULER</h5>
            <ul className="space-y-4 text-xs font-medium">
              <li><a href="#services" className="text-slate-500 hover:text-[#E5806A] transition-colors">PicoGold Pore-Eraser</a></li>
              <li><a href="#services" className="text-slate-500 hover:text-[#E5806A] transition-colors">Anti-Aging Ultherapy</a></li>
              <li><a href="#services" className="text-slate-500 hover:text-[#E5806A] transition-colors">DNA Salmon Booster</a></li>
              <li><a href="#services" className="text-slate-500 hover:text-[#E5806A] transition-colors">Royal Oxygen Facial</a></li>
            </ul>
          </div>

          <div className="md:col-span-1 space-y-5">
            <h5 className="text-[10px] font-black text-[#12243A] uppercase tracking-widest">KONTAK CONCIERGE</h5>
            <ul className="space-y-4 text-xs font-medium">
              <li className="flex items-start gap-3 text-slate-500">
                <HiOutlineLocationMarker className="text-[#E5806A] shrink-0 text-base" />
                <span>Pekanbaru, Riau, Indonesia</span>
              </li>
              <li className="flex items-center gap-3 text-slate-500">
                <HiOutlinePhone className="text-[#E5806A] shrink-0 text-base" />
                <span>+62 857 7685 8151</span>
              </li>
              <li className="flex items-center gap-3 text-slate-500">
                <HiOutlineMail className="text-[#E5806A] shrink-0 text-base" />
                <span>nabil24si@mahasiswa.pcr.ac.id</span>
              </li>
            </ul>
            <div className="flex gap-3 pt-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[#FFF0EC] flex items-center justify-center text-[#12243A] hover:bg-[#E5806A] hover:text-white transition-all"><HiOutlineChatAlt2 size={16}/></a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#FFF0EC] flex items-center justify-center text-[#12243A] hover:bg-[#E5806A] hover:text-white transition-all"><HiOutlineGlobe size={16}/></a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-8 border-t border-[rgba(18,36,58,0.1)] flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-400 font-medium uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} GlowCare Clinic. All rights reserved.</p>
          <p>Crafted with Precision & Passion</p>
        </div>
      </footer>

    </div>
  );
}

// Icon Bintang SVG Helper
function HiStar() {
  return <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" /></svg>;
}