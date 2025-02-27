import React, { useEffect } from 'react';
import { Check } from 'lucide-react';

export function SuccessPage() {
  useEffect(() => {
    // Close the window after 2 seconds
    const timer = setTimeout(() => {
      window.close();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
          <Check className="w-8 h-8 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold text-white">Connection Successful!</h1>
        <p className="text-zinc-400">Your Google Calendar has been connected.</p>
        <p className="text-sm text-zinc-500">This window will close automatically...</p>
      </div>
    </div>
  );
}