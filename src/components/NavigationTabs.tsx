import React from 'react';
import { Settings, Mic, Volume2, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

interface Tab {
  id: string;
  icon: React.ElementType;
  label: string;
  description: string;
}

interface NavigationTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const tabs: Tab[] = [
  { 
    id: 'general', 
    icon: Settings, 
    label: 'General', 
    description: 'Basic settings and preferences'
  },
  { 
    id: 'voice', 
    icon: Mic, 
    label: 'Voice', 
    description: 'Voice characteristics and behavior'
  },
  { 
    id: 'calls', 
    icon: Volume2, 
    label: 'Calls', 
    description: 'Call handling and responses'
  }
];

export function NavigationTabs({ activeTab, onTabChange }: NavigationTabsProps) {
  return (
    <div className="mb-8">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold mb-4 text-center"
      >
        Agent Configuration
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-zinc-400 text-center mb-6"
      >
        Customize your voice agent's behavior and personality
      </motion.p>

      <nav className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-2">
        {tabs.map((tab, index) => (
          <motion.button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center px-6 py-3 rounded-xl transition-all ${
              activeTab === tab.id 
                ? 'bg-[#904AF2] text-white shadow-lg shadow-[#904AF2]/20' 
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50 backdrop-blur-sm'
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <tab.icon className="w-5 h-5 mr-3" />
            <div className="text-left">
              <div className="font-medium">{tab.label}</div>
              <div className="text-xs opacity-70">{tab.description}</div>
            </div>
          </motion.button>
        ))}
      </nav>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 p-4 bg-zinc-900/30 backdrop-blur-sm rounded-lg border border-zinc-800/50"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Activity className="w-5 h-5 text-[#904AF2]" />
            <div>
              <div className="font-medium">Agent Status</div>
              <div className="text-sm text-zinc-400">Active - Ready to take calls</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-500">Online</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}