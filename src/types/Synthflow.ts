// Interface for the agent object
export interface AgentObjectPropsType {
  prompt: string;
  llm?: 'synthflow' | 'gpt-4o' | 'gpt-turbo' | 'gpt-3.5-turbo';
  language: 'en-GB' | 'en-US' | 'de' | 'es' | 'it' | 'fr';
  greeting_message: string;
  voice_id?: string;
  voice_stability?: number; // Assuming this is a float
  voice_similarity_boost?: number; // Assuming this is a float
  voice_optimise_streaming_latency?: number; // Assuming this is a float
  voice_style?: number; // Assuming this is a float
  voice_use_speaker_boost?: boolean;
  voice_prompt?: string;
  allowed_idle_time_seconds?: number; // Integer
  initial_pause_seconds?: number; // Integer
  transcriber_keywords?: string[]; // Array of strings
  ring_pause_seconds?: number; // Integer
  patience_level?: 'low' | 'medium' | 'high'; // Assuming these are the possible values
}

// Interface for max_duration object
export interface MaxDurationPropsType {
  duration_seconds: number; // Integer
  is_enabled: boolean;
}

// Main interface for the assistant object
export interface AssistantPropsType {
  type: 'outbound' | 'inbound'; // Assuming this is always outbound
  name: string;
  description?: string;
  phone_number?: string; // Optional field
  caller_id_number?: string; // Optional field
  external_webhook_url?: string; // Optional field
  is_recording?: boolean; // Optional field
  agent: AgentObjectPropsType;
  max_duration?: MaxDurationPropsType;
  actions?: string[]; // Array of action IDs as strings
}
