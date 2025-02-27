
import { Volume2, Check } from 'lucide-react';
import type { Voice } from './types';

interface VoiceCardProps {
  voice: Voice;
  onListen: (voiceId: string) => void;
  onSelect: () => void;
  isSelected: boolean;
  index: number;
}

export function VoiceCard({ voice, onListen, onSelect, isSelected, index }: VoiceCardProps) {
  return (
    <div 
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => e.key === 'Enter' && onSelect()}
      className={`
        group flex items-center justify-between w-full p-4 
        hover:bg-[#2A2A2F] transition-all duration-300 cursor-pointer
        animate-slide-in
        ${isSelected ? 'bg-[#904AF2]/10' : ''}
      `}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onListen(voice.id);
          }}
          className="p-2 sm:p-2.5 rounded-lg bg-[#904AF2]/10 group-hover:bg-[#904AF2]/20 hover:bg-[#904AF2]/30 
            transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#904AF2] 
            focus:ring-offset-2 focus:ring-offset-[#2A2A2F] z-10 hover:scale-105 flex-shrink-0"
        >
          <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#904AF2]" />
        </button>
        
        <div className="min-w-0">
          <h3 className="font-medium mb-1 text-white/90 truncate">{voice.name}</h3>
          <p className="text-white/60 text-sm font-light truncate">{voice.description}</p>
        </div>
      </div>

      {isSelected && (
        <div className="p-2 rounded-full bg-[#904AF2] animate-scale-in flex-shrink-0 ml-3">
          <Check className="w-4 h-4 text-white" />
        </div>
      )}
    </div>
  );
}