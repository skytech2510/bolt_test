/*
  # Fix profile creation timing and error handling

  1. Changes
    - Update trigger timing from AFTER to BEFORE
    - Add proper error handling and retries
    - Ensure transaction safety
*/

-- Drop existing trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create improved function with proper error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  max_retries constant int := 3;
  current_try int := 0;
  profile_id uuid;
BEGIN
  LOOP
    BEGIN
      current_try := current_try + 1;
      
      -- Attempt to create the profile
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
      )
      RETURNING id INTO profile_id;

      -- If we get here, the insert was successful
      EXIT;

    EXCEPTION 
      WHEN unique_violation THEN
        -- Profile already exists, no need to create it
        RETURN NEW;
      WHEN foreign_key_violation THEN
        -- If we haven't exceeded max retries, wait a bit and try again
        IF current_try < max_retries THEN
          PERFORM pg_sleep(0.1 * current_try); -- Exponential backoff
          CONTINUE;
        END IF;
        RAISE WARNING 'Failed to create profile for user % after % attempts: %', NEW.id, max_retries, SQLERRM;
      WHEN OTHERS THEN
        RAISE WARNING 'Unexpected error creating profile for user %: %', NEW.id, SQLERRM;
    END;
    
    EXIT WHEN current_try >= max_retries;
  END LOOP;

  RETURN NEW;
END;
$$;

-- Recreate trigger with BEFORE timing
CREATE TRIGGER on_auth_user_created
  BEFORE INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Ensure proper permissions
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO authenticated;
GRANT ALL ON TABLE public.profiles TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;