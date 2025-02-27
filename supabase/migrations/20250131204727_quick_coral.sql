-- Add owner info to profiles table if not exists
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

-- Remove duplicate columns from profiles if they exist
DO $$ 
BEGIN
  -- Drop voice_engine if exists
  IF EXISTS (SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'voice_engine') THEN
    ALTER TABLE profiles DROP COLUMN voice_engine;
  END IF;

  -- Drop stability if exists
  IF EXISTS (SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'stability') THEN
    ALTER TABLE profiles DROP COLUMN stability;
  END IF;

  -- Drop style_exaggeration if exists
  IF EXISTS (SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'style_exaggeration') THEN
    ALTER TABLE profiles DROP COLUMN style_exaggeration;
  END IF;

  -- Drop similarity if exists
  IF EXISTS (SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'similarity') THEN
    ALTER TABLE profiles DROP COLUMN similarity;
  END IF;

  -- Drop latency_optimization if exists
  IF EXISTS (SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'latency_optimization') THEN
    ALTER TABLE profiles DROP COLUMN latency_optimization;
  END IF;
END $$;

-- Add index for completed_onboarding if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE tablename = 'profiles' 
    AND indexname = 'idx_profiles_completed_onboarding'
  ) THEN
    CREATE INDEX idx_profiles_completed_onboarding ON profiles(completed_onboarding);
  END IF;
END $$;