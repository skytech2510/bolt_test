import React from 'react';
import type { VoiceFilter } from './types';

interface VoiceFilterProps {
  filter: VoiceFilter;
  onFilterChange: (filter: VoiceFilter) => void;
}

export function VoiceFilter({ filter, onFilterChange }: VoiceFilterProps) {
  const handleAccentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filter, accent: e.target.value });
  };

  const handleGenderChange = (value: string) => {
    onFilterChange({ ...filter, gender: value });
  };

  const handleRecommendedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filter, onlyRecommended: e.target.checked });
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
      <div>
        <h3 className="text-gray-400 text-sm font-medium mb-2 sm:mb-3">
          Accent
        </h3>
        <select
          value={filter.accent}
          onChange={handleAccentChange}
          className="w-full bg-[#2A2A2F] text-white rounded-lg p-2.5 border border-[#904AF2]/20 focus:border-[#904AF2] focus:ring-1 focus:ring-[#904AF2] outline-none"
        >
          <option value="">All</option>
          <option value="american">American</option>
          <option value="british">British</option>
          <option value="australian">Australian</option>
        </select>
      </div>

      <div>
        <h3 className="text-gray-400 text-sm font-medium mb-2 sm:mb-3">
          Gender
        </h3>
        <div className="flex flex-col gap-2 sm:gap-3">
          {['All', 'Male', 'Female'].map((gender) => (
            <label
              key={gender}
              className="flex items-center gap-3 group cursor-pointer"
            >
              <div className="relative flex items-center justify-center">
                <input
                  type="radio"
                  name="gender"
                  value={gender.toLowerCase()}
                  checked={filter.gender === gender.toLowerCase()}
                  onChange={() => handleGenderChange(gender.toLowerCase())}
                  className="appearance-none w-5 h-5 rounded-full border-2 border-[#904AF2]/50 checked:border-[#904AF2] checked:bg-[#904AF2] transition-colors cursor-pointer"
                />
                <div className="absolute w-2 h-2 rounded-full bg-white opacity-0 pointer-events-none transition-opacity">
                  {filter.gender === gender.toLowerCase() && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
              </div>
              <span className="text-white group-hover:text-gray-300 transition-colors">
                {gender}
              </span>
            </label>
          ))}
        </div>
      </div>

      <label className="flex items-center gap-3 cursor-pointer group">
        <div className="relative flex items-center justify-center">
          <input
            type="checkbox"
            checked={filter.onlyRecommended}
            onChange={handleRecommendedChange}
            className="appearance-none w-5 h-5 rounded border-2 border-[#904AF2]/50 checked:border-[#904AF2] checked:bg-[#904AF2] transition-colors cursor-pointer"
          />
          <div className="absolute transform opacity-0 pointer-events-none transition-opacity">
            {filter.onlyRecommended && (
              <svg
                className="w-3 h-3 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path
                  d="M20 6L9 17l-5-5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
        </div>
        <span className="text-white group-hover:text-gray-300 transition-colors">
          Only recommended
        </span>
      </label>
    </div>
  );
}
