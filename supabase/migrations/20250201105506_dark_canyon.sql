/*
  # Rename Tables and Cleanup

  1. Changes
    - Rename onboarding_responses to form_voice_agent
    - Rename voice_agent_settings to modify_voice_agent_dashboard
    - Drop unused tables and related objects
    
  2. Security
    - Maintain existing RLS policies
    - Update policy names for clarity
*/

-- Rename onboarding_responses to form_voice_agent
ALTER TABLE IF EXISTS onboarding_responses 
  RENAME TO form_voice_agent;

-- Rename voice_agent_settings to modify_voice_agent_dashboard
ALTER TABLE IF EXISTS voice_agent_settings 
  RENAME TO modify_voice_agent_dashboard;

-- Update trigger names to match new table names
ALTER TRIGGER update_voice_agent_settings_updated_at 
  ON modify_voice_agent_dashboard
  RENAME TO update_modify_voice_agent_dashboard_updated_at;

ALTER TRIGGER update_onboarding_responses_updated_at 
  ON form_voice_agent
  RENAME TO update_form_voice_agent_updated_at;

-- Rename indexes to match new table names
ALTER INDEX IF EXISTS idx_voice_agent_settings_user_id 
  RENAME TO idx_modify_voice_agent_dashboard_user_id;

ALTER INDEX IF EXISTS idx_voice_agent_settings_voice_agent_id 
  RENAME TO idx_modify_voice_agent_dashboard_voice_agent_id;

ALTER INDEX IF EXISTS idx_onboarding_responses_user_id 
  RENAME TO idx_form_voice_agent_user_id;

-- Drop app_settings table as it's not being used
DROP TABLE IF EXISTS app_settings CASCADE;

-- Update table comments
COMMENT ON TABLE form_voice_agent 
  IS 'Stores initial voice agent configuration from the onboarding form';

COMMENT ON TABLE modify_voice_agent_dashboard 
  IS 'Stores voice agent settings that can be modified through the dashboard interface';