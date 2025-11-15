# Nastavení Admin Přístupu

Uživatel `info@webnamiru.site` byl úspěšně vytvořen a email byl potvrzen v Supabase!

## Krok 1: Nastavit roli Owner

Spusťte SQL skript v Supabase SQL Editoru:

\`\`\`sql
-- Set owner role for info@webnamiru.site
INSERT INTO profiles (id, email, full_name, role)
SELECT 
  id,
  email,
  COALESCE(raw_user_meta_data->>'full_name', email) as full_name,
  'owner' as role
FROM auth.users
WHERE email = 'info@webnamiru.site'
ON CONFLICT (id) 
DO UPDATE SET 
  role = 'owner',
  updated_at = now();
\`\`\`

Nebo použijte připravený skript: `scripts/003_set_owner_role.sql`

## Krok 2: Přihlášení do Admin Panelu

1. Jděte na: https://www.artdum.cz/auth/login
2. Zadejte:
   - Email: `info@webnamiru.site`
   - Heslo: (vaše heslo z registrace)
3. Po přihlášení budete přesměrováni na: https://www.artdum.cz/admin

## Ověření Přístupu

Admin panel by měl zobrazit:
- Dashboard s přehledem statistik
- Navigace: Poptávky, Projekty, Analytics
- Možnost vytvářet nové projekty a spravovat poptávky

## Troubleshooting

### Problém: Stále vidím 403 stránku
**Řešení:**
1. Ověřte, že SQL skript proběhl úspěšně
2. Zkontrolujte v Supabase Table Editor → profiles → najděte svůj záznam
3. Mělo by být: `role = 'owner'`
4. Odhlaste se a přihlaste znovu

### Problém: "Invalid login credentials"
**Řešení:**
- Zkontrolujte heslo
- Ujistěte se, že email byl potvrzen (confirmed_at není null)

### Problém: Přesměrování na /403 místo /admin
**Řešení:**
- Profil neexistuje nebo nemá správnou roli
- Spusťte SQL skript znovu
- Vyprázdněte cache browseru a zkuste znovu

## Další Admin Uživatelé

Pro vytvoření dalších admin uživatelů:

\`\`\`sql
-- Set admin role for another user
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'dalsi.admin@artdum.cz';
\`\`\`

## Role v Systému

- `owner` - Plný přístup ke všemu (doporučeno pro hlavního administrátora)
- `admin` - Správa poptávek a projektů
- `user` - Základní přístup (výchozí pro nové registrace)
