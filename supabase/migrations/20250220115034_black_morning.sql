/*
  # Optional Preferences Table

  1. New Tables
    - `optional_preferences`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `voice_agent_id` (uuid, references voice_agents)
      - `custom_vocabulary` (text array)
      - `filter_words` (text array)
      - `enhanced_emotional_intelligence` (boolean)
      - `automatic_reminders` (boolean)
      - `reminder_interval` (interval)
      - `waitlist_enabled` (boolean)
      - `max_waitlist_size` (integer)
      - `calendar_sync_enabled` (boolean)
      - `calendar_provider` (text)
      - `calendar_settings` (jsonb)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policies for authenticated users
    - Add indexes for performance

  3. Changes
    - Add trigger for updated_at
    - Add foreign key constraints
*/

-- Create optional_preferences table
CREATE TABLE optional_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  voice_agent_id uuid REFERENCES voice_agents(id) ON DELETE CASCADE NOT NULL,
  
  -- Custom vocabulary and filtering
  custom_vocabulary text[] DEFAULT ARRAY[]::text[],
  filter_words text[] DEFAULT ARRAY[]::text[],
  
  -- Enhanced features
  enhanced_emotional_intelligence boolean DEFAULT false,
  automatic_reminders boolean DEFAULT false,
  reminder_interval interval DEFAULT '24 hours'::interval,
  
  -- Waitlist settings
  waitlist_enabled boolean DEFAULT false,
  max_waitlist_size integer DEFAULT 10,
  
  -- Calendar integration
  calendar_sync_enabled boolean DEFAULT false,
  calendar_provider text CHECK (calendar_provider IN ('google', 'outlook', 'apple')),
  calendar_settings jsonb DEFAULT '{}'::jsonb,
  
  -- Metadata
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  
  -- Constraints
  CONSTRAINT unique_user_agent_preferences UNIQUE (user_id, voice_agent_id),
  CONSTRAINT max_waitlist_size_check CHECK (max_waitlist_size > 0)
);

-- Enable Row Level Security
ALTER TABLE optional_preferences ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies
CREATE POLICY "Users can read own preferences"
  ON optional_preferences
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own preferences"
  ON optional_preferences
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences"
  ON optional_preferences
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own preferences"
  ON optional_preferences
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create updated_at trigger
CREATE TRIGGER update_optional_preferences_updated_at
  BEFORE UPDATE ON optional_preferences
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_optional_preferences_user_id ON optional_preferences(user_id);
CREATE INDEX idx_optional_preferences_voice_agent_id ON optional_preferences(voice_agent_id);
CREATE INDEX idx_optional_preferences_calendar_sync ON optional_preferences(calendar_sync_enabled) WHERE calendar_sync_enabled = true;

-- Add documentation
COMMENT ON TABLE optional_preferences IS 'Stores optional and advanced preferences for voice agents';
COMMENT ON COLUMN optional_preferences.custom_vocabulary IS 'Custom words and phrases for the voice agent to recognize';
COMMENT ON COLUMN optional_preferences.filter_words IS 'Words and phrases to be filtered out or handled specially';
COMMENT ON COLUMN optional_preferences.enhanced_emotional_intelligence IS 'Enable advanced emotional response capabilities';
COMMENT ON COLUMN optional_preferences.calendar_settings IS 'JSON configuration for calendar integration settings';