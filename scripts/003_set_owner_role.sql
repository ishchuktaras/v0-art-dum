-- Set owner role for info@webnamiru.site
-- Run this script in Supabase SQL Editor

-- First, check if profile exists and create it if not
INSERT INTO profiles (id, email, full_name, role)
SELECT 
  id,
  email,
  COALESCE(raw_user_meta_data->>'full_name', email) as full_name,
  'owner' as role
FROM auth.users
WHERE email = 'info@webnamiru.site'
ON CONFLICT (id) 
DO UPDATE SET 
  role = 'owner',
  updated_at = now();

-- Verify the update
SELECT id, email, full_name, role, created_at 
FROM profiles 
WHERE email = 'info@webnamiru.site';
