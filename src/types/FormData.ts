export interface OperatingHours {
  day: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}

export interface FormData {
  assistantName: string;
  voiceEngine?: 'v1' | 'v2';
  aiModel?: string;
  timezone?: string;
  customVocab?: string[];
  filterWords?: string[];
  patienceLevel?: 'low' | 'medium' | 'high';
  stability?: number;
  styleExaggeration?: number;
  similarity?: number;
  voice_id: string;
  latencyOptimization?: number;
  pauseBeforeSpeaking?: number;
  ringDuration?: number;
  idleRemindersEnabled?: boolean;
  idleReminderTime?: number;
  reminderMessage?: string;
  speakerBoost?: boolean;
  // Business settings
  operatingHours: OperatingHours[];
  appointmentType?: 'appointments' | 'walkins' | 'both';
  hourlyRate: string;
  // Calendar integration
  calendarIntegration?: 'google' | 'outlook' | 'apple';
  // Support
  supportEmail?: string;
  // Language
  primaryLanguage: 'en-GB' | 'en-US' | 'de' | 'es' | 'it' | 'fr';
  // Messages
  welcomeMessage: string;
  specificInstructions: string;
  piercingServices: boolean;
}
