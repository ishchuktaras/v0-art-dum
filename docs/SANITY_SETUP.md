# Sanity.io CMS - Kompletní průvodce nastavením

## 📋 Obsah
1. [Vytvoření Sanity projektu](#1-vytvoření-sanity-projektu)
2. [Konfigurace projektu](#2-konfigurace-projektu)
3. [Přehled datových schémat](#3-přehled-datových-schémat)
4. [Spuštění Sanity Studio](#4-spuštění-sanity-studio)
5. [Přidávání obsahu](#5-přidávání-obsahu)
6. [Deployment na Vercel](#6-deployment-na-vercel)

---

## 1. Vytvoření Sanity projektu

### Krok 1: Registrace na Sanity.io

1. Navštivte [sanity.io](https://www.sanity.io)
2. Klikněte na **"Get started"** nebo **"Sign up"**
3. Přihlaste se pomocí:
   - Google účtu
   - GitHub účtu
   - Email + heslo

### Krok 2: Vytvoření nového projektu

1. Po přihlášení klikněte na **"Create new project"**
2. Vyplňte údaje:
   - **Project name**: `ART DUM Stavební firma`
   - **Organization**: Vyberte vaši organizaci nebo vytvořte novou
3. Zvolte **Dataset**:
   - **Name**: `production`
   - **Template**: `Clean project with no predefined schema`
4. Klikněte **"Create project"**

### Krok 3: Poznamenejte si důležité údaje

Po vytvoření projektu si poznamenejte:

\`\`\`
Project ID: [např. abc12345]
Dataset: production
\`\`\`

Tyto údaje budete potřebovat v dalším kroku.

---

## 2. Konfigurace projektu

### Krok 1: Environment Variables

Vytvořte soubor `.env.local` v **root složce projektu** (vedle `package.json`):

\`\`\`bash
# .env.local

# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=váš_project_id_zde
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-10

# Sanity API Token (vytvoříte v dalším kroku)
SANITY_API_TOKEN=váš_token_zde
\`\`\`

**Důležité**: 
- Nahraďte `váš_project_id_zde` vaším skutečným Project ID
- Token vytvoříte v následujícím kroku
- Soubor `.env.local` je v `.gitignore` a nebude uploadován na GitHub

### Krok 2: Vytvoření API tokenu

1. V Sanity dashboard (sanity.io) otevřete váš projekt
2. V levém menu klikněte na **"API"**
3. Klikněte na záložku **"Tokens"**
4. Klikněte **"Add API token"**
5. Vyplňte:
   - **Label**: `ART DUM Web Token`
   - **Permissions**: Vyberte **"Editor"** (pro čtení i zápis)
6. Klikněte **"Save"**
7. **Okamžitě zkopírujte token** (zobrazí se pouze jednou!)
8. Vložte token do `.env.local` jako hodnotu `SANITY_API_TOKEN`

### Krok 3: CORS nastavení

Pro zabezpečení povolte přístup pouze z vašich domén:

1. V Sanity dashboard → **API** → **CORS Origins**
2. Klikněte **"Add CORS origin"**
3. Přidejte následující origins:

\`\`\`
http://localhost:3000          (pro local development)
http://localhost:3000/studio   (pro Sanity Studio)
https://artdum.cz              (produkční doména)
https://www.artdum.cz          (produkční doména s www)
https://*.vercel.app           (Vercel preview)
\`\`\`

4. Pro každý origin zaškrtněte:
   - ✅ Allow credentials
   - ✅ Allow requests from origin

---

## 3. Přehled datových schémat

Projekt obsahuje 7 hlavních schémat pro správu obsahu:

### 📍 Homepage (Hlavní stránka)
**Typ**: Singleton (pouze jeden záznam)

**Pole**:
- **Hlavní nadpis** (heroHeading) - text pro hero sekci
- **Podnadpis** (heroSubheading) - popis pod hlavním nadpisem
- **Hlavní obrázek** (heroImage) - obrázek na pozadí hero sekce
- **Text tlačítka** (ctaButtonText) - např. "Nezávazná poptávka"
- **Sekce O nás** - nadpis a text
- **Statistiky**: 
  - Počet dokončených projektů
  - Roky zkušeností (výchozí: 23)
  - Spokojení klienti

### 🔧 Služby (Services)
**Typ**: Kolekce (více záznamů)

**Pole**:
- **Název služby** (title) - např. "Kompletní rekonstrukce"
- **URL adresa** (slug) - automaticky generovaná z názvu
- **Krátký popis** (shortDescription) - max 200 znaků
- **Detailní popis** (fullDescription) - bohatý text editor
- **Ikona** (icon) - název ikony z Lucide React
- **Obrázek služby** (image)
- **Cenové rozmezí** (price) - např. "Od 5 000 Kč"
- **Klíčové vlastnosti** (features) - seznam vlastností
- **Pořadí zobrazení** (order) - číslo pro řazení
- **Aktivní** (isActive) - zobrazit/skrýt službu

**Příklady služeb**:
- Rekonstrukce bytů a domů
- Stavba rodinných domů
- Zateplení fasád
- Rekonstrukce koupelen
- Stavba garáží

### 🖼️ Portfolio (Projekty)
**Typ**: Kolekce (více záznamů)

**Pole**:
- **Název projektu** (title)
- **URL adresa** (slug)
- **Kategorie** (category) - výběr z přednastavených kategorií:
  - Rekonstrukce bytu
  - Rekonstrukce domu
  - Koupelna
  - Kuchyň
  - Novostavba
  - Zateplení
  - Střecha
  - Ostatní
- **Místo realizace** (location) - např. "Třebíč"
- **Rok realizace** (year)
- **Krátký popis** (shortDescription) - max 200 znaků
- **Detailní popis** (fullDescription) - bohatý text editor
- **Fotografie "Před"** (imagesBefore) - galerie obrázků
- **Fotografie "Po"** (imagesAfter) - galerie obrázků
- **Provedené služby** (services) - propojení se schématem Services
- **Doba realizace** (projectDuration) - např. "3 měsíce"
- **Zvýrazněný projekt** (isFeatured) - zobrazit na homepage
- **Pořadí zobrazení** (order)
- **Aktivní** (isActive)

### 📝 Blog / Aktuality
**Typ**: Kolekce (více záznamů)

**Pole**:
- **Nadpis článku** (title)
- **URL adresa** (slug)
- **Perex** (excerpt) - stručný úvod, max 300 znaků
- **Obsah článku** (content) - bohatý text editor s podporou:
  - Nadpisy (H2, H3, H4)
  - Tučný text, kurzíva, kód
  - Citace
  - Obrázky s popisky
  - Odkazy
- **Hlavní obrázek** (featuredImage) - náhledový obrázek
- **Kategorie** (category):
  - Novinky
  - Tipy a rady
  - Realizace
  - Materiály
- **Autor** (author) - výchozí "ART DUM"
- **Datum zveřejnění** (publishedAt)
- **Zveřejněno** (isPublished) - publikovat/draft

### ℹ️ O nás (About)
**Typ**: Singleton (pouze jeden záznam)

**Pole**:
- **Název stránky** (title) - výchozí "O nás"
- **Hlavní nadpis** (heroHeading)
- **Podnadpis** (heroSubheading)
- **Hlavní obrázek** (heroImage)
- **Náš příběh** (story) - bohatý text o historii firmy
- **Zkušenosti** (experience) - např. "23 let zkušeností"
- **Kvalifikace a nostrifikace** (qualifications) - text o kvalifikaci
- **Členové týmu** (teamMembers) - pole objektů:
  - Jméno
  - Pozice
  - Bio
  - Fotografie
- **Naše výhody (USP)** - pole objektů:
  - Název (např. "Férové ceny")
  - Popis
  - Ikona

### 🏆 Certifikáty
**Typ**: Kolekce (více záznamů)

**Pole**:
- **Název certifikátu** (title)
- **Vydavatel** (issuer) - např. "MŠMT ČR"
- **Datum vydání** (issueDate)
- **Popis** (description)
- **Obrázek certifikátu** (image) - fotografie/scan certifikátu
- **Kategorie** (category):
  - Vzdělání
  - Profesní certifikát
  - Nostrifikace
  - Osvědčení
- **Pořadí zobrazení** (order)
- **Aktivní** (isActive)

### 📞 Kontaktní informace
**Typ**: Singleton (pouze jeden záznam)

**Pole**:
- **Název firmy** (companyName)
- **IČO** (ico)
- **Telefon** (phone)
- **Email** (email)
- **Adresa** (address)
- **GPS souřadnice** pro mapu
- **Provozní doba** (openingHours)

---

## 4. Spuštění Sanity Studio

Sanity Studio je administrační rozhraní pro správu obsahu, které běží přímo ve vašem Next.js projektu.

### Lokální spuštění

1. Otevřete terminál v root složce projektu
2. Spusťte development server:

\`\`\`bash
npm run dev
\`\`\`

3. Otevřete v prohlížeči:

\`\`\`
http://localhost:3000/studio
\`\`\`

4. Přihlaste se pomocí stejného účtu, který jste použili na sanity.io

### První přihlášení

Při prvním přihlášení do Studia:

1. Studio vás požádá o autorizaci
2. Klikněte **"Login"**
3. Budete přesměrováni na sanity.io
4. Potvrďte přístup
5. Budete přesměrováni zpět do Studia

---

## 5. Přidávání obsahu

### Doporučené pořadí plnění obsahu

#### 1️⃣ Homepage (První krok)

1. V Sanity Studio klikněte na **"Hlavní stránka"** v levém menu
2. Vyplňte základní údaje:
   - Hlavní nadpis: **"Profesionální stavební práce v Třebíči a okolí"**
   - Podnadpis: **"23 let zkušeností, stovky spokojených klientů"**
   - Nahrajte hlavní obrázek (doporučené rozměry: 1920x1080px)
   - Text tlačítka: **"Nezávazná poptávka"**
3. Vyplňte statistiky:
   - Počet projektů: např. **150**
   - Roky zkušeností: **23**
   - Spokojení klienti: např. **200**
4. Klikněte **"Publish"** (pravý horní roh)

#### 2️⃣ Služby (Druhý krok)

Přidejte **5-7 hlavních služeb** firmy:

**Příklad 1: Rekonstrukce bytů a domů**

1. Klikněte na **"Služby"** → **"Create new"**
2. Vyplňte:
   - **Název**: "Rekonstrukce bytů a domů"
   - **Slug**: Klikněte "Generate" (vytvoří se automaticky)
   - **Krátký popis**: "Kompletní rekonstrukce bytů a rodinných domů včetně bourání, stavebních úprav a finálních povrchů."
   - **Detailní popis**: Napište podrobný text o službě (použijte bohatý editor)
   - **Ikona**: "Hammer" (název ikony z Lucide React)
   - **Obrázek**: Nahrajte reprezentativní foto (doporučené: 800x600px)
     - Vyplňte alternativní text: "Rekonstrukce obývacího pokoje"
   - **Cenové rozmezí**: "Od 15 000 Kč/m²"
   - **Klíčové vlastnosti**: Klikněte "Add item" a přidejte:
     - "Demontáže a bourací práce"
     - "Zednické práce"
     - "Finální úpravy"
   - **Pořadí**: 1
   - **Aktivní**: ✅ Zaškrtnuto
3. Klikněte **"Publish"**

**Příklad 2: Zateplení fasád**

Stejným způsobem přidejte další služby:
- Zateplení fasád (order: 2)
- Rekonstrukce koupelen (order: 3)
- Stavba garáží (order: 4)
- Pokládka dlažby a obkladů (order: 5)

#### 3️⃣ Certifikáty (Třetí krok)

1. Klikněte na **"Certifikáty"** → **"Create new"**
2. Přidejte nostrifikaci vzdělání:
   - **Název**: "Nostrifikace vysokoškolského vzdělání"
   - **Vydavatel**: "MŠMT ČR"
   - **Datum vydání**: Vyberte datum
   - **Popis**: "Nostrifikace vysokoškolského technického vzdělání v oboru stavebnictví"
   - **Obrázek**: Nahrajte scan/foto certifikátu
     - Alt text: "Certifikát o nostrifikaci vzdělání"
   - **Kategorie**: "Nostrifikace"
   - **Pořadí**: 1
   - **Aktivní**: ✅
3. Klikněte **"Publish"**

Přidejte další certifikáty stejným způsobem.

#### 4️⃣ O nás (Čtvrtý krok)

1. Klikněte na **"O nás"** v levém menu
2. Vyplňte:
   - **Hlavní nadpis**: "O společnosti ART DUM"
   - **Podnadpis**: "Stavební firma s tradicí a zkušenostmi"
   - **Náš příběh**: Napište příběh firmy (použijte bohatý editor)
   - **Zkušenosti**: "23 let zkušeností ve stavebnictví v České republice"
   - **Kvalifikace**: Text o nostrifikaci a kvalifikaci
3. Přidejte USP (výhody):
   - Klikněte na "Naše výhody" → "Add item"
   - **Název**: "Férové ceny"
   - **Popis**: "Transparentní cenová politika bez skrytých poplatků"
   - **Ikona**: "DollarSign"
   - Přidejte další (Rychlost, Kvalita)
4. Klikněte **"Publish"**

#### 5️⃣ Portfolio (Pátý krok)

Přidejte **prvních 5 projektů**:

**Příklad projektu:**

1. Klikněte na **"Portfolio"** → **"Create new"**
2. Vyplňte:
   - **Název**: "Rekonstrukce koupelny v rodinném domě"
   - **Slug**: Generate
   - **Kategorie**: "Koupelna"
   - **Místo realizace**: "Třebíč"
   - **Rok realizace**: 2024
   - **Krátký popis**: "Kompletní rekonstrukce koupelny včetně nových rozvodů"
   - **Detailní popis**: Podrobný popis projektu
   - **Fotografie "Před"**: Nahrajte 3-5 fotek před rekonstrukcí
     - Pro každou vyplňte alt text a případně popisek
   - **Fotografie "Po"**: Nahrajte 3-5 fotek po rekonstrukci
   - **Provedené služby**: Vyberte ze seznamu služeb (např. "Rekonstrukce koupelen")
   - **Doba realizace**: "2 měsíce"
   - **Zvýrazněný projekt**: ✅ (pro zobrazení na homepage)
   - **Pořadí**: 1
   - **Aktivní**: ✅
3. Klikněte **"Publish"**

Přidejte dalších 4-5 projektů stejným způsobem.

#### 6️⃣ Blog / Aktuality (Šestý krok - volitelné)

1. Klikněte na **"Blog / Aktuality"** → **"Create new"**
2. Vyplňte:
   - **Nadpis**: "5 tipů pro úspěšnou rekonstrukci bytu"
   - **Slug**: Generate
   - **Perex**: "Plánujete rekonstrukci? Přinášíme 5 praktických tipů..."
   - **Obsah článku**: Napište článek (použijte nadpisy H2, H3, obrázky)
   - **Hlavní obrázek**: Nahrajte featured image
   - **Kategorie**: "Tipy a rady"
   - **Autor**: "ART DUM"
   - **Datum zveřejnění**: Automaticky vyplněno
   - **Zveřejněno**: ✅ (nebo nechte nezaškrtnuto pro draft)
3. Klikněte **"Publish"**

#### 7️⃣ Kontaktní informace (Poslední krok)

1. Klikněte na **"Kontaktní informace"**
2. Vyplňte:
   - **Název firmy**: "ART DUM Stavební firma"
   - **IČO**: "22401261"
   - **Telefon**: "+420 774 335 592"
   - **Email**: "firma@artdum.cz"
   - **Adresa**: "Karlovo nám 44/33, 674 01 Třebíč"
   - **Provozní doba**: 
     \`\`\`
     Po-Pá: 7:00 - 17:00
     So: 8:00 - 12:00
     Ne: Zavřeno
     \`\`\`
3. Klikněte **"Publish"**

---

## 6. Deployment na Vercel

### Přidání Environment Variables na Vercel

1. Přihlaste se na [vercel.com](https://vercel.com)
2. Otevřete váš projekt **ART DUM**
3. Klikněte na **Settings** → **Environment Variables**
4. Přidejte všechny proměnné z `.env.local`:

\`\`\`
NEXT_PUBLIC_SANITY_PROJECT_ID = váš_project_id
NEXT_PUBLIC_SANITY_DATASET = production
NEXT_PUBLIC_SANITY_API_VERSION = 2025-01-10
SANITY_API_TOKEN = váš_token
\`\`\`

5. Pro každou proměnnou:
   - Klikněte **"Add New"**
   - **Key**: Název proměnné
   - **Value**: Hodnota
   - **Environments**: Vyberte všechny (Production, Preview, Development)
6. Klikněte **"Save"**

### Redeploy aplikace

Po přidání env variables:

1. Klikněte na **Deployments** (v hlavním menu)
2. Najděte poslední deployment
3. Klikněte na tři tečky **"..."** → **"Redeploy"**
4. Potvrďte **"Redeploy"**

Web bude znovu nasazen s přístupem k Sanity CMS.

### Ověření funkčnosti

1. Otevřete produkční URL: `https://artdum.cz`
2. Zkontrolujte, že se zobrazují data ze Sanity
3. Zkuste přejít na `/studio` - mělo by fungovat administrační rozhraní

---

## 🎯 Tipy pro práci se Sanity

### Náhledy při psaní

Sanity Studio má live preview - změny vidíte okamžitě bez publikování.

### Drafts vs Published

- **Draft** - neuložené změny viditelné pouze v Studiu
- **Published** - publikovaný obsah viditelný na webu
- Po editaci klikněte **"Publish"** pro aplikování změn

### Práce s obrázky

**Doporučené rozměry**:
- Hero obrázky: 1920x1080px
- Obrázky služeb: 800x600px
- Portfolio fotky: 1200x900px
- Blog featured images: 1200x630px
- Certifikáty: min. 800px šířka

**Optimalizace**:
- Sanity automaticky optimalizuje obrázky
- Podporuje WebP a moderní formáty
- Doporučená velikost souboru: max 2MB

### Odkazy mezi schématy (References)

V Portfolio můžete propojit projekty se službami:
1. V poli **"Provedené služby"** klikněte "Add item"
2. Vyberte ze seznamu existujících služeb
3. Na webu se automaticky zobrazí odkazy na související služby

### Hromadné editace

Pro změnu pořadí více položek najednou:
1. V seznamu (např. Služby) klikněte na položku
2. Změňte pole **"Pořadí zobrazení"**
3. Klikněte **"Publish"**
4. Opakujte pro další položky

---

## ❓ Časté problémy a řešení

### Studio se nenačte (Error 401/403)

**Problém**: Chybí nebo je neplatný API token

**Řešení**:
1. Zkontrolujte `.env.local` - je tam `SANITY_API_TOKEN`?
2. Vygenerujte nový token v Sanity dashboard
3. Restartujte dev server: `npm run dev`

### Obrázky se nezobrazují

**Problém**: CORS není správně nastavený

**Řešení**:
1. V Sanity dashboard → API → CORS Origins
2. Přidejte `http://localhost:3000` a `https://artdum.cz`
3. Zaškrtněte "Allow credentials"

### Změny se nepromítají na web

**Problém**: Není publikováno nebo cache

**Řešení**:
1. Zkontrolujte, že jste klikli **"Publish"** v Sanity Studio
2. Vyčistěte cache: Ctrl+Shift+R (hard refresh)
3. Zkontrolujte, že pole **"Aktivní"** je zaškrtnuto

### Project ID nenalezeno

**Problém**: Špatné environment variables

**Řešení**:
1. Otevřete `.env.local`
2. Zkontrolujte, že `NEXT_PUBLIC_SANITY_PROJECT_ID` odpovídá ID z Sanity dashboard
3. Restartujte dev server

---

## 📚 Další zdroje

- [Sanity dokumentace](https://www.sanity.io/docs)
- [Sanity Schema typy](https://www.sanity.io/docs/schema-types)
- [GROQ query language](https://www.sanity.io/docs/groq)
- [Next.js + Sanity guide](https://www.sanity.io/docs/nextjs)

---

**Vytvořeno pro projekt ART DUM Stavební firma**  
V případě problémů kontaktujte: info@webnamiru.site
