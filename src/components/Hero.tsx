
import { ElegantButton, HologramButton } from './buttons/ButtonEffects';

interface HeroProps {
  onStartCall: () => void;
  gridDistribution?: 'left' | 'center' | 'right';
}

export function Hero({ 
  onStartCall, 
  gridDistribution = 'center'
}: HeroProps) {
  const getGridColumns = () => {
    switch (gridDistribution) {
      case 'left':
        return 'grid-cols-[3fr_1fr]';
      case 'right':
        return 'grid-cols-[1fr_3fr]';
      default:
        return 'grid-cols-[1.8fr_1fr]';
    }
  };

  return (
    <section className="min-h-screen flex items-center px-4 lg:px-35 relative overflow-hidden">
      <div className="container mx-auto">
        <div className={`hidden lg:grid ${getGridColumns()} gap-18 items-center`}>
          {/* Left side - Text content */}
          <div className="lg:pr-12 lg:pl-10">
            <h1 className="text-6xl md:text-7xl font-montserrat font-black mb-6 leading-tight max-w-[800px]">
              <span className="gradient-text">AI VOICE AGENTS</span>{' '}
              TRAINED TO ASSIST THE TATTOO INDUSTRY
            </h1>
            <p className="text-hover text-xl mb-8">
              Our{' '}
              <span className="gradient-text underline-animation">AI voice agents</span>, 
              trained for the tattoo industry, work 24/7
              handling calls, appointments, customer queries and reminders.
              Focus on your art while our AI manages{' '}
              <span className="gradient-text underline-animation">communication tasks</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <ElegantButton onClick={onStartCall}>
                Start Now →
              </ElegantButton>
              <HologramButton onClick={onStartCall}>
                Live Demo
              </HologramButton>
            </div>
          </div>

          {/* Right side - Image (desktop only) */}
          <div className="relative flex items-center justify-center mt-12">
            <img 
              src="/Tattoo machine.png"
              alt="Professional tattoo machine"
              className="w-[520px] h-auto object-contain opacity-60 hover:opacity-80 transition-opacity duration-300 transform hover:scale-105"
            />
          </div>
        </div>

        {/* Mobile view */}
        <div className="lg:hidden pt-24 md:pt-32">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-montserrat font-black mb-6 leading-tight">
            <span className="gradient-text">AI VOICE AGENTS</span><br />
            TRAINED TO ASSIST<br />
            THE TATTOO INDUSTRY
          </h1>
          <p className="text-hover text-lg sm:text-xl mb-8">
            Our{' '}
            <span className="gradient-text underline-animation">AI voice agents</span>, 
            trained for the tattoo industry, work 24/7
            handling calls, appointments, customer queries and reminders.
            Focus on your art while our AI manages{' '}
            <span className="gradient-text underline-animation">communication tasks</span>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <ElegantButton onClick={onStartCall}>
              Start Now →
            </ElegantButton>
            <HologramButton onClick={onStartCall}>
              Live Demo
            </HologramButton>
          </div>
        </div>
      </div>
    </section>
  );
}