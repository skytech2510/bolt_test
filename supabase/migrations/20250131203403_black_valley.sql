/*
  # Create Voice Agents Table

  1. New Tables
    - voice_agents
      - Basic info (id, name, status)
      - Voice settings (engine, stability, etc)
      - Performance metrics
      - Configuration parameters
      - Timestamps and relations
  
  2. Security
    - Enable RLS
    - Policies for authenticated users
    - Foreign key constraints
  
  3. Indexes
    - For foreign key lookups
    - For common queries
*/

-- Create enum types for status and voice preferences
CREATE TYPE voice_agent_status AS ENUM ('active', 'inactive', 'training');
CREATE TYPE voice_preference AS ENUM ('gender-neutral', 'female', 'male');

-- Create voice agents table
CREATE TABLE IF NOT EXISTS voice_agents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  name text NOT NULL,
  status voice_agent_status NOT NULL DEFAULT 'inactive',
  
  -- Voice settings
  voice_preference voice_preference NOT NULL DEFAULT 'gender-neutral',
  voice_engine text NOT NULL DEFAULT 'v2',
  stability numeric NOT NULL DEFAULT 0.5,
  style_exaggeration numeric NOT NULL DEFAULT 0,
  similarity numeric NOT NULL DEFAULT 0.75,
  latency_optimization integer NOT NULL DEFAULT 0,
  
  -- Communication settings
  welcome_message text NOT NULL DEFAULT 'Hello! How can I assist you today?',
  specific_instructions text,
  communication_tone text NOT NULL DEFAULT 'professional',
  enhanced_emotional_intelligence boolean NOT NULL DEFAULT true,
  language text NOT NULL DEFAULT 'en-US',
  
  -- Call settings
  daily_call_limit integer,
  call_handling text NOT NULL DEFAULT 'inbound',
  voicemail_management boolean NOT NULL DEFAULT false,
  automatic_reminders boolean NOT NULL DEFAULT false,
  waitlist_management boolean NOT NULL DEFAULT false,
  
  -- Performance metrics
  total_calls integer NOT NULL DEFAULT 0,
  successful_calls integer NOT NULL DEFAULT 0,
  average_call_duration interval,
  last_active_at timestamptz,
  level integer NOT NULL DEFAULT 1,
  
  -- Metadata
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  
  -- Constraints
  CONSTRAINT voice_agents_stability_check CHECK (stability >= 0 AND stability <= 1),
  CONSTRAINT voice_agents_similarity_check CHECK (similarity >= 0 AND similarity <= 1),
  CONSTRAINT voice_agents_style_check CHECK (style_exaggeration >= 0 AND style_exaggeration <= 1)
);

-- Create indexes
CREATE INDEX idx_voice_agents_user_id ON voice_agents(user_id);
CREATE INDEX idx_voice_agents_status ON voice_agents(status);
CREATE INDEX idx_voice_agents_created_at ON voice_agents(created_at);

-- Enable RLS
ALTER TABLE voice_agents ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can read own voice agents"
  ON voice_agents
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own voice agents"
  ON voice_agents
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own voice agents"
  ON voice_agents
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own voice agents"
  ON voice_agents
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_voice_agents_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_voice_agents_updated_at
  BEFORE UPDATE ON voice_agents
  FOR EACH ROW
  EXECUTE FUNCTION update_voice_agents_updated_at();

-- Add documentation
COMMENT ON TABLE voice_agents IS 'Stores AI voice agent configurations and performance metrics';
COMMENT ON COLUMN voice_agents.user_id IS 'Reference to the auth.users table';
COMMENT ON COLUMN voice_agents.status IS 'Current status of the voice agent';
COMMENT ON COLUMN voice_agents.level IS 'Experience level of the voice agent';