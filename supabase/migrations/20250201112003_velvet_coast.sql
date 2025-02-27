-- Add missing columns to form_voice_agent table
ALTER TABLE form_voice_agent
  -- Operating Hours structure
  ALTER COLUMN operating_hours SET DEFAULT '[
    {"day": "Monday", "isOpen": true, "openTime": "09:00", "closeTime": "17:00"},
    {"day": "Tuesday", "isOpen": true, "openTime": "09:00", "closeTime": "17:00"},
    {"day": "Wednesday", "isOpen": true, "openTime": "09:00", "closeTime": "17:00"},
    {"day": "Thursday", "isOpen": true, "openTime": "09:00", "closeTime": "17:00"},
    {"day": "Friday", "isOpen": true, "openTime": "09:00", "closeTime": "17:00"},
    {"day": "Saturday", "isOpen": true, "openTime": "09:00", "closeTime": "17:00"},
    {"day": "Sunday", "isOpen": false, "openTime": "09:00", "closeTime": "17:00"}
  ]'::jsonb,
  
  -- Ensure phone_number is properly formatted
  ADD CONSTRAINT phone_number_format CHECK (
    phone_number ~ '^\(\d{3}\) \d{3}-\d{4}$'
  ),
  
  -- Add constraints for required fields
  ALTER COLUMN owner_name SET NOT NULL,
  ALTER COLUMN shop_name SET NOT NULL,
  ALTER COLUMN phone_number SET NOT NULL,
  ALTER COLUMN assistant_name SET NOT NULL,
  ALTER COLUMN welcome_message SET NOT NULL,
  ALTER COLUMN support_email SET NOT NULL,
  
  -- Add validation for email format
  ADD CONSTRAINT support_email_format CHECK (
    support_email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  ),
  
  -- Add validation for hourly rate
  ADD CONSTRAINT hourly_rate_positive CHECK (
    hourly_rate > 0
  ),
  
  -- Add validation for daily call limit
  ADD CONSTRAINT daily_call_limit_positive CHECK (
    daily_call_limit IS NULL OR daily_call_limit > 0
  );

-- Add indexes for commonly queried fields
CREATE INDEX IF NOT EXISTS idx_form_voice_agent_shop_name 
  ON form_voice_agent(shop_name);
CREATE INDEX IF NOT EXISTS idx_form_voice_agent_created_at 
  ON form_voice_agent(created_at);

-- Update table comment with field descriptions
COMMENT ON TABLE form_voice_agent IS 'Stores complete voice agent configuration from the onboarding form including business info, operating hours, and AI settings';

-- Add column comments
COMMENT ON COLUMN form_voice_agent.owner_name IS 'Name of the business owner';
COMMENT ON COLUMN form_voice_agent.shop_name IS 'Name of the tattoo shop';
COMMENT ON COLUMN form_voice_agent.phone_number IS 'Contact phone number in format (XXX) XXX-XXXX';
COMMENT ON COLUMN form_voice_agent.operating_hours IS 'Weekly schedule with open/close times for each day';
COMMENT ON COLUMN form_voice_agent.hourly_rate IS 'Standard hourly rate for services';
COMMENT ON COLUMN form_voice_agent.assistant_name IS 'Name of the AI voice assistant';
COMMENT ON COLUMN form_voice_agent.welcome_message IS 'Initial greeting message for calls';
COMMENT ON COLUMN form_voice_agent.support_email IS 'Email address for support inquiries';