import { createClient } from '@supabase/supabase-js';
// import type { FormData } from '../types/FormData';
import type { VoiceAgent } from '../types/VoiceAgent';
import type { UserProfile } from '../types/UserProfile';
import type {
  OptionalPreferenceType,
  OptionalPreferenceInput,
} from '../types/OptionalPreference';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create Supabase client with enhanced session handling
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storage: window.localStorage,
    storageKey: 'supabase.auth.token',
    flowType: 'implicit',
  },
});
export const getSession = async () => {
  // Only check session if enough time has passed since last check
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // If no session but we have a refresh token, try to refresh
    if (!session && localStorage.getItem('supabase.auth.refreshToken')) {
      await supabase.auth.refreshSession();
      const {
        data: { session: refreshedSession },
      } = await supabase.auth.getSession();
      return refreshedSession;
    }

    return session;
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
  // Return cached session data
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
};

// Optional Preferences functions
export async function saveOptionalPreferences(
  preferences: Omit<OptionalPreferenceInput, 'user_id'>
): Promise<OptionalPreferenceType> {
  const session = await getSession();
  if (!session?.user) throw new Error('Please log in to save preferences.');

  const { data, error } = await supabase
    .from('optional_preferences')
    .upsert({
      user_id: session.user.id,
      ...preferences,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getOptionalPreferences(): Promise<OptionalPreferenceType | null> {
  const session = await getSession();
  if (!session?.user) return null;

  const { data, error } = await supabase
    .from('optional_preferences')
    .select('*')
    .eq('user_id', session.user.id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }

  return data;
}

export async function updateOptionalPreferences(
  updates: Partial<OptionalPreferenceInput>
): Promise<OptionalPreferenceType> {
  const session = await getSession();
  if (!session?.user) throw new Error('Please log in to update preferences.');

  const { data, error } = await supabase
    .from('optional_preferences')
    .update(updates)
    .eq('user_id', session.user.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteOptionalPreferences(): Promise<void> {
  const session = await getSession();
  if (!session?.user) throw new Error('Please log in to delete preferences.');

  const { error } = await supabase
    .from('optional_preferences')
    .delete()
    .eq('user_id', session.user.id);

  if (error) throw error;
}

// Profile functions
export async function saveUserProfile(
  profile: Partial<UserProfile> & {
    assistantName?: string;
    welcomeMessage?: string;
  }
) {
  const session = await getSession();
  if (!session?.user) throw new Error('Please log in to save your profile.');

  const { error } = await supabase.from('profiles').upsert(
    {
      user_id: session.user.id,
      owner_name: profile.ownerName,
      shop_name: profile.shopName,
      timezone: profile.timezone,
      assistant_name: profile.assistantName,
      welcome_message: profile.welcomeMessage,
      completed_onboarding: profile.completedOnboarding ?? true,
      model_id: profile.model_id,
      support_email: profile.supportEmail,
      daily_call_limit: profile.dailycallLimit,
      voicemail_management: profile.voicemail_management,
      automatic_reminders: profile.automaticReminders,
      waitlist_management: profile.waitlistManagement,
    },
    {
      onConflict: 'user_id',
    }
  );

  if (error) throw error;
}

export async function loadUserProfile(): Promise<UserProfile | null> {
  const session = await getSession();
  if (!session?.user) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', session.user.id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }

  return {
    ownerName: data.owner_name,
    shopName: data.shop_name,
    timezone: data.timezone,
    assistantName: data.assistant_name,
    welcomeMessage: data.welcome_message,
    completedOnboarding: data.completed_onboarding,
    model_id: data.model_id,
    supportEmail: data.support_email,
  };
}

export async function hasCompletedOnboarding(): Promise<boolean> {
  const profile = await loadUserProfile();
  return profile?.completedOnboarding ?? false;
}

// Voice agent functions
export async function getFormVoiceAgentData(email: string) {
  const session = await getSession();
  if (!session?.user) throw new Error('Please log in to access form data.');

  const { data, error } = await supabase
    .from('form_voice_agent')
    .select('*')
    .eq('email', email)
    .single();

  if (error) throw error;
  return data;
}

export async function createVoiceAgent(
  agent: Omit<VoiceAgent, 'id' | 'user_id' | 'created_at' | 'updated_at'>
) {
  const session = await getSession();
  if (!session?.user) throw new Error('Please log in to create a voice agent.');

  const { data, error } = await supabase
    .from('voice_agents')
    .insert([
      {
        ...agent,
        user_id: session.user.id,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateVoiceAgent(
  id: string,
  updates: Partial<VoiceAgent>
) {
  const session = await getSession();
  if (!session?.user)
    throw new Error('Please log in to update the voice agent.');

  const { data, error } = await supabase
    .from('voice_agents')
    .update(updates)
    .eq('id', id)
    .eq('user_id', session.user.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function loadVoiceAgents() {
  console.log('second');
  const session = await getSession();
  if (!session?.user) return [];

  const { data, error } = await supabase
    .from('voice_agents')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function deleteVoiceAgent(id: string) {
  const session = await getSession();
  if (!session?.user)
    throw new Error('Please log in to delete the voice agent.');

  const { error } = await supabase
    .from('voice_agents')
    .delete()
    .eq('id', id)
    .eq('user_id', session.user.id);

  if (error) throw error;
}
