# Sprint Plán - Týden 47/2024 (18.11. - 24.11.2024)
**Projekt:** ART DUM - Webová prezentace stavební firmy  
**Datum vytvoření:** 16.11.2025  
**Sprint:** Týden 47

---

## 📊 Aktuální stav projektu

### ✅ Dokončeno (100%)

#### 1. Technická infrastruktura
- ✅ Next.js 15 aplikace s App Router
- ✅ Tailwind CSS v4 styling systém
- ✅ TypeScript konfigurace
- ✅ Sanity CMS integrace a schémata
- ✅ Supabase integrace (databáze + auth)
- ✅ Vercel deployment (produkce)
- ✅ Doménové DNS nastavení (www.artdum.cz)
- ✅ SSL certifikát aktivní

#### 2. Frontend stránky
- ✅ Homepage s hero sekcí
- ✅ Služby (stránka + seznam)
- ✅ Portfolio (stránka + galerie)
- ✅ O nás (stránka)
- ✅ Blog/Aktuality (stránka)
- ✅ Kontakt (stránka + formulář)
- ✅ Certifikáty (stránka)
- ✅ Hodnocení (stránka)
- ✅ GDPR (stránka)
- ✅ Obchodní podmínky (stránka)
- ✅ Header navigace s mobilním menu
- ✅ Footer se všemi sekcemi

#### 3. Admin panel
- ✅ Supabase auth (přihlášení/odhlášení)
- ✅ Dashboard s statistikami
- ✅ Správa poptávek (seznam + detail + editace)
- ✅ Správa projektů portfolia (vytvoření + editace + detail)
- ✅ Analytika a přehledy
- ✅ Přístupová práva (RLS policies)

#### 4. Funkcionality
- ✅ Kontaktní formulář s Resend API
- ✅ Formulář poptávky
- ✅ Sanity CMS dynamický obsah
- ✅ SEO optimalizace (metadata, sitemap, robots.txt)
- ✅ Responsivní design (mobil/tablet/desktop)
- ✅ Dark mode podpora

#### 5. Opravy a optimalizace (poslední sprint)
- ✅ Oprava API endpointů pro projekty
- ✅ Oprava odhlašování (signout route)
- ✅ Oprava redirect statusů (303 See Other)
- ✅ Oprava emailRedirectTo v Supabase registraci
- ✅ Oprava Sanity GROQ queries (isActive pole)
- ✅ Oprava hero textu formátování
- ✅ **Oprava kontrastních problémů na celém webu**
- ✅ **Oprava viditelnosti menu v headeru**
- ✅ **Odstranění bílých čtverců z headeru**

---

## 🎯 Sprint cíle - Týden 47

### Priorita 1: Obsah a CMS (KRITICKÉ)
**Důležitost:** ⚡️ URGENTNÍ  
**Odpovědnost:** Objednatel (Oleh Kulish) + Developer

#### Úkol 1.1: Naplnit Sanity CMS základním obsahem
**Stav:** 🟡 Čeká na podklady  
**Časový odhad:** 8-12 hodin (rozděleno mezi Objednatele a Developera)

**Kroky:**
1. **Hlavní stránka** (2h)
   - [ ] Upravit hero text a popis v Sanity
   - [ ] Nahrát hlavní obrázek (přilba na stavbě)
   - [ ] Vyplnit sekci "O nás"
   - [ ] Nastavit statistiky (projekty, roky, klienti)

2. **Služby - Aktivovat stávající** (1h)
   - [ ] Zkontrolovat 7 existujících služeb v Sanity
   - [ ] Doplnit detailní popisy
   - [ ] Nahrát reprezentativní obrázky pro každou službu
   - [ ] Publikovat všechny služby

3. **Portfolio - První 5 projektů** (6h - čeká na fotografie)
   - [ ] Vyžádat fotografie "před/po" od Objednatele
   - [ ] Vytvořit 5 projektů v Sanity dle vzoru
   - [ ] Vyplnit popisy a specifikace
   - [ ] Publikovat portfolio projekty

4. **Certifikáty** (2h - čeká na skeny)
   - [ ] Získat skeny diplomů a nostrifikace
   - [ ] Nahrát do Sanity
   - [ ] Vyplnit metadata

5. **Kontaktní informace** (0.5h)
   - [ ] Ověřit správnost telefonu a emailu
   - [ ] Doplnit sociální sítě (pokud existují)

**Výstup:** Plně funkční web s reálným obsahem místo placeholder dat

---

### Priorita 2: Firmy.cz widget integrace
**Důležitost:** 🟢 Vysoká  
**Odpovědnost:** Developer  
**Časový odhad:** 3-4 hodiny

#### Úkol 2.1: Implementovat Firmy.cz hodnocení widget
**Stav:** 📋 Připraveno k vývoji

**Kroky:**
- [ ] Vytvořit Firmy.cz účet pro ART DUM
- [ ] Získat embed kód widgetu
- [ ] Integrovat do homepage (sekce hodnocení)
- [ ] Otestovat zobrazení
- [ ] Dokumentovat v README

**Výstup:** Živé hodnocení z Firmy.cz na homepage

---

### Priorita 3: SEO a marketing optimalizace
**Důležitost:** 🟢 Vysoká  
**Odpovědnost:** Developer + Objednatel  
**Časový odhad:** 4-5 hodin

#### Úkol 3.1: Google Analytics 4 integrace
- [ ] Vytvořit GA4 účet pro www.artdum.cz
- [ ] Přidat tracking kód do layout.tsx
- [ ] Nastavit cíle konverze (formulář kontakt, poptávka)
- [ ] Otestovat tracking events
- [ ] Zaškole Objednatele k čtení analytiky

#### Úkol 3.2: Google Search Console setup
- [ ] Verifikovat vlastnictví domény
- [ ] Odeslat sitemap.xml
- [ ] Zkontrolovat indexaci stránek
- [ ] Opravit případné chyby

#### Úkol 3.3: Meta description a Open Graph
- [ ] Vyplnit SEO metadata pro všechny stránky v Sanity
- [ ] Přidat Open Graph obrázky
- [ ] Otestovat sdílení na sociálních sítích

**Výstup:** Měřitelný web připravený pro marketing

---

### Priorita 4: Performance a optimalizace
**Důležitost:** 🟡 Střední  
**Odpovědnost:** Developer  
**Časový odhad:** 3-4 hodiny

#### Úkol 4.1: Lighthouse audit a opravy
- [ ] Spustit Lighthouse audit na všech stránkách
- [ ] Optimalizovat načítání obrázků (WebP, lazy loading)
- [ ] Zlepšit Core Web Vitals (LCP, FID, CLS)
- [ ] Dosáhnout skóre 90+ na Desktop

#### Úkol 4.2: Optimalizace Sanity queries
- [ ] Přidat caching pro často dotazovaná data
- [ ] Implementovat ISR (Incremental Static Regeneration)
- [ ] Testovat rychlost načítání stránek

**Výstup:** Rychlý web s vysokým Lighthouse skóre

---

### Priorita 5: Testing a dokumentace
**Důležitost:** 🟡 Střední  
**Odpovědnost:** Developer  
**Časový odhad:** 2-3 hodiny

#### Úkol 5.1: Cross-browser testing
- [ ] Otestovat na Chrome, Firefox, Safari, Edge
- [ ] Otestovat mobilní verze (iOS Safari, Chrome Mobile)
- [ ] Opravit případné kompatibilní problémy

#### Úkol 5.2: Uživatelská dokumentace
- [ ] Vytvořit "UZIVATELSKA_PRIRUCKA.md"
- [ ] Návod na správu obsahu v Sanity
- [ ] Návod na správu poptávek v Admin panelu
- [ ] Video tutoriál (volitelné)

**Výstup:** Funkční web na všech zařízeních + dokumentace pro Objednatele

---

## 📅 Harmonogram týdne

### Pondělí 18.11.
- ⏰ Dopoledne: Meeting s Objednatelem - předání podkladů (fotky, certifikáty)
- ⏰ Odpoledne: Začátek naplňování Sanity CMS (Hlavní stránka, Služby)

### Úterý 19.11.
- ⏰ Celý den: Pokračování CMS (Portfolio projekty, Certifikáty)
- ⏰ Večer: Review naplněného obsahu

### Středa 20.11.
- ⏰ Dopoledne: Firmy.cz widget integrace
- ⏰ Odpoledne: Google Analytics a Search Console setup

### Čtvrtek 21.11.
- ⏰ Dopoledne: SEO metadata a Open Graph
- ⏰ Odpoledne: Lighthouse audit a optimalizace

### Pátek 22.11.
- ⏰ Dopoledne: Cross-browser testing
- ⏰ Odpoledne: Dokumentace a uživatelská příručka

### Víkend 23-24.11.
- 🔍 Finální kontrola před předáním
- 📝 Příprava předávacího protokolu

---

## 🚀 Kritické bloky a rizika

### ⚠️ Riziko 1: Chybí obsah od Objednatele
**Dopad:** Vysoký  
**Pravděpodobnost:** Střední

**Mitigation:**
- Urgentní email Objednateli s deadline 18.11. (pondělí)
- Připravit template pro strukturu fotografií a popisů
- V případě zpoždění použít dočasné placeholder obrázky z Unsplash

### ⚠️ Riziko 2: Performance problémy s velkými obrázky
**Dopad:** Střední  
**Pravděpodobnost:** Nízká

**Mitigation:**
- Implementovat automatickou kompresi obrázků v Sanity
- Použít Next.js Image component všude
- Nastavit správné image optimization

---

## 📊 Metriky úspěchu sprintu

- [ ] **100% obsahu naplněno v Sanity CMS**
- [ ] **Lighthouse skóre 90+ na Desktop**
- [ ] **Google Analytics měří návštěvnost**
- [ ] **Firmy.cz widget živý na homepage**
- [ ] **Dokumentace předána Objednateli**
- [ ] **Zero kritických bugů**

---

## 📝 Poznámky pro Freelo.io

### Jak přenést úkoly do Freelo:

1. **Vytvořit Sprint "Týden 47 - Obsah a optimalizace"**
2. **Pro každou Prioritu vytvořit Board/Sekci**
3. **Jednotlivé úkoly přenést jako Cards s:**
   - Názvem úkolu
   - Popisem (kroky)
   - Časovým odhadem
   - Přiřazením (Developer/Objednatel)
   - Deadline
   - Labely (Frontend/Backend/Content/SEO)

### Doporučené labely:
- 🔴 KRITICKÉ
- 🟡 URGENTNÍ
- 🟢 NORMÁLNÍ
- 🔵 NÍZKÁ PRIORITA
- 📋 ČEKÁ NA PODKLADY
- ✅ HOTOVO

---

## 🎓 Handover & Školení

Po dokončení sprintu je potřeba:
1. **Školení Objednatele na Sanity CMS** (1.5h)
2. **Školení na Admin panel** (1h)
3. **Předání přístupů a hesel** (dokumentováno)
4. **Podepsání předávacího protokolu**

---

**Připravil:** v0 AI Assistant  
**Datum:** 16.11.2025  
**Verze dokumentu:** 1.0
