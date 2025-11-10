# Sanity.io Setup pro ART DUM

## 1. Vytvoření Sanity projektu

1. Navštivte [sanity.io](https://www.sanity.io) a přihlaste se
2. Vytvořte nový projekt: **ART DUM**
3. Zvolte dataset: **production**
4. Poznamenejte si:
   - Project ID
   - Dataset name

## 2. Konfigurace environment variables

Vytvořte soubor `.env.local` v root složce projektu:

\`\`\`bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-10
SANITY_API_TOKEN=your_token
\`\`\`

## 3. Získání API tokenu

1. V Sanity dashboard jděte do: **API** → **Tokens**
2. Vytvořte nový token s **Editor** oprávněními
3. Zkopírujte token do `.env.local`

## 4. Struktura schémat

Projekt obsahuje následující datové modely:

### Homepage (homepage)
- Nastavení hlavní stránky
- Hero sekce, CTA, statistiky

### Služby (service)
- Seznam služeb firmy
- Ikony, obrázky, ceník
- Pořadí zobrazení

### Portfolio (portfolio)
- Realizované projekty
- Fotografie "před" a "po"
- Kategorie, lokace, rok realizace
- Propojení se službami

### Blog / Aktuality (blog)
- Články a novinky
- Kategorie, perex, obsah
- Featured image

### O nás (about)
- Příběh firmy
- Tým, zkušenosti
- USP (Unique Selling Points)

### Certifikáty (certificate)
- Vzdělání, nostrifikace
- Profesní certifikáty
- Obrázky certifikátů

### Recenze (review)
- Hodnocení zákazníků
- Hvězdičky, text recenze
- Propojení s projekty

## 5. CORS nastavení

V Sanity dashboard → **API** → **CORS Origins** přidejte:
- `http://localhost:3000` (pro development)
- `https://artdum.cz` (pro production)
- `https://*.vercel.app` (pro Vercel preview)

## 6. Naplnění obsahem

Po nastavení můžete začít přidávat obsah přes Sanity Studio nebo přímo v administraci na sanity.io.

### Doporučené pořadí plnění:
1. **Homepage** - nastavení hlavní stránky
2. **Služby** - přidání všech služeb (5-7 služeb)
3. **Certifikáty** - nahrání certifikátů a nostrifikace
4. **O nás** - vyplnění informací o firmě
5. **Portfolio** - přidání prvních 5 projektů
6. **Blog** - volitelně první články

## 7. Deploy na Vercel

Při deployi na Vercel nezapomeňte přidat všechny environment variables z `.env.local`.
