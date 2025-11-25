# Průvodce přidáváním obsahu do Sanity CMS

## 📋 Rychlý přehled

Tento dokument obsahuje detailní návody pro přidávání všech typů obsahu do ART DUM webu.

---

## 1. Služby - Krok za krokem

### Příprava před přidáním

Připravte si:
- ✅ Název služby
- ✅ Stručný popis (2-3 věty, max 200 znaků)
- ✅ Detailní popis služby
- ✅ Kvalitní obrázek (doporučené: 800x600px)
- ✅ Cenové rozmezí nebo způsob oceňování
- ✅ Seznam klíčových vlastností (3-5 bodů)

### Postup v Sanity Studio

1. **Otevřete Sanity Studio**
   \`\`\`
   http://localhost:3000/studio
   \`\`\`

2. **Vytvořte novou službu**
   - V levém menu klikněte na **"Služby"**
   - Klikněte tlačítko **"+ Create"** (pravý horní roh)

3. **Základní informace**
   
   **Název služby:**
   \`\`\`
   Příklad: "Kompletní rekonstrukce bytů"
   \`\`\`
   
   **URL adresa (slug):**
   - Klikněte tlačítko **"Generate"** vedle pole slug
   - Automaticky se vytvoří z názvu: `kompletni-rekonstrukce-bytu`
   
   **Krátký popis:**
   \`\`\`
   Příklad: "Zajistíme kompletní rekonstrukci vašeho bytu od A do Z. Včetně projektu, koordinace řemesel a finálních úprav."
   \`\`\`
   - Max 200 znaků
   - Měl by být přitažlivý a stručný

4. **Detailní popis**
   
   Použijte bohatý textový editor:
   
   **Formátování:**
   - Klikněte na ikonku **B** pro tučný text
   - Klikněte na **"Normal"** a vyberte **H3** pro nadpisy
   - Použijte odrážky pro seznamy
   
   **Příklad struktury:**
   \`\`\`
   Co zahrnuje naše služba?
   
   • Úvodní konzultace a návrh řešení
   • Kompletní projektová dokumentace
   • Bourací a zednické práce
   • Instalatérské a elektrikářské práce
   • Finální úpravy - malování, podlahy
   
   Proč si vybrat nás?
   
   Máme 23 let zkušeností s rekonstrukcemi bytů...
   \`\`\`

5. **Ikona služby**
   
   Zadejte název ikony z [Lucide React](https://lucide.dev):
   \`\`\`
   Příklady:
   - Hammer (kladivo)
   - Home (dům)
   - Paintbrush (malování)
   - Wrench (klíč)
   - Building (budova)
   \`\`\`

6. **Obrázek služby**
   
   - Klikněte **"Upload"**
   - Vyberte obrázek z počítače
   - **Alternativní text**: `"Kompletní rekonstrukce bytu - obývací pokoj"`
     - Popište, co je na obrázku (důležité pro SEO a přístupnost)

7. **Cenové rozmezí**
   \`\`\`
   Příklady:
   - "Od 15 000 Kč/m²"
   - "Od 5 000 Kč"
   - "Dle domluvy"
   - "Cena na dotaz"
   \`\`\`

8. **Klíčové vlastnosti**
   
   Klikněte **"Add item"** a přidejte 3-5 vlastností:
   \`\`\`
   1. "Komplexní řešení od A do Z"
   2. "Koordinace všech řemesel"
   3. "Záruka 5 let na provedené práce"
   4. "Termínová garance"
   \`\`\`

9. **Pořadí zobrazení**
   \`\`\`
   Číslo: 1, 2, 3, 4, 5...
   \`\`\`
   - Nižší číslo = vyšší pozice na webu

10. **Aktivní**
    - ✅ Zaškrtněte pro zobrazení na webu
    - ☐ Odškrtněte pro skrytí (draft)

11. **Publikování**
    - Klikněte **"Publish"** (pravý horní roh, zelené tlačítko)

---

## 2. Portfolio projekty - Detailní návod

### Příprava fotografií

**DŮLEŽITÉ**: Kvalita fotografií je klíčová!

**Doporučené rozměry:**
- 1200x900px nebo 1600x1200px
- Orientace: landscape (na šířku)
- Formát: JPEG nebo PNG
- Velikost: max 2MB na fotku

**Typy fotek:**
- **"Před"**: Min. 3 fotky stavu před rekonstrukcí
- **"Po"**: Min. 3 fotky dokončeného stavu
- Snažte se fotit ze stejných úhlů

### Postup přidání projektu

1. **Vytvořte nový projekt**
   - Služby → Portfolio → **"+ Create"**

2. **Název projektu**
   \`\`\`
   Dobré příklady:
   ✅ "Rekonstrukce koupelny v rodinném domě"
   ✅ "Zateplení fasády panelového domu"
   ✅ "Novostavba garáže se skladem"
   
   Špatné příklady:
   ❌ "Projekt 1"
   ❌ "Koupelna"
   \`\`\`

3. **Kategorie**
   
   Vyberte nejvhodnější kategorii:
   - **Rekonstrukce bytu** - komplexní přestavba bytu
   - **Rekonstrukce domu** - rodinný dům
   - **Koupelna** - pouze koupelna
   - **Kuchyň** - pouze kuchyně
   - **Novostavba** - nové stavby
   - **Zateplení** - fasády
   - **Střecha** - střešní práce
   - **Ostatní** - vše ostatní

4. **Místo realizace**
   \`\`\`
   Příklady:
   - "Třebíč"
   - "Jihlava"
   - "Brno"
   - "Třebíč - okolí"
   \`\`\`

5. **Rok realizace**
   \`\`\`
   Zadejte rok: 2024, 2023, 2022...
   \`\`\`

6. **Popis projektu**
   
   **Krátký popis** (max 200 znaků):
   \`\`\`
   "Kompletní rekonstrukce bytového jádra včetně nových rozvodů, obkladů a sanitární keramiky. Realizováno za 6 týdnů."
   \`\`\`
   
   **Detailní popis** (využijte bohatý editor):
   \`\`\`
   Zadání klienta
   
   Klient požadoval moderní koupelnu s vanou a sprchou...
   
   Průběh realizace
   
   1. Demolice starého jádra
   2. Nové rozvody vody a elektřiny
   3. ...
   
   Použité materiály
   
   • Obklady: Rako...
   • Sanitární keramika: Grohe...
   \`\`\`

7. **Fotografie "Před"**
   
   - Klikněte **"Upload"** v sekci "Fotografie Před"
   - Vyberte **všechny fotky před** najednou (Ctrl+klik)
   - Pro každou fotku:
     - **Alt text**: "Koupelna před rekonstrukcí - pohled od dveří"
     - **Popisek** (volitelné): "Původní stav koupelny"

8. **Fotografie "Po"**
   
   - Stejný postup jako u fotek "Před"
   - **Alt text**: "Koupelna po rekonstrukci - moderní design"
   - **Popisek**: "Dokončená koupelna"

9. **Provedené služby**
   
   - Klikněte **"Add item"**
   - Vyberte ze seznamu existujících služeb
   - Můžete vybrat více služeb
   
   \`\`\`
   Příklad:
   - Rekonstrukce koupelen
   - Obklady a dlažby
   \`\`\`

10. **Doba realizace**
    \`\`\`
    Příklady:
    - "6 týdnů"
    - "3 měsíce"
    - "2 týdny"
    \`\`\`

11. **Zvýrazněný projekt**
    - ✅ Zaškrtněte pro zobrazení na hlavní stránce
    - Doporučeno pro 3-5 nejlepších projektů

12. **Pořadí a aktivace**
    - **Pořadí**: 1, 2, 3... (nižší = vyšší pozice)
    - **Aktivní**: ✅ Pro zobrazení

13. **Publikovat**
    - Klikněte **"Publish"**

---

## 3. Blog články - Kompletní postup

### Struktura dobrého článku

**Délka:**
- Min. 300 slov
- Ideální: 500-800 slov

**Struktura:**
1. Úvod (perex) - 2-3 věty
2. Hlavní tělo s podnadpisy H2, H3
3. Závěr nebo CTA

### Postup

1. **Vytvořte nový článek**
   - Blog / Aktuality → **"+ Create"**

2. **Nadpis článku**
   \`\`\`
   Dobré příklady:
   ✅ "5 tipů jak ušetřit při rekonstrukci bytu"
   ✅ "Jak si vybrat správné zateplení fasády"
   ✅ "Modernizace koupelny: co je třeba vědět"
   
   Špatné:
   ❌ "Tipy"
   ❌ "Článek o rekonstrukcích"
   \`\`\`

3. **Perex** (max 300 znaků)
   \`\`\`
   "Plánujete rekonstrukci bytu? Přinášíme 5 praktických tipů, jak ušetřit peníze a zároveň dosáhnout kvalitního výsledku."
   \`\`\`

4. **Obsah článku**
   
   **Použijte strukturované nadpisy:**
   
   \`\`\`markdown
   Úvod
   
   Rekonstrukce bytu může být nákladná záležitost...
   
   ## 1. Důkladné plánování je základ
   
   Před zahájením prací je důležité...
   
   ### Co zahrnout do plánu?
   
   - Rozpočet
   - Časový harmonogram
   - ...
   
   ## 2. Výběr materiálů
   
   Kvalitní materiály se vyplatí...
   \`\`\`
   
   **Vložení obrázku do textu:**
   - Klikněte na ikonu **obrázku** v editoru
   - Nahrajte obrázek
   - Vyplňte alt text a popisek

5. **Hlavní obrázek**
   
   - Nahrajte featured image (1200x630px)
   - **Alt text**: "5 tipů pro úspěšnou rekonstrukci bytu"

6. **Kategorie**
   - **Novinky** - aktuality firmy
   - **Tipy a rady** - návody, tipy
   - **Realizace** - popis konkrétních projektů
   - **Materiály** - rady o materiálech

7. **Autor**
   \`\`\`
   Výchozí: "ART DUM"
   Nebo: "Oleh Kulish"
   \`\`\`

8. **Datum zveřejnění**
   - Automaticky vyplněno aktuálním datem
   - Můžete změnit pro plánování publikování

9. **Zveřejněno**
   - ✅ Publikovat ihned
   - ☐ Ponechat jako draft (koncept)

10. **Publikovat**
    - **Publish** pro publikování
    - **Save** pouze pro uložení draftu

---

## 4. Certifikáty - Rychlý průvodce

### Příprava

- Oskenovtejte certifikáty ve vysokém rozlišení (min. 800px šířka)
- Formát: JPEG nebo PNG
- Čitelné písmo

### Postup

1. **Nový certifikát**
   - Certifikáty → **"+ Create"**

2. **Vyplňte údaje**
   \`\`\`
   Název: "Nostrifikace vysokoškolského vzdělání"
   Vydavatel: "MŠMT ČR"
   Datum vydání: 15.3.2022
   Popis: "Nostrifikace technického vysokoškolského vzdělání v oboru stavebnictví"
   Kategorie: "Nostrifikace"
   \`\`\`

3. **Nahrajte obrázek**
   - Upload scan certifikátu
   - Alt text: "Certifikát nostrifikace vzdělání Oleh Kulish"

4. **Pořadí a publikování**
   - Pořadí: 1 (nejdůležitější nahoře)
   - Aktivní: ✅
   - **Publish**

---

## 5. Homepage - Nastavení hlavní stránky

**Poznámka**: Homepage je singleton - pouze jeden záznam

### Postup

1. **Otevřete Homepage**
   - V menu klikněte na **"Hlavní stránka"**

2. **Hero sekce**
   \`\`\`
   Hlavní nadpis: "Profesionální stavební práce v Třebíči a okolí"
   
   Podnadpis: "23 let zkušeností, stovky spokojených klientů. Specializujeme se na rekonstrukce bytů, domů a zateplení fasád."
   \`\`\`

3. **Hlavní obrázek**
   - Nahrajte kvalitní foto stavby (1920x1080px)
   - Alt text: "ART DUM stavební firma - rekonstrukce domu"

4. **CTA tlačítko**
   \`\`\`
   Text: "Nezávazná poptávka"
   Nebo: "Kontaktujte nás"
   \`\`\`

5. **Statistiky**
   \`\`\`
   Dokončené projekty: 150
   Roky zkušeností: 23
   Spokojení klienti: 200
   \`\`\`
   - Použijte reálná čísla

6. **Publikovat**
   - **Publish**

---

## 6. O nás - Informace o firmě

### Postup

1. **Otevřete O nás**
   - V menu **"O nás"**

2. **Hero sekce**
   \`\`\`
   Hlavní nadpis: "O společnosti ART DUM"
   Podnadpis: "Stavební firma s tradicí a zkušenostmi"
   \`\`\`

3. **Náš příběh**
   \`\`\`
   Příklad:
   
   Společnost ART DUM působí na stavebním trhu již 23 let. Začínali jsme jako malá firma se specializací na rekonstrukce bytů...
   
   [Napište autentický příběh firmy]
   \`\`\`

4. **Zkušenosti**
   \`\`\`
   "23 let zkušeností ve stavebnictví v České republice"
   \`\`\`

5. **Kvalifikace**
   \`\`\`
   Text o nostrifikaci:
   
   Jednatel společnosti má vysokoškolské technické vzdělání v oboru stavebnictví, které bylo nostrifikováno MŠMT ČR v roce 2022...
   \`\`\`

6. **Členové týmu** (volitelné)
   
   Klikněte **"Add item"**:
   \`\`\`
   Jméno: "Oleh Kulish"
   Pozice: "Jednatel, stavbyvedoucí"
   Bio: "Má 23 let zkušeností..."
   Fotografie: [Nahrajte profesionální foto]
   \`\`\`

7. **Naše výhody (USP)**
   
   Přidejte 3 hlavní výhody:
   
   **Výhoda 1:**
   \`\`\`
   Název: "Férové ceny"
   Popis: "Transparentní cenová politika bez skrytých poplatků"
   Ikona: "DollarSign"
   \`\`\`
   
   **Výhoda 2:**
   \`\`\`
   Název: "Rychlost"
   Popis: "Dodržujeme dohodnuté termíny"
   Ikona: "Clock"
   \`\`\`
   
   **Výhoda 3:**
   \`\`\`
   Název: "Kvalita"
   Popis: "Používáme pouze kvalitní materiály a postupy"
   Ikona: "Award"
   \`\`\`

8. **Publikovat**

---

## 7. Kontaktní informace

### Postup

1. **Otevřete Kontaktní informace**

2. **Vyplňte všechny údaje**
   \`\`\`
   Název firmy: "ART DUM Stavební firma"
   IČO: "22401261"
   Telefon: "+420 774 335 592"
   Email: "firma@artdum.cz"
   Adresa: "Karlovo nám 44/33, 674 01 Třebíč"
   \`\`\`

3. **Provozní doba**
   \`\`\`
   Po-Pá: 7:00 - 17:00
   So: 8:00 - 12:00
   Ne: Zavřeno
   
   Nebo:
   
   Pondělí - Pátek: 7:00 - 17:00
   Sobota: Po dohodě
   Neděle: Zavřeno
   \`\`\`

4. **Publikovat**

---

## 🎨 Tipy pro kvalitní obsah

### Fotografie

**✅ Dobré:**
- Kvalitní osvětlení
- Zaostřené
- Čisté prostředí
- Profesionální úhly

**❌ Špatné:**
- Rozmazané
- Špatné světlo
- Nepořádek na pozadí

### Texty

**✅ Dobré:**
- Konkrétní
- Bez překlepů
- Strukturované (nadpisy, seznamy)
- Popisné

**❌ Špatné:**
- Obecné fráze
- Chyby
- Jeden dlouhý odstavec
- Vágní

### SEO tipy

**Vždy vyplňte:**
- ✅ Alt text u obrázků
- ✅ Meta popis (perex u článků)
- ✅ Slug URL (automaticky z názvu)

**V textech používejte:**
- Klíčová slova: "rekonstrukce Třebíč", "stavební firma"
- Lokální zmínky: "Třebíč", "kraj Vysočina"

---

## 📞 Potřebujete pomoc?

V případě problémů nebo dotazů:
- Email: firma@artdum.cz
- Telefon: +420 774 335 592

---

**Vytvořeno pro projekt ART DUM**
