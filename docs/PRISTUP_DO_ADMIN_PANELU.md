# Návod: Přístup do Admin Panelu

## Krok 1: Připravit Supabase databázi

### A) Spustit SQL skript v Supabase

1. Přejděte do Supabase Dashboard: https://supabase.com/dashboard
2. Vyberte váš projekt ART DUM
3. V levém menu klikněte na **SQL Editor**
4. Zkopírujte celý obsah souboru `scripts/001_create_admin_tables.sql`
5. Vložte do SQL editoru a klikněte **Run**

✅ Tento skript vytvoří:
- Tabulku `profiles` (uživatelské profily s rolemi)
- Tabulku `inquiries` (poptávky z kontaktního formuláře)
- Tabulku `projects` (projekty a rekonstrukce)
- RLS políčka pro zabezpečení dat

---

## Krok 2: Vytvořit Admin účet

### A) Registrace prvního uživatele

1. Spusťte lokální development server:
   \`\`\`bash
   npm run dev
   \`\`\`

2. Otevřete v prohlížeči: http://localhost:3000/auth/login

3. Zaregistrujte se s vaším emailem (např. `info@artdum.cz`)

### B) Nastavit roli "owner" v Supabase

1. Vraťte se do Supabase Dashboard
2. Otevřete **SQL Editor**
3. Spusťte tento příkaz (nahraďte email):

\`\`\`sql
-- Najděte ID vašeho uživatele
SELECT id, email FROM auth.users WHERE email = 'info@artdum.cz';

-- Nastavte roli na 'owner'
UPDATE profiles 
SET role = 'owner', full_name = 'ART DUM Admin'
WHERE email = 'info@artdum.cz';
\`\`\`

4. Ověřte změnu:
\`\`\`sql
SELECT * FROM profiles WHERE email = 'info@artdum.cz';
\`\`\`

Měli byste vidět `role: owner`

---

## Krok 3: Přihlášení do Admin Panelu

1. **Přejděte na přihlašovací stránku:**
   - Lokálně: http://localhost:3000/auth/login
   - Produkce: https://artdum.cz/auth/login

2. **Přihlaste se** pomocí emailu a hesla

3. **Přístup k admin sekci:**
   - Dashboard: `/admin`
   - Poptávky: `/admin/inquiries`
   - Projekty: `/admin/projects`
   - Analytika: `/admin/analytics`

---

## Admin Panel - Funkce

### 📊 Dashboard (`/admin`)
- Přehled klíčových metrik
- Nové poptávky za posledních 30 dní
- Aktivní projekty
- Úspěšnost konverze poptávek
- Rychlý přístup k nejnovějším poptávkám

### 📋 Správa poptávek (`/admin/inquiries`)
- Seznam všech poptávek z kontaktního formuláře
- Filtrace podle stavu (nové, probíhající, dokončené, zamítnuté)
- Přiřazení poptávky členovi týmu
- Změna priority
- Vytvoření projektu z poptávky
- Poznámky k poptávce

### 🏗️ Projektový management (`/admin/projects`)
- Seznam všech projektů
- Filtrace podle stavu (plánování, probíhá, dokončeno, pozastaveno, zrušeno)
- Správa rozpočtu a skutečných nákladů
- Sledování termínů
- Propojení s původní poptávkou
- Detail klienta

### 📈 Business Analytics (`/admin/analytics`)
- Klíčové metriky (obrat, průměrná hodnota projektu)
- Trendy poptávek a projektů
- Nejžádanější služby
- Konverzní poměr
- Automatická doporučení pro zlepšení

---

## Testování funkcí

### 1. Test kontaktního formuláře
1. Otevřete: http://localhost:3000/kontakt
2. Vyplňte formulář a odešlete
3. Přejděte do admin panelu: `/admin/inquiries`
4. ✅ Měli byste vidět novou poptávku

### 2. Test vytvoření projektu
1. V admin panelu přejděte na poptávku
2. Klikněte "Vytvořit projekt"
3. Vyplňte detaily projektu
4. ✅ Projekt se zobrazí v `/admin/projects`

### 3. Test analytics
1. Přejděte na `/admin/analytics`
2. ✅ Měli byste vidět statistiky poptávek a projektů

---

## Bezpečnost

### Role a oprávnění
- **owner** - Plný přístup ke všemu
- **admin** - Správa poptávek a projektů (nemůže měnit role)
- **user** - Žádný přístup do admin panelu

### RLS (Row Level Security)
Všechny tabulky jsou chráněny RLS políčky:
- Běžní uživatelé vidí jen svoje data
- Admini a owners vidí všechna data
- Veřejnost může pouze vkládat poptávky

### Middleware ochrana
- Automatické refreshování session tokenů
- Ochrana admin routes - redirect na login pokud není přihlášen
- Kontrola role před přístupem k datům

---

## Řešení problémů

### Problém: Nelze se přihlásit
**Řešení:** Zkontrolujte Supabase environment variables v Vercel:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Problém: "Nemáte oprávnění"
**Řešení:** Zkontrolujte roli v databázi:
\`\`\`sql
SELECT email, role FROM profiles WHERE email = 'vas@email.cz';
\`\`\`
Role musí být `admin` nebo `owner`

### Problém: Poptávky se nezobrazují
**Řešení:** 
1. Zkontrolujte, že SQL skripty proběhly úspěšně
2. Ověřte RLS políčka v Supabase
3. Zkontrolujte browser console pro chyby

---

## Kontakt při problémech

Pokud narazíte na problémy:
1. Zkontrolujte browser console (F12)
2. Zkontrolujte Vercel logs
3. Zkontrolujte Supabase logs (Dashboard → Logs)
