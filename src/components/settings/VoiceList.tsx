import { Search } from 'lucide-react';
import { VoiceCard } from './VoiceCard';
import type { Voice, VoiceFilter } from './types';

interface VoiceListProps {
  voices: Voice[];
  filter: VoiceFilter;
  onFilterChange: (filter: VoiceFilter) => void;
  onListen: (voiceId: string) => void;
  onSelect: (voice: Voice) => void;
  selectedVoice: Voice | null;
}

export function VoiceList({
  voices,
  filter,
  onFilterChange,
  onListen,
  onSelect,
  selectedVoice,
}: VoiceListProps) {
  const filteredVoices = voices.filter((voice) => {
    if (
      filter.accent &&
      !voice.description.toLowerCase().includes(filter.accent)
    ) {
      return false;
    }
    if (
      filter.gender !== 'all' &&
      !voice.description.toLowerCase().includes(filter.gender)
    ) {
      return false;
    }
    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      return (
        voice.name.toLowerCase().includes(searchLower) ||
        voice.description.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-[#904AF2]/20">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name"
            value={filter.search}
            onChange={(e) =>
              onFilterChange({ ...filter, search: e.target.value })
            }
            className="w-full bg-[#2A2A2F] text-white/90 pl-10 pr-4 py-2.5 rounded-lg 
              border border-[#904AF2]/20 focus:border-[#904AF2] focus:ring-1 
              focus:ring-[#904AF2] outline-none placeholder-white/40 transition-all duration-300"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="divide-y divide-[#904AF2]/20">
          {filteredVoices.map((voice, index) => (
            <VoiceCard
              key={voice.id}
              voice={voice}
              onListen={onListen}
              onSelect={() => onSelect(voice)}
              isSelected={selectedVoice?.id === voice.id}
              index={index}
            />
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-[#904AF2]/20 text-sm text-white/60 font-light">
        {filteredVoices.length} results
      </div>
    </div>
  );
}
