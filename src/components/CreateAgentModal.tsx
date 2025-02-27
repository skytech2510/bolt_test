import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Mic, Wand2 } from 'lucide-react';

interface CreateAgentModalProps {
  onClose: () => void;
  onCreate: (data: any) => void;
}

export function CreateAgentModal({ onClose, onCreate }: CreateAgentModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    voice: 'natural',
    personality: 'professional',
    language: 'en-US'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#0c0d0e] rounded-xl p-6 w-full max-w-md mx-4 relative border border-purple-900/20"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-zinc-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Create Voice Agent</h2>
          <div className="flex space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full ${
                  i <= step ? 'bg-purple-600' : 'bg-zinc-800'
                }`}
              ></div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium mb-2">Agent Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-field w-full"
                    placeholder="Enter agent name..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Voice Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['natural', 'synthetic'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData({ ...formData, voice: type })}
                        className={`p-4 rounded-lg border transition-all flex flex-col items-center ${
                          formData.voice === type
                            ? 'border-purple-600 bg-purple-600/10'
                            : 'border-zinc-800 hover:border-purple-600/50'
                        }`}
                      >
                        <Mic className="w-5 h-5 mb-2" />
                        <span className="text-sm capitalize">{type}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium mb-2">Personality</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['professional', 'friendly', 'casual', 'formal'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData({ ...formData, personality: type })}
                        className={`p-4 rounded-lg border transition-all ${
                          formData.personality === type
                            ? 'border-purple-600 bg-purple-600/10'
                            : 'border-zinc-800 hover:border-purple-600/50'
                        }`}
                      >
                        <span className="text-sm capitalize">{type}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium mb-2">Language & Region</label>
                  <select
                    value={formData.language}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                    className="input-field w-full"
                  >
                    <option value="en-US">English (US)</option>
                    <option value="en-GB">English (UK)</option>
                    <option value="es-ES">Spanish (Spain)</option>
                    <option value="fr-FR">French (France)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary flex items-center justify-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Agent
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between pt-4">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="btn-ghost"
              >
                Back
              </button>
            )}
            {step < 3 && (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="btn-primary ml-auto"
              >
                Next
              </button>
            )}
          </div>
        </form>

        {step < 3 && (
          <button
            className="mt-4 w-full flex items-center justify-center px-4 py-3 rounded-lg border border-purple-600/30 text-purple-400 hover:bg-purple-600/5 transition-all"
          >
            <Wand2 className="w-4 h-4 mr-2" />
            Quick Setup with AI
          </button>
        )}
      </motion.div>
    </motion.div>
  );
}