export interface UserProfile {
  ownerName: string;
  shopName: string;
  timezone: string;
  assistantName?: string;
  welcomeMessage?: string;
  completedOnboarding: boolean;
  model_id?: string;
  website?: string;
  phoneNumber: string;
  supportEmail: string;
  dailycallLimit: number;
  voicemail_management: boolean;
  automaticReminders: boolean;
  waitlistManagement: boolean;
}
