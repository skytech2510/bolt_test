import { Volume2 } from 'lucide-react';
import type { FormData } from '../../types/FormData';

interface CallSettingsProps {
  formData: FormData;
  onChange: (field: keyof FormData, value: any) => void;
}

export function CallSettings({ formData, onChange }: CallSettingsProps) {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-3xl">
        <div className="bg-zinc-900/80 backdrop-blur-sm rounded-xl p-6 border border-zinc-800/80">
          <h2 className="text-xl font-semibold mb-6 flex items-center justify-center">
            <Volume2 className="w-5 h-5 mr-2 text-[#904AF2]" />
            Call Configuration
          </h2>

          {/* Pause Before Speaking */}
          <div className="mb-8">
            <label className="block text-sm font-medium mb-2 text-center">
              Pause Before Speaking
            </label>
            <p className="text-xs text-zinc-400 mb-4 text-center">
              The duration before the assistant starts speaking at the beginning
              of the call.
            </p>

            <input
              type="range"
              min="0"
              max="30"
              step="1"
              value={formData.pauseBeforeSpeaking || 10}
              onChange={(e) =>
                onChange('pauseBeforeSpeaking', parseInt(e.target.value))
              }
              className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#904AF2]"
              style={{
                background: `linear-gradient(to right, #904AF2 ${
                  ((formData.pauseBeforeSpeaking || 10) / 30) * 100
                }%, #27272a ${
                  ((formData.pauseBeforeSpeaking || 10) / 30) * 100
                }%)`,
              }}
            />
            <div className="text-right text-sm mt-1">
              {formData.pauseBeforeSpeaking || 10}s
            </div>
          </div>

          {/* Ring Duration */}
          <div className="mb-8">
            <label className="block text-sm font-medium mb-2 text-center">
              Ring Duration
            </label>
            <p className="text-xs text-zinc-400 mb-4 text-center">
              How long should the phone ring before the assistant picks up.
            </p>

            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={formData.pauseBeforeSpeaking || 10}
              onChange={(e) =>
                onChange('ringDuration', parseInt(e.target.value))
              }
              className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#904AF2]"
              style={{
                background: `linear-gradient(to right, #904AF2 ${
                  ((formData.pauseBeforeSpeaking || 10) / 30) * 100
                }%, #27272a ${
                  ((formData.pauseBeforeSpeaking || 10) / 30) * 100
                }%)`,
              }}
            />
            <div className="text-right text-sm mt-1">
              {formData.pauseBeforeSpeaking || 10}s
            </div>
          </div>

          {/* Idle Reminders */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="text-center w-full">
                <label className="block text-sm font-medium mb-1">
                  Idle Reminders
                </label>
                <p className="text-xs text-zinc-400">
                  Send a message when there's no activity for a while.
                </p>
              </div>
              <button
                onClick={() =>
                  onChange(
                    'idleRemindersEnabled',
                    !formData.idleRemindersEnabled
                  )
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  formData.idleRemindersEnabled ? 'bg-[#904AF2]' : 'bg-zinc-800'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    formData.idleRemindersEnabled
                      ? 'translate-x-6'
                      : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {formData.idleRemindersEnabled && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2 text-center">
                    Reminder Time
                  </label>
                  <p className="text-xs text-zinc-400 mb-4 text-center">
                    How long to wait before sending a reminder.
                  </p>

                  <input
                    type="range"
                    min="1"
                    max="15"
                    step="1"
                    value={formData.idleReminderTime || 10}
                    onChange={(e) =>
                      onChange('idleReminderTime', parseInt(e.target.value))
                    }
                    className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#904AF2]"
                    style={{
                      background: `linear-gradient(to right, #904AF2 ${
                        ((formData.idleReminderTime || 10) / 15) * 100
                      }%, #27272a ${
                        ((formData.idleReminderTime || 10) / 15) * 100
                      }%)`,
                    }}
                  />
                  <div className="text-right text-sm mt-1">
                    {formData.idleReminderTime || 10} minutes
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2 text-center">
                    Reminder Message
                  </label>
                  <p className="text-xs text-zinc-400 mb-2 text-center">
                    The message that will be sent when idle.
                  </p>
                  <input
                    type="text"
                    value={formData.reminderMessage}
                    onChange={(e) =>
                      onChange('reminderMessage', e.target.value)
                    }
                    placeholder="Enter reminder message..."
                    className="w-full bg-black/50 border border-zinc-800/80 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#904AF2] transition-all"
                  />
                </div>
              </>
            )}
          </div>

          {/* Speaker Boost */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="text-center w-full">
                <label className="block text-sm font-medium mb-1">
                  Speaker Boost
                </label>
                <p className="text-xs text-zinc-400">
                  Increase the volume of the assistant's voice.
                </p>
              </div>
              <button
                onClick={() => onChange('speakerBoost', !formData.speakerBoost)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  formData.speakerBoost ? 'bg-[#904AF2]' : 'bg-zinc-800'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    formData.speakerBoost ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
