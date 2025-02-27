
import { HelpCircle } from 'lucide-react';

export function HelpButton() {
  return (
    <button className="fixed bottom-6 right-6 bg-[#904AF2] p-3 rounded-full shadow-lg hover:bg-[#904AF2]/90 transition-all">
      <HelpCircle className="w-6 h-6" />
    </button>
  );
}