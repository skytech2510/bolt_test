/*
  # Fix RLS policies for profiles table

  1. Changes
    - Drop and recreate profiles table with proper RLS policies
    - Add enable_row_level_security() function
    - Add proper policies for authenticated users
  
  2. Security
    - Enable RLS on profiles table
    - Add policies for authenticated users to:
      - Read their own profile
      - Create their own profile
      - Update their own profile
*/

-- Create profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  assistant_name text NOT NULL DEFAULT 'My Voice Assistant',
  voice_engine text NOT NULL DEFAULT 'v2',
  timezone text NOT NULL DEFAULT 'UTC',
  patience_level text NOT NULL DEFAULT 'medium',
  stability numeric NOT NULL DEFAULT 0.5,
  style_exaggeration numeric NOT NULL DEFAULT 0,
  similarity numeric NOT NULL DEFAULT 0.75,
  latency_optimization integer NOT NULL DEFAULT 0,
  pause_before_speaking integer NOT NULL DEFAULT 0,
  ring_duration integer NOT NULL DEFAULT 1,
  idle_reminders_enabled boolean NOT NULL DEFAULT false,
  idle_reminder_time integer NOT NULL DEFAULT 6,
  reminder_message text NOT NULL DEFAULT 'I''m still here. Do you have any questions?',
  speaker_boost boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Create policies with proper security context
CREATE POLICY "Enable read access for authenticated users"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Enable insert access for authenticated users"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable update access for authenticated users"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Drop existing trigger and function if they exist
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
DROP FUNCTION IF EXISTS update_updated_at_column();

-- Create function for updating updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();