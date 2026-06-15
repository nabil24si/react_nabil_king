// pages/GuestDashboard.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
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
  HiOutlineCheck
} from "react-icons/hi";

export default function GuestDashboard() {
  // State untuk filter kategori Treatment
  const [activeCategory, setActiveCategory] = useState("all");
  
  // State untuk FAQ Accordion
  const [openFaq, setOpenFaq] = useState(null);

  // Data Perawatan / Treatment Menu
  const treatments = [
    {
      id: 1,
      category: "laser",
      title: "PicoGold Pore-Eraser Tech",
      desc: "Standar emas pengecilan pori-pori wajah dan rekonstruksi jaringan bopeng akibat acne scar dengan pemulihan kilat.",
      price: "1,500k",
      tag: "Premium Laser",
      img: "https://images.unsplash.com/photo-1614859324967-bdf461fcf769?auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 2,
      category: "injection",
      title: "DNA Salmon Skin Booster",
      desc: "Mikro-injeksi molekul murni DNA Salmon untuk merangsang kolagen alami, mengunci hidrasi, dan menghapus kerutan halus.",
      price: "950k",
      tag: "Injection",
      img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 3,
      category: "holistic",
      title: "Glow Radiance Laser Infusion",
      desc: "Terapi peremajaan intensif menggunakan serum premium untuk mencerahkan noda hitam secara instan dalam sekali tindakan.",
      price: "450k",
      tag: "Therapy",
      img: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 4,
      category: "laser",
      title: "CO2 Fractional Resurfacing",
      desc: "Teknologi laser ablatif terkontrol untuk mengangkat sel kulit mati kronis dan merangsang lapisan kulit baru yang mulus.",
      price: "1,850k",
      tag: "Advanced Laser",
      img: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 5,
      category: "injection",
      title: "Sculptra Collagen Filler",
      desc: "Injeksi stimulator asam poli-L-laktat untuk mengembalikan volume wajah yang kendur agar tampak muda alami tanpa operasi.",
      price: "3,200k",
      tag: "Sculpting",
      img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 6,
      category: "holistic",
      title: "Medical Grade Oxygen Facial",
      desc: "Detoksifikasi kulit mendalam menggunakan semburan oksigen murni hiperbarik dan ekstraksi komedo steril tanpa rasa sakit.",
      price: "350k",
      tag: "Facial Spa",
      img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=500&q=80"
    }
  ];

  // Data FAQ
  const faqs = [
    {
      q: "Apakah seluruh tindakan di GlowCare ditangani langsung oleh dokter?",
      a: "Ya, 100% tindakan medis invasif seperti laser tingkat tinggi dan injeksi dilakukan langsung oleh Dokter Spesialis Dermatologi (Sp.DVE) bersertifikasi internasional. Tindakan facial basic dilakukan oleh perawat medis terlatih di bawah pengawasan ketat dokter."
    },
    {
      q: "Berapa lama waktu downtime setelah melakukan perawatan Pico Laser?",
      a: "PicoGold Tech kami menggunakan panjang gelombang mutakhir yang meminimalkan kerusakan permukaan kulit. Downtime biasanya hanya berupa kemerahan ringan selama 2-4 jam saja, setelah itu Anda bisa langsung beraktivitas dan menggunakan makeup."
    },
    {
      q: "Apakah produk skincare GlowCare aman untuk ibu hamil dan menyusui?",
      a: "Formulasi produk kami menganut asas 'Clinical Purity' yang bebas dari paraben, merkuri, dan hidrokuinon. Namun, kami selalu mewajibkan sesi konsultasi singkat gratis bersama dokter kami sebelum meresepkan produk khusus untuk ibu hamil."
    },
    {
      q: "Bagaimana sistem reservasi dan pembatalan jadwal?",
      a: "Anda dapat menjadwalkan ulang (reschedule) maksimal 24 jam sebelum waktu janji temu melalui portal digital ini. Hal ini demi menjaga komitmen waktu VIP service kami agar tidak ada antrean menumpuk di klinik."
    }
  ];

  const filteredTreatments = activeCategory === "all" 
    ? treatments 
    : treatments.filter(t => t.category === activeCategory);

  return (
    <div className="w-full min-h-screen bg-[#fafafa] font-poppins text-[#000000] overflow-x-hidden selection:bg-[#CDEEDD] scroll-smooth relative">
      
      {/* ==========================================
          GLOBAL BACKGROUND ELEMENTS (LUXURY SPA VIBES)
         ========================================== */}
      {/* 1. Faint Medical Vector Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0"></div>
      
      {/* 2. Abstract Giant Glowing Aura Blobs (Ambiance) */}
      <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-[#CDEEDD]/20 rounded-full blur-[140px] pointer-events-none z-0"></div>
      <div className="absolute top-[35%] right-[-10%] w-[500px] h-[500px] bg-[#FFD9D0]/20 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[20%] left-[-5%] w-[600px] h-[600px] bg-[#CDEEDD]/15 rounded-full blur-[150px] pointer-events-none z-0"></div>

      {/* 3. Ultra-Low Opacity Aesthetic Watermarks (Skincare Bottles & Clinic Silhouette Concept) */}
      <div className="absolute top-[22%] right-[8%] opacity-[0.03] text-black pointer-events-none z-0 hidden lg:block select-none">
        <HiOutlineSparkles size={380} className="rotate-12" />
      </div>
      <div className="absolute bottom-[38%] left-[4%] opacity-[0.02] text-black pointer-events-none z-0 hidden lg:block select-none">
        <HiOutlineShieldCheck size={320} className="-rotate-12" />
      </div>


      {/* ==========================================
          1. FLOATING LUXURY NAVIGATION
         ========================================== */}
      <div className="w-full px-4 sm:px-8 pt-4 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto bg-white/80 backdrop-blur-md border border-white/40 rounded-3xl px-6 py-4 flex justify-between items-center shadow-sm transition-all duration-300">
          <div className="flex items-center space-x-2.5 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-9 h-9 bg-[#CDEEDD] rounded-2xl flex items-center justify-center shadow-inner transition-transform group-hover:rotate-12 duration-300">
              <HiOutlineSparkles className="text-[#000000] text-lg" />
            </div>
            <span className="text-xl font-black tracking-tight">
              Glow<span className="text-black/50 font-medium">Care.</span>
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-10 text-xs font-bold uppercase tracking-widest text-black/60">
            <a href="#about" className="hover:text-black transition-colors relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-black after:left-0 after:-bottom-1 hover:after:w-full after:transition-all">Why Us</a>
            <a href="#services" className="hover:text-black transition-colors relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-black after:left-0 after:-bottom-1 hover:after:w-full after:transition-all">Treatments</a>
            <a href="#results" className="hover:text-black transition-colors relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-black after:left-0 after:-bottom-1 hover:after:w-full after:transition-all">Results</a>
            <a href="#doctors" className="hover:text-black transition-colors relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-black after:left-0 after:-bottom-1 hover:after:w-full after:transition-all">Specialists</a>
            <a href="#faq" className="hover:text-black transition-colors relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-black after:left-0 after:-bottom-1 hover:after:w-full after:transition-all">FAQ</a>
          </div>

          <div className="flex items-center space-x-3">
            <Link 
              to="/login" 
              className="text-xs font-black uppercase tracking-wider text-[#000000] hover:bg-black/5 px-4 py-2.5 rounded-xl transition-all"
            >
              Sign In
            </Link>
            <Link 
              to="/register" 
              className="bg-black hover:bg-black/80 text-white text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-xl transition-all shadow-lg shadow-black/5 active:scale-95"
            >
              Portal Admin
            </Link>
          </div>
        </nav>
      </div>

      {/* ==========================================
          2. ASYMMETRICAL EDITORIAL HERO SECTION
         ========================================== */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 pt-12 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Sisi Kiri: Narasi & CTA */}
        <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center space-x-2 bg-[#FFD9D0]/50 border border-[#FFD9D0] px-4 py-2 rounded-full text-[10px] font-black tracking-widest uppercase text-black">
            <span className="w-1.5 h-1.5 bg-black rounded-full animate-ping"></span>
            <span>The New Standard of Dermatology</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black text-[#000000] leading-[1.1] tracking-tight">
            Redefining Your <br />
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-black via-black/80 to-black/70">
              Skin Horizon.
              <span className="absolute bottom-2 left-0 w-full h-4 bg-[#CDEEDD] -z-10 rounded-lg opacity-80"></span>
            </span>
          </h1>

          <p className="text-sm sm:text-base text-black/50 font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Kami mengawinkan kepakaran medis dermatologi klinis murni dengan kenyamanan luxury spa. Menghasilkan kulit sehat, bercahaya, tanpa kompromi.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <a href="#booking-cta" className="w-full sm:w-auto bg-[#000000] hover:bg-black/80 text-white text-xs font-bold uppercase tracking-wider px-8 py-5 rounded-2xl shadow-2xl shadow-black/15 flex items-center justify-center space-x-3 transition-all transform hover:-translate-y-1">
              <span>Book Appointment</span>
              <HiOutlineArrowRight size={14} />
            </a>
            <a href="#services" className="w-full sm:w-auto text-center border-2 border-black/10 hover:border-black/30 text-black text-xs font-bold uppercase tracking-wider px-8 py-5 rounded-2xl transition-all">
              Discover Menu
            </a>
          </div>
        </div>

        {/* Sisi Kanan: Editorial Image Layout */}
        <div className="lg:col-span-5 relative flex justify-center items-center pt-12 lg:pt-0">
          {/* Main Large Image */}
          <div className="relative w-72 sm:w-80 h-[420px] rounded-[40px] overflow-hidden shadow-2xl z-20 transform -rotate-2 hover:rotate-0 transition-transform duration-500 ring-8 ring-white">
            <img 
              src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80" 
              alt="Luxury Skin Treatment" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Overlapping Small Image */}
          <div className="absolute -right-2 bottom-6 w-44 h-56 rounded-[32px] overflow-hidden shadow-2xl z-30 transform rotate-6 hover:rotate-0 transition-transform duration-500 ring-4 ring-white hidden sm:block">
            <img 
              src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=400&q=80" 
              alt="Detail treatment" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floating Premium Label */}
          <div className="absolute top-12 -left-8 bg-white border border-gray-100 p-4 rounded-2xl shadow-xl z-30 flex items-center space-x-3 max-w-[180px]">
            <div className="w-8 h-8 bg-[#FFD9D0] rounded-xl flex items-center justify-center text-black font-bold text-xs shrink-0">A+</div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-wider">FDA Approved</p>
              <p className="text-[9px] text-black/40 font-medium">100% Guaranteed Safe</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          3. MODERN BENTO GRID (WHY CHOOSE US)
         ========================================== */}
      <section id="about" className="max-w-7xl mx-auto px-6 sm:px-8 py-20 bg-white/70 backdrop-blur-md border border-gray-100 rounded-[40px] shadow-sm relative z-10">
        <div className="mb-12 max-w-md">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#FFD9D0] bg-black px-2.5 py-1 rounded-md">Philosophy</span>
          <h2 className="text-3xl font-black mt-3 tracking-tight">Standard Akurasi Tinggi yang Memanjakan Anda.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Large Span */}
          <div className="md:col-span-2 bg-[#CDEEDD]/30 p-8 sm:p-10 rounded-[32px] flex flex-col justify-between space-y-12 border border-[#CDEEDD]/50 hover:shadow-md transition-all duration-300 group">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-black shadow-sm group-hover:scale-110 transition-transform">
              <HiOutlineUserGroup size={22} />
            </div>
            <div>
              <h3 className="text-xl font-black mb-2">International Certified Dermatologists</h3>
              <p className="text-xs text-black/60 leading-relaxed font-medium max-w-xl">
                Setiap diagnosa dan tindakan diawasi langsung oleh dokter spesialis jebolan institusi estetik terbaik dunia. Kami merancang rencana perawatan personal yang presisi sesuai karakter unik DNA kulit Anda.
              </p>
            </div>
          </div>

          {/* Card 2: Medium Salmon Accent */}
          <div className="bg-[#FFD9D0]/20 p-8 rounded-[32px] flex flex-col justify-between space-y-12 border border-[#FFD9D0]/30 hover:shadow-md transition-all duration-300 group">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-black shadow-sm group-hover:scale-110 transition-transform">
              <HiOutlineShieldCheck size={22} />
            </div>
            <div>
              <h3 className="text-lg font-black mb-2">Clinical Purity</h3>
              <p className="text-xs text-black/60 leading-relaxed font-medium">
                Hanya produk bersertifikasi internasional teruji laboratorium medis bebas paraben dan merkuri yang masuk ke ruang perawatan kami.
              </p>
            </div>
          </div>

          {/* Card 3: Light Minimalist */}
          <div className="bg-gray-50/80 p-8 rounded-[32px] flex flex-col justify-between space-y-12 border border-gray-100 hover:shadow-md transition-all duration-300 group">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-black shadow-sm group-hover:scale-110 transition-transform">
              <HiOutlineCalendar size={22} />
            </div>
            <div>
              <h3 className="text-lg font-black mb-2">On-Time VIP Service</h3>
              <p className="text-xs text-black/60 leading-relaxed font-medium">
                Ucapkan selamat goodbye pada antrean panjang yang menjemukan. Melalui sistem reservasi digital cerdas kami, slot waktu Anda dijamin 100% privat dan eksklusif.
              </p>
            </div>
          </div>

          {/* Card 4: Review Highlight Bento */}
          <div className="md:col-span-2 bg-[#000000] text-white p-8 sm:p-10 rounded-[32px] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 group hover:bg-black/90 transition-all duration-300">
            <div className="space-y-3">
              <div className="flex space-x-1 text-[#FFD9D0]">
                {[...Array(5)].map((_, i) => <HiOutlineStar key={i} size={16} className="fill-current" />)}
              </div>
              <h4 className="text-lg font-bold tracking-tight">"Kulit saya tidak pernah sebersih dan se-glowing ini sebelumnya setelah mencoba Pico Laser di sini."</h4>
              <p className="text-[11px] text-white/40 font-medium uppercase tracking-widest">— Amara G., Verified Patient</p>
            </div>
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-[#CDEEDD] group-hover:bg-[#CDEEDD] group-hover:text-black transition-all duration-300 shrink-0">
              <HiOutlineArrowRight size={22} className="transform -rotate-45 transition-transform group-hover:rotate-0" />
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          4. PREMIUM FEATURED TREATMENTS (WITH TABS FILTER)
         ========================================== */}
      <section id="services" className="max-w-7xl mx-auto px-6 sm:px-8 py-24 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-black/40 block">Our Clinical Menu</span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">Signature Procedures</h2>
          </div>
          
          {/* Category Tabs System */}
          <div className="flex flex-wrap gap-2 bg-gray-200/60 backdrop-blur-sm p-1.5 rounded-2xl border border-gray-300/30 self-start md:self-end">
            {["all", "laser", "injection", "holistic"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === cat 
                    ? "bg-white text-black shadow-sm" 
                    : "text-black/40 hover:text-black"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Treatment Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-500">
          {filteredTreatments.map((treatment) => (
            <div 
              key={treatment.id} 
              className="bg-white/80 backdrop-blur-sm rounded-[32px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={treatment.img} 
                    alt={treatment.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-black text-[10px] font-black tracking-wider uppercase px-3 py-1.5 rounded-xl shadow-sm border border-white/50">
                    {treatment.tag}
                  </span>
                </div>
                <div className="p-6 space-y-2">
                  <h4 className="font-black text-lg tracking-tight group-hover:text-black/80 transition-colors">{treatment.title}</h4>
                  <p className="text-xs text-black/50 font-medium leading-relaxed">{treatment.desc}</p>
                </div>
              </div>
              
              <div className="p-6 pt-0">
                <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                  <div>
                    <p className="text-[9px] font-bold text-black/30 uppercase tracking-widest">Starting from</p>
                    <p className="font-black text-base text-black">IDR {treatment.price}</p>
                  </div>
                  <a href="#booking-cta" className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-black group-hover:bg-[#CDEEDD] transition-colors shadow-inner">
                    <HiOutlineArrowRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================
          5. BEFORE & AFTER GALLERY
         ========================================== */}
      <section id="results" className="max-w-7xl mx-auto px-6 sm:px-8 py-20 bg-[#FFD9D0]/10 backdrop-blur-md border border-[#FFD9D0]/30 rounded-[40px] relative z-10">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#000000] bg-[#CDEEDD] px-3 py-1 rounded-full">Clinical Proof</span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Real Patient Transformations</h2>
          <p className="text-xs sm:text-sm text-black/50 font-medium leading-relaxed">
            Hasil nyata yang objektif, konsisten, dan terukur setelah rangkaian prosedur terintegrasi dalam waktu 4-8 minggu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Kasus 1 */}
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-[32px] border border-gray-100 shadow-sm space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] border border-gray-100">
                <img src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80" alt="Acne Before" className="w-full h-full object-cover filter grayscale opacity-90" />
                <span className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white text-[9px] font-bold tracking-widest uppercase px-2 py-1 rounded-md">WEEK 0 (BEFORE)</span>
              </div>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] border border-gray-100">
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80" alt="Acne After" className="w-full h-full object-cover" />
                <span className="absolute bottom-3 left-3 bg-[#CDEEDD] text-black text-[9px] font-black tracking-widest uppercase px-2 py-1 rounded-md">WEEK 6 (AFTER)</span>
              </div>
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-sm tracking-tight">Acne Vulgaris & Severe Hyperpigmentation Eradication</h4>
              <p className="text-xs text-black/40 font-medium">Prosedur: 2x PicoGold Pore-Eraser Tech + Serum Infusion Treatment.</p>
            </div>
          </div>

          {/* Kasus 2 */}
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-[32px] border border-gray-100 shadow-sm space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] border border-gray-100">
                <img src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80" alt="Aging Before" className="w-full h-full object-cover filter contrast-125 opacity-80" />
                <span className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white text-[9px] font-bold tracking-widest uppercase px-2 py-1 rounded-md">WEEK 0 (BEFORE)</span>
              </div>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] border border-gray-100">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" alt="Aging After" className="w-full h-full object-cover" />
                <span className="absolute bottom-3 left-3 bg-[#CDEEDD] text-black text-[9px] font-black tracking-widest uppercase px-2 py-1 rounded-md">WEEK 4 (AFTER)</span>
              </div>
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-sm tracking-tight">Fine Lines Reduction & Volume Restoration</h4>
              <p className="text-xs text-black/40 font-medium">Prosedur: 1x DNA Salmon Booster + Anti-Aging Lifting Injection.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          6. MEET OUR SPECIALISTS (DOCTORS PROFILE)
         ========================================== */}
      <section id="doctors" className="max-w-7xl mx-auto px-6 sm:px-8 py-24 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-black/40 block">Medical Experts</span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">The Board of Dermatologists</h2>
          </div>
          <p className="text-xs sm:text-sm text-black/50 font-medium max-w-sm leading-relaxed">
            Dipimpin oleh akademisi klinis murni lulusan universitas top global demi akurasi diagnosa tanpa tebak-tebakan.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Dokter 1 */}
          <div className="space-y-4 group">
            <div className="aspect-[3/4] rounded-[32px] overflow-hidden border border-gray-100 shadow-sm relative bg-white">
              <img src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=500&q=80" alt="Doctor 1" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex items-end">
                <span className="text-[10px] text-white/90 font-bold uppercase tracking-widest">Spec: Advanced Aesthetics Laser & Scar Reconstruction</span>
              </div>
            </div>
            <div>
              <h4 className="font-black text-lg tracking-tight">dr. Adrian Hardian, Sp.DVE</h4>
              <p className="text-xs text-black/40 font-semibold tracking-wide uppercase">Alumni Harvard Medical Fellowship</p>
            </div>
          </div>

          {/* Dokter 2 */}
          <div className="space-y-4 group">
            <div className="aspect-[3/4] rounded-[32px] overflow-hidden border border-gray-100 shadow-sm relative bg-white">
              <img src="https://images.unsplash.com/photo-1594824813573-246434e3b96f?auto=format&fit=crop&w=500&q=80" alt="Doctor 2" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex items-end">
                <span className="text-[10px] text-white/90 font-bold uppercase tracking-widest">Spec: Injectable Fillers, Micro-needling & Collagen Boosting</span>
              </div>
            </div>
            <div>
              <h4 className="font-black text-lg tracking-tight">dr. Valerie Amanda, Sp.DVE</h4>
              <p className="text-xs text-black/40 font-semibold tracking-wide uppercase">Seoul National Aesthetic Science Certificate</p>
            </div>
          </div>

          {/* Dokter 3 */}
          <div className="space-y-4 group">
            <div className="aspect-[3/4] rounded-[32px] overflow-hidden border border-gray-100 shadow-sm relative bg-white">
              <img src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=500&q=80" alt="Doctor 3" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex items-end">
                <span className="text-[10px] text-white/90 font-bold uppercase tracking-widest">Spec: Chronic Acne Management & Anti-Aging Cellular Therapy</span>
              </div>
            </div>
            <div>
              <h4 className="font-black text-lg tracking-tight">dr. Jeremy Christian, Sp.DVE</h4>
              <p className="text-xs text-black/40 font-semibold tracking-wide uppercase">Lulusan Terbaik Universitas Indonesia</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          7. INTERACTIVE LUXURY FAQ (ACCORDION)
         ========================================== */}
      <section id="faq" className="max-w-4xl mx-auto px-6 sm:px-8 py-20 bg-white/80 backdrop-blur-md border border-gray-100 rounded-[40px] shadow-sm mb-24 relative z-10">
        <div className="text-center max-w-md mx-auto mb-12 space-y-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-black/40">Inquiries</span>
          <h2 className="text-3xl font-black tracking-tight">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div 
                key={index} 
                className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                  isOpen ? "bg-gray-50/70 border-gray-200" : "bg-white border-gray-100 hover:border-gray-200"
                }`}
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full px-6 py-5 flex justify-between items-center text-left font-bold text-sm sm:text-base tracking-tight"
                >
                  <span>{faq.q}</span>
                  <HiOutlineChevronDown 
                    size={18} 
                    className={`transform transition-transform duration-300 text-black/40 ${isOpen ? "rotate-180 text-black" : ""}`} 
                  />
                </button>
                <div 
                  className={`transition-all duration-300 ease-in-out border-t border-gray-100 ${
                    isOpen ? "max-h-48 opacity-100 p-6 pt-4" : "max-h-0 opacity-0 p-0 pointer-events-none"
                  }`}
                >
                  <p className="text-xs sm:text-sm text-black/60 font-medium leading-relaxed">{faq.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ==========================================
          8. GRAND FINAL CONVERSION BANNER (CTA)
         ========================================== */}
      <section id="booking-cta" className="max-w-7xl mx-auto px-4 sm:px-8 mb-24 relative z-10">
        <div className="w-full bg-[#000000] text-white rounded-[40px] p-8 sm:p-16 relative overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#CDEEDD]/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-20 left-0 w-80 h-80 bg-[#FFD9D0]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#CDEEDD] border border-[#CDEEDD]/30 px-3 py-1.5 rounded-full bg-white/5">
              Limited VIP Slots Available
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.15]">
              Siap Memiliki Kulit Sehat Maksimal Tanpa Kompromi?
            </h2>
            <p className="text-xs sm:text-sm text-white/50 font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Daftarkan diri Anda sekarang untuk mengunci antrean digital prioritas. Nikmati konsultasi mendalam 1-on-1 komprehensif menggunakan scanner kulit 3D modern pada kunjungan pertama Anda.
            </p>
          </div>

          <div className="lg:col-span-5 bg-white/5 border border-white/10 backdrop-blur-md p-8 rounded-3xl space-y-4 w-full max-w-md mx-auto">
            <h4 className="font-bold text-sm tracking-widest text-center uppercase text-[#CDEEDD]">VIP Pre-Booking Perks</h4>
            <ul className="space-y-3 text-xs text-white/80 font-medium">
              <li className="flex items-center space-x-3">
                <div className="w-5 h-5 rounded-md bg-[#CDEEDD]/20 flex items-center justify-center text-[#CDEEDD] shrink-0">
                  <HiOutlineCheck size={12} />
                </div>
                <span>Gratis 3D Facial Skin Analyzer Scan (Senilai IDR 250k)</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-5 h-5 rounded-md bg-[#CDEEDD]/20 flex items-center justify-center text-[#CDEEDD] shrink-0">
                  <HiOutlineCheck size={12} />
                </div>
                <span>Jaminan Bebas Antre Panjang (On-Time VIP Guarantee)</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-5 h-5 rounded-md bg-[#CDEEDD]/20 flex items-center justify-center text-[#CDEEDD] shrink-0">
                  <HiOutlineCheck size={12} />
                </div>
                <span>Ruang Perawatan Privat dengan High-End HEPA Filter</span>
              </li>
            </ul>
            <button className="w-full bg-[#CDEEDD] hover:bg-[#b2dfc7] text-black text-xs font-black uppercase tracking-widest py-4 rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center space-x-2 mt-2">
              <span>Ambil Slot Reservasi</span>
              <HiOutlineArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* ==========================================
          9. LUXURY MINIMALIST FOOTER
         ========================================== */}
      <footer id="clinic" className="bg-white border-t border-gray-100 relative z-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 grid grid-cols-1 md:grid-cols-12 gap-12 text-xs font-medium text-black/50">
          
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#CDEEDD] rounded-xl flex items-center justify-center text-black">
                <HiOutlineSparkles size={16} />
              </div>
              <span className="text-lg font-black tracking-tight text-black">GlowCare Clinic.</span>
            </div>
            <p className="leading-relaxed max-w-sm">
              Menghadirkan harmoni sempurna antara kecanggihan teknologi perawatan kulit wajah medis dengan kenyamanan estetika tingkat tinggi.
            </p>
          </div>

          <div className="md:col-span-4 space-y-4">
            <h5 className="text-xs font-black text-black uppercase tracking-widest">Hours of Operation</h5>
            <div className="space-y-2 text-black/70">
              <p className="flex items-center space-x-3">
                <HiOutlineClock className="text-black/30" size={16} />
                <span>Senin - Sabtu: 09.00 - 20.00 WIB</span>
              </p>
              <p className="flex items-center space-x-3 text-red-400">
                <HiOutlineClock size={16} />
                <span>Minggu & Hari Libur Nasional: Tutup</span>
              </p>
            </div>
          </div>

          <div className="md:col-span-3 space-y-4">
            <h5 className="text-xs font-black text-black uppercase tracking-widest">The Sanctuary</h5>
            <p className="flex items-start space-x-3 leading-relaxed text-black/70">
              <HiOutlineLocationMarker className="text-black/30 mt-0.5 shrink-0" size={18} />
              <span>Jl. Aesthetics Boulevard No. 88, Kebayoran Baru, Jakarta Selatan</span>
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="w-full text-center py-6 border-t border-gray-50 text-[10px] text-black/40 font-medium bg-gray-50/50 uppercase tracking-wider">
          &copy; {new Date().getFullYear()} GlowCare Indonesia. Medical Precision, Aesthetic Luxury.
        </div>
      </footer>

    </div>
  );
}