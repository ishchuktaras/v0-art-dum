# Oprava RLS pro kontaktní formulář

## Problém
Kontaktní formulář na `/kontakt` zobrazuje chybu:
\`\`\`
new row violates row-level security policy for table "inquiries"
\`\`\`

## Příčina
Row Level Security (RLS) policies na tabulce `inquiries` blokovaly vkládání dat z veřejného formuláře. Původní policy nepřidala explicitně `to anon`, což je potřeba pro nepřihlášené uživatele.

## Řešení

### 1. Spusťte SQL skript v Supabase
1. Přihlaste se do Supabase Dashboard
2. Otevřete SQL Editor
3. Zkopírujte a spusťte obsah souboru `scripts/002_fix_inquiries_rls.sql`
4. Klikněte na "Run"

### 2. Ověřte policies
V Supabase Dashboard:
1. Jděte do "Authentication" → "Policies"
2. Najděte tabulku `inquiries`
3. Měli byste vidět tyto policies:
   - `inquiries_insert_public` - pro INSERT, role: anon, authenticated
   - `inquiries_select_admin` - pro SELECT, pouze admin/owner
   - `inquiries_update_admin` - pro UPDATE, pouze admin/owner
   - `inquiries_delete_admin` - pro DELETE, pouze admin/owner

### 3. Test kontaktního formuláře
1. Otevřete https://art-dum.vercel.app/kontakt
2. Vyplňte formulář
3. Klikněte "Odeslat poptávku"
4. Měla by se zobrazit zelená zpráva o úspěchu

### 4. Ověřte data v Supabase
1. V Supabase Dashboard otevřete "Table Editor"
2. Vyberte tabulku `inquiries`
3. Měli byste vidět nový záznam z formuláře

## Bezpečnost
- ✅ Anonymní uživatelé mohou POUZE vkládat data (INSERT)
- ✅ Anonymní uživatelé NEMOHOU číst, upravovat nebo mazat data
- ✅ Pouze admini a owneři mohou spravovat poptávky v admin panelu
- ✅ RLS je aktivní a chrání citlivá data

## Poznámky
- Policy `to anon` je klíčová pro povolení veřejných submissionů
- Policy `to authenticated` pokrývá přihlášené uživatele
- Obě role jsou potřeba pro správnou funkcionalitu
