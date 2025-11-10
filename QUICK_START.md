# ⚡ Rychlý start - ART DUM Web

## Potřebujete nastavit Sanity? Tady je jak na to za 5 minut:

### 1️⃣ Vytvořte Sanity projekt

1. Jděte na **[sanity.io/manage](https://www.sanity.io/manage)**
2. Klikněte **"Create new project"**
3. Název: `ART DUM`
4. Dataset: `production`
5. **Zkopírujte Project ID** (např. `abc123xy`)

### 2️⃣ Získejte API Token

1. V projektu jděte do **Settings → API → Tokens**
2. Klikněte **"Add API token"**
3. Name: `ART DUM Web`
4. Permissions: **Editor**
5. **Zkopírujte token** (zobrazí se jen jednou!)

### 3️⃣ Vytvořte .env.local

V root složce projektu vytvořte soubor `.env.local`:

\`\`\`env
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xy
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-10
SANITY_API_TOKEN=sk_your_token_here
\`\`\`

Nahraďte `abc123xy` a `sk_your_token_here` vašimi hodnotami!

### 4️⃣ Spusťte Sanity Studio

\`\`\`bash
npm install
npm run sanity dev
\`\`\`

Otevřete [localhost:3333](http://localhost:3333) 🎉

### 5️⃣ Přidejte obsah

1. V Sanity Studio klikněte na **"Services"** (Služby)
2. Vytvořte první službu
3. Stejně tak přidejte Portfolio projekty, Blog články atd.

### 6️⃣ Spusťte web

V novém terminálu:

\`\`\`bash
npm run dev
\`\`\`

Otevřete [localhost:3000](http://localhost:3000) 🚀

---

## 🆘 Něco nefunguje?

### Chyba: "Configuration must contain projectId"
➡️ Zkontrolujte, že máte `.env.local` soubor s `NEXT_PUBLIC_SANITY_PROJECT_ID`

### Chyba: "Unauthorized" v Sanity Studio
➡️ Zkontrolujte, že váš `SANITY_API_TOKEN` má Editor nebo Administrator práva

### Sanity Studio se nespustí
➡️ Spusťte: `npm install` a zkuste znovu

---

Detailnější návod najdete v **[docs/SANITY_SETUP.md](./docs/SANITY_SETUP.md)**
