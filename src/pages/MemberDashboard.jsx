import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, Clock, MapPin, ChevronRight, Star, Sparkles, Activity, 
  Search, Bell, Menu, X, Gift, Ticket, History, Home, ShoppingBag, 
  CheckCircle, Plus, Send, Droplets, Flower2, Heart, ShoppingCart, 
  Trash2, Receipt, Minus, LogOut
} from 'lucide-react';

// --- HELPER FUNCTION ---
const formatCurrency = (num) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
};

// --- MOCK DATA ---
const mockData = {
  user: {
    id: "MBR-20260621",
    name: "Nabil Sahendra",
    avatar: "https://ui-avatars.com/api/?name=Nabil+Sahendra&background=FFF0EC&color=E5806A&size=150",
    tier: "Gold Member",
    points: 850,
    nextTierPoints: 1000,
    stats: { vouchers: 4, visits: 12, saved: "Rp 1.2M" }
  },
  upcomingAppointment: {
    treatment: "Premium Pico Laser Rejuvenation",
    doctor: "dr. Sarah Wijaya, Sp.KK",
    date: "25 Juni 2026",
    time: "14:00 WIB",
    branch: "GlowCare Pusat Pekanbaru"
  },
  treatmentHistory: [
    { id: 1, date: "10 Mei 2026", treatment: "HydraFacial Glow", doctor: "dr. Sarah Wijaya", status: "Completed" },
    { id: 2, date: "15 Apr 2026", treatment: "Acne Peeling", doctor: "dr. Budi Santoso", status: "Completed" }
  ],
  recommendations: [
    { id: 1, type: "Skincare", name: "Luminous Rose Serum", price: "Rp 450.000", image: "🧴", tag: "New Arrival" },
    { id: 2, type: "Treatment", name: "Salmon DNA Injection", price: "Rp 2.500.000", image: "✨", tag: "Best Result" }
  ],
  redeemCatalog: [
    { id: 1, title: "Diskon 20% All Facial", cost: 300, code: "FACIAL20", discountType: "percent", discountValue: 20 },
    { id: 2, title: "Potongan Rp 50.000 Belanja", cost: 200, code: "POTONG50", discountType: "fixed", discountValue: 50000 },
    { id: 3, title: "Free Skin Check up", cost: 500, code: "FREESKIN", discountType: "none", discountValue: 0 }
  ],
  treatmentCatalog: [
    { id: 1, name: "Premium Pico Laser", category: "Laser", duration: "60 Menit", price: "Rp 1.500.000" },
    { id: 2, name: "HydraFacial Glow", category: "Facial", duration: "45 Menit", price: "Rp 750.000" },
    { id: 3, name: "Acne Peeling", category: "Peeling", duration: "30 Menit", price: "Rp 500.000" },
    { id: 4, name: "Salmon DNA Injection", category: "Injection", duration: "60 Menit", price: "Rp 2.500.000" },
  ],
  shopItems: [
    { id: 1, name: "GlowCare Sunscreen SPF 50+", price: "Rp 185.000", priceNum: 185000, image: "🌞", category: "Protection" },
    { id: 2, name: "Retinol Night Cream", price: "Rp 320.000", priceNum: 320000, image: "🌙", category: "Anti-Aging" },
    { id: 3, name: "Hydrating Toner Essence", price: "Rp 150.000", priceNum: 150000, image: "💧", category: "Hydration" },
    { id: 4, name: "Vitamin C Brightening Serum", price: "Rp 275.000", priceNum: 275000, image: "🍊", category: "Serum" },
    { id: 5, name: "Gentle Facial Cleanser", price: "Rp 120.000", priceNum: 120000, image: "🫧", category: "Cleansing" },
    { id: 6, name: "Revitalizing Eye Cream", price: "Rp 210.000", priceNum: 210000, image: "👁️", category: "Eye Care" },
    { id: 7, name: "Soothing Aloe Mask", price: "Rp 85.000", priceNum: 85000, image: "🌿", category: "Mask" },
    { id: 8, name: "Plumping Lip Serum", price: "Rp 110.000", priceNum: 110000, image: "💋", category: "Lip Care" }
  ],
  promos: [
    { id: 1, title: "Payday Sale 50%", desc: "Diskon setengah harga untuk semua layanan Facial. Min. transaksi Rp 500.000.", code: "GLOWPAYDAY", valid: "30 Juni 2026" },
    { id: 2, title: "Buy 1 Get 1 Serum", desc: "Berlaku untuk pembelian Luminous Rose Serum ukuran 30ml.", code: "BOGOSTAR", valid: "15 Juli 2026" },
    { id: 3, title: "New Member Reward", desc: "Potongan Rp 100.000 untuk treatment pertama Anda.", code: "GLOWNEW", valid: "31 Desember 2026" },
    { id: 4, title: "Laser Package Promo", desc: "Beli paket 3x Pico Laser dapatkan gratis 1x Post-Laser.", code: "LASERPRO", valid: "10 Agustus 2026" }
  ],
  pastTransactions: [
    { id: "INV-001", date: "15 Mei 2026", items: ["Revitalizing Eye Cream (1x)", "Soothing Aloe Mask (1x)"], total: 295000, status: "Selesai" }
  ]
};

// --- SUB-COMPONENTS ---

const BackgroundOrnaments = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#E5806A] rounded-full blur-[150px] opacity-20"></div>
    <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#12243A] rounded-full blur-[150px] opacity-[0.08]"></div>

    <motion.div animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }} className="absolute top-[15%] left-[5%] text-[#E5806A] opacity-10"><Sparkles size={120} /></motion.div>
    <motion.div animate={{ y: [0, 40, 0], rotate: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }} className="absolute top-[50%] right-[10%] text-[#12243A] opacity-10"><Flower2 size={180} /></motion.div>
    <motion.div animate={{ y: [0, -25, 0], rotate: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }} className="absolute bottom-[10%] left-[20%] text-[#E5806A] opacity-10"><Droplets size={140} /></motion.div>
    <motion.div animate={{ y: [0, 20, 0], scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} className="absolute top-[10%] right-[25%] text-[#12243A] opacity-10"><Heart size={90} /></motion.div>
  </div>
);

const Navbar = ({ user, activeTab, setActiveTab, cartItemCount, setIsCartOpen, onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'dashboard', name: 'Dashboard' },
    { id: 'treatments', name: 'Treatments' },
    { id: 'shop', name: 'Shop' },
    { id: 'promos', name: 'Promos' },
    { id: 'transactions', name: 'Riwayat' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 px-4 py-4 ${isScrolled ? 'top-0' : 'top-2'}`}>
      <div className={`max-w-7xl mx-auto rounded-2xl transition-all duration-500 border ${isScrolled ? 'bg-white/90 backdrop-blur-xl shadow-sm border-slate-100 py-3' : 'bg-transparent border-transparent py-4'}`}>
        <div className="flex items-center justify-between px-6">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-8 h-8 bg-[#E5806A] rounded-lg flex items-center justify-center text-white shadow-md"><Sparkles size={18} /></div>
            <span className="font-bold text-xl text-[#12243A] tracking-tight hidden sm:block">GlowCare</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button 
                key={link.id} 
                onClick={() => setActiveTab(link.id)}
                className={`text-sm font-bold transition-all ${activeTab === link.id ? 'text-[#E5806A] border-b-2 border-[#E5806A] pb-1' : 'text-slate-500 hover:text-[#E5806A] pb-1 border-b-2 border-transparent'}`}
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setIsCartOpen(true)} className="relative p-2 text-[#12243A] hover:bg-[#FFF0EC] rounded-full transition-colors">
              <ShoppingCart size={20} />
              {cartItemCount > 0 && (
                <span className="absolute 0 right-0 w-4 h-4 bg-[#E5806A] text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-white">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button className="relative p-2 text-[#12243A] hover:bg-[#FFF0EC] rounded-full transition-colors hidden sm:block">
              <Bell size={20} />
            </button>
            <div className="h-6 w-[1px] bg-slate-200 mx-1 hidden sm:block"></div>
            <div className="flex items-center gap-3 pl-2 sm:pr-4 py-1.5 bg-white rounded-full shadow-sm border border-slate-100">
              <img src={user.avatar} className="w-7 h-7 rounded-full border border-[#FFF0EC]" alt="avatar" />
              <span className="hidden sm:block text-xs font-bold text-[#12243A] pr-2">{user.name.split(' ')[0]}</span>
            </div>
            {/* Tombol Logout */}
            <button 
              onClick={onLogout}
              className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// --- MAIN APPLICATION ---

export default function MemberDashboard() {
  const navigate = useNavigate();
  const { user: authUser, logout: authLogout } = useAuth();
  
  // Build user object from real logged-in data
  const currentUser = {
    id: authUser?.id || "MBR-000001",
    name: authUser?.username || "Guest",
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(authUser?.username || 'Guest')}&background=FFF0EC&color=E5806A&size=150`,
    tier: "Gold Member",
    points: 850,
    nextTierPoints: 1000,
    stats: { vouchers: 4, visits: 12, saved: "Rp 1.2M" }
  };

  const [loading, setLoading] = useState(true);

  // Handle logout
  const handleLogout = () => {
    authLogout();
    navigate("/");
  };
  const [activeTab, setActiveTab] = useState('dashboard');
  const [toast, setToast] = useState(null);
  
  // State Interaktif CRM & E-Commerce
  const [userPoints, setUserPoints] = useState(currentUser.points);
  const [myVouchers, setMyVouchers] = useState([]);
  const [showRedeem, setShowRedeem] = useState(false);
  const [bookingForm, setBookingForm] = useState({ treatment: '', date: '', time: '' });
  
  // State Keranjang & Transaksi
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedVoucherId, setSelectedVoucherId] = useState("");
  const [transactions, setTransactions] = useState(mockData.pastTransactions);
  
  // STATE BARU: Untuk Invoice Modal
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1200);
  }, []);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleRedeem = (item) => {
    if (userPoints >= item.cost) {
      setUserPoints(prev => prev - item.cost);
      setMyVouchers(prev => [{ ...item, id: Date.now(), expiry: '30 Hari kedepan' }, ...prev]);
      showToast(`Berhasil menukar ${item.cost} poin dengan ${item.title}!`);
      setShowRedeem(false); 
    } else {
      showToast(`Poin Anda tidak cukup. Butuh ${item.cost} poin.`);
    }
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if(!bookingForm.treatment || !bookingForm.date) return showToast("Mohon lengkapi data form.");
    showToast(`Pengajuan ${bookingForm.treatment} berhasil dikirim!`);
    setBookingForm({ treatment: '', date: '', time: '' }); 
  };

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    showToast(`Berhasil menambahkan ${product.name} ke keranjang!`);
  };

  const updateCartQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : item;
      }
      return item;
    }));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartSubtotal = cart.reduce((total, item) => total + (item.priceNum * item.qty), 0);
  let discountAmount = 0;
  const activeVoucher = myVouchers.find(v => v.id.toString() === selectedVoucherId);
  
  if (activeVoucher) {
    if (activeVoucher.discountType === "percent") {
      discountAmount = cartSubtotal * (activeVoucher.discountValue / 100);
    } else if (activeVoucher.discountType === "fixed") {
      discountAmount = activeVoucher.discountValue;
    }
  }
  
  const grandTotal = Math.max(cartSubtotal - discountAmount, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const newTransaction = {
      id: `INV-${Math.floor(Math.random() * 10000)}`,
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      items: cart.map(item => `${item.name} (${item.qty}x)`),
      total: grandTotal,
      status: "Diproses"
    };

    setTransactions([newTransaction, ...transactions]);
    
    if (activeVoucher) {
      setMyVouchers(prev => prev.filter(v => v.id.toString() !== selectedVoucherId));
      setSelectedVoucherId("");
    }

    setCart([]);
    setIsCartOpen(false);
    showToast("Transaksi Berhasil! Lihat detail di Riwayat Transaksi.");
    setActiveTab('transactions'); 
  };

  if (loading) return (
    <div className="h-screen bg-[#F2F6F4] flex items-center justify-center">
      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }} className="w-16 h-16 bg-[#FFF0EC] rounded-full flex items-center justify-center shadow-lg">
        <Sparkles className="text-[#E5806A]" size={32} />
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F2F6F4] text-slate-800 relative overflow-hidden font-sans pb-20">
      <BackgroundOrnaments />
      
      <Navbar 
        user={currentUser} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        cartItemCount={cart.reduce((acc, item) => acc + item.qty, 0)}
        setIsCartOpen={setIsCartOpen}
        onLogout={handleLogout}
      />

      {/* --- INVOICE MODAL (FITUR BARU) --- */}
      <AnimatePresence>
        {selectedInvoice && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedInvoice(null)}
              className="fixed inset-0 bg-[#12243A]/60 backdrop-blur-sm z-[250]"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white z-[300] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="bg-[#F2F6F4] p-6 border-b border-slate-100 flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-[#12243A] text-xl flex items-center gap-2">
                    <Receipt className="text-[#E5806A]" size={20} /> Invoice Pembelian
                  </h3>
                  <p className="text-sm text-slate-500 font-mono mt-1">{selectedInvoice.id}</p>
                </div>
                <button onClick={() => setSelectedInvoice(null)} className="p-2 bg-white text-slate-400 hover:text-[#E5806A] rounded-full shadow-sm">
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="flex justify-between items-start text-sm">
                  <div>
                    <p className="text-slate-400 font-bold uppercase text-[10px] tracking-wider mb-1">Diterbitkan Oleh</p>
                    <p className="font-bold text-[#12243A]">GlowCare Clinic</p>
                    <p className="text-slate-500 text-xs mt-0.5">Pekanbaru, Indonesia</p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-400 font-bold uppercase text-[10px] tracking-wider mb-1">Tanggal Bayar</p>
                    <p className="font-bold text-[#12243A]">{selectedInvoice.date}</p>
                  </div>
                </div>

                <div className="w-full border-t border-dashed border-slate-200"></div>

                <div>
                  <p className="text-slate-400 font-bold uppercase text-[10px] tracking-wider mb-3">Rincian Pesanan</p>
                  <ul className="space-y-3">
                    {selectedInvoice.items.map((item, i) => (
                      <li key={i} className="flex justify-between text-sm text-slate-700 items-center">
                        <span className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#E5806A]"></div>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="w-full border-t border-dashed border-slate-200"></div>

                <div className="flex justify-between items-center bg-[#FFF0EC] p-4 rounded-2xl border border-[#FFE4DC]">
                  <span className="font-bold text-[#12243A]">Total Pembayaran</span>
                  <span className="text-xl font-bold text-[#E5806A]">{formatCurrency(selectedInvoice.total)}</span>
                </div>
              </div>

              <div className="p-6 pt-0 flex gap-3">
                <button onClick={() => setSelectedInvoice(null)} className="flex-1 py-3.5 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-200 transition-colors">
                  Tutup
                </button>
                <button onClick={() => { showToast("Mendownload Invoice PDF..."); setSelectedInvoice(null); }} className="flex-1 py-3.5 bg-[#12243A] text-white rounded-xl text-sm font-bold hover:bg-[#E5806A] transition-colors shadow-md">
                  Download PDF
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- CART DRAWER (KERANJANG BELANJA) --- */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-[#12243A]/40 backdrop-blur-sm z-[150]"
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[200] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#12243A] flex items-center gap-2">
                  <ShoppingCart size={24} className="text-[#E5806A]" /> Keranjang Anda
                </h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 bg-slate-50 text-slate-400 hover:text-[#E5806A] rounded-full">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center text-slate-400 mt-20">
                    <ShoppingBag size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Keranjang Anda masih kosong.</p>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex gap-4 items-center bg-[#F2F6F4]/50 p-4 rounded-2xl border border-slate-100">
                      <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center text-3xl shadow-sm">{item.image}</div>
                      <div className="flex-1">
                        <h4 className="font-bold text-[#12243A] text-sm leading-tight">{item.name}</h4>
                        <p className="text-[#E5806A] font-bold text-xs mt-1">{formatCurrency(item.priceNum)}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <button onClick={() => updateCartQty(item.id, -1)} className="w-6 h-6 bg-white rounded flex items-center justify-center border border-slate-200 text-slate-500"><Minus size={12} /></button>
                          <span className="text-xs font-bold">{item.qty}</span>
                          <button onClick={() => updateCartQty(item.id, 1)} className="w-6 h-6 bg-white rounded flex items-center justify-center border border-slate-200 text-slate-500"><Plus size={12} /></button>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="p-2 text-rose-300 hover:text-rose-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-slate-100 bg-slate-50">
                  <div className="mb-4">
                    <label className="text-xs font-bold text-slate-500 uppercase mb-2 block flex items-center gap-1"><Ticket size={14}/> Pakai Voucher</label>
                    <select 
                      className="w-full p-3 rounded-xl border border-slate-200 text-sm font-medium outline-none focus:border-[#E5806A]"
                      value={selectedVoucherId}
                      onChange={(e) => setSelectedVoucherId(e.target.value)}
                    >
                      <option value="">-- Pilih Voucher Anda --</option>
                      {myVouchers.filter(v => v.discountType !== "none").map(v => (
                        <option key={v.id} value={v.id}>{v.title}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between text-slate-500"><span>Subtotal</span><span>{formatCurrency(cartSubtotal)}</span></div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-500 font-medium"><span>Diskon Voucher</span><span>- {formatCurrency(discountAmount)}</span></div>
                    )}
                    <div className="w-full h-[1px] bg-slate-200 my-2"></div>
                    <div className="flex justify-between text-[#12243A] font-bold text-lg"><span>Total Bayar</span><span>{formatCurrency(grandTotal)}</span></div>
                  </div>
                  <button 
                    onClick={handleCheckout}
                    className="w-full py-4 bg-[#12243A] text-white rounded-xl text-sm font-bold hover:bg-[#E5806A] transition-colors shadow-lg active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Receipt size={18} /> Checkout & Bayar
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, x: '-50%' }} animate={{ opacity: 1, y: 0, x: '-50%' }} exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-10 left-1/2 z-[300] bg-[#12243A] text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 font-medium text-sm border border-slate-700 w-max max-w-[90vw]"
          >
            <CheckCircle size={18} className="text-[#E5806A] shrink-0" />
            <span className="truncate">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-6 pt-32 relative z-10">
        <AnimatePresence mode="wait">
          
          {/* ================= VIEW: DASHBOARD ================= */}
          {activeTab === 'dashboard' && (
            <motion.div key="dashboard" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              
              <div className="mb-10 flex flex-col items-start gap-4">
                <span className="px-4 py-1.5 bg-[#FFF0EC] text-[#12243A] rounded-full text-[10px] sm:text-xs font-bold tracking-[0.15em] flex items-center gap-2 shadow-sm border border-[#FFE4DC]">
                  <div className="w-2 h-2 rounded-full bg-[#E5D5CE]"></div>
                  THE NEW STANDARD OF DERMATOLOGY
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-[#12243A]">
                  Welcome Back, <span className="text-[#E5806A]">{currentUser.name.split(' ')[0]}!</span>
                </h1>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* KOLOM KIRI */}
                <div className="lg:col-span-4 space-y-6">
                  {/* Membership Card */}
                  <div className="bg-[#12243A] p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-10"><Star size={120} className="fill-white" /></div>
                    <div className="relative z-10">
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Membership</p>
                      <h2 className="text-3xl font-bold mt-1 text-[#FFF0EC]">{mockData.user.tier}</h2>
                      <div className="mt-8">
                        <div className="flex justify-between text-xs mb-2 font-medium">
                          <span className="text-slate-300">Available Points</span>
                          <span className="text-[#E5806A] font-bold text-lg">{userPoints}</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-[#E5806A] rounded-full" style={{ width: `${(userPoints/1000)*100}%` }}></div>
                        </div>
                      </div>
                      <button 
                        onClick={() => setShowRedeem(!showRedeem)}
                        className="mt-8 w-full py-3 bg-[#E5806A] rounded-2xl text-sm font-bold hover:bg-[#D46B54] transition-all active:scale-95 text-white shadow-lg shadow-[#E5806A]/30"
                      >
                        {showRedeem ? 'Tutup Katalog' : 'Tukar Keuntungan'}
                      </button>
                    </div>
                  </div>

                  {/* Expandable Redeem Section */}
                  <AnimatePresence>
                    {showRedeem && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                        <div className="bg-white p-5 rounded-[2rem] border border-[#FFF0EC] shadow-sm space-y-3">
                          <h4 className="text-sm font-bold text-[#12243A] mb-2 flex items-center gap-2"><Gift size={16}/> Katalog Voucher</h4>
                          {mockData.redeemCatalog.map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-3 bg-[#F2F6F4] rounded-xl">
                              <div>
                                <p className="text-xs font-bold text-[#12243A]">{item.title}</p>
                                <p className="text-[10px] text-slate-500">{item.cost} Poin</p>
                              </div>
                              <button onClick={() => handleRedeem(item)} className="px-3 py-1.5 bg-[#12243A] text-white text-[10px] font-bold rounded-lg hover:bg-[#E5806A] transition-colors">Tukar</button>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Next Appointment */}
                  <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-[#12243A]">Next Session</h3>
                      <div className="p-2 bg-[#FFF0EC] text-[#E5806A] rounded-xl"><Calendar size={20} /></div>
                    </div>
                    <div className="p-4 bg-[#F2F6F4] rounded-2xl border border-slate-100 mb-4">
                      <p className="font-bold text-[#12243A]">{mockData.upcomingAppointment.treatment}</p>
                      <p className="text-xs text-slate-500 mt-1">{mockData.upcomingAppointment.doctor}</p>
                    </div>
                    <button onClick={() => showToast("Check-in berhasil! Dokter Anda sedang bersiap.")} className="w-full py-3 bg-[#FFF0EC] text-[#E5806A] rounded-2xl text-sm font-bold hover:bg-[#FFE4DC] transition-colors">Check-in Now</button>
                  </div>
                </div>

                {/* KOLOM KANAN */}
                <div className="lg:col-span-8 space-y-6">
                  {/* Active Vouchers Display */}
                  <AnimatePresence>
                    {myVouchers.length > 0 && (
                      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-6 rounded-[2rem] border border-[#E5806A]/20 shadow-sm">
                        <h3 className="text-lg font-bold text-[#12243A] mb-4 flex items-center gap-2"><Ticket className="text-[#E5806A]"/> Voucher Aktif Anda</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {myVouchers.map((v) => (
                            <div key={v.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-[#FFF0EC] to-white border border-[#FFE4DC] rounded-2xl">
                              <div>
                                <p className="font-bold text-[#12243A] text-sm">{v.title}</p>
                                <p className="text-xs font-mono font-bold text-[#E5806A] mt-1 bg-white px-2 py-0.5 rounded inline-block">{v.code}</p>
                              </div>
                              <span className="text-[10px] text-slate-400">Exp: {v.expiry}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Special For You (Shop Preview) */}
                  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-[#12243A]">Special For You</h3>
                      <button onClick={() => setActiveTab('shop')} className="text-sm font-bold text-[#E5806A] hover:gap-2 transition-all flex items-center gap-1">Shop <ChevronRight size={18} /></button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {mockData.recommendations.map((item) => (
                        <div key={item.id} className="bg-[#F2F6F4] p-5 rounded-[2rem] flex gap-5 group cursor-pointer border border-transparent hover:border-[#E5806A]/30 transition-all">
                          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center text-4xl shadow-sm">{item.image}</div>
                          <div className="flex-1">
                            <h4 className="font-bold text-[#12243A] leading-tight">{item.name}</h4>
                            <p className="text-sm font-bold text-[#E5806A] mt-2">{item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ================= VIEW: TREATMENTS ================= */}
          {activeTab === 'treatments' && (
            <motion.div key="treatments" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-[#12243A]">Treatment Center</h2>
                <p className="text-slate-500 mt-2">Jelajahi layanan kami atau ajukan jadwal konsultasi baru.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-4">
                  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm sticky top-24">
                    <h3 className="text-xl font-bold text-[#12243A] mb-6">Ajukan Jadwal</h3>
                    <form onSubmit={handleBookingSubmit} className="space-y-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Pilih Treatment</label>
                        <select className="w-full p-3 bg-[#F2F6F4] border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#E5806A] outline-none" value={bookingForm.treatment} onChange={(e) => setBookingForm({...bookingForm, treatment: e.target.value})}>
                          <option value="">-- Pilih Layanan --</option>
                          {mockData.treatmentCatalog.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tanggal</label>
                        <input type="date" className="w-full p-3 bg-[#F2F6F4] border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#E5806A] outline-none text-slate-700" value={bookingForm.date} onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Waktu Preferensi</label>
                        <input type="time" className="w-full p-3 bg-[#F2F6F4] border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#E5806A] outline-none text-slate-700" value={bookingForm.time} onChange={(e) => setBookingForm({...bookingForm, time: e.target.value})} />
                      </div>
                      <button type="submit" className="w-full mt-4 py-3.5 bg-[#12243A] text-white rounded-xl text-sm font-bold hover:bg-[#E5806A] transition-colors flex justify-center items-center gap-2">
                        <Send size={16} /> Kirim Pengajuan
                      </button>
                    </form>
                  </div>
                </div>

                <div className="lg:col-span-8">
                  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                    <h3 className="text-xl font-bold text-[#12243A] mb-6">Katalog Layanan GlowCare</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="bg-[#F2F6F4] text-[#12243A] text-xs uppercase tracking-widest">
                            <th className="p-4 font-bold rounded-tl-xl rounded-bl-xl">Nama Treatment</th>
                            <th className="p-4 font-bold">Kategori</th>
                            <th className="p-4 font-bold">Durasi</th>
                            <th className="p-4 font-bold rounded-tr-xl rounded-br-xl">Harga Estimasi</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {mockData.treatmentCatalog.map((item) => (
                            <tr key={item.id} className="hover:bg-[#FFF0EC]/50 transition-colors">
                              <td className="p-4 font-bold text-[#12243A] text-sm">{item.name}</td>
                              <td className="p-4"><span className="px-3 py-1 bg-white border border-slate-200 text-slate-500 text-[10px] font-bold rounded-full">{item.category}</span></td>
                              <td className="p-4 text-sm text-slate-500">{item.duration}</td>
                              <td className="p-4 text-sm font-bold text-[#E5806A]">{item.price}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ================= VIEW: SHOP ================= */}
          {activeTab === 'shop' && (
            <motion.div key="shop" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-[#12243A]">GlowCare Shop</h2>
                <p className="text-slate-500 mt-2">Produk perawatan eksklusif yang dirancang oleh ahli dermatologi kami.</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {mockData.shopItems.map((product) => (
                  <div key={product.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:border-[#E5806A]/30 transition-all group flex flex-col justify-between">
                    <div>
                      <div className="h-40 bg-[#F2F6F4] rounded-2xl flex items-center justify-center text-6xl mb-6 group-hover:scale-105 transition-transform">{product.image}</div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{product.category}</span>
                      <h3 className="font-bold text-[#12243A] mt-1 mb-2 leading-tight">{product.name}</h3>
                      <p className="text-[#E5806A] font-bold mb-4">{product.price}</p>
                    </div>
                    <button 
                      onClick={() => addToCart(product)}
                      className="w-full py-2.5 mt-auto bg-[#12243A] text-white rounded-xl text-sm font-semibold hover:bg-[#E5806A] transition-colors active:scale-95 flex justify-center items-center gap-2"
                    >
                      <Plus size={16}/> Tambahkan
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ================= VIEW: PROMOS ================= */}
          {activeTab === 'promos' && (
            <motion.div key="promos" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-[#12243A]">Voucher & Promo</h2>
                <p className="text-slate-500 mt-2">Klaim diskon spesial untuk treatment Anda berikutnya.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockData.promos.map((promo) => (
                  <div key={promo.id} className="bg-gradient-to-br from-[#E5806A] to-[#D46B54] p-8 rounded-[2rem] text-white shadow-lg relative overflow-hidden flex flex-col justify-between h-full">
                    <div className="absolute -right-4 -top-4 opacity-20"><Ticket size={100} /></div>
                    <div className="relative z-10 flex-grow">
                      <h3 className="text-2xl font-bold mb-3 text-[#FFF0EC] leading-tight">{promo.title}</h3>
                      <p className="text-white/90 text-sm mb-6 max-w-[90%] leading-relaxed">{promo.desc}</p>
                    </div>
                    <div className="relative z-10 mt-auto pt-6 border-t border-white/20">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                          <p className="text-[10px] uppercase font-bold text-[#FFF0EC]/70">Kode Promo</p>
                          <p className="font-mono font-bold text-lg bg-[#12243A]/20 px-3 py-1 rounded-lg mt-1 inline-block tracking-widest">{promo.code}</p>
                        </div>
                        <button 
                          onClick={() => showToast(`Kode ${promo.code} berhasil disalin!`)}
                          className="px-6 py-2.5 bg-[#12243A] text-white rounded-xl text-sm font-bold hover:bg-[#12243A]/80 transition-colors active:scale-95 shadow-md whitespace-nowrap"
                        >
                          Salin Kode
                        </button>
                      </div>
                      <p className="text-[10px] font-medium text-[#FFF0EC]/70 mt-4">Berlaku hingga: <span className="text-white">{promo.valid}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ================= VIEW: TRANSACTIONS ================= */}
          {activeTab === 'transactions' && (
            <motion.div key="transactions" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-[#12243A]">Riwayat Transaksi</h2>
                  <p className="text-slate-500 mt-2">Pantau status pesanan dan pembelian produk Anda.</p>
                </div>
                <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100 hidden sm:block">
                  <Receipt size={32} className="text-[#E5806A]" />
                </div>
              </div>

              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                {transactions.length === 0 ? (
                  <p className="text-center text-slate-500">Belum ada transaksi saat ini.</p>
                ) : (
                  <div className="space-y-6">
                    {transactions.map((trx, idx) => (
                      <div key={idx} className="flex flex-col md:flex-row justify-between p-6 bg-[#F2F6F4] rounded-2xl border border-slate-100">
                        <div className="mb-4 md:mb-0">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-bold text-[#12243A] text-lg">{trx.id}</h4>
                            <span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider ${trx.status === 'Selesai' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                              {trx.status}
                            </span>
                          </div>
                          <p className="text-sm text-slate-500 mb-4 flex items-center gap-2"><Calendar size={14}/> {trx.date}</p>
                          <ul className="text-sm text-slate-600 space-y-1 list-none">
                            {trx.items.map((item, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <div className="w-1 h-1 rounded-full bg-[#E5806A]"></div> {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex flex-col justify-end text-left md:text-right">
                          <p className="text-xs font-bold text-slate-400 uppercase">Total Belanja</p>
                          <p className="text-2xl font-bold text-[#E5806A] mt-1">{formatCurrency(trx.total)}</p>
                          {/* TOMBOL LIHAT INVOICE DIUPDATE */}
                          <button 
                            onClick={() => setSelectedInvoice(trx)}
                            className="mt-4 px-6 py-2.5 bg-white text-[#12243A] border border-slate-200 rounded-xl text-xs font-bold hover:bg-[#FFF0EC] hover:border-[#FFE4DC] hover:text-[#E5806A] transition-colors flex items-center justify-center gap-2"
                          >
                            <Receipt size={14} /> Lihat Invoice
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}