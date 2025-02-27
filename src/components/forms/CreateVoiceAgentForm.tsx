import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, Wand2 } from 'lucide-react';
import { BusinessInfoStep } from './BusinessInfoStep';
import { OperationalPreferencesStep } from './OperationalPreferencesStep';
import type { FormData } from './types';

interface CreateVoiceAgentFormProps {
  onSubmit: (data: FormData) => void;
}

export function CreateVoiceAgentForm({ onSubmit }: CreateVoiceAgentFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    // Business Info
    ownerName: '',
    shopName: '',
    website: '',
    phoneNumber: '',
    socialMedia: [],
    appointmentType: 'both',
    operatingHours: [
      { day: 'Monday', isOpen: true, openTime: '09:00', closeTime: '17:00' },
      { day: 'Tuesday', isOpen: true, openTime: '09:00', closeTime: '17:00' },
      { day: 'Wednesday', isOpen: true, openTime: '09:00', closeTime: '17:00' },
      { day: 'Thursday', isOpen: true, openTime: '09:00', closeTime: '17:00' },
      { day: 'Friday', isOpen: true, openTime: '09:00', closeTime: '17:00' },
      { day: 'Saturday', isOpen: true, openTime: '09:00', closeTime: '17:00' },
      { day: 'Sunday', isOpen: false, openTime: '09:00', closeTime: '17:00' },
    ],
    piercingServices: false,
    hourlyRate: '',
    timezone: '', // Added missing field
    // AI Configuration
    assistantName: '',
    voicePreference: 'gender-neutral',
    welcomeMessage: 'Hey there! How can I assist you today?',
    specificInstructions: '',
    language: 'en-US', // Default language
    dailyCallLimit: 0, // Default to 0
    callHandling: 'inbound',
    voicemailManagement: false,
    automaticReminders: false,
    waitlistManagement: false,
    supportEmail: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateStep = (currentStep: number) => {
    const newErrors: Partial<FormData> = {};

    if (currentStep === 1) {
      if (!formData.ownerName) newErrors.ownerName = 'Owner name is required';
      if (!formData.shopName) newErrors.shopName = 'Shop name is required';
      if (!formData.phoneNumber)
        newErrors.phoneNumber = 'Phone number is required';

      const phoneRegex = /^\d{10}$/;
      if (
        formData.phoneNumber &&
        !phoneRegex.test(formData.phoneNumber.replace(/\D/g, ''))
      ) {
        newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
      }

      if (formData.website && !/^https?:\/\/.+\..+/.test(formData.website)) {
        newErrors.website =
          'Please enter a valid website URL starting with http:// or https://';
      }
    } else if (currentStep === 2) {
      if (!formData.hourlyRate)
        newErrors.hourlyRate = 'Hourly rate is required';
      const hourlyRateNum = parseFloat(formData.hourlyRate);
      if (isNaN(hourlyRateNum) || hourlyRateNum <= 0) {
        newErrors.hourlyRate = 'Please enter a valid hourly rate';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(step)) {
      onSubmit(formData);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-3xl mx-auto"
    >
      <div className="glass-panel p-8 rounded-xl">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-bold mb-2">
            {step === 1 ? 'Business Information' : 'Operational Preferences'}
          </h2>
          <p className="text-zinc-400">
            {step === 1
              ? 'Tell us about your tattoo shop and how we can reach you.'
              : 'Set your working hours and service preferences.'}
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 ? (
            <BusinessInfoStep
              formData={formData}
              errors={errors}
              setFormData={setFormData}
            />
          ) : (
            <OperationalPreferencesStep
              formData={formData}
              errors={errors}
              setFormData={setFormData}
            />
          )}

          <div className="flex justify-between pt-6">
            {step > 1 && (
              <motion.button
                type="button"
                onClick={handleBack}
                className="flex items-center px-6 py-2 text-zinc-400 hover:text-white transition-colors"
                whileHover={{ x: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </motion.button>
            )}

            <motion.button
              type={step === 2 ? 'submit' : 'button'}
              onClick={step === 1 ? handleNext : undefined}
              className="flex items-center px-6 py-2 bg-purple-600 rounded-lg hover:bg-purple-500 transition-all ml-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {step === 2 ? 'Submit' : 'Next'}
              {step === 1 && <ChevronRight className="w-4 h-4 ml-2" />}
            </motion.button>
          </div>
        </form>

        {step < 2 && (
          <button className="mt-4 w-full flex items-center justify-center px-4 py-3 rounded-lg border border-purple-600/30 text-purple-400 hover:bg-purple-600/5 transition-all">
            <Wand2 className="w-4 h-4 mr-2" />
            Quick Setup with AI
          </button>
        )}
      </div>
    </motion.div>
  );
}
