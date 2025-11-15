# Oprava Supabase Email Redirect na produkční doménu

## Problém
Po kliknutí na "Confirm your mail" odkaz v emailu se uživatel přesměruje na `http://localhost:3000` místo produkční domény `https://www.artdum.cz`.

## Řešení

### 1. Oprava v Supabase Dashboard

1. **Přihlaste se do Supabase Dashboard:**
   - Otevřete https://supabase.com/dashboard
   - Vyberte váš projekt

2. **Nastavte Site URL:**
   - Jděte do **Authentication** → **URL Configuration**
   - Najděte pole **Site URL**
   - Změňte z: `http://localhost:3000`
   - Na: `https://www.artdum.cz`
   - Klikněte **Save**

3. **Přidejte Redirect URLs:**
   - Ve stejné sekci najděte **Redirect URLs**
   - Přidejte tyto URL (každá na nový řádek):
     \`\`\`
     https://www.artdum.cz/auth/callback
     https://www.artdum.cz/admin
     https://art-dum.vercel.app/auth/callback
     https://art-dum.vercel.app/admin
     http://localhost:3000/auth/callback
     http://localhost:3000/admin
     \`\`\`
   - Klikněte **Save**

### 2. Auth Callback Route

Vytvořil jsem novou route `/auth/callback` která zpracovává email confirmation:
- Přijímá `code` z URL parametru
- Vymění code za session pomocí `supabase.auth.exchangeCodeForSession()`
- Přesměruje uživatele do admin panelu
- V případě chyby přesměruje zpět na login s chybovou hláškou

### 3. Aktualizovaný Sign Up

Změnil jsem `emailRedirectTo` v registračním formuláři:
\`\`\`typescript
emailRedirectTo: `${window.location.origin}/auth/callback`
\`\`\`

Toto zajistí, že odkaz v emailu vždy povede na správnou doménu.

## Testování

### Postup:
1. Otevřete https://www.artdum.cz/auth/login
2. Klikněte "Nemáte účet? Zaregistrujte se"
3. Vyplňte email a heslo
4. Klikněte "Registrovat se"
5. Zkontrolujte email
6. Klikněte na "Confirm your mail" odkaz
7. Měli byste být přesměrováni na: `https://www.artdum.cz/auth/callback?code=...`
8. A pak automaticky na: `https://www.artdum.cz/admin`

### Očekávané chování:
- ✓ Odkaz v emailu vede na `https://www.artdum.cz/auth/callback?code=...`
- ✓ Callback route zpracuje code a vytvoří session
- ✓ Uživatel je přesměrován do admin panelu
- ✓ Uživatel je přihlášen

## Nastavení Owner role

Po úspěšné registraci a potvrzení emailu nastavte uživateli owner roli:

1. V Supabase Dashboard jděte do **SQL Editor**
2. Spusťte tento SQL:
   \`\`\`sql
   UPDATE profiles 
   SET role = 'owner' 
   WHERE email = 'firma@artdum.cz';
   \`\`\`

## Troubleshooting

### Problém: Stále se přesměrovává na localhost
**Řešení:** Počkejte 5 minut po změně v Supabase dashboardu - změny mohou trvat nějakou dobu než se propagují.

### Problém: "Error exchanging code for session"
**Řešení:** 
- Code v URL je jednorázový a expiruje po 60 sekundách
- Zkuste registraci znovu a klikněte na odkaz rychleji
- Ujistěte se, že Redirect URLs v Supabase obsahují správnou doménu

### Problém: "Invalid Redirect URL"
**Řešení:**
- Zkontrolujte, že jste přidali všechny redirect URLs do Supabase dashboardu
- URL musí být přesně stejné (včetně https/http)
