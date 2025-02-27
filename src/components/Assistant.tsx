
import { HologramButton } from './buttons/ButtonEffects';

interface AssistantProps {
  onStartCall: () => void;
}

export function Assistant({ onStartCall }: AssistantProps) {
  return (
    <section id="widget-section" className="py-20 px-4">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-montserrat font-black mb-4">
          <span className="gradient-text">AI ASSISTANT</span>
        </h2>
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-black mb-8">
          THE <span className="fancy2">SHOP ASSISTANT</span><br />
          YOU'VE ALWAYS WANTED
        </h3>

        {/* AI Voice Agent Widget */}
        <div className="mb-12 max-w-full overflow-hidden">
          <iframe 
            id="voice_agent" 
            src="https://widget.synthflow.ai/widget/v2/1739025041040x430239200974914940/1739025040924x286537054365131100" 
            allow="microphone" 
            className="mx-auto rounded-xl
              w-full max-w-[90vw]
              md:max-w-[600px]
              lg:max-w-[800px]
              bg-transparent"
            style={{
              border: 'none',
              height: '550px',
              background: 'transparent'
            }}
          />
        </div>

        <p className="text-hover text-xl max-w-2xl mx-auto mb-8">
          Meet Roxy, your new{' '}
          <span className="gradient-text underline-animation">AI studio assistant</span>,
          trained for the tattoo industry, work 24/7
          handling calls, appointments, customer
          queries and reminders.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <HologramButton onClick={onStartCall}>
            Schedule a Demo
          </HologramButton>
        </div>
      </div>
    </section>
  );
}