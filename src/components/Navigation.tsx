import { motion } from 'framer-motion';
import { LogOut, LayoutDashboard, Activity, History, Settings } from 'lucide-react';
import type { NavigationSection } from '../constants/navigation';
import { NAVIGATION_ITEMS, ADDITIONAL_ITEMS } from '../constants/navigation';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: NavigationSection) => void;
  onLogout: () => void;
  onSubscribe: () => void;
}

export function Navigation({ activeSection, onSectionChange, onLogout, onSubscribe }: NavigationProps) {
  return (
    <>
      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#080809]/95 backdrop-blur-md border-t border-purple-900/10 lg:hidden z-50">
        <nav className="flex justify-around items-center py-3 px-4">
          <button
            onClick={() => onSectionChange('dashboard')}
            className={`flex flex-col items-center space-y-1 ${
              activeSection === 'dashboard' ? 'text-purple-400' : 'text-zinc-400'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </button>
          <button
            onClick={() => onSectionChange('analytics')}
            className={`flex flex-col items-center space-y-1 ${
              activeSection === 'analytics' ? 'text-purple-400' : 'text-zinc-400'
            }`}
          >
            <Activity className="w-5 h-5" />
            <span className="text-xs">Analytics</span>
          </button>
          <button
            onClick={() => onSectionChange('history')}
            className={`flex flex-col items-center space-y-1 ${
              activeSection === 'history' ? 'text-purple-400' : 'text-zinc-400'
            }`}
          >
            <History className="w-5 h-5" />
            <span className="text-xs">History</span>
          </button>
          <button
            onClick={() => onSectionChange('settings')}
            className={`flex flex-col items-center space-y-1 ${
              activeSection === 'settings' ? 'text-purple-400' : 'text-zinc-400'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span className="text-xs">Settings</span>
          </button>
        </nav>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-64 h-screen fixed left-0 top-0 pt-24 px-4 bg-[#0a0a0a]/90 backdrop-blur-md border-r border-purple-900/20"
        >
          <nav className="space-y-2">
            {NAVIGATION_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  activeSection === item.id
                    ? 'bg-purple-600 text-white'
                    : 'text-zinc-400 hover:bg-purple-600/10 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}

            {/* Additional Items */}
            {ADDITIONAL_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={onSubscribe}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all text-purple-400 hover:bg-purple-600/10 hover:text-white"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}

            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all text-zinc-400 hover:bg-purple-600/10 hover:text-zinc-300 mt-8"
            >
              <LogOut className="w-5 h-5" />
              <span>Log Out</span>
            </button>
          </nav>
        </motion.div>
      </div>
    </>
  );
}