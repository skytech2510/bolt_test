-- Add welcome_message column to profiles table
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS welcome_message text;

-- Add comment for documentation
COMMENT ON COLUMN profiles.welcome_message IS 'Welcome message used by the voice assistant';