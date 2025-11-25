-- ZÁLOHA FUNKČNÍHO NASTAVENÍ (Current Working State)

-- 1. Povolení bezpečnosti
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- 2. Vyčištění všech starých/konfliktních pravidel
DROP POLICY IF EXISTS "Public Insert" ON inquiries;
DROP POLICY IF EXISTS "Public insert policy" ON inquiries;
DROP POLICY IF EXISTS "Auth Read" ON inquiries;
DROP POLICY IF EXISTS "Auth read policy" ON inquiries;
DROP POLICY IF EXISTS "Allow public inserts" ON inquiries;
DROP POLICY IF EXISTS "inquiries_insert_public" ON inquiries;
DROP POLICY IF EXISTS "inquiries_select_admin" ON inquiries;

-- 3. Pravidlo pro VKLÁDÁNÍ (Formulář webu)
CREATE POLICY "Public Insert"
ON inquiries
FOR INSERT
TO public
WITH CHECK (true);

-- 4. Pravidlo pro ČTENÍ (Admin panel)
CREATE POLICY "Auth Read"
ON inquiries
FOR SELECT
TO authenticated
USING (true);

-- 5. Nastavení admin role (Pokud uživatel existuje)
-- Toto zajistí, že váš email bude mít práva
UPDATE public.profiles
SET role = 'owner'
WHERE email = 'firma@artdum.cz';