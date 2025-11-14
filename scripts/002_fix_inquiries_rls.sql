-- Fix RLS policies for inquiries table to allow public submissions

-- Drop existing policies
drop policy if exists "inquiries_select_admin" on public.inquiries;
drop policy if exists "inquiries_insert_public" on public.inquiries;
drop policy if exists "inquiries_update_admin" on public.inquiries;
drop policy if exists "inquiries_delete_admin" on public.inquiries;

-- Recreate policies with correct permissions

-- Allow anonymous users to INSERT inquiries (contact form submissions)
create policy "inquiries_insert_public"
  on public.inquiries for insert
  to anon, authenticated
  with check (true);

-- Only admins and owners can SELECT inquiries
create policy "inquiries_select_admin"
  on public.inquiries for select
  to authenticated
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role in ('admin', 'owner')
    )
  );

-- Only admins and owners can UPDATE inquiries
create policy "inquiries_update_admin"
  on public.inquiries for update
  to authenticated
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role in ('admin', 'owner')
    )
  );

-- Only admins and owners can DELETE inquiries
create policy "inquiries_delete_admin"
  on public.inquiries for delete
  to authenticated
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role in ('admin', 'owner')
    )
  );
