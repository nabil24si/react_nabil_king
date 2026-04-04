import React, { useState, useEffect } from "react";

// --- 1. REUSABLE COMPONENTS (Struktur Dasar Tailwind) ---

const InputField = ({ label, name, value, onChange, error, type = "text", placeholder }) => (
  <div className="mb-5">
    {/* Label: Mengambil gaya uppercase tracking wide dari Header */}
    <label className="block text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-[#283618] mb-2 font-sans italic">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full p-3 bg-[#fefae0] border-2 font-serif italic text-sm transition-all focus:outline-none ${
        error 
          ? "border-red-500 ring-2 ring-red-100" 
          : "border-[#bc6c25] focus:border-[#d35400] focus:shadow-[4px_4px_0px_0px_rgba(211,84,0,1)]"
      }`}
    />
    {error && (
      <div className="mt-2 p-2 text-[10px] font-mono font-bold uppercase bg-red-50 border-l-4 border-red-500 text-red-700">
        ⚠ Error: {error}
      </div>
    )}
  </div>
);

const SelectField = ({ label, name, value, onChange, options, error }) => (
  <div className="mb-5">
    <label className="block text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-[#283618] mb-2 font-sans italic">
      {label}
    </label>
    <div className="relative">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full p-3 bg-[#fefae0] border-2 rounded-none font-serif italic text-sm appearance-none transition-all focus:outline-none ${
          error 
            ? "border-red-500" 
            : "border-[#bc6c25] focus:border-[#d35400] focus:shadow-[4px_4px_0px_0px_rgba(211,84,0,1)]"
        }`}
      >
        <option value="">Pilih {label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#bc6c25]">▼</div>
    </div>
    {error && (
      <div className="mt-2 p-2 text-[10px] font-mono font-bold uppercase bg-red-50 border-l-4 border-red-500 text-red-700">
        ⚠ Error: {error}
      </div>
    )}
  </div>
);

// --- 2. MAIN COMPONENT ---

const FormPendaftaran = () => {
  const [formData, setFormData] = useState({ nama: "", email: "", umur: "", agama: "", status: "" });
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  // Validasi Logik
  const validate = (name, value) => {
    let errorMsg = "";
    if (name === "nama") {
      if (!value) errorMsg = "Nama wajib diisi";
      else if (/[0-9]/.test(value)) errorMsg = "Nama dilarang mengandung angka";
      else if (value.length < 3) errorMsg = "Minimal 3 karakter";
    }
    if (name === "email") {
      if (!value) errorMsg = "Email wajib diisi";
      else if (!/\S+@\S+\.\S+/.test(value)) errorMsg = "Format email salah";
    }
    if (name === "umur") {
      if (!value) errorMsg = "Umur wajib diisi";
      else if (isNaN(value)) errorMsg = "Harus angka";
      else if (parseInt(value) < 17) errorMsg = "Minimal 17 tahun";
    }
    if (name === "agama" && !value) errorMsg = "Pilih agama";
    if (name === "status" && !value) errorMsg = "Pilih status";
    return errorMsg;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
  };

  useEffect(() => {
    const checkValid = Object.keys(formData).every(k => !validate(k, formData[k]));
    setIsFormValid(checkValid);
  }, [formData]);

  return (
    <div className="bg-[#f5f5f5] min-h-screen py-12 px-4 font-sans text-stone-800">
      <div className="max-w-2xl mx-auto">
        
        {/* ELEMENT: HEADER BANNER (Gaya Vintage Sale 2026) */}
        <div className="bg-[#d35400] p-8 md:p-10 text-[#fefae0] text-center border-b-[10px] border-[#bc6c25] rounded-t-3xl shadow-xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>
          <span className="uppercase tracking-[0.5em] text-[10px] font-bold mb-3 block relative z-10">Member Registration 2026</span>
          <h1 className="text-4xl md:text-5xl font-serif font-black italic uppercase tracking-tighter relative z-10">Gabung Wokpee</h1>
          <p className="mt-2 font-mono text-[10px] border border-[#fefae0] inline-block px-4 py-1 relative z-10">Edisi Koleksi Barang Tua</p>
        </div>

        {/* ELEMENT: FORM BODY (Gaya ShadowEffects & Border) */}
        <div className="bg-white p-8 md:p-12 border-x-2 border-b-2 border-stone-200 rounded-b-3xl shadow-[0_20px_50px_rgba(211,84,0,0.1)]">
          <form onSubmit={(e) => { e.preventDefault(); setSubmittedData(formData); }}>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
              <InputField label="Nama Lengkap" name="nama" value={formData.nama} 
              onChange={handleChange} error={errors.nama} placeholder="Tuan Crab" />
              <InputField label="Alamat Email" name="email" type="email" value={formData.email} 
              onChange={handleChange} error={errors.email} placeholder="crab@vintage.com" />
            </div>

            <InputField label="Usia Anggota" name="umur" value={formData.umur} 
            onChange={handleChange} error={errors.umur} placeholder="Minimal 17 Tahun" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
              <SelectField label="Keyakinan" name="agama" value={formData.agama} 
              onChange={handleChange} error={errors.agama} options={["Islam", "Kristen", "Katolik", "Hindu", "Budha"]} />
              <SelectField label="Status Sosial" name="status" value={formData.status} 
              onChange={handleChange} error={errors.status} options={["Pelajar", "Mahasiswa", "Bekerja", "Antik"]} />
            </div>

            {/* ELEMENT: SUBMIT BUTTON (Gaya BorderRadius Muat Lebih Banyak) */}
            <div className="mt-10 flex justify-center">
              {isFormValid ? (
                <button type="submit" className="w-full border-4 border-[#d35400] text-[#d35400] px-12 py-4 font-black uppercase tracking-widest hover:bg-[#d35400] hover:text-white transition-all shadow-[10px_10px_0px_0px_rgba(211,84,0,0.1)] italic active:translate-y-1 active:shadow-none bg-transparent">
                  Daftar Sekarang Juga
                </button>
              ) : (
                <div className="w-full text-center py-4 border-4 border-dashed border-stone-200 text-stone-300 font-black uppercase tracking-widest italic cursor-not-allowed">
                  Formulir Belum Lengkap
                </div>
              )}
            </div>
          </form>

          {/* ELEMENT: HASIL DATA (Gaya Typography / Tentang Shopee Vintage) */}
          {submittedData && (
            <div className="mt-12 p-8 bg-[#283618] rounded-2xl text-[#fefae0] border-b-[8px] border-[#bc6c25] animate-fade-in shadow-2xl">
              <h3 className="text-2xl font-serif font-black italic mb-6 border-b border-[#fefae0]/20 pb-2">Konfirmasi Data Antik:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-[11px] uppercase">
                <div className="p-3 border border-[#fefae0]/10">
                  <p className="text-stone-400 mb-1 tracking-widest">Identitas</p>
                  <p className="text-lg font-serif italic normal-case leading-tight">{submittedData.nama}</p>
                </div>
                <div className="p-3 border border-[#fefae0]/10">
                  <p className="text-stone-400 mb-1 tracking-widest">Surat Elektronik</p>
                  <p className="text-lg font-serif italic normal-case leading-tight">{submittedData.email}</p>
                </div>
                <div className="p-3 border border-[#fefae0]/10">
                  <p className="text-stone-400 mb-1 tracking-widest">Kategori</p>
                  <p className="text-lg font-serif italic normal-case leading-tight">{submittedData.status}</p>
                </div>
                <div className="p-3 border border-[#fefae0]/10 flex items-center justify-center">
                  <p className="text-center font-black text-[#bc6c25] text-xs tracking-[0.3em]">TERVERIFIKASI 2026</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ELEMENT: FOOTER INFO (Gaya BackgroundColors Koin Shopee) */}
        <div className="mt-10 bg-[#fefae0] p-6 rounded-2xl border-2 border-[#bc6c25]/20 shadow-sm flex items-center gap-6 group hover:border-[#d35400]/40 transition-all">
          <div className="w-16 h-16 bg-[#bc6c25] rounded-full flex-shrink-0 border-4 border-white shadow-lg group-hover:rotate-12 transition-transform flex items-center justify-center text-[#fefae0] font-black text-2xl font-serif italic">W</div>
          <div>
            <h3 className="text-lg font-serif font-bold text-[#283618] italic tracking-tight">Koin Wokpee Menantimu</h3>
            <p className="text-xs text-stone-500 mt-1 leading-relaxed">
              Dapatkan **100 Koin Wokpee** secara cuma-cuma untuk pendaftaran anggota baru di tahun 2026 ini!
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FormPendaftaran;