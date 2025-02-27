import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { GeneralSettings } from './components/settings/GeneralSettings';
import { VoiceSettings } from './components/settings/VoiceSettings';
import { CallSettings } from './components/settings/CallSettings';
import { AuthModal } from './components/auth/AuthModal';
import { MouseTrail } from './components/MouseTrail';
import {
  supabase,
  loadUserProfile,
  hasCompletedOnboarding,
  getOptionalPreferences,
  saveUserProfile,
  updateOptionalPreferences,
} from './lib/supabase';
import type { FormData } from './types/FormData';
import type { UserProfile } from './types/UserProfile';
import { NavigationTabs } from './components/NavigationTabs';
import { AnalyticsSection } from './components/analytics/AnalyticsSection';
import { CallHistory } from './components/history/CallHistory';
import { HelpCenter } from './components/help/HelpCenter';
import { Dashboard } from './components/Dashboard';
import { CreateVoiceAgentForm } from './components/CreateVoiceAgentForm';
import { Hero } from './components/Hero';
import { Assistant } from './components/Assistant';
import { DynamicStats } from './components/DynamicStats';
import { AboutUs } from './components/AboutUs';
import { VoiceAgents } from './components/VoiceAgents';
import { ROICalculator } from './components/ROICalculator';
import { FAQ } from './components/FAQ';
import { PricingPlans } from './components/PricingPlans';
import { getAssistant, updateAssistant } from './lib/synthflow';
import { AssistantPropsType } from './types/Synthflow';
import { generatePrompt } from './utils';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [activeTab, setActiveTab] = useState('general');
  const [hasChanges, setHasChanges] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authType, setAuthType] = useState<'login' | 'signup'>('login');
  const [user, setUser] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showVoiceAgentForm, setShowVoiceAgentForm] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showPricingPlans, setShowPricingPlans] = useState(false);
  const [, setOnboardingCompleted] = useState<boolean | null>(null);

  const [formData, setFormData] = useState<FormData>({
    assistantName: userProfile?.assistantName || 'My Voice Assistant',
    voiceEngine: 'v2',
    aiModel: 'gpt4',
    voice_id: '',
    timezone: userProfile?.timezone || 'UTC',
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
    operatingHours: [],
    appointmentType: 'appointments',
    hourlyRate: '',
    supportEmail: '',
    primaryLanguage: 'en-US',
    welcomeMessage: '',
    specificInstructions: '',
    piercingServices: false,
  });

  const scrollToWidget = () => {
    const widgetSection = document.getElementById('widget-section');
    if (widgetSection) {
      widgetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(event);
      const isAuthenticated = !!session;
      setUser(isAuthenticated);
      setError(null);
      setTimeout(async () => {
        if (isAuthenticated) {
          try {
            const profile = await loadUserProfile();
            setUserProfile(profile);

            if (profile) {
              setFormData((prev) => ({
                ...prev,
                assistantName: profile.assistantName || prev.assistantName,
                timezone: profile.timezone || prev.timezone,
              }));
            }
            const completed = await hasCompletedOnboarding();
            setOnboardingCompleted(completed);
            setShowVoiceAgentForm(!completed);
          } catch (error) {
            console.error('Error loading user data:', error);
            setError('Failed to load user data. Please try again later.');
          }
        } else {
          setUserProfile(null);
          setOnboardingCompleted(null);
          setShowVoiceAgentForm(false);
          setFormData((prev) => ({
            ...prev,
            assistantName: 'My Voice Assistant',
            voiceEngine: 'v2',
            aiModel: 'gpt4',
            timezone: 'UTC',
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
          }));
          setHasChanges(false);
        }
      });
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSetSetting = async () => {
    if (userProfile?.model_id) {
      const optional_preference = await getOptionalPreferences();
      const assistant = await getAssistant(userProfile.model_id);
      if (assistant && assistant.agent) {
        setFormData((prev) => ({
          ...prev,
          assistantName: userProfile.assistantName || prev.assistantName,
          welcomeMessage: userProfile.welcomeMessage || prev.welcomeMessage,
          supportEmail: userProfile.supportEmail || prev.supportEmail,
          appointmentType:
            optional_preference?.appointment_type || prev.appointmentType,
          hourlyRate:
            optional_preference?.hourly_rate?.toString() || prev.hourlyRate,
          specificInstructions:
            optional_preference?.specific_instructions ||
            prev.specificInstructions,
          patienceLevel: assistant.agent.patience_level || prev.patienceLevel,
          stability: assistant.agent.voice_stability || prev.stability,
          similarity:
            assistant.agent.voice_optimise_streaming_latency || prev.similarity,
          ringDuration: assistant.agent.ring_pause_seconds || prev.ringDuration,
          speakerBoost:
            assistant.agent.voice_use_speaker_boost || prev.speakerBoost,
          operatingHours:
            optional_preference?.operating_hours || prev.operatingHours,
          voice_id: assistant.agent.voice_id || prev.voice_id,
        }));
      }
    }
  };

  useEffect(() => {
    if (activeSection === 'settings') {
      handleSetSetting();
    }
  }, [activeSection]);

  const handleChange = async (field: keyof FormData, value: any) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    setFormData((prev) => ({ ...prev, [field]: value }));
    setHasChanges(true);
    setError(null);

    if (field === 'assistantName' && userProfile) {
      try {
        await saveUserProfile({
          ...userProfile,
          assistantName: value,
        });
      } catch (error) {
        console.error('Error saving assistant name:', error);
        setError('Failed to save assistant name. Please try again later.');
      }
    }
  };

  const handleSave = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    setSaving(true);
    setError(null);
    try {
      if (userProfile) {
        await saveUserProfile({
          ...userProfile,
          assistantName: formData.assistantName,
          supportEmail: formData.supportEmail,
          welcomeMessage: formData.welcomeMessage,
          timezone: formData.timezone,
          completedOnboarding: true,
        });

        const updatedData: AssistantPropsType = {
          type: 'inbound',
          name: formData.assistantName,
          agent: {
            greeting_message: formData.welcomeMessage,
            prompt: generatePrompt(
              formData.operatingHours,
              formData.hourlyRate,
              formData?.specificInstructions
            ),
            language: formData.primaryLanguage || 'en-US',
            patience_level: formData.patienceLevel,
            voice_stability: formData.stability,
            voice_style: formData.styleExaggeration,
            voice_similarity_boost: formData.similarity,
            voice_optimise_streaming_latency: formData.latencyOptimization,
            voice_use_speaker_boost: formData.speakerBoost,
            ring_pause_seconds: formData.ringDuration,
            voice_id: formData.voice_id,
          },
        };

        await updateAssistant(updatedData);
        await updateOptionalPreferences({
          appointment_type: formData.appointmentType,
          operating_hours: formData.operatingHours,
          piercing_service: formData.piercingServices,
          hourly_rate: parseFloat(formData.hourlyRate) || 0,
          specific_instructions: formData.specificInstructions,
        });
        setHasChanges(false);
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      setError('Failed to save settings. Please try again later.');
    } finally {
      setSaving(false);
    }
  };

  const handleVoiceAgentFormSubmit = async (formData: Partial<UserProfile>) => {
    console.log(formData);
    try {
      await saveUserProfile({
        ...formData,
        completedOnboarding: true,
      });

      setUserProfile({
        ownerName: formData.ownerName || '',
        shopName: formData.shopName || '',
        timezone: formData.timezone || 'UTC',
        assistantName: formData.assistantName || 'My Voice Assistant',
        completedOnboarding: true,
        phoneNumber: '',
        supportEmail: '',
        dailycallLimit: 0,
        voicemail_management: false,
        automaticReminders: false,
        waitlistManagement: false,
      });
      setOnboardingCompleted(true);
      setShowVoiceAgentForm(false);
    } catch (error) {
      console.error('Error saving profile:', error);
      setError('Failed to save profile. Please try again.');
    }
  };

  const toggleAuthType = () => {
    setAuthType((prev) => (prev === 'login' ? 'signup' : 'login'));
    setError(null);
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white font-poppins">
        <Header
          hasChanges={hasChanges}
          onSave={handleSave}
          onOpenAuth={() => setShowAuthModal(true)}
          user={user}
          saving={saving}
          onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          isMobileMenuOpen={isMobileMenuOpen}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          userProfile={userProfile}
          setAuthType={setAuthType}
        />
        <AnimatePresence>
          {showAuthModal && (
            <AuthModal
              type={authType}
              onClose={() => setShowAuthModal(false)}
              onToggleType={toggleAuthType}
            />
          )}
        </AnimatePresence>
        <main>
          <section className="section-background hero-background">
            <Hero onStartCall={scrollToWidget} />
          </section>
          <section className="section-background">
            <Assistant onStartCall={scrollToWidget} />
          </section>
          <section className="section-background stats-background">
            <DynamicStats />
          </section>
          <section className="section-background">
            <AboutUs onStartCall={scrollToWidget} />
          </section>
          <section className="section-background voice-agents-background">
            <VoiceAgents onStartCall={scrollToWidget} />
          </section>
          <section className="section-background">
            <ROICalculator />
          </section>
          <section className="section-background faq-background">
            <FAQ />
          </section>
        </main>
      </div>
    );
  }

  if (showVoiceAgentForm) {
    return (
      <div className="min-h-screen bg-transparent text-white p-8">
        <CreateVoiceAgentForm onSubmit={handleVoiceAgentFormSubmit} />
      </div>
    );
  }

  if (showPricingPlans) {
    return <PricingPlans />;
  }

  return (
    <>
      <MouseTrail />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-transparent text-white relative z-20"
      >
        <Header
          hasChanges={hasChanges}
          onSave={handleSave}
          onOpenAuth={() => setShowAuthModal(true)}
          user={user}
          saving={saving}
          onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          isMobileMenuOpen={isMobileMenuOpen}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          userProfile={userProfile}
          setAuthType={setAuthType}
        />

        <Navigation
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          onLogout={handleLogout}
          onSubscribe={() => setShowPricingPlans(true)}
        />

        <main className={`lg:ml-64 flex-1 pt-24 px-4 lg:px-8 pb-20 lg:pb-8`}>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 bg-red-500/10 text-red-500 p-4 rounded-lg"
            >
              {error}
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {activeSection === 'dashboard' && <Dashboard />}
              {activeSection === 'analytics' && <AnalyticsSection />}
              {activeSection === 'history' && <CallHistory />}
              {activeSection === 'help' && <HelpCenter />}
              {activeSection === 'settings' && (
                <div className="space-y-8">
                  <NavigationTabs
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                  />
                  {activeTab === 'voice' && (
                    <VoiceSettings
                      formData={formData}
                      onChange={handleChange}
                    />
                  )}
                  {activeTab === 'general' && (
                    <GeneralSettings
                      formData={formData}
                      onChange={handleChange}
                    />
                  )}
                  {activeTab === 'calls' && (
                    <CallSettings formData={formData} onChange={handleChange} />
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </motion.div>
    </>
  );
}

export default App;
