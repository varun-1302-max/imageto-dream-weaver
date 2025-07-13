-- Create admin user account (agaamb2@gmail.com) if not exists
DO $$
DECLARE
    admin_user_id UUID;
BEGIN
    -- Check if user exists first
    SELECT id INTO admin_user_id 
    FROM auth.users 
    WHERE email = 'agaamb2@gmail.com';
    
    -- If user doesn't exist, we'll create them manually through the auth flow
    -- This is just to ensure the database can handle the admin user
    IF admin_user_id IS NULL THEN
        RAISE NOTICE 'Admin user will be created through sign-up flow';
    ELSE
        RAISE NOTICE 'Admin user already exists with ID: %', admin_user_id;
    END IF;
END $$;