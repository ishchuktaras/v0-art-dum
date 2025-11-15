# Supabase Email Konfigurace - Řešení problému s potvrzovacími emaily

## Problém
Při registraci se zobrazí "Registrace úspěšná! Zkontrolujte email pro potvrzení účtu.", ale **žádný email nepřijde**.

## Příčina
Supabase projekt nemá nakonfigurovaný SMTP server nebo používá výchozí Supabase email službu s limity.

---

## Řešení 1: Povolit email confirmation (DEV/TEST)

### Pro testování BEZ emailů:

1. **Vypnout email confirmation v Supabase:**
   - Jděte do [Supabase Dashboard](https://supabase.com/dashboard)
   - Vyberte projekt
   - **Authentication → Settings → Email Auth**
   - **VYPNĚTE** "Enable email confirmations"
   - Uložte změny

2. **Po registraci:**
   - Uživatel je automaticky aktivní
   - Může se rovnou přihlásit
   - **VHODNÉ PRO VÝVOJ**, ne pro produkci

---

## Řešení 2: Nastavit vlastní SMTP (PRODUKCE)

### Doporučené SMTP služby:
- **Resend** (doporučeno) - 3000 emailů/měsíc zdarma
- **SendGrid** - 100 emailů/den zdarma
- **Mailgun** - 5000 emailů/měsíc zdarma
- **Amazon SES** - levné řešení

### Postup nastavení (příklad s Resend):

#### 1. Zaregistrujte se na Resend
- Jděte na https://resend.com
- Vytvořte účet
- Ověřte doménu (nebo použijte `onboarding@resend.dev` pro testování)

#### 2. Získejte API klíč
- V Resend dashboardu: **API Keys** → **Create API Key**
- Zkopírujte API klíč (začíná `re_...`)

#### 3. Nakonfigurujte Supabase SMTP
- V Supabase dashboardu: **Project Settings → Auth → SMTP Settings**
- **Enable Custom SMTP**: Zapnout
- **Sender email**: `noreply@artdum.cz` (nebo vaše ověřená doména v Resend)
- **Sender name**: `ART DUM`
- **Host**: `smtp.resend.com`
- **Port**: `587`
- **Username**: `resend`
- **Password**: *Váš Resend API klíč*
- **Uložte změny**

#### 4. Upravte Email Templates
- V Supabase: **Authentication → Email Templates**
- **Confirm signup** template:
  \`\`\`html
  <h2>Potvrzení registrace - ART DUM</h2>
  <p>Děkujeme za registraci do administračního systému ART DUM.</p>
  <p>Pro aktivaci účtu klikněte na tlačítko níže:</p>
  <p><a href="{{ .ConfirmationURL }}">Potvrdit email</a></p>
  <p>Pokud jste se neregistrovali, tento email ignorujte.</p>
  <p>S pozdravem,<br>Tým ART DUM</p>
  \`\`\`

#### 5. Nastavte Redirect URLs
- V Supabase: **Authentication → URL Configuration**
- **Site URL**: `https://www.artdum.cz`
- **Redirect URLs** (přidejte všechny):
  \`\`\`
  https://www.artdum.cz/auth/callback
  https://www.artdum.cz/admin
  https://art-dum.vercel.app/auth/callback
  https://art-dum.vercel.app/admin
  http://localhost:3000/auth/callback
  \`\`\`

---

## Řešení 3: Test emailů ručně (ALTERNATIVA)

Pokud nechcete čekat na SMTP setup:

### Manuální aktivace uživatele v Supabase:

1. **Najděte uživatele:**
   - Supabase Dashboard → **Authentication → Users**
   - Najděte registrovaného uživatele (např. `admin@artdum.cz`)

2. **Potvrďte email ručně:**
   - Klikněte na uživatele
   - V detailu uživatele najděte "Email Confirmed"
   - Změňte na **TRUE** (potvrzeno)

3. **Nastavte roli owner:**
   - Supabase Dashboard → **SQL Editor**
   - Spusťte SQL:
   \`\`\`sql
   -- Najděte user_id
   SELECT id, email FROM auth.users WHERE email = 'admin@artdum.cz';
   
   -- Aktualizujte profil na owner roli
   UPDATE profiles 
   SET role = 'owner' 
   WHERE id = 'USER_ID_ZDE';
   \`\`\`

4. **Test přihlášení:**
   - Jděte na https://www.artdum.cz/auth/login
   - Přihlaste se s email a heslem
   - Měli byste být přesměrováni do `/admin`

---

## Ověření funkčnosti

### Test celého flow:

1. **Registrace:**
   \`\`\`
   Email: test@artdum.cz
   Heslo: TestHeslo123
   \`\`\`

2. **Zkontrolujte email inbox** (včetně spam složky)

3. **Klikněte na confirmation link** v emailu

4. **Měli byste být přesměrováni** na `/auth/callback` → pak `/admin` nebo homepage

5. **Přihlaste se** s novým účtem

### Troubleshooting:

**Email stále nepřichází:**
- Zkontrolujte SMTP credentials v Supabase
- Ověřte, že doména je ověřená v SMTP provideru (Resend/SendGrid)
- Zkontrolujte spam složku
- V Resend/SendGrid dashboardu zkontrolujte logs - byly emaily odeslány?

**Redirect po confirmation nefunguje:**
- Zkontrolujte Redirect URLs v Supabase jsou správné
- Ověřte že `emailRedirectTo` v kódu je `${window.location.origin}/auth/callback`

**Uživatel je vytvořen ale nemůže se přihlásit:**
- Email musí být potvrzen (buď kliknutím na link nebo ručně v dashboardu)
- Zkontrolujte heslo splňuje minimální požadavky (6+ znaků)

---

## Doporučená konfigurace pro produkci

Pro **www.artdum.cz** doporučuji:

1. **Použít Resend SMTP** s vlastní doménou
2. **Zapnout email confirmation** pro bezpečnost
3. **Vlastní email templates** v češtině
4. **Monitoring emailů** v Resend dashboardu

## Pro okamžité testování

Pokud potřebujete **hned testovat admin panel**:

1. Vypněte email confirmation v Supabase (Řešení 1)
2. Zaregistrujte se na webu
3. V Supabase SQL editoru nastavte roli na 'owner'
4. Přihlaste se

Později zapněte email confirmation a nastavte SMTP pro produkci.
