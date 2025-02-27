import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Link2, Phone, Globe } from 'lucide-react';
import type { FormStepProps, SocialMedia } from './types';
import { ErrorMessage } from './ErrorMessage';

export function BusinessInfoStep({
  formData,
  errors,
  setFormData,
}: FormStepProps) {
  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6)
      return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(
      6,
      10
    )}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData({ ...formData, phoneNumber: formatted });
  };

  const addSocialMedia = () => {
    setFormData({
      ...formData,
      socialMedia: [...formData.socialMedia, { platform: '', url: '' }],
    });
  };

  const removeSocialMedia = (index: number) => {
    setFormData({
      ...formData,
      socialMedia: formData.socialMedia.filter((_, i) => i !== index),
    });
  };

  const updateSocialMedia = (
    index: number,
    field: keyof SocialMedia,
    value: string
  ) => {
    const updatedSocialMedia = [...formData.socialMedia];
    updatedSocialMedia[index] = {
      ...updatedSocialMedia[index],
      [field]: value,
    };
    setFormData({
      ...formData,
      socialMedia: updatedSocialMedia,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-4"
    >
      <div>
        <label className="block text-sm font-medium mb-2">
          Owner's Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.ownerName}
          onChange={(e) =>
            setFormData({ ...formData, ownerName: e.target.value })
          }
          className="w-full bg-black/30 border border-zinc-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
          placeholder="Enter owner's name"
        />
        <ErrorMessage message={errors.ownerName} />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Shop Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.shopName}
          onChange={(e) =>
            setFormData({ ...formData, shopName: e.target.value })
          }
          className="w-full bg-black/30 border border-zinc-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
          placeholder="Enter shop name"
        />
        <ErrorMessage message={errors.shopName} />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Website</label>
        <div className="relative">
          <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="url"
            value={formData.website}
            onChange={(e) =>
              setFormData({ ...formData, website: e.target.value })
            }
            className="w-full bg-black/30 border border-zinc-800 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="https://your-website.com"
          />
        </div>
        <ErrorMessage message={errors.website} />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Phone <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="tel"
            value={formData.phoneNumber}
            onChange={handlePhoneChange}
            className="w-full bg-black/30 border border-zinc-800 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="(123) 456-7890"
            maxLength={14}
          />
        </div>
        <ErrorMessage message={errors.phoneNumber} />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium">
            Social Media Presence
          </label>
          <motion.button
            type="button"
            onClick={addSocialMedia}
            className="text-sm text-purple-400 hover:text-purple-300 flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Social Media
          </motion.button>
        </div>

        <div className="space-y-3">
          {formData.socialMedia.map((social, index) => (
            <motion.div
              key={index}
              className="flex gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex-1">
                <input
                  type="text"
                  value={social.platform}
                  onChange={(e) =>
                    updateSocialMedia(index, 'platform', e.target.value)
                  }
                  placeholder="Platform (e.g., Instagram)"
                  className="w-full bg-black/30 border border-zinc-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <div className="flex-1">
                <div className="relative">
                  <Link2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="url"
                    value={social.url}
                    onChange={(e) =>
                      updateSocialMedia(index, 'url', e.target.value)
                    }
                    placeholder="URL"
                    className="w-full bg-black/30 border border-zinc-800 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
              </div>
              <motion.button
                type="button"
                onClick={() => removeSocialMedia(index)}
                className="p-2 text-red-400 hover:text-red-300 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Trash2 className="w-5 h-5" />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
