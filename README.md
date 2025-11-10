# ART DUM Stavební firma - Webová prezentace

Moderní webová prezentace pro stavební firmu ART DUM vytvořená pomocí Next.js 15, TypeScript, Tailwind CSS a Sanity.io CMS.

## 🚀 Rychlý start

### 1. Instalace závislostí

\`\`\`bash
npm install
\`\`\`

### 2. Nastavení Sanity.io

#### Krok 1: Vytvořte Sanity projekt

1. Přejděte na [sanity.io](https://www.sanity.io/)
2. Zaregistrujte se nebo se přihlaste
3. Vytvořte nový projekt:
   - Klikněte na "Create new project"
   - Název: "ART DUM"
   - Dataset: "production"

#### Krok 2: Získejte Project ID a API Token

1. V Sanity dashboard najděte **Project ID** (např. `abc123xy`)
2. Přejděte do **Settings > API > Tokens**
3. Vytvořte nový token:
   - Name: "ART DUM Web Token"
   - Permissions: **Editor** nebo **Administrator**
4. Zkopírujte vygenerovaný token (zobrazí se jen jednou!)

#### Krok 3: Vytvořte .env.local soubor

Vytvořte soubor `.env.local` v root složce projektu a zkopírujte do něj následující:

\`\`\`env
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xy
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-10
SANITY_API_TOKEN=sk_your_token_here
\`\`\`

Nahraďte hodnoty svými skutečnými údaji z Sanity dashboardu.

### 3. Spuštění projektu

#### Spuštění Sanity Studio (CMS rozhraní)

\`\`\`bash
npm run sanity dev
\`\`\`

Sanity Studio bude dostupné na: [http://localhost:3333](http://localhost:3333)

#### Spuštění Next.js webu

\`\`\`bash
npm run dev
\`\`\`

Web bude dostupný na: [http://localhost:3000](http://localhost:3000)

## 📁 Struktura projektu

\`\`\`
v0-art-dum/
├── app/                    # Next.js App Router stránky
│   ├── page.tsx           # Homepage
│   ├── sluzby/            # Stránka služeb
│   ├── portfolio/         # Portfolio projektů
│   ├── kontakt/           # Kontaktní formulář
│   └── layout.tsx         # Root layout
├── components/
│   ├── ui/                # UI komponenty (shadcn)
│   └── sections/          # Sekce stránek
├── sanity/
│   ├── schemas/           # Sanity schémata
│   │   ├── service.ts     # Služby
│   │   ├── portfolio.ts   # Portfolio projekty
│   │   ├── blog.ts        # Blog články
│   │   ├── about.ts       # O nás
│   │   ├── certificate.ts # Certifikáty
│   │   ├── homepage.ts    # Homepage nastavení
│   │   └── contactInfo.ts # Kontaktní informace
│   ├── lib/               # Sanity utilit funkce
│   └── env.ts             # Environment proměnné
├── docs/
│   ├── SANITY_SETUP.md    # Detailní Sanity setup
│   └── CONTENT_GUIDE.md   # Návod pro přidávání obsahu
└── sanity.config.ts       # Sanity konfigurace
\`\`\`

## 📚 Dokumentace

- **[Sanity Setup](./docs/SANITY_SETUP.md)** - Detailní návod pro nastavení Sanity CMS
- **[Content Guide](./docs/CONTENT_GUIDE.md)** - Návod pro správu obsahu přes Sanity Studio

## 🛠️ Technologie

- **Next.js 15** - React framework s App Routerem
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Sanity.io** - Headless CMS
- **shadcn/ui** - UI komponenty
- **Resend** - Email API pro kontaktní formulář

## 🎨 Design

- **Barevná paleta**: 
  - Primární: Tmavě modrá (#0B192F)
  - Akcentová: Zlatá (#D4AF37)
- **Typografie**: Inter (Google Fonts)
- **Responzivní design**: Mobile-first přístup

## 🚢 Deployment

### Vercel (doporučeno)

1. Push projektu na GitHub
2. Import na [vercel.com](https://vercel.com)
3. Přidejte environment variables z `.env.local`
4. Deploy!

### Environment Variables pro Vercel

V Vercel Settings > Environment Variables přidejte:

\`\`\`
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
NEXT_PUBLIC_SANITY_API_VERSION
SANITY_API_TOKEN
RESEND_API_KEY (volitelné)
CONTACT_EMAIL (volitelné)
\`\`\`

## 📝 Licence

Projekt vytvořený pro ART DUM Stavební firma.

## 🤝 Kontakt

**Zhotovitel**: Taras Ishchuk
- Email: info@webnamiru.site
- Telefon: +420 777 596 216

**Objednatel**: Oleh Kulish
- Email: 666999oleh@gmail.com
- Telefon: +420 774 335 592
