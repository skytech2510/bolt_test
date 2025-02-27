import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import type { FormStepProps } from './types';
import { ErrorMessage } from './ErrorMessage';

export function AIConfigurationStep({
  formData,
  errors,
  setFormData,
}: FormStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      {/* General Configuration */}
      <div>
        <h3 className="text-lg font-medium mb-4">General Configuration</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              AI Assistant Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.assistantName}
              onChange={(e) =>
                setFormData({ ...formData, assistantName: e.target.value })
              }
              className="w-full bg-black/30 border border-zinc-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter assistant name"
            />
            <ErrorMessage message={errors.assistantName} />
          </div>
          {/* 
          <div>
            <label className="block text-sm font-medium mb-2">
              Voice Preference <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['gender-neutral', 'female', 'male'].map((voice) => (
                <motion.button
                  key={voice}
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      voicePreference: voice as
                        | 'gender-neutral'
                        | 'female'
                        | 'male',
                    })
                  }
                  className={`p-4 rounded-lg border transition-all ${
                    formData.voicePreference === voice
                      ? 'border-purple-600 bg-purple-600/10'
                      : 'border-zinc-800 hover:border-purple-600/50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Mic className="w-5 h-5 mb-2 mx-auto" />
                  <span className="text-sm capitalize">
                    {voice.replace('-', ' ')}
                  </span>
                </motion.button>
              ))}
            </div>
          </div> */}
        </div>
      </div>

      {/* Communication Settings */}
      <div>
        <h3 className="text-lg font-medium mb-4">Communication Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Welcome Message <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.welcomeMessage}
              onChange={(e) =>
                setFormData({ ...formData, welcomeMessage: e.target.value })
              }
              className="w-full bg-black/30 border border-zinc-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 min-h-[100px]"
              placeholder="Enter welcome message"
            />
            <ErrorMessage message={errors.welcomeMessage} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Specific Instructions
            </label>
            <textarea
              value={formData.specificInstructions}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  specificInstructions: e.target.value,
                })
              }
              className="w-full bg-black/30 border border-zinc-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 min-h-[100px]"
              placeholder="Add any specific instructions..."
            />
          </div>

          {/* <div>
            <label className="block text-sm font-medium mb-2">
              Communication Tone
            </label>
            <div className="grid grid-cols-2 gap-3">
              {['professional', 'friendly', 'casual', 'formal'].map((tone) => (
                <motion.button
                  key={tone}
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, communicationTone: tone })
                  }
                  className={`p-4 rounded-lg border transition-all ${
                    formData.communicationTone === tone
                      ? 'border-purple-600 bg-purple-600/10'
                      : 'border-zinc-800 hover:border-purple-600/50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-sm capitalize">{tone}</span>
                </motion.button>
              ))}
            </div>
          </div> */}

          {/* <div className="flex items-center">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.enhancedEmotionalIntelligence}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    enhancedEmotionalIntelligence: e.target.checked,
                  })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              <span className="ml-3 text-sm font-medium">
                Enhanced Emotional Intelligence
              </span>
            </label>
          </div> */}
        </div>
      </div>

      {/* Language & Integration */}
      <div>
        <h3 className="text-lg font-medium mb-4">Language</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Language Settings
            </label>
            <select
              value={formData.language}
              onChange={(e) =>
                setFormData({ ...formData, language: e.target.value })
              }
              className="w-full bg-black/30 border border-zinc-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <option value="en-US">English (United States)</option>
              <option value="en-GB">English (Great Britain)</option>
              <option value="fr-FR">Français (France)</option>
              <option value="it-IT">Italiano (Italian)</option>
              <option value="es-ES">Español (Spain)</option>
            </select>
          </div>

          {/* <div>
            <label className="block text-sm font-medium mb-2">
              Calendar Integration
            </label>
            <select
              value={formData.calendarIntegration}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  calendarIntegration: e.target.value,
                })
              }
              className="w-full bg-black/30 border border-zinc-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <option value="google">Google Calendar</option>
              <option value="apple">Apple Calendar</option>
              <option value="microsoft">Microsoft 365</option>
              <option value="calendly">Calendly</option>
              <option value="other">Other</option>
            </select>
          </div> */}
        </div>
      </div>

      {/* Call Management */}
      <div>
        <h3 className="text-lg font-medium mb-4">Call Management</h3>
        <div className="space-y-4">
          {/* <div>
            <label className="block text-sm font-medium mb-2">
              Call Handling <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: 'inbound', label: 'Accept Inbound Calls' },
                { value: 'outbound', label: 'Make Outbound Calls' },
              ].map((option) => (
                <motion.button
                  key={option.value}
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      callHandling: option.value as 'inbound' | 'outbound',
                    })
                  }
                  className={`p-4 rounded-lg border transition-all ${
                    formData.callHandling === option.value
                      ? 'border-purple-600 bg-purple-600/10'
                      : 'border-zinc-800 hover:border-purple-600/50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Phone className="w-5 h-5 mb-2 mx-auto" />
                  <span className="text-sm">{option.label}</span>
                </motion.button>
              ))}
            </div>
            <ErrorMessage message={errors.callHandling} />
          </div> */}

          <div>
            <label className="block text-sm font-medium mb-2">
              Daily Call Limit
            </label>
            <input
              type="number"
              value={formData.dailyCallLimit}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  dailyCallLimit: parseInt(e.target.value),
                })
              }
              className="w-full bg-black/30 border border-zinc-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="e.g., 50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Support Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="email"
                value={formData.supportEmail}
                onChange={(e) =>
                  setFormData({ ...formData, supportEmail: e.target.value })
                }
                className="w-full bg-black/30 border border-zinc-800 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="support@your-domain.com"
              />
            </div>
            <ErrorMessage message={errors.supportEmail} />
          </div>

          <div className="space-y-2">
            {[
              { key: 'voicemailManagement', label: 'Voicemail Management' },
              { key: 'automaticReminders', label: 'Automatic Reminders' },
              { key: 'waitlistManagement', label: 'Waitlist Management' },
            ].map((feature) => (
              <motion.div
                key={feature.key}
                className="flex items-center p-3 rounded-lg border border-zinc-800 hover:border-purple-600/50 transition-all"
                whileHover={{ scale: 1.01 }}
              >
                <label className="relative inline-flex items-center cursor-pointer flex-1">
                  <input
                    type="checkbox"
                    checked={formData[feature.key as keyof FormData] as boolean}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [feature.key]: e.target.checked,
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  <span className="ml-3 text-sm font-medium">
                    {feature.label}
                  </span>
                </label>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
