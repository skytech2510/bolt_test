/*
  # Create Auth Settings Table

  1. Changes
    - Create a public schema table to store auth-related settings
    - Set default OTP expiry time to 15 minutes (900 seconds)
  
  2. Security
    - Table created in public schema with proper RLS
    - Only authenticated users can read settings
    - Only admin users can modify settings
*/

-- Create settings table in public schema
CREATE TABLE IF NOT EXISTS public.app_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_name text NOT NULL UNIQUE,
  setting_value jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow read access for authenticated users"
  ON public.app_settings
  FOR SELECT
  TO authenticated
  USING (true);

-- Insert default auth settings
INSERT INTO public.app_settings (setting_name, setting_value)
VALUES (
  'auth_settings',
  jsonb_build_object(
    'otp_expiry_seconds', 900,
    'updated_at', now()
  )
) ON CONFLICT (setting_name) DO UPDATE
SET setting_value = EXCLUDED.setting_value;

-- Add documentation
COMMENT ON TABLE public.app_settings IS 'Stores application configuration settings including auth settings';
COMMENT ON COLUMN public.app_settings.setting_name IS 'Unique identifier for the setting';
COMMENT ON COLUMN public.app_settings.setting_value IS 'JSON value containing the setting configuration';