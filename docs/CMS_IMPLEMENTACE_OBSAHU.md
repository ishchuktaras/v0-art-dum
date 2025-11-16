# Implementace obsahu do Sanity CMS

Tento dokument obsahuje kompletní postup pro naplnění obsahu do Sanity Studio podle dodané specifikace.

## Přístup do Sanity Studia

1. Přejděte na: `https://www.artdum.cz/studio`
2. Přihlaste se pomocí Sanity účtu

---

## 1. Hlavní stránka (Homepage)

**Navigace v CMS:** Hlavní stránka → Vytvořit nový dokument (pokud neexistuje)

### Pole k vyplnění:

| Pole | Hodnota |
|------|---------|
| **Hlavní nadpis** | `Profesionální stavební práce v Třebíči a okolí` |
| **Podnadpis** | `23 let zkušeností, stovky spokojených klientů. Specializujeme se na rekonstrukce bytů, domů a zateplení fasád.` |
| **Hlavní obrázek** | Nahrát obrázek červené přilby na stavbě |
| **Alternativní text obrázku** | `ART DUM stavební firma - rekonstrukce domu` |
| **Text tlačítka (CTA)** | `Nezávazná poptávka` |
| **Nadpis sekce O nás** | `Spolehlivý partner pro vaši rekonstrukci` |
| **Text sekce O nás** | `Jsme stavební firma ART DUM z Třebíče, kterou vede Oleh Kostyshyn. Naší filozofií je dodávat práci ve třech pilířích: **Kvalita, Rychlost a Cena**. S 23 lety zkušeností a odbornou nostrifikací jsme spolehlivým partnerem pro vaši rekonstrukci.` |
| **Počet dokončených projektů** | `150` |
| **Roky zkušeností** | `23` |
| **Spokojení klienti** | `200` |

**Poznámka:** Zkontrolujte, že dokument je publikovaný (zelené tlačítko "Publish" v pravém horním rohu).

---

## 2. Služby (Services)

**Navigace v CMS:** Služby → Vytvořit nový dokument (pro každou službu)

### Služba 1: Kompletní rekonstrukce bytů

| Pole | Hodnota |
|------|---------|
| **Název služby** | `Kompletní rekonstrukce bytů` |
| **URL adresa (slug)** | Generovat automaticky (`kompletni-rekonstrukce-bytu`) |
| **Krátký popis** | `Zajistíme kompletní rekonstrukci vašeho bytu od A do Z. Včetně projektu, koordinace řemesel a finálních úprav.` |
| **Detailní popis** | (Rich text editor) Rozšířený text o službě, použité materiály, postup prací |
| **Ikona služby** | `Home` |
| **Obrázek služby** | Nahrát reprezentativní obrázek |
| **Alternativní text** | `Rekonstrukce bytu - ART DUM` |
| **Cenové rozmezí** | `Dle domluvy` |
| **Klíčové vlastnosti** | <ul><li>Bourání a stavební práce</li><li>Elektroinstalace</li><li>Rozvody vody</li><li>SDK konstrukce</li><li>Podlahy a obklady</li></ul> |
| **Pořadí zobrazení** | `1` |
| **Aktivní** | ✓ Zaškrtnuto |

### Služba 2: Rekonstrukce rodinných domů

| Pole | Hodnota |
|------|---------|
| **Název služby** | `Rekonstrukce rodinných domů` |
| **URL adresa (slug)** | `rekonstrukce-rodinnych-domu` |
| **Krátký popis** | `Provádíme celkové i částečné rekonstrukce rodinných domů s důrazem na kvalitu a dodržení termínů.` |
| **Ikona služby** | `Building2` |
| **Pořadí zobrazení** | `2` |
| **Aktivní** | ✓ Zaškrtnuto |

### Služba 3: Zateplení a rekonstrukce fasád

| Pole | Hodnota |
|------|---------|
| **Název služby** | `Zateplení a rekonstrukce fasád` |
| **URL adresa (slug)** | `zatepleni-a-rekonstrukce-fasad` |
| **Krátký popis** | `Odborné zateplení fasád kontaktním nebo bezkontaktním systémem. Snížení energetické náročnosti budovy.` |
| **Ikona služby** | `Paintbrush` |
| **Pořadí zobrazení** | `3` |
| **Aktivní** | ✓ Zaškrtnuto |

### Služba 4: Opravy a rekonstrukce střech

| Pole | Hodnota |
|------|---------|
| **Název služby** | `Opravy a rekonstrukce střech` |
| **Krátký popis** | `Kompletní výměna střešní krytiny, opravy stávající střechy, odvětráv​ání a izolace.` |
| **Ikona služby** | `Hammer` |
| **Pořadí zobrazení** | `4` |
| **Aktivní** | ✓ Zaškrtnuto |

### Služba 5: Elektroinstalační práce

| Pole | Hodnota |
|------|---------|
| **Název služby** | `Elektroinstalační práce` |
| **Krátký popis** | `Rozvody elektriky, revize, instalace rozvaděčů a osvětlení podle platných norem.` |
| **Ikona služby** | `Zap` |
| **Pořadí zobrazení** | `5` |
| **Aktivní** | ✓ Zaškrtnuto |

### Služba 6: Stavba a rekonstrukce plotů

| Pole | Hodnota |
|------|---------|
| **Název služby** | `Stavba a rekonstrukce plotů` |
| **Krátký popis** | `Zděné ploty, gabiony, dřevěné ploty i moderní oplocení z profilovaného plechu.` |
| **Ikona služby** | `Fence` |
| **Pořadí zobrazení** | `6` |
| **Aktivní** | ✓ Zaškrtnuto |

### Služba 7: Demontážní a bourací práce

| Pole | Hodnota |
|------|---------|
| **Název služby** | `Demontážní a bourací práce` |
| **Krátký popis** | `Profesionální bourání, demolice, vyklízení suti a příprava staveniště pro novou výstavbu.` |
| **Ikona služby** | `Trash2` |
| **Pořadí zobrazení** | `7` |
| **Aktivní** | ✓ Zaškrtnuto |

**Poznámka:** Pro každou službu vytvořte samostatný dokument a publikujte.

---

## 3. Portfolio (Projekty)

**Navigace v CMS:** Portfolio → Vytvořit nový dokument

**Důležité:** Dle smlouvy je součástí dodávky nasazení prvních **5 projektů** do portfolia. Fotografie a popisy dodává Objednatel (Oleh Kostyshyn).

### Ukázkový projekt:

| Pole | Hodnota |
|------|---------|
| **Název projektu** | `Kompletní rekonstrukce bytu 3+1, Třebíč-Borovina` |
| **URL adresa (slug)** | `rekonstrukce-bytu-3-1-trebic-borovina` |
| **Kategorie** | `Rekonstrukce bytu` |
| **Místo realizace** | `Třebíč` |
| **Rok realizace** | `2024` |
| **Krátký popis** | `Pro klienta jsme zajistili kompletní rekonstrukci bytu "před a po". Práce zahrnovaly bourání jádra, nové rozvody, sádrokartony a pokládku podlah. Projekt byl dokončen v termínu a dle rozpočtu.` |
| **Detailní popis** | (Rich text) Podrobný popis průběhu, použitých materiálů, řešených výzev |
| **Fotografie "Před"** | Nahrát fotografie stavu před rekonstrukcí (min. 1) |
| **Fotografie "Po"** | Nahrát fotografie dokončeného stavu (min. 1) |
| **Provedené služby** | Vybrat související služby (např. "Kompletní rekonstrukce bytů") |
| **Doba realizace** | `3 měsíce` |
| **Zvýrazněný projekt** | ☐ (Zaškrtnout pro zobrazení na hlavní stránce) |
| **Pořadí zobrazení** | `1` |
| **Aktivní** | ✓ Zaškrtnuto |

**Postup pro zbývající 4 projekty:**
1. Vyžádat si od Objednatele fotografie (před/po) a stručný popis projektu
2. Vytvořit 4 další portfolio položky podle stejného vzoru
3. Publikovat všechny dokumenty

---

## 4. O nás (About)

**Navigace v CMS:** O nás → Vytvořit nový dokument (pokud neexistuje)

| Pole | Hodnota |
|------|---------|
| **Název stránky** | `O nás` |
| **Hlavní nadpis** | `O firmě ART DUM` |
| **Podnadpis** | `Spolehlivá stavební firma s 23 lety zkušeností` |
| **Hlavní obrázek** | Nahrát firemní fotografii nebo fotografii Oleha Kostyshyna |
| **Alternativní text** | `Oleh Kostyshyn - majitel ART DUM` |

### Náš příběh (Rich text):

\`\`\`
Jsme spolehlivá stavební firma ART DUM působící v Třebíči a okolí (kraj Vysočina). 
Firmu vede Oleh Kostyshyn a naší hlavní misí je budování důvěry prostřednictvím 
poctivě odvedené práce.

Stavíme na 23 letech zkušeností a odborné kvalifikaci, včetně nostrifikace vzdělání 
v ČR. Nejsme jen řemeslníci, jsme partneři pro váš projekt.
\`\`\`

### Zkušenosti:

`23 let zkušeností ve stavebnictví`

### Kvalifikace a nostrifikace (Rich text):

\`\`\`
Naše odbornost je podložena diplomy a certifikáty ze stavebního oboru, včetně 
nostrifikace zahraničního vzdělání v České republice. Veškerá osvědčení jsou 
k dispozici v sekci Certifikáty.
\`\`\`

### Naše výhody (USP) - Přidat 3 položky:

**Položka 1:**
- **Název:** `Kvalita`
- **Popis:** `Naše práce je podložena odbornými certifikáty a diplomy. Používáme ověřené postupy a materiály, abychom zajistili dlouhodobou životnost díla.`
- **Ikona:** `Award`

**Položka 2:**
- **Název:** `Rychlost`
- **Popis:** `Respektujeme váš čas. Díky efektivní koordinaci všech řemesel a 23 letům praxe dodržujeme domluvené termíny.`
- **Ikona:** `Zap`

**Položka 3:**
- **Název:** `Cena`
- **Popis:** `Nabízíme férové a transparentní ceny. Připravíme jasný rozpočet bez skrytých poplatků.`
- **Ikona:** `DollarSign`

---

## 5. Certifikáty (Certificates)

**Navigace v CMS:** Certifikáty → Vytvořit nový dokument (pro každý certifikát)

**Důležité:** Objednatel dodá skeny certifikátů, diplomů a nostrifikace.

### Certifikát 1: Nostrifikace vzdělání

| Pole | Hodnota |
|------|---------|
| **Název certifikátu** | `Nostrifikace vzdělání v ČR` |
| **Vydavatel** | `MŠMT ČR` |
| **Datum vydání** | (Dle dodaného dokumentu) |
| **Popis** | `Oficiální uznání zahraničního vzdělání v České republice.` |
| **Obrázek certifikátu** | Nahrát sken dokumentu |
| **Alternativní text** | `Nostrifikace vzdělání - ART DUM` |
| **Kategorie** | `Nostrifikace` |
| **Pořadí zobrazení** | `1` |
| **Aktivní** | ✓ Zaškrtnuto |

### Certifikát 2: Stavební diplom 1

| Pole | Hodnota |
|------|---------|
| **Název certifikátu** | (Dle dodaného diplomu) |
| **Vydavatel** | (Dle dokumentu) |
| **Kategorie** | `Vzdělání` |
| **Pořadí zobrazení** | `2` |
| **Aktivní** | ✓ Zaškrtnuto |

**Postup:**
1. Vyžádat si od Objednatele všechny relevantní dokumenty (diplomy, certifikáty, nostrifikaci)
2. Vytvořit pro každý dokument samostatnou položku
3. Publikovat

---

## 6. Kontaktní informace (Contact Info)

**Navigace v CMS:** Kontaktní informace → Vytvořit nový dokument (pokud neexistuje)

| Pole | Hodnota |
|------|---------|
| **Telefon** | `+420 774 335 592` |
| **Email** | `firma@artdum.cz` |
| **Adresa** | `Karlovo nám 44/33`<br>`674 01 Třebíč` |
| **IČO** | `22401261` |

### Sociální sítě (volitelné):

- **Facebook:** (Pokud existuje)
- **Instagram:** (Pokud existuje)
- **LinkedIn:** (Pokud existuje)

---

## 7. Blog / Aktuality (volitelné)

**Poznámka:** Sekce Blog nebyla součástí původní specifikace smlouvy. Objednatel si ji může plnit sám po zaškolení.

**Navigace v CMS:** Blog → Vytvořit nový dokument

Ukázkový článek:

| Pole | Hodnota |
|------|---------|
| **Nadpis** | `Jak probíhá rekonstrukce bytového jádra krok za krokem` |
| **Kategorie** | `Tipy a rady` |
| **Obsah** | (Rich text editor pro psaní článku) |
| **Náhledový obrázek** | (Ilustrační fotografie) |

---

## Kontrolní seznam

Po dokončení naplnění obsahu zkontrolujte:

- [ ] **Hlavní stránka** - vyplněna a publikována
- [ ] **Všechny služby (7)** - vytvořeny a publikovány
- [ ] **Portfolio (5 projektů)** - vytvořeno s fotografiemi před/po
- [ ] **O nás** - vyplněna včetně USP
- [ ] **Certifikáty** - nahrány všechny dodané dokumenty
- [ ] **Kontaktní informace** - vyplněny správné údaje
- [ ] Všechny obrázky mají **alternativní text**
- [ ] Všechny dokumenty jsou **publikované** (zelené tlačítko "Publish")

---

## Technické poznámky

### Přístup k CMS:
- **URL:** `https://www.artdum.cz/studio`
- **Přihlášení:** Sanity účet (email)

### Publikování změn:
1. Po vyplnění dokumentu klikněte na zelené tlačítko **"Publish"** v pravém horním rohu
2. Změny se okamžitě projeví na webu po regeneraci stránky (ISR - Incremental Static Regeneration)

### Nahrávání obrázků:
- Podporované formáty: JPG, PNG, WebP
- Doporučená velikost: Maximálně 2 MB na obrázek
- Vždy vyplňte **alternativní text** pro SEO a přístupnost

### Pomoc a podpora:
- Pro technickou podporu kontaktujte vývojáře: **info@webnamiru.site**
- Pro obsah kontaktujte Objednatele: **firma@artdum.cz**

---

## Harmonogram implementace

1. **Týden 1:** Hlavní stránka + Služby
2. **Týden 2:** Portfolio (5 projektů) - čekání na podklady od Objednatele
3. **Týden 3:** O nás + Certifikáty - čekání na skeny dokumentů
4. **Týden 4:** Kontaktní informace + Finální kontrola

**Status:** ✅ Připraveno k zahájení implementace
