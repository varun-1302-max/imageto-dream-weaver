-- First check if the admin user already exists, if not create it
-- Note: This is for testing purposes only
INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, role)
SELECT 
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'agaamb2@gmail.com',
  crypt('Varun@imageto', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  false,
  'authenticated'
WHERE NOT EXISTS (
  SELECT 1 FROM auth.users WHERE email = 'agaamb2@gmail.com'
);