import { Volume2, Pencil } from 'lucide-react';
import type { Voice } from './types';

interface CurrentVoiceProps {
  voice: Voice | null;
  onListen: (voiceId: string) => void;
  onEdit: () => void;
}

export function CurrentVoice({ voice, onListen, onEdit }: CurrentVoiceProps) {
  if (!voice) return null;

  return (
    <div className="relative group animate-fade-in">
      <div className="absolute inset-0 bg-gradient-to-r from-[#904AF2]/20 to-[#904AF2]/5 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
      <div className="bg-[#1A1A1F] rounded-xl p-4 sm:p-5 md:p-6 border border-[#904AF2]/20 transition-all duration-300 hover:border-[#904AF2]/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-2 text-white/90">{voice.name}</h2>
            <p className="text-white/60 text-sm font-light">{voice.description}</p>
          </div>
          <div className="flex gap-3 sm:flex-shrink-0">
            <button
              type="button"
              onClick={() => onListen(voice.id)}
              className="p-2.5 rounded-lg bg-[#904AF2]/10 text-[#904AF2] hover:bg-[#904AF2]/20 
                transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#904AF2] 
                focus:ring-offset-2 focus:ring-offset-[#1A1A1F] z-10 hover:scale-105"
            >
              <Volume2 className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={onEdit}
              className="p-2.5 rounded-lg bg-[#904AF2]/10 text-[#904AF2] hover:bg-[#904AF2]/20 
                transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#904AF2] 
                focus:ring-offset-2 focus:ring-offset-[#1A1A1F] z-10 hover:scale-105"
            >
              <Pencil className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}