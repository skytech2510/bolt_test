import React, { useEffect, useRef, useState } from 'react';
import { Sparkles } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const ElegantButton: React.FC<ButtonProps> = ({ children, onClick, className = '' }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const isMobile = window.innerWidth < 768;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className={`group relative px-6 sm:px-8 py-3 bg-[#904af2] overflow-hidden
        rounded-lg ${className} transition-all duration-300
        hover:bg-[#9d5ff5] active:bg-[#8043e0]
        min-h-[48px] touch-manipulation`}
    >
      {!isMobile && (
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,255,255,0.1) 0%, transparent 60%)`,
          }}
        />
      )}

      <div className="relative flex items-center justify-center gap-2">
        <span className="text-white font-medium tracking-wide text-base sm:text-base
          transition-all duration-300">
          {children}
        </span>
      </div>
    </button>
  );
};

export const HologramButton: React.FC<ButtonProps> = ({ children, onClick, className = '' }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [glitchInterval, setGlitchInterval] = useState<number | null>(null);
  const isMobile = window.innerWidth < 768;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 8;
    const y = (e.clientY - rect.top - rect.height / 2) / 8;
    setMousePosition({ x, y });
  };

  useEffect(() => {
    if (isMobile) return;

    if (isHovered) {
      const interval = window.setInterval(() => {
        if (buttonRef.current) {
          const glitch = buttonRef.current.querySelector('.hologram-glitch') as HTMLElement;
          if (glitch) {
            const randomX = (Math.random() - 0.5) * 5;
            const randomY = (Math.random() - 0.5) * 5;
            glitch.style.transform = `translate(${randomX}px, ${randomY}px)`;
            glitch.style.opacity = Math.random() > 0.9 ? '0.4' : '0';
          }
        }
      }, 100);
      setGlitchInterval(interval);
    } else {
      if (glitchInterval) {
        clearInterval(glitchInterval);
      }
    }
    return () => {
      if (glitchInterval) {
        clearInterval(glitchInterval);
      }
    };
  }, [isHovered, isMobile]);

  const buttonStyle = isMobile ? {} : {
    transform: `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
    transition: 'transform 0.2s',
  };

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => {
        if (!isMobile) {
          setIsHovered(false);
          setMousePosition({ x: 0, y: 0 });
        }
      }}
      className={`group relative px-6 sm:px-8 py-3 bg-transparent overflow-hidden
        border border-[#904af2]/20 rounded-lg ${className} 
        before:absolute before:inset-0 before:bg-[#904af2]/3 before:opacity-0 before:transition-opacity
        before:duration-300 hover:before:opacity-100
        min-h-[48px] touch-manipulation`}
      style={buttonStyle}
    >
      {!isMobile && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-[#904af2]/3 to-[#6366f1]/3" />
          
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute inset-0 bg-gradient-to-b from-transparent via-[#904af2]/3 to-transparent"
              style={{
                transform: `translateX(${mousePosition.x * (i + 1)}px) translateY(${mousePosition.y * (i + 1)}px)`,
                opacity: isHovered ? 0.3 - i * 0.08 : 0,
                transition: 'transform 0.3s, opacity 0.4s',
              }}
            />
          ))}
          
          <div className="hologram-glitch absolute inset-0 bg-[#904af2]/10 opacity-0 transition-transform duration-75" />
          
          <div className="absolute inset-0 mix-blend-screen opacity-0 group-hover:opacity-30">
            <div className="absolute inset-0 bg-[#ff0000]/10" style={{ transform: `translate(${mousePosition.x * 0.3}px, 0)` }} />
            <div className="absolute inset-0 bg-[#00ff00]/10" style={{ transform: `translate(${-mousePosition.x * 0.3}px, 0)` }} />
            <div className="absolute inset-0 bg-[#0000ff]/10" style={{ transform: `translate(0, ${mousePosition.y * 0.3}px)` }} />
          </div>
        </>
      )}
      
      <div className="relative flex items-center justify-center gap-2 z-10">
        <Sparkles className="w-4 h-4 transition-all duration-300 opacity-60" />
        <span className="relative text-[#904af2]/80 text-base sm:text-base">
          {children}
        </span>
      </div>
    </button>
  );
};