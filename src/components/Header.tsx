import React from 'react';
import { Save, Loader, Bell, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import { ElegantButton } from './buttons/ButtonEffects';
interface HeaderProps {
  hasChanges: boolean;
  onSave: () => void;
  onOpenAuth: () => void;
  user: boolean;
  saving: boolean;
  onToggleMobileMenu: () => void;
  setAuthType: React.Dispatch<React.SetStateAction<'login' | 'signup'>>;
  isMobileMenuOpen: boolean;
  activeSection: string;
  onSectionChange: (section: string) => void;
  userProfile: { ownerName?: string; shopName?: string } | null;
}

export function Header({
  hasChanges,
  onSave,
  onOpenAuth,
  user,
  saving,
  onToggleMobileMenu,
  isMobileMenuOpen,
  activeSection,
  onSectionChange,
  userProfile,
  setAuthType,
}: HeaderProps) {
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const getInitials = (name?: string) => {
    if (!name) return '';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-md z-50 border-b border-gray-800">
      <header className="max-w-7xl mx-auto px-2 sm:px-4 py-2 sm:py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Bot className="w-5 h-5 sm:w-8 sm:h-8 text-[#904af2]" />
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-base sm:text-xl font-medium tracking-tight text-white"
          >
            {userProfile?.shopName || 'studiobots'}
          </motion.h1>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-4">
          {user && (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-1 sm:p-2 text-zinc-500 hover:text-zinc-300 transition-colors relative"
              >
                <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="absolute top-0.5 right-0.5 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-purple-500/80 rounded-full"></span>
              </motion.button>

              {/* Mobile Logout Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="lg:hidden flex items-center text-zinc-400 hover:text-white transition-colors p-1 sm:p-2"
              >
                <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </motion.button>
            </>
          )}

          {hasChanges && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onSave}
              disabled={saving}
              className="hidden sm:flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-purple-600/90 rounded-lg hover:bg-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
            >
              {saving ? (
                <>
                  <Loader className="w-3.5 h-3.5 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5 mr-2" />
                  Save Changes
                </>
              )}
            </motion.button>
          )}

          {user ? (
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-purple-600/10 border border-purple-600/20 flex items-center justify-center cursor-pointer text-zinc-300 hover:text-white transition-colors"
            >
              <span className="text-xs sm:text-sm font-medium">
                {getInitials(userProfile?.ownerName)}
              </span>
            </motion.div>
          ) : (
            <>
              <div className="hidden sm:flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-300">Available</span>
              </div>
              <ElegantButton
                onClick={() => {
                  setAuthType('login');
                  onOpenAuth();
                }}
                className="text-xs px-2 py-1 sm:text-sm sm:px-4 sm:py-2"
              >
                Log In
              </ElegantButton>
              <ElegantButton
                onClick={() => {
                  setAuthType('signup');
                  onOpenAuth();
                }}
                className="text-xs px-2 py-1 sm:text-sm sm:px-4 sm:py-2 bg-transparent border border-[#904af2] hover:bg-[#904af2]/10"
              >
                Create
              </ElegantButton>
            </>
          )}
        </div>
      </header>
    </div>
  );
}
