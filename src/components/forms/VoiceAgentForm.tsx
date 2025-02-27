import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Mic, Clock, AlertCircle } from 'lucide-react';

interface FormData {
  name: string;
  voice: string;
  language: string;
  welcomeMessage: string;
  workingHours: {
    start: string;
    end: string;
  };
  responseTime: number;
}

interface FormErrors {
  [key: string]: string;
}

interface VoiceAgentFormProps {
  onSubmit: (data: FormData) => void;
}

const tabs = [
  { id: 'basic', label: 'Basic Settings', icon: Settings },
  { id: 'voice', label: 'Voice Settings', icon: Mic },
  { id: 'schedule', label: 'Schedule', icon: Clock }
];

export function VoiceAgentForm({ onSubmit }: VoiceAgentFormProps) {
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    voice: 'natural',
    language: 'en-US',
    welcomeMessage: 'Hello! How can I assist you today?',
    workingHours: {
      start: '09:00',
      end: '17:00'
    },
    responseTime: 3
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    if (!formData.welcomeMessage) {
      newErrors.welcomeMessage = 'Welcome message is required';
    }
    if (!formData.workingHours.start || !formData.workingHours.end) {
      newErrors.workingHours = 'Working hours are required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const renderBasicSettings = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">
          Agent Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className="w-full bg-black/30 border border-zinc-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
          placeholder="Enter agent name"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Welcome Message <span className="text-red-500">*</span>
        </label>
        <textarea
          value={formData.welcomeMessage}
          onChange={(e) => handleChange('welcomeMessage', e.target.value)}
          className="w-full bg-black/30 border border-zinc-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 min-h-[100px]"
          placeholder="Enter welcome message"
        />
        {errors.welcomeMessage && (
          <p className="text-red-500 text-sm mt-1 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.welcomeMessage}
          </p>
        )}
      </div>
    </div>
  );

  const renderVoiceSettings = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Voice Type</label>
        <div className="grid grid-cols-2 gap-4">
          {['natural', 'synthetic'].map((type) => (
            <motion.button
              key={type}
              type="button"
              onClick={() => handleChange('voice', type)}
              className={`p-4 rounded-lg border transition-all ${
                formData.voice === type
                  ? 'border-purple-600 bg-purple-600/10'
                  : 'border-zinc-800 hover:border-purple-600/50'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Mic className="w-5 h-5 mb-2 mx-auto" />
              <span className="text-sm capitalize">{type}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Language</label>
        <select
          value={formData.language}
          onChange={(e) => handleChange('language', e.target.value)}
          className="w-full bg-black/30 border border-zinc-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
        >
          <option value="en-US">English (US)</option>
          <option value="en-GB">English (UK)</option>
          <option value="es-ES">Spanish</option>
          <option value="fr-FR">French</option>
        </select>
      </div>
    </div>
  );

  const renderScheduleSettings = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">
          Working Hours <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-zinc-400 mb-1">Start Time</label>
            <input
              type="time"
              value={formData.workingHours.start}
              onChange={(e) => handleChange('workingHours', { ...formData.workingHours, start: e.target.value })}
              className="w-full bg-black/30 border border-zinc-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <div>
            <label className="block text-xs text-zinc-400 mb-1">End Time</label>
            <input
              type="time"
              value={formData.workingHours.end}
              onChange={(e) => handleChange('workingHours', { ...formData.workingHours, end: e.target.value })}
              className="w-full bg-black/30 border border-zinc-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
        </div>
        {errors.workingHours && (
          <p className="text-red-500 text-sm mt-1 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.workingHours}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Response Time (seconds)</label>
        <input
          type="range"
          min="1"
          max="10"
          value={formData.responseTime}
          onChange={(e) => handleChange('responseTime', parseInt(e.target.value))}
          className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-600"
        />
        <div className="text-right text-sm mt-1">{formData.responseTime}s</div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="glass-panel p-8 rounded-xl">
        <div className="flex justify-center mb-8">
          <nav className="flex space-x-2">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </motion.button>
            ))}
          </nav>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'basic' && renderBasicSettings()}
              {activeTab === 'voice' && renderVoiceSettings()}
              {activeTab === 'schedule' && renderScheduleSettings()}
            </motion.div>
          </AnimatePresence>

          <motion.button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-500 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Create Voice Agent
          </motion.button>
        </form>
      </div>
    </div>
  );
}