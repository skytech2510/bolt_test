/*
  # Fix profile creation and permissions

  1. Changes
    - Update handle_new_user function with better error handling
    - Add proper security context
    - Ensure proper permissions
*/

-- Update handle_new_user function with proper security context and error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  -- Create profile immediately after user signs up
  INSERT INTO public.profiles (
    user_id,
    assistant_name,
    voice_engine,
    timezone,
    patience_level,
    stability,
    style_exaggeration,
    similarity,
    latency_optimization,
    pause_before_speaking,
    ring_duration,
    idle_reminders_enabled,
    idle_reminder_time,
    reminder_message,
    speaker_boost
  ) VALUES (
    NEW.id,
    'My Voice Assistant',
    'v2',
    'UTC',
    'medium',
    0.5,
    0,
    0.75,
    0,
    0,
    1,
    false,
    6,
    'I''m still here. Do you have any questions?',
    false
  );
  
  RETURN NEW;
EXCEPTION WHEN unique_violation THEN
  -- Profile already exists, just return the user
  RETURN NEW;
WHEN OTHERS THEN
  RAISE WARNING 'Failed to create profile for user %: %', NEW.id, SQLERRM;
  RETURN NEW;
END;
$$;

-- Ensure proper grants
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO authenticated;
GRANT ALL ON TABLE public.profiles TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;

-- Recreate the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();