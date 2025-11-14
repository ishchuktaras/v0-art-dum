# Environment Variables Setup

## Problém s chybějícími env proměnnými

Pokud vidíte chybu:
\`\`\`
[v0] NEXT_PUBLIC_SUPABASE_URL: ✗
[v0] NEXT_PUBLIC_SUPABASE_ANON_KEY: ✗
Error: Supabase credentials are missing
\`\`\`

## Řešení

### 1. Vytvořit `.env.local` soubor

V root složce projektu vytvořte soubor `.env.local` (už by měl existovat):

\`\`\`bash
# V terminálu v root složce projektu
touch .env.local
\`\`\`

### 2. Zkopírovat credentials

Soubor `.env.local` by měl obsahovat:

\`\`\`env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://qpjgjjsdbpqvzcmhhdjl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=40eftycz
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-10
SANITY_API_TOKEN=skeQf6fH5yGllw2UXLGy...

# Email
CONTACT_EMAIL=firma@artdum.cz
RESEND_API_KEY=re_KCUSnq3r...
\`\`\`

### 3. Restartovat dev server

**DŮLEŽITÉ:** Po vytvoření/úpravě `.env.local` MUSÍTE restartovat Next.js dev server:

\`\`\`bash
# Zastavit server (Ctrl+C)
# Pak spustit znovu:
npm run dev
\`\`\`

### 4. Ověřit že proměnné jsou načtené

Po restartu serveru otevřete konzoli v browseru (F12) a měli byste vidět:

\`\`\`
[v0] NEXT_PUBLIC_SUPABASE_URL: ✓
[v0] NEXT_PUBLIC_SUPABASE_ANON_KEY: ✓
\`\`\`

## Běžné problémy

### Problem: Stále vidím ✗

**Řešení:**
1. Ujistěte se, že soubor se jmenuje přesně `.env.local` (s tečkou na začátku)
2. Ujistěte se, že soubor je v root složce projektu (vedle `package.json`)
3. Restartujte dev server pomocí `npm run dev`
4. Vyčistěte cache: `rm -rf .next && npm run dev`

### Problem: Production (Vercel) nefunguje

Environment proměnné v production se nastavují v Vercel dashboard:
1. Přejděte na https://vercel.com/your-project/settings/environment-variables
2. Přidejte všechny `NEXT_PUBLIC_*` proměnné
3. Redeploy projektu

## Security Best Practices

**NEXT_PUBLIC_ Prefix:**
- Pouze pro non-sensitive hodnoty které mohou být v browseru
- Příklady: Supabase URL, Sanity Project ID, API versions

**Server-Only Variables (BEZ NEXT_PUBLIC_):**
- **NIKDY** nepoužívejte `NEXT_PUBLIC_` prefix pro API klíče, tokeny nebo secrets
- Příklady: `RESEND_API_KEY`, `SANITY_API_TOKEN`, database credentials
- Tyto jsou dostupné pouze v server komponentách a API routes

**Security Note:**
- `.env.local` je v `.gitignore` a NIKDY se necommituje do git
- Všechny `NEXT_PUBLIC_*` proměnné jsou viditelné v browseru
- Citlivé klíče bez `NEXT_PUBLIC_` jsou dostupné pouze na serveru
