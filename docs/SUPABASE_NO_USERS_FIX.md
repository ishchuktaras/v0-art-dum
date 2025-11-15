# Řešení problému: Žádní uživatelé v Supabase

## Problém
Registrace na webu hlásí úspěch, ale v Supabase dashboardu nejsou žádní uživatelé.

## Možné příčiny

### 1. SQL skripty nebyly spuštěny

**Řešení:**
1. Otevřete Supabase Dashboard → SQL Editor
2. Spusťte skript `scripts/001_create_admin_tables.sql`:
   - Zkopírujte celý obsah souboru
   - Vložte do SQL Editoru
   - Klikněte na "Run"
3. Zkontrolujte, že se vytvořily:
   - Tabulka `profiles`
   - Trigger funkce `handle_new_user()`
   - Trigger `on_auth_user_created`

**Jak ověřit, že trigger funguje:**
\`\`\`sql
-- Spusťte v SQL Editoru:
SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';
SELECT * FROM pg_proc WHERE proname = 'handle_new_user';
\`\`\`

### 2. Připojení k nesprávnému Supabase projektu

**Ověřte Project ID:**
1. V Supabase Dashboard najděte **Project Settings** → **General**
2. Zkopírujte **Reference ID** (např. `qpjgjjsdbpqvzcmhhdjl`)
3. Porovnejte s `NEXT_PUBLIC_SUPABASE_URL` v environment variables
4. URL by měla být: `https://[REFERENCE_ID].supabase.co`

**Zkontrolujte environment variables v Vercel:**
1. Vercel Dashboard → Projekt → Settings → Environment Variables
2. Ověřte:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
3. Musí odpovídat projektu, který máte otevřený v Supabase Dashboard

### 3. RLS policies blokují vytváření profilů

**Dočasné vypnutí RLS pro testování:**
\`\`\`sql
-- POUZE PRO TESTOVÁNÍ! Vrátit zpět po otestování
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
\`\`\`

Po registraci testovacího uživatele **vrátit RLS zpět**:
\`\`\`sql
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
\`\`\`

### 4. Email confirmation blokuje přihlášení

Pokud uživatel je vytvořen v `auth.users` ale nemůže se přihlásit:

**Ověřte v Supabase Dashboard → Authentication → Users:**
- Je tam email (admin@artdum.cz)?
- Je sloupec **Email Confirmed** prázdný?

**Řešení A - Manuální potvrzení:**
1. Najděte uživatele v tabulce
2. Klikněte na uživatele
3. Klikněte "Confirm email"

**Řešení B - Vypnutí email confirmation:**
1. Supabase Dashboard → Authentication → Email
2. Najděte "Confirm sign up"
3. Vypněte toggle

## Doporučený postup diagnostiky

### Krok 1: Ověřte, že se uživatel vytváří v auth.users
\`\`\`sql
-- Spusťte v SQL Editoru:
SELECT id, email, email_confirmed_at, created_at 
FROM auth.users 
ORDER BY created_at DESC;
\`\`\`

### Krok 2: Pokud není žádný uživatel
→ Zkontrolujte Project ID a environment variables (viz bod 2 výše)

### Krok 3: Pokud je uživatel v auth.users, ale ne v profiles
→ Spusťte SQL skripty (viz bod 1 výše)

### Krok 4: Zkontrolujte trigger
\`\`\`sql
-- Manuálně vytvořte profil pro testování:
INSERT INTO public.profiles (id, email, role)
SELECT id, email, 'owner'
FROM auth.users
WHERE email = 'admin@artdum.cz'
ON CONFLICT (id) DO UPDATE
SET role = 'owner';
\`\`\`

### Krok 5: Test registrace
1. Zkuste zaregistrovat nového uživatele (např. test@artdum.cz)
2. Zkontrolujte v SQL Editoru:
\`\`\`sql
SELECT * FROM auth.users WHERE email = 'test@artdum.cz';
SELECT * FROM public.profiles WHERE email = 'test@artdum.cz';
\`\`\`

## Rychlé řešení pro spuštění webu

Pokud chcete rychle zprovoznit přihlášení:

1. **Vypnout email confirmation:**
   - Supabase Dashboard → Authentication → Email → "Confirm sign up" → OFF

2. **Manuálně vytvořit admin účet:**
\`\`\`sql
-- Najít ID existujícího uživatele:
SELECT id, email FROM auth.users WHERE email = 'admin@artdum.cz';

-- Vytvořit profil s owner rolí:
INSERT INTO public.profiles (id, email, role, full_name)
VALUES (
  '[ID_Z_PREDCHOZIHO_SELECTU]',
  'admin@artdum.cz',
  'owner',
  'Administrator'
)
ON CONFLICT (id) DO UPDATE
SET role = 'owner';
\`\`\`

3. **Nastavit SMTP pro produkci** (viz `docs/SUPABASE_EMAIL_CONFIGURATION.md`)

## Troubleshooting

### Chyba: "User already registered"
Uživatel existuje, ale není vidět v dashboardu:
- Zkontrolujte, že máte správný Supabase projekt otevřený
- Project ID v URL dashboardu musí odpovídat env variables

### Chyba: "Invalid login credentials"
- Uživatel není potvrzený emailem → Viz bod 4 výše
- Špatné heslo → Reset hesla v Supabase Dashboard

### Trigger se nespustil
\`\`\`sql
-- Zkontrolujte, že trigger existuje:
SELECT 
  trigger_name,
  event_manipulation,
  event_object_table,
  action_statement
FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created';
\`\`\`

Pokud trigger neexistuje → Spusťte znovu `scripts/001_create_admin_tables.sql`
