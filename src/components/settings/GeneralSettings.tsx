import { Settings, Clock, Calendar, Mail } from 'lucide-react';
import type { FormData } from '../../types/FormData';
import { connectGoogleCalendar } from '../../lib/calendar';
import { connectSquareCalendar } from '../../lib/squareCalendar';

interface GeneralSettingsProps {
  formData: FormData;
  onChange: (field: keyof FormData, value: any) => void;
}

export function GeneralSettings({ formData, onChange }: GeneralSettingsProps) {
  const operatingHours = formData.operatingHours || [
    { day: 'Monday', isOpen: true, openTime: '09:00', closeTime: '17:00' },
    { day: 'Tuesday', isOpen: true, openTime: '09:00', closeTime: '17:00' },
    { day: 'Wednesday', isOpen: true, openTime: '09:00', closeTime: '17:00' },
    { day: 'Thursday', isOpen: true, openTime: '09:00', closeTime: '17:00' },
    { day: 'Friday', isOpen: true, openTime: '09:00', closeTime: '17:00' },
    { day: 'Saturday', isOpen: true, openTime: '09:00', closeTime: '17:00' },
    { day: 'Sunday', isOpen: false, openTime: '09:00', closeTime: '17:00' },
  ];

  const handleOperatingHoursChange = (
    index: number,
    field: string,
    value: any
  ) => {
    const newHours = [...operatingHours];
    newHours[index] = { ...newHours[index], [field]: value };
    onChange('operatingHours', newHours);
  };

  const handleCalendarConnect = async (type: string) => {
    if (type === 'google') {
      try {
        await connectGoogleCalendar();
        onChange('calendarIntegration', 'google');
      } catch (error) {
        console.error('Failed to connect Google Calendar:', error);
      }
    } else if (type === 'square') {
      try {
        await connectSquareCalendar();
        onChange('calendarIntegration', 'square');
      } catch (error) {
        console.error('Failed to connect Square Calendar:', error);
      }
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-3xl space-y-8">
        {/* Basic Settings */}
        <div className="bg-zinc-900/80 backdrop-blur-sm rounded-xl p-6 border border-zinc-800/80">
          <h2 className="text-xl font-semibold mb-6 flex items-center justify-center">
            <Settings className="w-5 h-5 mr-2 text-[#904AF2]" />
            Basic Settings
          </h2>

          {/* Assistant Name */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-center">
              Assistant Name
            </label>
            <p className="text-xs text-zinc-400 mb-2 text-center">
              What name will your assistant go by.
            </p>
            <input
              type="text"
              value={formData.assistantName || ''}
              onChange={(e) => onChange('assistantName', e.target.value)}
              placeholder="Enter your assistant's name..."
              className="w-full bg-black/50 border border-zinc-800/80 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#904AF2] transition-all"
            />
          </div>

          {/* Welcome Message */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-center">
              Welcome Message
            </label>
            <p className="text-xs text-zinc-400 mb-2 text-center">
              The greeting message your assistant will use.
            </p>
            <textarea
              value={formData.welcomeMessage || ''}
              onChange={(e) => onChange('welcomeMessage', e.target.value)}
              placeholder="Hello! How can I assist you today?"
              className="w-full bg-black/50 border border-zinc-800/80 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#904AF2] transition-all min-h-[100px]"
            />
          </div>

          {/* Specific Instructions */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-center">
              Specific Instructions
            </label>
            <p className="text-xs text-zinc-400 mb-2 text-center">
              Additional instructions for your assistant's behavior.
            </p>
            <textarea
              value={formData.specificInstructions || ''}
              onChange={(e) => onChange('specificInstructions', e.target.value)}
              placeholder="Add any specific instructions for how your assistant should handle calls..."
              className="w-full bg-black/50 border border-zinc-800/80 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#904AF2] transition-all min-h-[100px]"
            />
          </div>

          {/* Primary Language */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-center">
              Primary Language
            </label>
            <p className="text-xs text-zinc-400 mb-2 text-center">
              Select the main language for your assistant.
            </p>
            <select
              value={formData.primaryLanguage || 'en-US'}
              onChange={(e) => onChange('primaryLanguage', e.target.value)}
              className="w-full bg-black/50 border border-zinc-800/80 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#904AF2] transition-all"
            >
              <option value="en-US">English (US)</option>
              <option value="en-GB">English (UK)</option>
              <option value="es-ES">Spanish (Spain)</option>
              <option value="fr-FR">French</option>
              <option value="de-DE">German</option>
              <option value="it-IT">Italian</option>
              <option value="ja-JP">Japanese</option>
              <option value="ko-KR">Korean</option>
              <option value="zh-CN">Chinese (Simplified)</option>
            </select>
          </div>

          {/* Support Email */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-center">
              Professional Support Email
            </label>
            <p className="text-xs text-zinc-400 mb-2 text-center">
              Email address for customer support inquiries.
            </p>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="email"
                value={formData.supportEmail || ''}
                onChange={(e) => onChange('supportEmail', e.target.value)}
                placeholder="support@yourbusiness.com"
                className="w-full bg-black/50 border border-zinc-800/80 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#904AF2] transition-all"
              />
            </div>
          </div>
        </div>

        {/* Business Hours & Appointments */}
        <div className="bg-zinc-900/80 backdrop-blur-sm rounded-xl p-6 border border-zinc-800/80">
          <h2 className="text-xl font-semibold mb-6 flex items-center justify-center">
            <Clock className="w-5 h-5 mr-2 text-[#904AF2]" />
            Business Hours & Appointments
          </h2>

          {/* Operating Hours */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-4 text-center">
              Operating Hours
            </label>
            <div className="space-y-3">
              {operatingHours.map((hours, index) => (
                <div
                  key={hours.day}
                  className="flex items-center space-x-4 p-3 rounded-lg bg-black/20"
                >
                  <div className="w-28">
                    <span className="text-sm">{hours.day}</span>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hours.isOpen}
                      onChange={(e) =>
                        handleOperatingHoursChange(
                          index,
                          'isOpen',
                          e.target.checked
                        )
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>

                  {hours.isOpen && (
                    <div className="flex items-center space-x-2 flex-1">
                      <input
                        type="time"
                        value={hours.openTime}
                        onChange={(e) =>
                          handleOperatingHoursChange(
                            index,
                            'openTime',
                            e.target.value
                          )
                        }
                        className="bg-black/30 border border-zinc-800 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm"
                      />
                      <span className="text-sm text-zinc-400">to</span>
                      <input
                        type="time"
                        value={hours.closeTime}
                        onChange={(e) =>
                          handleOperatingHoursChange(
                            index,
                            'closeTime',
                            e.target.value
                          )
                        }
                        className="bg-black/30 border border-zinc-800 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Appointment Type */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-center">
              Appointment Type
            </label>
            <p className="text-xs text-zinc-400 mb-4 text-center">
              How would you like to handle appointments?
            </p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'appointments', label: 'Appointments Only' },
                { value: 'walkins', label: 'Walk-ins Only' },
                { value: 'both', label: 'Both' },
              ].map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => onChange('appointmentType', type.value)}
                  className={`p-4 rounded-lg border transition-all ${
                    formData.appointmentType === type.value
                      ? 'border-purple-600 bg-purple-600/10 text-white'
                      : 'border-zinc-800/80 text-zinc-400 hover:border-purple-600/50 hover:text-white'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Hourly Rate */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-center">
              Hourly Rate
            </label>
            <p className="text-xs text-zinc-400 mb-2 text-center">
              Your standard hourly rate for services.
            </p>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400">
                $
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.hourlyRate || ''}
                onChange={(e) => onChange('hourlyRate', e.target.value)}
                placeholder="0.00"
                className="w-full bg-black/50 border border-zinc-800/80 rounded-lg pl-8 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#904AF2] transition-all"
              />
            </div>
          </div>
        </div>

        {/* Calendar Integration */}
        <div className="bg-zinc-900/80 backdrop-blur-sm rounded-xl p-6 border border-zinc-800/80">
          <h2 className="text-xl font-semibold mb-6 flex items-center justify-center">
            <Calendar className="w-5 h-5 mr-2 text-[#904AF2]" />
            Calendar Integration
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { value: 'google', label: 'Google Calendar' },
              { value: 'square', label: 'Square Calendar' },
              { value: 'apple', label: 'Apple Calendar' },
            ].map((calendar) => (
              <button
                key={calendar.value}
                type="button"
                onClick={() => handleCalendarConnect(calendar.value)}
                className={`p-4 rounded-lg border transition-all flex flex-col items-center justify-center gap-2 ${
                  formData.calendarIntegration === calendar.value
                    ? 'border-purple-600 bg-purple-600/10 text-white'
                    : 'border-zinc-800/80 text-zinc-400 hover:border-purple-600/50 hover:text-white'
                }`}
              >
                <span className="text-sm">{calendar.label}</span>
                {formData.calendarIntegration === calendar.value && (
                  <span className="text-xs text-green-400">Connected</span>
                )}
              </button>
            ))}
          </div>
          <p className="text-xs text-zinc-400 mt-4 text-center">
            Connect your calendar to automatically manage appointments and
            availability.
          </p>
        </div>
      </div>
    </div>
  );
}