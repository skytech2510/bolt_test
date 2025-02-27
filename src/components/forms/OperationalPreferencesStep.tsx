
import { motion } from 'framer-motion';
import { DollarSign } from 'lucide-react';
import type { FormStepProps, OperatingHours } from './types';
import { ErrorMessage } from './ErrorMessage';

export function OperationalPreferencesStep({ formData, errors, setFormData }: FormStepProps) {
  const updateOperatingHours = (index: number, field: keyof OperatingHours, value: any) => {
    const updatedHours = [...formData.operatingHours];
    updatedHours[index] = {
      ...updatedHours[index],
      [field]: value
    };
    setFormData({
      ...formData,
      operatingHours: updatedHours
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-lg font-medium mb-4">Operational Preferences</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Appointment Type</label>
            <select
              value={formData.appointmentType}
              onChange={(e) => setFormData({ ...formData, appointmentType: e.target.value })}
              className="w-full bg-black/30 border border-zinc-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <option value="appointments">Appointments Only</option>
              <option value="walkins">Walk-ins Only</option>
              <option value="both">Both Walk-ins and Appointments</option>
            </select>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-4">Operating Hours</h4>
            <div className="space-y-3">
              {formData.operatingHours.map((hours, index) => (
                <div key={hours.day} className="flex items-center space-x-4 p-3 rounded-lg bg-black/20">
                  <div className="w-28">
                    <span className="text-sm">{hours.day}</span>
                  </div>
                  
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hours.isOpen}
                      onChange={(e) => updateOperatingHours(index, 'isOpen', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>

                  {hours.isOpen && (
                    <div className="flex items-center space-x-2 flex-1">
                      <input
                        type="time"
                        value={hours.openTime}
                        onChange={(e) => updateOperatingHours(index, 'openTime', e.target.value)}
                        className="bg-black/30 border border-zinc-800 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm"
                      />
                      <span className="text-sm text-zinc-400">to</span>
                      <input
                        type="time"
                        value={hours.closeTime}
                        onChange={(e) => updateOperatingHours(index, 'closeTime', e.target.value)}
                        className="bg-black/30 border border-zinc-800 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.piercingServices}
                onChange={(e) => setFormData({ ...formData, piercingServices: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              <span className="ml-3 text-sm font-medium">Piercing Services</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Hourly Rate <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                value={formData.hourlyRate}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^\d.]/g, '');
                  setFormData({ ...formData, hourlyRate: value });
                }}
                className="w-full bg-black/30 border border-zinc-800 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Enter your hourly rate"
              />
            </div>
            <ErrorMessage message={errors.hourlyRate} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}