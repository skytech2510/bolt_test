import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { AuthState } from '../types';

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: false,
    showAuthModal: false,
    authType: 'login'
  });

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const isAuthenticated = !!session;
      setAuthState(prev => ({ ...prev, user: isAuthenticated }));
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const toggleAuthModal = (show: boolean) => {
    setAuthState(prev => ({ ...prev, showAuthModal: show }));
  };

  const toggleAuthType = () => {
    setAuthState(prev => ({
      ...prev,
      authType: prev.authType === 'login' ? 'signup' : 'login'
    }));
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return {
    ...authState,
    toggleAuthModal,
    toggleAuthType,
    handleLogout
  };
}