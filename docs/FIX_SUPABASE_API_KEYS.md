# Fix Supabase API Keys - 401 Unauthorized Error

## Problém
Při registraci se zobrazuje "Invalid API key" a v console je "401 Unauthorized".

## Příčina
Environment variables `NEXT_PUBLIC_SUPABASE_URL` a `NEXT_PUBLIC_SUPABASE_ANON_KEY` v Vercel jsou **nesprávné nebo zastaralé**.

---

## ✅ Řešení: Aktualizace API klíčů

### Krok 1: Získejte správné API klíče ze Supabase

1. Jděte do [Supabase Dashboard](https://supabase.com/dashboard)
2. Otevřete projekt **art_dum_db**
3. V levém menu klikněte na **⚙️ Settings** (dole)
4. Klikněte na **API** v submenu
5. Zkopírujte tyto hodnoty:
   - **Project URL**: `https://dolgjtihagxwsrgqwocx.supabase.co`
   - **anon public key**: (dlouhý JWT token začínající `eyJhbGci...`)

### Krok 2: Aktualizujte environment variables ve Vercel

1. Jděte do [Vercel Dashboard](https://vercel.com/dashboard)
2. Otevřete projekt **v0-art-dum**
3. Klikněte na **Settings** → **Environment Variables**
4. Najděte a **EDITUJTE** tyto proměnné:

   \`\`\`
   NEXT_PUBLIC_SUPABASE_URL = https://dolgjtihagxwsrgqwocx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = [VÁŠ NOVÝ ANON KEY ZE SUPABASE]
   \`\`\`

5. **DŮLEŽITÉ**: Zaškrtněte všechny environments (Production, Preview, Development)
6. Klikněte **Save**

### Krok 3: Redeploy aplikace

Po uložení nových klíčů musíte aplikaci **redeployovat**:

1. V Vercel dashboardu jděte na **Deployments**
2. Najděte poslední úspěšný deployment
3. Klikněte na **⋯** (tři tečky) → **Redeploy**
4. Nebo pushněte prázdný commit do Git:
   \`\`\`bash
   git commit --allow-empty -m "chore: redeploy to update env vars"
   git push
   \`\`\`

### Krok 4: Ověření

Po redeployi:
1. Otevřete **www.artdum.cz/auth/login**
2. Klikněte "Zaregistrujte se"
3. Vyplňte email a heslo
4. Už by **neměla** být chyba "Invalid API key"

---

## 🔍 Další kontroly

### Zkontrolujte RLS policies
Pokud registrace stále nefunguje, spusťte repair skript:

\`\`\`sql
-- V Supabase SQL Editoru:
-- scripts/002_repair_database.sql
\`\`\`

### Zkontrolujte Supabase projekt
Ujistěte se, že v Supabase dashboardu máte otevřený správný projekt:
- Název projektu: **art_dum_db**
- URL: `https://dolgjtihagxwsrgqwocx.supabase.co`

---

## 📝 Co dělat po opravě

1. Zaregistrujte admina: **admin@artdum.cz** nebo **firma@artdum.cz**
2. V Supabase Dashboard → Authentication → Users → **Confirm email** (manuálně)
3. V Supabase SQL Editoru nastavte owner roli:
   \`\`\`sql
   UPDATE profiles SET role = 'owner' WHERE email = 'admin@artdum.cz';
   \`\`\`
4. Přihlaste se do admin panelu: **www.artdum.cz/admin**
