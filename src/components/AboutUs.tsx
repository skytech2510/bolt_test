import { useState, useEffect } from 'react';
import { ElegantButton } from './buttons/ButtonEffects';
import { Bot, Sparkles, ArrowRight } from 'lucide-react';

interface AboutUsProps {
  onStartCall: () => void;
}

export function AboutUs({ onStartCall }: AboutUsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);

  const images = [
    {
      url: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28",
      alt: "Tattoo artist working in studio"
    },
    {
      url: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d",
      alt: "Close up of tattoo work"
    },
    {
      url: "/purple tattoo.avif",
      alt: "Detailed tattoo work"
    }
  ].map(img => ({
    url: img.url.includes('unsplash') ? `${img.url}?q=80&w=1200&auto=format&fit=crop` : img.url,
    alt: img.alt
  }));

  useEffect(() => {
    setImagesLoaded(new Array(images.length).fill(false));
    
    // Preload images
    images.forEach((image, index) => {
      const img = new Image();
      img.src = image.url;
      img.onload = () => {
        setImagesLoaded(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      };
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('about-section');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-advance slideshow every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((current) => (current + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handleImageError = (index: number) => {
    console.error(`Failed to load image at index ${index}`);
    setImagesLoaded(prev => {
      const newState = [...prev];
      newState[index] = false;
      return newState;
    });
  };

  return (
    <section id="about-section" className="relative overflow-hidden bg-black">
      {/* Enhanced background effects with solid black edges */}
      <div className="absolute inset-0">
        {/* Base black background */}
        <div className="absolute inset-0 bg-black" />
        
        {/* Centered glow effect with fade to black at edges */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(144,74,242,0.15),transparent_40%)]" />
        
        {/* Gradient overlays to ensure black edges */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#904af2]/5 to-black opacity-30" />
      </div>
      
      {/* Content wrapper with updated mobile padding */}
      <div className="relative z-[2] py-12 sm:py-20 px-4">
        {/* Mobile background image */}
        <div className="md:hidden absolute inset-0 before:absolute before:inset-0 before:bg-black/70 before:z-[1]">
          {imagesLoaded[activeImage] && (
            <img
              src={images[activeImage].url}
              alt={images[activeImage].alt}
              className="w-full h-full object-cover transition-opacity duration-1000"
            />
          )}
        </div>

        <div className="container mx-auto max-w-7xl">
          {/* Desktop and Tablet Layout */}
          <div className={`hidden md:grid md:grid-cols-[1fr_1.5fr] lg:grid-cols-[1.2fr_1.5fr] gap-8 lg:gap-12 items-start
            transform transition-all duration-1000 ease-out
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            
            {/* Left side - Interactive Image Gallery */}
            <div className="relative">
              <div className="relative aspect-square w-full md:max-w-[600px] lg:max-w-[500px] mx-auto">
                {/* Main image */}
                <div className="relative w-full h-full">
                  {imagesLoaded[activeImage] ? (
                    <img
                      src={images[activeImage].url}
                      alt={images[activeImage].alt}
                      className="w-full h-full object-cover rounded-2xl shadow-2xl transition-opacity duration-1000"
                      onError={() => handleImageError(activeImage)}
                    />
                  ) : (
                    <div className="w-full h-full bg-[#904af2]/10 rounded-2xl animate-pulse" />
                  )}
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-black/30 to-transparent rounded-2xl" />
                  
                  {/* Floating elements */}
                  <div className="absolute -right-4 -top-4 p-4 bg-black/80 rounded-lg backdrop-blur-sm">
                    <Bot className="w-6 h-6 text-[#904af2]" />
                  </div>
                  <div className="absolute -left-4 -bottom-4 p-4 bg-black/80 rounded-lg backdrop-blur-sm">
                    <Sparkles className="w-6 h-6 text-[#904af2]" />
                  </div>
                </div>
              </div>
              
              {/* Image navigation dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 
                      ${activeImage === index ? 'bg-[#904af2] w-6' : 'bg-white/50 hover:bg-white/80'}`}
                    aria-label={`View image ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Right side content */}
            <div className="text-right space-y-8 sm:space-y-12">
              <div className="inline-flex flex-col items-end">
                <div className="relative inline-block mb-2 group">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-montserrat font-black relative z-10">
                    <span className="gradient-text">ABOUT US</span>
                  </h2>
                  <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#904af2]/20 rounded-full blur-xl
                    group-hover:w-12 group-hover:h-12 transition-all duration-300" />
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-montserrat font-black text-white relative group">
                  WHAT IS STUDIOBOTS?
                  <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#904af2]/20 rounded-full blur-lg
                    group-hover:w-10 group-hover:h-10 transition-all duration-300" />
                </h3>
              </div>

              <div className="space-y-6 relative">
                <div className="absolute -left-8 top-0 bottom-0 w-px">
                  <div className="h-full bg-gradient-to-b from-transparent via-[#904af2]/50 to-transparent
                    animate-pulse" />
                </div>
                
                <p className="text-base sm:text-lg leading-relaxed text-justify text-gray-300 hover:text-white transition-colors duration-300">
                  We're not just another AI tool. Our mission is simple: to unlock your{' '}
                  <span className="relative inline-block group">
                    <span className="relative z-10 font-bold gradient-text">creative potential</span>
                    <span className="absolute inset-x-0 bottom-0 h-px bg-[#904af2] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </span>. 
                  Your passion is creating exceptional tattoos, not managing appointments, billing, or client communications.
                </p>
                <p className="text-base sm:text-lg leading-relaxed text-justify text-gray-300 hover:text-white transition-colors duration-300">
                  We've built intelligent, user-friendly solutions to handle these tasks for you. This frees you to focus solely on your art. 
                  Let us manage the behind-the-scenes work so you can continue crafting{' '}
                  <span className="relative inline-block group">
                    <span className="relative z-10 font-bold gradient-text">stunning, meaningful tattoos</span>
                    <span className="absolute inset-x-0 bottom-0 h-px bg-[#904af2] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </span>.
                </p>
              </div>

              <div className="flex justify-end items-center gap-4 sm:gap-6">
                <div className="text-sm text-gray-400 animate-pulse">Ready to transform your studio?</div>
                <ElegantButton onClick={onStartCall} className="group transform hover:scale-105 transition-transform duration-300">
                  <span className="flex items-center gap-2">
                    Speak to Roxy
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </ElegantButton>
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden flex flex-col items-center space-y-8 relative z-10">
            <div className="text-center space-y-4">
              <h2 className="text-2xl sm:text-3xl font-montserrat font-black relative inline-block">
                <span className="gradient-text">ABOUT US</span>
                <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#904af2]/20 rounded-full blur-xl" />
              </h2>
              <h3 className="text-2xl sm:text-3xl font-montserrat font-black text-white relative inline-block">
                WHAT IS STUDIOBOTS?
                <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#904af2]/20 rounded-full blur-lg" />
              </h3>
            </div>

            <div className="space-y-6 text-gray-300 px-4">
              <p className="text-base sm:text-lg leading-relaxed text-justify">
                We're not just another AI tool. Our mission is simple: to unlock your{' '}
                <span className="relative inline-block group">
                  <span className="relative z-10 font-bold gradient-text">creative potential</span>
                  <span className="absolute inset-x-0 bottom-0 h-px bg-[#904af2] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </span>. 
                Your passion is creating exceptional tattoos, not managing appointments, billing, or client communications.
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-justify">
                We've built intelligent, user-friendly solutions to handle these tasks for you. This frees you to focus solely on your art. 
                Let us manage the behind-the-scenes work so you can continue crafting{' '}
                <span className="relative inline-block group">
                  <span className="relative z-10 font-bold gradient-text"><strong>stunning, meaningful tattoos</strong></span>
                  <span className="absolute inset-x-0 bottom-0 h-px bg-[#904af2] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </span>.
              </p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="text-sm text-gray-400 animate-pulse">Ready to transform your studio?</div>
              <ElegantButton onClick={onStartCall} className="group transform hover:scale-105 transition-transform duration-300 w-full sm:w-auto">
                <span className="flex items-center justify-center gap-2">
                  Speak to Roxy
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </ElegantButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}