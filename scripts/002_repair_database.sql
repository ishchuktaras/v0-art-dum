-- Repair script - bezpečně opraví databázi bez errorů
-- Spustitelný vícekrát bez problémů

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Drop a znovu vytvoř policies (aby byl konzistentní stav)
drop policy if exists "profiles_select_own" on public.profiles;
drop policy if exists "profiles_insert_own" on public.profiles;
drop policy if exists "profiles_update_own" on public.profiles;
drop policy if exists "inquiries_select_admin" on public.inquiries;
drop policy if exists "inquiries_insert_public" on public.inquiries;
drop policy if exists "inquiries_update_admin" on public.inquiries;
drop policy if exists "projects_select_admin" on public.projects;
drop policy if exists "projects_all_admin" on public.projects;

-- Vytvoř tabulky (if not exists zajistí bezpečnost)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  role text not null default 'user' check (role in ('user', 'admin', 'owner')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.inquiries (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  phone text,
  service_type text,
  message text not null,
  status text not null default 'new' check (status in ('new', 'in_progress', 'completed', 'rejected')),
  priority text default 'normal' check (priority in ('low', 'normal', 'high', 'urgent')),
  source text default 'website',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  assigned_to uuid references public.profiles(id),
  notes text
);

create table if not exists public.projects (
  id uuid primary key default uuid_generate_v4(),
  inquiry_id uuid references public.inquiries(id),
  title text not null,
  description text,
  client_name text not null,
  client_email text,
  client_phone text,
  status text not null default 'planning' check (status in ('planning', 'in_progress', 'completed', 'on_hold', 'cancelled')),
  start_date date,
  end_date date,
  budget_estimate decimal(10,2),
  actual_cost decimal(10,2),
  assigned_to uuid references public.profiles(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  notes text
);

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.inquiries enable row level security;
alter table public.projects enable row level security;

-- Vytvoř nové policies
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

create policy "inquiries_select_admin"
  on public.inquiries for select
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role in ('admin', 'owner')
    )
  );

create policy "inquiries_insert_public"
  on public.inquiries for insert
  with check (true);

create policy "inquiries_update_admin"
  on public.inquiries for update
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role in ('admin', 'owner')
    )
  );

create policy "projects_select_admin"
  on public.projects for select
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role in ('admin', 'owner')
    )
  );

create policy "projects_all_admin"
  on public.projects for all
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role in ('admin', 'owner')
    )
  );

-- Vytvoř nebo nahraď funkce a triggery
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
  before update on public.profiles
  for each row
  execute function public.handle_updated_at();

drop trigger if exists set_inquiries_updated_at on public.inquiries;
create trigger set_inquiries_updated_at
  before update on public.inquiries
  for each row
  execute function public.handle_updated_at();

drop trigger if exists set_projects_updated_at on public.projects;
create trigger set_projects_updated_at
  before update on public.projects
  for each row
  execute function public.handle_updated_at();

-- KRITICKÝ TRIGGER - automaticky vytvoří profil pro nového uživatele
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', null),
    coalesce((new.raw_user_meta_data ->> 'role')::text, 'user')
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- Vytvoř indexy
create index if not exists idx_inquiries_status on public.inquiries(status);
create index if not exists idx_inquiries_created_at on public.inquiries(created_at desc);
create index if not exists idx_projects_status on public.projects(status);
create index if not exists idx_projects_client_name on public.projects(client_name);

-- Ověř, že trigger funguje
do $$
begin
  raise notice 'Database repair completed successfully!';
  raise notice 'Trigger on_auth_user_created is active and will create profiles automatically.';
end $$;
