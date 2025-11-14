# Připojení domény artdum.cz z WEDOS na Vercel

Tento návod vás provede připojením vaší domény artdum.cz (hostované na WEDOS) k Vercel projektu.

## Krok 1: Přidat doménu ve Vercel

1. Přejděte do Vercel dashboard: https://vercel.com/dashboard
2. Vyberte váš projekt "v0-art-dum"
3. Klikněte na **Settings** → **Domains**
4. Klikněte na **Add Domain**
5. Zadejte: `artdum.cz`
6. Klikněte **Add**

Vercel vám ukáže DNS záznamy, které musíte nastavit.

## Krok 2: Nastavit DNS záznamy ve WEDOS

### A) Přihlášení do WEDOS

1. Přejděte na: https://client.wedos.com/
2. Přihlaste se pomocí vašich přihlašovacích údajů
3. V menu vyberte **Domény** → **Správa DNS**
4. Vyberte doménu `artdum.cz`

### B) Nastavení DNS záznamů

Vercel vyžaduje jeden z těchto přístupů:

#### Možnost 1: A záznamy (Doporučeno)

Smažte nebo upravte stávající A záznamy a přidejte:

\`\`\`
Type: A
Name: @ (nebo prázdné)
Value: 76.76.21.21
TTL: 3600
\`\`\`

#### Možnost 2: CNAME záznam

\`\`\`
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
\`\`\`

A root doménu:

\`\`\`
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
\`\`\`

### C) Ověření nastavení

1. Po uložení DNS změn ve WEDOS se vraťte do Vercel
2. Klikněte na **Refresh** u vaší domény
3. Počkejte 5-10 minut na propagaci DNS
4. Vercel automaticky ověří DNS a vygeneruje SSL certifikát

## Krok 3: Nastavení www subdomény (volitelné)

Pokud chcete, aby fungovala i `www.artdum.cz`:

1. Ve Vercel přidejte další doménu: `www.artdum.cz`
2. Ve WEDOS přidejte CNAME záznam:

\`\`\`
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
\`\`\`

## Krok 4: Zachování emailu

**DŮLEŽITÉ:** Pokud používáte email na artdum.cz (např. firma@artdum.cz), **NESMÍTE smazat MX záznamy**!

Zachovejte tyto záznamy ve WEDOS DNS:

\`\`\`
Type: MX
Name: @
Priority: 10
Value: (váš mail server - např. mail.wedos.net)
\`\`\`

Změňte pouze A nebo CNAME záznamy pro web, MX záznamy ponechte!

## Ověření funkčnosti

### 1. Zkontrolovat DNS propagaci

Použijte online nástroj: https://dnschecker.org/

Zadejte: `artdum.cz` a zkontrolujte, zda A záznam ukazuje na `76.76.21.21`

### 2. Otevřít web

Po propagaci DNS (5-60 minut) otevřete:
- http://artdum.cz (mělo by automaticky přesměrovat na https://)
- https://artdum.cz (mělo by zobrazit váš web s SSL)

### 3. Zkontrolovat SSL certifikát

1. Otevřete https://artdum.cz
2. Klikněte na zámek v adresním řádku
3. Měli byste vidět platný Let's Encrypt certifikát

## Troubleshooting

### DNS změny se neprojevují

**Řešení:**
1. Počkejte 30-60 minut (DNS propagace trvá)
2. Vymažte DNS cache: `ipconfig /flushdns` (Windows) nebo `sudo dscacheutil -flushcache` (Mac)
3. Zkontrolujte záznamy na https://dnschecker.org/

### SSL certifikát chyba

**Řešení:**
1. Počkejte 5-10 minut po ověření DNS
2. Ve Vercel klikněte na **Refresh** u domény
3. Vercel automaticky vygeneruje Let's Encrypt SSL certifikát

### Email přestal fungovat

**Řešení:**
1. Zkontrolujte, že jste NEsmazali MX záznamy ve WEDOS
2. Obnovte MX záznamy z WEDOS dokumentace nebo podpory

### "Domain is not configured" error

**Řešení:**
1. Zkontrolujte, že DNS záznamy ve WEDOS jsou správně nastavené
2. Počkejte na DNS propagaci (až 24 hodin, obvykle 1 hodina)
3. Ve Vercel zkuste Remove domain a přidat znovu

## Alternativní řešení: Subdoména

Pokud nechcete měnit hlavní doménu, můžete použít subdoménu:

\`\`\`
Type: CNAME
Name: web (nebo app, new, atd.)
Value: cname.vercel-dns.com
TTL: 3600
\`\`\`

Web bude dostupný na: `web.artdum.cz`

## Kontakt na podporu

- **WEDOS podpora:** https://www.wedos.cz/podpora nebo podpora@wedos.cz
- **Vercel podpora:** https://vercel.com/help

## Dodatečné poznámky

### Redirects

Po nastavení můžete ve Vercel nastavit automatické přesměrování:
- `www.artdum.cz` → `artdum.cz` (nebo opačně)
- `http://` → `https://`

Tyto redirecty Vercel nastavuje automaticky.

### Vercel Analytics

Po připojení domény můžete aktivovat Vercel Analytics pro sledování návštěvnosti:
1. V Vercel dashboard → **Analytics**
2. Klikněte **Enable**
3. Získáte real-time statistiky návštěvnosti

---

**Stav:** Po dokončení těchto kroků bude váš web dostupný na https://artdum.cz s automatickým SSL certifikátem a bez nutnosti spravovat server.
\`\`\`

```tsx file="" isHidden
