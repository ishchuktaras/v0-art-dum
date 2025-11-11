# Admin Panel - Nastavení a dokumentace

## Přehled

Admin panel pro správu poptávek, projektů a business analytics pro ART DUM stavební firmu.

## Autentifikace

### Supabase Auth
- Email/heslo autentifikace
- Role-based access control (RBAC)
- Middleware pro ochranu admin routes

### Role uživatelů
- **owner** - Majitel (plný přístup ke všemu)
- **admin** - Administrátor (správa poptávek a projektů)
- **user** - Běžný uživatel (žádný přístup do admin panelu)

## Databázové tabulky

### profiles
Rozšíření tabulky `auth.users` o firemní data
- `id` - UUID (foreign key na auth.users)
- `email` - Email uživatele
- `full_name` - Celé jméno
- `role` - Role (user/admin/owner)

### inquiries (Poptávky)
Ukládání poptávek z kontaktního formuláře
- `name`, `email`, `phone` - Kontaktní údaje
- `service_type` - Typ služby
- `message` - Zpráva od klienta
- `status` - Stav (new/in_progress/completed/rejected)
- `priority` - Priorita (low/normal/high/urgent)
- `assigned_to` - Přiřazeno komu

### projects (Projekty)
Správa rekonstrukčních projektů
- `title`, `description` - Název a popis
- `client_name`, `client_email`, `client_phone` - Klient
- `status` - Stav (planning/in_progress/completed/on_hold/cancelled)
- `start_date`, `end_date` - Termíny
- `budget_estimate`, `actual_cost` - Rozpočet

## Spuštění SQL skriptů

\`\`\`bash
# Z kořenové složky projektu
# Skripty se spustí automaticky v Supabase
\`\`\`

## Přístupové URL

- **Login**: `/auth/login`
- **Admin Dashboard**: `/admin`
- **Správa poptávek**: `/admin/inquiries`
- **Správa projektů**: `/admin/projects`

## Bezpečnost

### Row Level Security (RLS)
Všechny tabulky používají RLS políčka:
- Uživatelé vidí jen svoje data
- Admin/Owner vidí všechna data
- Veřejnost může pouze vkládat poptávky

### Middleware ochrana
- Automatické refreshování session
- Ochrana admin routes
- Redirect na login pokud není autentifikován
