import { useState } from 'react';
import { saveSettings, loadSettings } from '../lib/supabase';
import type { FormData } from '../types';

const defaultSettings: FormData = {
  assistantName: 'My Inbound Assistant',
  voiceEngine: 'v2',
  aiModel: 'gpt4',
  timezone: 'Europe/Berlin',
  customVocab: [],
  filterWords: [],
  patienceLevel: 'medium',
  stability: 0.5,
  styleExaggeration: 0,
  similarity: 0.75,
  latencyOptimization: 0,
  pauseBeforeSpeaking: 0,
  ringDuration: 1,
  idleRemindersEnabled: false,
  idleReminderTime: 6,
  reminderMessage: "I'm still here. Do you have any questions?",
  speakerBoost: false,
  operatingHours: [
    { day: 'Monday', isOpen: true, openTime: '09:00', closeTime: '17:00' },
    { day: 'Tuesday', isOpen: true, openTime: '09:00', closeTime: '17:00' },
    { day: 'Wednesday', isOpen: true, openTime: '09:00', closeTime: '17:00' },
    { day: 'Thursday', isOpen: true, openTime: '09:00', closeTime: '17:00' },
    { day: 'Friday', isOpen: true, openTime: '09:00', closeTime: '17:00' },
    { day: 'Saturday', isOpen: true, openTime: '09:00', closeTime: '17:00' },
    { day: 'Sunday', isOpen: false, openTime: '09:00', closeTime: '17:00' }
  ],
  appointmentType: 'both',
  hourlyRate: '',
  calendarIntegration: 'google',
  supportEmail: '',
  primaryLanguage: 'en-US'
};

export function useSettings(isAuthenticated: boolean) {
  const [formData, setFormData] = useState<FormData>(defaultSettings);
  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof FormData, value: any) => {
    if (!isAuthenticated) return;
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
    setError(null);
  };

  const handleSave = async () => {
    if (!isAuthenticated) return;

    setSaving(true);
    setError(null);
    try {
      await saveSettings(formData);
      setHasChanges(false);
    } catch (error) {
      console.error('Error saving settings:', error);
      setError('Failed to save settings. Please try again later.');
    } finally {
      setSaving(false);
    }
  };

  const loadUserSettings = async () => {
    try {
      const settings = await loadSettings();
      if (settings) {
        // Ensure all required fields are present by merging with defaults
        setFormData(prev => ({ ...defaultSettings, ...settings }));
      }
    } catch (error) {
      console.error('Error loading settings:', error);
      setError('Failed to load settings. Please try again later.');
    }
  };

  return {
    formData,
    hasChanges,
    saving,
    error,
    handleChange,
    handleSave,
    loadUserSettings,
    setError
  };
}