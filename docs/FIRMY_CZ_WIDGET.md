# Firmy.cz Widget - Návod na vložení

## Co je widget Firmy.cz

Widget Firmy.cz je iframe kód, který zobrazuje vaše hodnocení a recenze přímo z platformy Firmy.cz na vašem webu.

## Jak získat widget kód

1. **Přihlaste se** na váš účet na Firmy.cz
2. **Přejděte** do sekce "Nástroje" nebo "Widget"
3. **Zkopírujte** iframe kód widgetu
4. **Vložte** kód do souboru stránky hodnocení

## Instalace widgetu

### Krok 1: Získání kódu

Kód widgetu vypadá přibližně takto:

\`\`\`html
<iframe 
  src="https://www.firmy.cz/widget/recenze/[VAS_ID]" 
  width="100%" 
  height="600" 
  frameborder="0"
></iframe>
\`\`\`

### Krok 2: Vložení do stránky

Otevřete soubor `app/hodnoceni/page.tsx` a nahraďte placeholder sekci:

\`\`\`tsx
{/* Firmy.cz Widget Placeholder */}
<div className="bg-muted/30 border-2 border-dashed border-border rounded-lg p-12 text-center">
  {/* ... tento celý div nahraďte */}
</div>
\`\`\`

Nahraďte jej vaším iframe kódem:

\`\`\`tsx
{/* Firmy.cz Widget */}
<div className="w-full overflow-hidden rounded-lg">
  <iframe 
    src="https://www.firmy.cz/widget/recenze/[VAS_ID]" 
    width="100%" 
    height="600" 
    frameBorder="0"
    className="w-full"
    title="Hodnocení z Firmy.cz"
  />
</div>
\`\`\`

### Krok 3: Přizpůsobení stylu

Widget můžete upravit pomocou Tailwind CSS tříd:

\`\`\`tsx
<div className="w-full overflow-hidden rounded-lg border border-border shadow-lg">
  <iframe 
    src="[VAS_WIDGET_URL]" 
    width="100%" 
    height="600" 
    frameBorder="0"
    className="w-full"
    title="Hodnocení z Firmy.cz"
    loading="lazy"
  />
</div>
\`\`\`

## Alternativní řešení

Pokud nemáte přístup k widgetu, můžete:

1. **Přidat pouze odkaz** na váš profil na Firmy.cz
2. **Používat interní recenze** ze Sanity CMS
3. **Manuálně přidávat** recenze z Firmy.cz do Sanity s označením zdroje

## Sanity recenze jako záloha

Stránka podporuje zobrazení recenzí ze Sanity CMS. V admin panelu Sanity:

1. Přejděte na **Recenze**
2. Klikněte na **+ Nová recenze**
3. Vyplňte:
   - Jméno zákazníka
   - Hodnocení (1-5)
   - Text recenze
   - Zdroj: vyberte "Firmy.cz" nebo "Google"
   - Datum
4. **Zveřejněte** recenzi

## Doporučení

- Kombinujte Firmy.cz widget s interními recenzemi ze Sanity
- Pravidelně aktualizujte recenze v Sanity
- Označujte zdroj každé recenze (Firmy.cz, Google, Direct)

---

Pro více informací o widgetu kontaktujte podporu Firmy.cz.
