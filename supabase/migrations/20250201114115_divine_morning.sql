-- Add welcome_message and custom_instructions columns to profiles table
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS welcome_message text,
ADD COLUMN IF NOT EXISTS custom_instructions text;

-- Add comments for documentation
COMMENT ON COLUMN profiles.welcome_message IS 'Welcome message used by the voice assistant';
COMMENT ON COLUMN profiles.custom_instructions IS 'Custom instructions for voice assistant behavior';

-- Update existing profiles with default values
UPDATE profiles 
SET 
  welcome_message = COALESCE(welcome_message, 'Hello! How can I assist you today?'),
  custom_instructions = COALESCE(custom_instructions, '');