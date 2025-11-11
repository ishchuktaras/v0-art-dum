# Oprava Vercel Build Chyby - Lockfile Mismatch

## Problém

Vercel build selhává s chybou:
\`\`\`
ERR_PNPM_OUTDATED_LOCKFILE  Cannot install with "frozen-lockfile" because pnpm-lock.yaml is not up to date with package.json
\`\`\`

To se stalo, protože jsme aktualizovali package.json s konkrétními verzemi balíčků, ale pnpm-lock.yaml stále obsahuje "latest".

## Řešení

### Krok 1: Smazat starý lockfile

\`\`\`bash
rm pnpm-lock.yaml
\`\`\`

### Krok 2: Vygenerovat nový lockfile

\`\`\`bash
pnpm install
\`\`\`

To vytvoří nový `pnpm-lock.yaml` synchronizovaný s aktuálním `package.json`.

### Krok 3: Commitnout a pushnout změny

\`\`\`bash
git add pnpm-lock.yaml
git commit -m "Fix: Regenerace pnpm-lock.yaml pro synchronizaci s package.json"
git push origin main
\`\`\`

### Krok 4: Vercel automaticky spustí nový build

Po pushnutí změn Vercel automaticky spustí nový build, který by měl proběhnout úspěšně.

## Ověření

Po úspěšném buildu zkontrolujte:

1. **Vercel Dashboard** - Build by měl mít zelený status
2. **Deployed URL** - Web by měl být dostupný a funkční
3. **Environment Variables** - Zkontrolujte, že všechny Supabase env proměnné jsou nastavené

## Alternativní Řešení (Pokud pnpm nefunguje)

Pokud nemáte pnpm nainstalovaný nebo preferujete npm:

\`\`\`bash
# Smazat pnpm lockfile
rm pnpm-lock.yaml

# Vytvořit npm lockfile
npm install

# Commitnout změny
git add package-lock.json
git commit -m "Switch: Z pnpm na npm lockfile"
git push origin main
\`\`\`

## Prevence

Do budoucna:
- Vždy když měníte package.json, spusťte `pnpm install` pro aktualizaci lockfile
- Nikdy nepoužívejte `"latest"` jako verzi v package.json - vždy používejte konkrétní verze (např. `"^3.0.1"`)
- Commitujte lockfile společně s package.json změnami

## Troubleshooting

### Build stále selhává?

1. Zkontrolujte Vercel logs pro specifickou chybu
2. Ověřte, že všechny balíčky v package.json jsou validní verze
3. Zkuste local build: `pnpm run build`
4. Pokud local build funguje, ale Vercel ne, kontaktujte Vercel support

### Dependency konflikty?

Pokud vidíte peer dependency warnings:

\`\`\`bash
pnpm install --legacy-peer-deps
\`\`\`

Nebo:

\`\`\`bash
npm install --legacy-peer-deps
