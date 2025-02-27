import { useState, useEffect } from 'react';
import { Mic } from 'lucide-react';
import type { FormData } from '../../types/FormData';
import { VoiceFilter } from './VoiceFilter';
import { VoiceList } from './VoiceList';
import { CurrentVoice } from './CurrentVoice';
import { X } from 'lucide-react';
import type { Voice, VoiceFilter as VoiceFilterType } from './types';
const VOICE_DESCRIPTIONS: Record<string, string> = {
  Mariana: 'Soothing, Melodic, Brazilian Portuguese, Female',
  'Jarom Dastrup': 'Dynamic, Energetic, American, Male',
  'Anthony B': 'Professional, Articulate, British, Male',
  Corbin: 'Youthful, Enthusiastic, American, Male',
  Aria: 'Expressive, Versatile, American, Female',
  Roger: 'Confident, Authoritative, American, Male',
  Sarah: 'Soft, Nurturing, American, Female',
  Laura: 'Upbeat, Friendly, American, Female',
  Charlie: 'Natural, Laid-back, Australian, Male',
  George: 'Warm, Sophisticated, British, Male',
  Callum: 'Intense, Dramatic, Transatlantic, Male',
  River: 'Confident, Modern, American, Non-binary',
  Liam: 'Articulate, Professional, American, Male',
  Charlotte: 'Seductive, Elegant, Swedish, Female',
};

const ELEVEN_LABS_API_KEY = import.meta.env.VITE_ELEVEN_LABS_API_KEY;
interface VoiceSettingsProps {
  formData: FormData;
  onChange: (field: keyof FormData, value: any) => void;
}

export function VoiceSettings({ formData, onChange }: VoiceSettingsProps) {
  const [voices, setVoices] = useState<Voice[]>([]);
  const [currentVoice, setCurrentVoice] = useState<Voice | null>(null);
  const [isSelectingVoice, setIsSelectingVoice] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filter, setFilter] = useState<VoiceFilterType>({
    accent: '',
    gender: 'all',
    onlyRecommended: false,
    search: '',
  });

  useEffect(() => {
    fetchVoices();
  }, []);
  const fetchVoices = async () => {
    try {
      const response = await fetch('https://api.elevenlabs.io/v1/voices', {
        headers: {
          'xi-api-key': ELEVEN_LABS_API_KEY,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch voices');
      }

      const data = await response.json();
      const formattedVoices = data.voices.map((voice: any) => ({
        id: voice.voice_id,
        name: voice.name,
        description:
          VOICE_DESCRIPTIONS[voice.name] ||
          [
            voice.labels?.accent,
            voice.labels?.nationality,
            voice.labels?.gender,
          ]
            .filter(Boolean)
            .join(', '),
      }));
      let tempCurrentVoice = formattedVoices.find(
        (item: Voice) => item.id === formData.voice_id
      );
      setCurrentVoice(tempCurrentVoice);
      setVoices(formattedVoices);
      // if (!currentVoice && formattedVoices.length > 0) {
      //   setCurrentVoice(formattedVoices[0]);
      // }
    } catch (error) {
      console.error('Error fetching voices:', error);
    }
  };

  const handleListen = async (voiceId: string) => {
    try {
      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`,
        {
          method: 'POST',
          headers: {
            'xi-api-key': ELEVEN_LABS_API_KEY,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: 'Hello, this is a preview of my voice.',
            model_id: 'eleven_monolingual_v1',
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.75,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to generate voice preview');
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);

      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
      };

      await audio.play();
    } catch (error) {
      console.error('Error playing voice preview:', error);
    }
  };

  const handleVoiceSelect = (voice: Voice) => {
    onChange('voice_id', voice.id);
    setCurrentVoice(voice);
    setIsSelectingVoice(false);
  };
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-3xl">
        <div className="bg-zinc-900/80 backdrop-blur-sm rounded-xl p-6 border border-zinc-800/80">
          <h2 className="text-xl font-semibold mb-6 flex items-center justify-center">
            <Mic className="w-5 h-5 mr-2 text-[#904AF2]" />
            Voice Settings
          </h2>

          {/* Voice Selection */}
          <div className="max-w-[1400px] mx-auto">
            <CurrentVoice
              voice={currentVoice}
              onListen={handleListen}
              onEdit={() => setIsSelectingVoice(true)}
            />

            {/* Modal Overlay */}
            {isSelectingVoice && (
              <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 md:p-6"
                onClick={() => setIsSelectingVoice(false)}
              >
                <div
                  className="bg-[#0A0A0F] rounded-2xl w-full max-w-6xl h-[85vh] sm:h-[80vh] md:h-[75vh] shadow-2xl border border-[#904AF2]/20 animate-scale-in overflow-hidden flex flex-col"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Modal Header */}
                  <div className="p-4 sm:p-5 md:p-6 border-b border-[#904AF2]/20 flex items-center justify-between sticky top-0 bg-[#0A0A0F] z-10">
                    <h1 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#904AF2] to-[#B47FFF]">
                      Select Voice
                    </h1>
                    <button
                      onClick={() => setIsSelectingVoice(false)}
                      className="p-2 rounded-lg hover:bg-[#904AF2]/10 text-white/60 hover:text-white transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Modal Content */}
                  <div className="flex-1 overflow-hidden">
                    <div className="h-full flex flex-col lg:flex-row">
                      {/* Mobile Filter Toggle */}
                      <button
                        className="lg:hidden w-full px-4 py-2.5 bg-[#1A1A1F] text-left flex justify-between items-center"
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                      >
                        <span className="font-medium">Filters</span>
                        <span
                          className={`transform transition-transform duration-200 ${
                            isFilterOpen ? 'rotate-180' : ''
                          }`}
                        >
                          ▼
                        </span>
                      </button>

                      {/* Filters */}
                      <div
                        className={`
                      lg:w-72 lg:min-w-72 lg:border-r border-[#904AF2]/20
                      ${isFilterOpen ? 'block' : 'hidden'}
                      lg:block
                    `}
                      >
                        <div className="p-4 sm:p-5 md:p-6 h-full overflow-y-auto">
                          <VoiceFilter
                            filter={filter}
                            onFilterChange={setFilter}
                          />
                        </div>
                      </div>

                      {/* Voice List */}
                      <div className="flex-1 overflow-hidden">
                        <VoiceList
                          voices={voices}
                          filter={filter}
                          onFilterChange={setFilter}
                          onListen={handleListen}
                          onSelect={handleVoiceSelect}
                          selectedVoice={currentVoice}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Patience Level */}
          <div className="mb-8 mt-8">
            <label className="block text-sm font-medium mb-2 text-center">
              Patience Level
            </label>
            <p className="text-xs text-zinc-400 mb-4 text-center">
              Adjust the response speed. Low for rapid exchanges, high for more
              focused turns with less crosstalk.
            </p>

            <div className="grid grid-cols-3 gap-4">
              {['low', 'medium', 'high'].map((level) => (
                <button
                  key={level}
                  onClick={() => onChange('patienceLevel', level)}
                  className={`px-4 py-3 rounded-lg border transition-all ${
                    formData.patienceLevel === level
                      ? 'border-[#904AF2] bg-[#904AF2]/10 text-white'
                      : 'border-zinc-800/80 text-zinc-400 hover:border-[#904AF2] hover:text-white'
                  }`}
                >
                  <div className="font-medium capitalize">{level}</div>
                  <div className="text-xs text-zinc-400">
                    {level === 'low'
                      ? '~1 sec.'
                      : level === 'medium'
                      ? '~3 sec.'
                      : '~5 sec.'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Stability */}
          <div className="mb-8">
            <label className="block text-sm font-medium mb-2 text-center">
              Stability
            </label>
            <p className="text-xs text-zinc-400 mb-4 text-center">
              Lower settings may make the voice sound more expressive but less
              predictable, while higher settings make it sound steadier but less
              emotional.
            </p>

            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={formData.stability}
              onChange={(e) =>
                onChange('stability', parseFloat(e.target.value))
              }
              className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#904AF2]"
              style={{
                background: `linear-gradient(to right, #904AF2 ${
                  (formData?.stability || 0) * 100
                }%, #27272a ${(formData?.stability || 0) * 100}%)`,
              }}
            />
            <div className="text-right text-sm mt-1">{formData.stability}</div>
          </div>

          {/* Style Exaggeration */}
          <div className="mb-8">
            <label className="block text-sm font-medium mb-2 text-center">
              Style Exaggeration
            </label>
            <p className="text-xs text-zinc-400 mb-4 text-center">
              Enhances the distinct characteristics of the original voice, but
              may slow down processing and make the voice less stable.
            </p>

            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={formData.styleExaggeration}
              onChange={(e) =>
                onChange('styleExaggeration', parseFloat(e.target.value))
              }
              className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#904AF2]"
              style={{
                background: `linear-gradient(to right, #904AF2 ${
                  (formData?.styleExaggeration || 0) * 100
                }%, #27272a ${(formData?.styleExaggeration || 0) * 100}%)`,
              }}
            />
            <div className="text-right text-sm mt-1">
              {formData?.styleExaggeration}
            </div>
          </div>

          {/* Similarity */}
          <div className="mb-8">
            <label className="block text-sm font-medium mb-2 text-center">
              Similarity
            </label>
            <p className="text-xs text-zinc-400 mb-4 text-center">
              Determines how closely the AI matches the original voice. Higher
              values may include unwanted noise from the original recording.
            </p>

            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={formData?.similarity || 0}
              onChange={(e) =>
                onChange('similarity', parseFloat(e.target.value))
              }
              className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#904AF2]"
              style={{
                background: `linear-gradient(to right, #904AF2 ${
                  (formData?.similarity || 0) * 100
                }%, #27272a ${(formData?.similarity || 0) * 100}%)`,
              }}
            />
            <div className="text-right text-sm mt-1">
              {formData.similarity || 0}
            </div>
          </div>
          {/* Optimize Latency */}
          <div className="mb-8">
            <label className="block text-sm font-medium mb-2 text-center">
              Optimize Latency
            </label>
            <p className="text-xs text-zinc-400 mb-4 text-center">
              Balance voice quality and response time: lower settings improve
              quality, while higher settings reduce latency but may affect
              accuracy.
            </p>

            <input
              type="range"
              min="0"
              max="10"
              step="1"
              value={formData.latencyOptimization}
              onChange={(e) =>
                onChange('latencyOptimization', parseInt(e.target.value))
              }
              className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#904AF2]"
              style={{
                background: `linear-gradient(to right, #904AF2 ${
                  ((formData?.latencyOptimization || 0) / 10) * 100
                }%, #27272a ${
                  ((formData?.latencyOptimization || 0) / 10) * 100
                }%)`,
              }}
            />
            <div className="text-right text-sm mt-1">
              {formData.latencyOptimization}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
