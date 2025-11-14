# SEO Implementace - ART DUM Web

## Implementované SEO prvky

### 1. Metadata pro všechny stránky ✅

Každá stránka má optimalizované metadata:
- **Title tags** - Unikátní, obsahují klíčová slova a značku
- **Meta descriptions** - Přitažlivé popisy s call-to-action
- **Keywords** - Relevantní klíčová slova pro české vyhledávání
- **Canonical URLs** - Prevence duplicate content
- **Open Graph** - Optimalizace pro sdílení na sociálních sítích

### 2. Strukturovaná data (JSON-LD) ✅

Implementována Schema.org strukturovaná data:

**Homepage:**
- `GeneralContractor` schema s kompletními informacemi o firmě
- Adresa, telefon, email, opening hours
- AggregateRating pro zobrazení hodnocení ve vyhledávání
- GeoCoordinates pro lokální SEO

**Služby:**
- `ItemList` schema se seznamem všech služeb
- `Service` schema pro každou službu
- Provider informace

**Portfolio:**
- `ImageGallery` schema pro galerii projektů

**Blog:**
- `Blog` schema pro blog sekci
- `BlogPosting` schema pro jednotlivé články (v article page)

**O nás:**
- `AboutPage` a `Organization` schema

**Hodnocení:**
- `LocalBusiness` schema
- `AggregateRating` s průměrným hodnocením
- `Review` schema pro jednotlivé recenze

**Kontakt:**
- `ContactPage` schema s kontaktními údaji

### 3. Sitemap.xml ✅

Dynamický sitemap generovaný v `/app/sitemap.xml/route.ts`:
- Statické stránky (homepage, služby, portfolio, blog, etc.)
- Dynamické blog posty z Sanity CMS
- Dynamické portfolio projekty z Sanity CMS
- Správné priority a changefreq
- Lastmod timestamp pro dynamický obsah

**URL:** `https://artdum.cz/sitemap.xml`

### 4. Robots.txt ✅

Implementován v `/app/robots.txt/route.ts`:
- Allow všechny veřejné stránky
- Disallow admin a auth sekce
- Link na sitemap.xml
- Crawl delay nastavení

**URL:** `https://artdum.cz/robots.txt`

### 5. Open Graph metadata ✅

Pro všechny hlavní stránky:
- og:title, og:description, og:url
- og:type (website, article)
- og:image (1200x630px)
- og:locale (cs_CZ)
- twitter:card

### 6. Canonical URLs ✅

Každá stránka má canonical URL pro prevenci duplicate content.

## Lokální SEO optimalizace

### Implementováno:
- ✅ Název města v title tags (Třebíč)
- ✅ Lokální klíčová slova (kraj Vysočina, region Třebíč)
- ✅ GeoCoordinates v LocalBusiness schema
- ✅ Adresa a opening hours v strukturovaných datech
- ✅ Area served v schema (50km radius od Třebíče)

### Doporučené další kroky:
- Google Business Profile optimalizace
- Registrace v místních adresářích (Firmy.cz, Sreality.cz)
- Local citations (konzistentní NAP - Name, Address, Phone)

## Technické SEO

### Implementováno:
- ✅ Semantic HTML (h1, h2, h3 hierarchie)
- ✅ Alt text pro všechny obrázky
- ✅ Lang attribute (lang="cs")
- ✅ Mobile-first responsive design
- ✅ Next.js Image optimalizace

### K dokončení:
- 📋 Performance optimalizace (Lighthouse audit)
- 📋 Core Web Vitals optimalizace
- 📋 Lazy loading pro images
- 📋 Compression a caching strategie

## Měření a monitoring

### Doporučené nástroje k implementaci:

1. **Google Search Console**
   - Sledování indexace
   - Search performance
   - Core Web Vitals
   - Mobile usability

2. **Google Analytics 4**
   - Traffic analýza
   - User behavior
   - Conversion tracking
   - Event tracking (formulář submit)

3. **Google Tag Manager**
   - Centralizovaná správa tagů
   - Event tracking
   - Conversion tracking

## Klíčová slova

### Hlavní klíčová slova:
- stavební firma Třebíč
- rekonstrukce Třebíč
- stavba na klíč Třebíč
- zateplení Třebíč
- zednické práce Třebíč

### Long-tail klíčová slova:
- kompletní rekonstrukce bytu Třebíč
- profesionální stavební práce Vysočina
- stavební firma s referencemi Třebíč
- kvalitní zateplení domu Třebíč
- rekonstrukce koupelny Třebíč

## Content strategie

### Doporučení:
1. Pravidelné blogové články (1-2x měsíčně)
2. Case studies realizovaných projektů
3. FAQ sekce pro běžné dotazy
4. Video content (timelapse rekonstrukcí)
5. Před/po fotografie s detailními popisy

## Kontrolní checklist

- [x] Metadata na všech stránkách
- [x] Strukturovaná data (JSON-LD)
- [x] Sitemap.xml
- [x] Robots.txt
- [x] Open Graph tags
- [x] Canonical URLs
- [x] Alt text u obrázků
- [ ] Google Search Console připojení
- [ ] Google Analytics instalace
- [ ] Lighthouse audit (score 90+)
- [ ] Mobile speed test
- [ ] Structured data testing tool validace

## Validace

### Nástroje pro testování:
- **Rich Results Test**: https://search.google.com/test/rich-results
- **Lighthouse**: Chrome DevTools
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly

## Další kroky

1. Připojit Google Search Console
2. Instalovat Google Analytics 4
3. Provést Lighthouse audit
4. Optimalizovat Core Web Vitals
5. Pravidelně aktualizovat obsah
6. Monitorovat search rankings
7. Budovat backlinks (lokální adresáře, partnerské weby)
