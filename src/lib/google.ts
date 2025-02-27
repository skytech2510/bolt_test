import { supabase } from './supabase';

export async function signInWithGoogle() {
  try {
    console.log('Initiating Google sign in...');
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent'
        }
      }
    });

    if (error) {
      console.error('Google sign in error:', error);
      throw error;
    }

    console.log('Sign in initiated:', data);
    return data;
  } catch (error) {
    console.error('Error initiating Google sign in:', error);
    throw error;
  }
}