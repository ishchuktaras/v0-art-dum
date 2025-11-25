-- Skript pro nastavení ADMIN/OWNER práv
-- Spustit v Supabase SQL Editoru

-- 1. Nastavit práva pro Vývojáře (Vás)
INSERT INTO profiles (id, email, full_name, role)
SELECT id, email, COALESCE(raw_user_meta_data->>'full_name', email), 'owner'
FROM auth.users
WHERE email = 'info@webnamiru.site'
ON CONFLICT (id) DO UPDATE SET role = 'owner';

-- 2. Nastavit práva pro Majitele (Klienta)
INSERT INTO profiles (id, email, full_name, role)
SELECT id, email, COALESCE(raw_user_meta_data->>'full_name', email), 'owner'
FROM auth.users
WHERE email = 'firma@artdum.cz'
ON CONFLICT (id) DO UPDATE SET role = 'owner';

-- Kontrola
SELECT email, role FROM profiles WHERE role = 'owner';