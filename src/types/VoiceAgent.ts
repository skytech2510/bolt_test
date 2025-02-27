export type VoiceAgentStatus = 'active' | 'inactive' | 'training';
export type VoicePreference = 'gender-neutral' | 'female' | 'male';

export interface VoiceAgent {
  id: string;
  user_id: string;
  name: string;
  status: VoiceAgentStatus;
  
  // Voice settings
  voice_preference: VoicePreference;
  voice_engine: string;
  stability: number;
  style_exaggeration: number;
  similarity: number;
  latency_optimization: number;
  
  // Communication settings
  welcome_message: string;
  specific_instructions?: string;
  communication_tone: string;
  enhanced_emotional_intelligence: boolean;
  language: string;
  
  // Call settings
  daily_call_limit?: number;
  call_handling: string;
  voicemail_management: boolean;
  automatic_reminders: boolean;
  waitlist_management: boolean;
  
  // Performance metrics
  total_calls: number;
  successful_calls: number;
  average_call_duration?: string;
  last_active_at?: string;
  level: number;
  
  // Metadata
  created_at: string;
  updated_at: string;
}