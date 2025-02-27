-- Add missing columns to profiles table
DO $$ 
BEGIN
  -- Add owner_name column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'owner_name') THEN
    ALTER TABLE profiles ADD COLUMN owner_name text;
  END IF;

  -- Add shop_name column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'shop_name') THEN
    ALTER TABLE profiles ADD COLUMN shop_name text;
  END IF;

  -- Add completed_onboarding column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'completed_onboarding') THEN
    ALTER TABLE profiles ADD COLUMN completed_onboarding boolean NOT NULL DEFAULT false;
  END IF;
END $$;

-- Create function to check onboarding status
CREATE OR REPLACE FUNCTION check_profile_completion()
RETURNS TRIGGER AS $$
BEGIN
  -- Set completed_onboarding to true if required fields are filled
  IF NEW.owner_name IS NOT NULL AND NEW.shop_name IS NOT NULL THEN
    NEW.completed_onboarding := true;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update completed_onboarding
DROP TRIGGER IF EXISTS check_profile_completion_trigger ON profiles;
CREATE TRIGGER check_profile_completion_trigger
  BEFORE INSERT OR UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION check_profile_completion();

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_completed_onboarding ON profiles(completed_onboarding);
CREATE INDEX IF NOT EXISTS idx_profiles_owner_name ON profiles(owner_name);
CREATE INDEX IF NOT EXISTS idx_profiles_shop_name ON profiles(shop_name);