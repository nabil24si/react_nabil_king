-- ============================================================
-- SQL SCHEMA untuk Aplikasi Nabil King
-- Copy paste seluruh script ini ke Supabase SQL Editor
-- ============================================================

-- 1. TABLE: users (sudah ada, tapi dibuat ulang untuk referensi)
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TABLE: patients (pasien)
CREATE TABLE IF NOT EXISTS patients (
    id BIGSERIAL PRIMARY KEY,
    patientName VARCHAR(200) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    treatment VARCHAR(100) DEFAULT 'Facial',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABLE: appointments (janji temu)
CREATE TABLE IF NOT EXISTS appointments (
    id BIGSERIAL PRIMARY KEY,
    patientName VARCHAR(200) NOT NULL,
    service VARCHAR(100) NOT NULL,
    date VARCHAR(50),
    status VARCHAR(50) DEFAULT 'Scheduled',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TABLE: services (layanan)
CREATE TABLE IF NOT EXISTS services (
    id BIGSERIAL PRIMARY KEY,
    serviceName VARCHAR(200) NOT NULL,
    category VARCHAR(100) DEFAULT 'Facial',
    duration VARCHAR(50) DEFAULT '60',
    price VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SEED DATA (Opsional - untuk testing)
-- ============================================================

-- Seed untuk patients
INSERT INTO patients (patientName, email, phone, treatment) VALUES
('Sarah Miller', 'sarah@example.com', '+62 812-3456-8001', 'Facial Rejuvenation'),
('Maurice Galley', 'maurice@example.com', '+62 812-3456-8002', 'Laser Hair Removal'),
('Julia Watson', 'julia@example.com', '+62 812-3456-8003', 'Botox Injections'),
('Stephen Hawk', 'stephen@example.com', '+62 812-3456-8004', 'Microdermabrasion'),
('Emma Wilson', 'emma@example.com', '+62 812-3456-8005', 'Chemical Peels'),
('Budi Santoso', 'budi@example.com', '+62 812-3456-8006', 'Facial Rejuvenation'),
('Siti Aminah', 'siti@example.com', '+62 812-3456-8007', 'Laser Hair Removal'),
('Andi Saputra', 'andi@example.com', '+62 812-3456-8008', 'Botox Injections'),
('Dinda Kirana', 'dinda@example.com', '+62 812-3456-8009', 'Facial Rejuvenation'),
('Michelle Tan', 'michelle@example.com', '+62 812-3456-8010', 'Microdermabrasion');

-- Seed untuk appointments
INSERT INTO appointments (patientName, service, date, status) VALUES
('Sarah Miller', 'Facial Rejuvenation', '2028-09-12 09:00 AM', 'Completed'),
('Maurice Galley', 'Laser Hair Removal', '2028-09-12 12:00 PM', 'In Progress'),
('Julia Watson', 'Botox Injections', '2028-09-12 02:30 PM', 'Scheduled'),
('Stephen Hawk', 'Microdermabrasion', '2028-09-12 04:30 PM', 'Completed'),
('Emma Wilson', 'Chemical Peels', '2028-09-13 09:30 AM', 'In Progress'),
('Budi Santoso', 'Facial Rejuvenation', '2028-09-14 10:00 AM', 'Scheduled'),
('Siti Aminah', 'Laser Hair Removal', '2028-09-14 01:00 PM', 'Scheduled'),
('Andi Saputra', 'Botox Injections', '2028-09-15 11:00 AM', 'Scheduled'),
('Dinda Kirana', 'Facial Rejuvenation', '2028-09-15 03:00 PM', 'Scheduled'),
('Michelle Tan', 'Microdermabrasion', '2028-09-16 09:30 AM', 'Scheduled');

-- Seed untuk services
INSERT INTO services (serviceName, category, duration, price) VALUES
('Premium Pico Laser Rejuvenation', 'Laser', '60', 'Rp 1.500.000'),
('HydraFacial Glow', 'Facial', '45', 'Rp 750.000'),
('Acne Peeling Treatment', 'Facial', '30', 'Rp 500.000'),
('Salmon DNA Injection', 'Injection', '60', 'Rp 2.500.000'),
('Gold Facial Detox', 'Facial', '60', 'Rp 1.200.000'),
('Laser Hair Removal Full Body', 'Laser', '90', 'Rp 3.000.000'),
('Classic Massage Therapy', 'Massage', '60', 'Rp 350.000'),
('Hot Stone Massage', 'Massage', '90', 'Rp 550.000'),
('Microdermabrasion', 'Facial', '45', 'Rp 600.000'),
('Botox Injection', 'Injection', '30', 'Rp 2.000.000');

-- ============================================================
-- RLS (Row Level Security) - Opsional
-- ============================================================

-- Enable RLS pada semua tabel (jika diperlukan)
-- ALTER TABLE users ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Policy: Izinkan anon key untuk membaca/menulis
-- CREATE POLICY "Allow anon full access on users" ON users FOR ALL USING (true) WITH CHECK (true);
-- CREATE POLICY "Allow anon full access on patients" ON patients FOR ALL USING (true) WITH CHECK (true);
-- CREATE POLICY "Allow anon full access on appointments" ON appointments FOR ALL USING (true) WITH CHECK (true);
-- CREATE POLICY "Allow anon full access on services" ON services FOR ALL USING (true) WITH CHECK (true);