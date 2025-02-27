/*
  # Structured Tables for Voice Agent Management

  1. New Tables
    - `voice_agent_settings`
      - Stores dashboard-modified voice agent settings
      - One-to-one relationship with voice_agents
      - Contains all adjustable parameters from dashboard
    
    - `onboarding_responses`
      - Stores initial form responses during onboarding
      - One-to-one relationship with profiles
      - Contains all form fields from onboarding

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
    - Add proper indexes for performance

  3. Changes
    - Add foreign key relationships
    - Add updated_at triggers
*/

-- Create voice_agent_settings table
CREATE TABLE IF NOT EXISTS voice_agent_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  voice_agent_id uuid REFERENCES voice_agents(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Voice Settings
  voice_name text NOT NULL DEFAULT 'Default Voice',
  stability numeric NOT NULL DEFAULT 0.5,
  style_exaggeration numeric NOT NULL DEFAULT 0,
  similarity numeric NOT NULL DEFAULT 0.75,
  latency_optimization integer NOT NULL DEFAULT 0,
  speaker_boost boolean NOT NULL DEFAULT false,
  
  -- Response Settings
  patience_level text NOT NULL DEFAULT 'medium',
  pause_before_speaking integer NOT NULL DEFAULT 0,
  ring_duration integer NOT NULL DEFAULT 1,
  
  -- Reminder Settings
  idle_reminders_enabled boolean NOT NULL DEFAULT false,
  idle_reminder_time integer NOT NULL DEFAULT 6,
  reminder_message text NOT NULL DEFAULT 'I''m still here. Do you have any questions?',
  
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  
  CONSTRAINT unique_voice_agent_settings UNIQUE (voice_agent_id),
  CONSTRAINT stability_range CHECK (stability BETWEEN 0 AND 1),
  CONSTRAINT similarity_range CHECK (similarity BETWEEN 0 AND 1),
  CONSTRAINT style_range CHECK (style_exaggeration BETWEEN 0 AND 1)
);

-- Create onboarding_responses table
CREATE TABLE IF NOT EXISTS onboarding_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Business Information
  owner_name text NOT NULL,
  shop_name text NOT NULL,
  website text,
  phone_number text NOT NULL,
  social_media jsonb DEFAULT '[]'::jsonb,
  
  -- Operational Preferences
  appointment_type text NOT NULL DEFAULT 'both',
  operating_hours jsonb NOT NULL,
  piercing_services boolean NOT NULL DEFAULT false,
  hourly_rate numeric,
  
  -- AI Configuration
  assistant_name text NOT NULL,
  voice_preference text NOT NULL DEFAULT 'gender-neutral',
  welcome_message text NOT NULL,
  specific_instructions text,
  communication_tone text NOT NULL DEFAULT 'professional',
  enhanced_emotional_intelligence boolean NOT NULL DEFAULT true,
  language text NOT NULL DEFAULT 'en-US',
  calendar_integration text,
  
  -- Call Management
  daily_call_limit integer,
  call_handling text NOT NULL DEFAULT 'inbound',
  voicemail_management boolean NOT NULL DEFAULT false,
  automatic_reminders boolean NOT NULL DEFAULT false,
  waitlist_management boolean NOT NULL DEFAULT false,
  support_email text NOT NULL,
  
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  
  CONSTRAINT unique_user_onboarding UNIQUE (user_id)
);

-- Enable RLS
ALTER TABLE voice_agent_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE onboarding_responses ENABLE ROW LEVEL SECURITY;

-- Create policies for voice_agent_settings
CREATE POLICY "Users can read own voice agent settings"
  ON voice_agent_settings FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own voice agent settings"
  ON voice_agent_settings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own voice agent settings"
  ON voice_agent_settings FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own voice agent settings"
  ON voice_agent_settings FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for onboarding_responses
CREATE POLICY "Users can read own onboarding responses"
  ON onboarding_responses FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own onboarding responses"
  ON onboarding_responses FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own onboarding responses"
  ON onboarding_responses FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_voice_agent_settings_updated_at
  BEFORE UPDATE ON voice_agent_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_onboarding_responses_updated_at
  BEFORE UPDATE ON onboarding_responses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_voice_agent_settings_user_id ON voice_agent_settings(user_id);
CREATE INDEX idx_voice_agent_settings_voice_agent_id ON voice_agent_settings(voice_agent_id);
CREATE INDEX idx_onboarding_responses_user_id ON onboarding_responses(user_id);

-- Add documentation
COMMENT ON TABLE voice_agent_settings IS 'Stores voice agent settings that can be modified through the dashboard';
COMMENT ON TABLE onboarding_responses IS 'Stores initial onboarding form responses from users';