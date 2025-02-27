/*
  # Fix function security settings

  1. Changes
    - Modify update_updated_at_column function to:
      - Set fixed search path
      - Add SECURITY INVOKER
      - Explicitly set schema

  2. Security
    - Prevents search path manipulation
    - Ensures consistent schema usage
*/

-- Drop existing trigger first
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;

-- Drop existing function
DROP FUNCTION IF EXISTS update_updated_at_column();

-- Create new function with proper security settings
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
SECURITY INVOKER
SET search_path = ''
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at := NOW();
    RETURN NEW;
END;
$$;

-- Recreate trigger with new function
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();