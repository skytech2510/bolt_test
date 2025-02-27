import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, Wand2 } from 'lucide-react';
import { BusinessInfoStep } from './forms/BusinessInfoStep';
import { OperationalPreferencesStep } from './forms/OperationalPreferencesStep';
import { AIConfigurationStep } from './forms/AIConfigurationStep';
import { saveUserProfile, saveOptionalPreferences } from '../lib/supabase';
import type { FormData } from './forms/types';
import { createAssistant } from '../lib/synthflow';
import { AssistantPropsType } from '../types';
import { generatePrompt } from '../utils';

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
    welcomeMessage: 'Hey there! How can I assist you today?',
    specificInstructions: '',
    language: 'en-US',
    dailyCallLimit: 0,
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
    } else if (currentStep === 3) {
      if (!formData.assistantName)
        newErrors.assistantName = 'Assistant name is required';
      if (!formData.welcomeMessage)
        newErrors.welcomeMessage = 'Welcome message is required';
      if (!formData.supportEmail)
        newErrors.supportEmail = 'Support email is required';
      if (!formData.callHandling) newErrors.callHandling = 'inbound';

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (formData.supportEmail && !emailRegex.test(formData.supportEmail)) {
        newErrors.supportEmail = 'Please enter a valid email address';
      }
    }
    console.log(newErrors);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(step)) {
      try {
        // First save the form data
        await onSubmit(formData);

        // Save optional preferences
        await saveOptionalPreferences({
          appointment_type: formData.appointmentType || 'walkins',
          operating_hours: formData.operatingHours,
          piercing_service: formData.piercingServices,
          hourly_rate: parseFloat(formData.hourlyRate),
          specific_instructions: formData.specificInstructions,
        });

        // Then update the profile with both assistant name and welcome message
        let assistant: AssistantPropsType = {
          type: formData.callHandling,
          name: formData.assistantName,
          phone_number: formData.phoneNumber,
          agent: {
            llm: 'synthflow',
            language: formData.language,
            greeting_message: formData.welcomeMessage,
            voice_id: 'SAz9YHcvj6GT2YYXdXww',
            prompt: generatePrompt(
              formData.operatingHours,
              formData.hourlyRate,
              formData.specificInstructions
            ),
          },
        };
        try {
          const model_id: string = await createAssistant(assistant);
          await saveUserProfile({
            ownerName: formData.ownerName,
            shopName: formData.shopName,
            timezone: formData.timezone,
            assistantName: formData.assistantName,
            welcomeMessage: formData.welcomeMessage,
            completedOnboarding: true,
            model_id: model_id,
            website: formData.website,
            phoneNumber: formData.phoneNumber,
            supportEmail: formData.supportEmail,
            dailycallLimit: formData.dailyCallLimit,
            voicemail_management: formData.voicemailManagement,
            automaticReminders: formData.automaticReminders,
            waitlistManagement: formData.waitlistManagement,
          });
        } catch (err) {
          console.error('Error network Error', err);
        }
      } catch (err) {
        console.error('Error saving form data:', err);
        setErrors('Failed to save form data. Please try again.');
      }
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
            {step === 1
              ? 'Business Information'
              : step === 2
              ? 'Operational Preferences'
              : 'AI Assistant Configuration'}
          </h2>
          <p className="text-zinc-400">
            {step === 1
              ? 'Tell us about your tattoo shop and how we can reach you.'
              : step === 2
              ? 'Set your working hours and service preferences.'
              : "Customize your AI assistant's personality, communication style, and capabilities."}
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 ? (
            <BusinessInfoStep
              formData={formData}
              errors={errors}
              setFormData={setFormData}
            />
          ) : step === 2 ? (
            <OperationalPreferencesStep
              formData={formData}
              errors={errors}
              setFormData={setFormData}
            />
          ) : (
            <AIConfigurationStep
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
              type={step === 3 ? 'submit' : 'button'}
              onClick={step === 3 ? undefined : handleNext}
              className="flex items-center px-6 py-2 bg-purple-600 rounded-lg hover:bg-purple-500 transition-all ml-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {step === 3 ? 'Submit' : 'Next'}
              {step < 3 && <ChevronRight className="w-4 h-4 ml-2" />}
            </motion.button>
          </div>
        </form>

        {step < 3 && (
          <button className="mt-4 w-full flex items-center justify-center px-4 py-3 rounded-lg border border-purple-600/30 text-purple-400 hover:bg-purple-600/5 transition-all">
            <Wand2 className="w-4 h-4 mr-2" />
            Quick Setup with AI
          </button>
        )}
      </div>
    </motion.div>
  );
}
