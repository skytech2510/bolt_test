import React, { useEffect, useState, useRef } from 'react';
import {
  Phone,
  Calendar,
  Users,
  MessageCircle,
  CalendarCheck,
  Pencil,
  CalendarDays,
  UsersRound,
  MessageSquare,
} from 'lucide-react';
import { HologramButton } from './buttons/ButtonEffects';

interface VoiceAgentsProps {
  onStartCall: () => void;
}

export function VoiceAgents({ onStartCall }: VoiceAgentsProps) {
  const [activeSection, setActiveSection] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [cardTransforms, setCardTransforms] = useState<
    { x: number; y: number }[]
  >([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const mouseTrailRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      title: 'TATTOO SHOPS',
      features: [
        {
          icon: Phone,
          title: 'Client Communication',
          description:
            'Answer incoming calls, respond to messages, and provide pricing and service information instantly.',
        },
        {
          icon: Calendar,
          title: 'Appointment Management',
          description:
            'Schedule and book appointments, send reminders, and organize waitlists with ease.',
        },
        {
          icon: MessageCircle,
          title: 'Customer Support',
          description:
            'Handle FAQs, provide aftercare instructions, and answer any client inquiries.',
        },
      ],
    },
    {
      title: 'TATTOO ARTISTS',
      features: [
        {
          icon: CalendarCheck,
          title: 'Manage Your Bookings',
          description:
            'Automatically handle your personal bookings, cancellations, and rescheduling.',
        },
        {
          icon: Pencil,
          title: 'Stay Organized',
          description:
            'Send personalized messages to clients about upcoming appointments and aftercare follow-ups.',
        },
        {
          icon: Users,
          title: 'Creative Freedom',
          description:
            'Focus on your art while the AI assistant takes care of the administrative work.',
        },
      ],
    },
    {
      title: 'TATTOO EVENTS',
      features: [
        {
          icon: CalendarDays,
          title: 'Efficient Event Management',
          description:
            'Handle attendee inquiries, register participants, and manage event schedules seamlessly.',
        },
        {
          icon: UsersRound,
          title: 'Vendor Coordination',
          description:
            'Automate communication with vendors, handle booth assignments, and send out reminders.',
        },
        {
          icon: MessageSquare,
          title: 'Customer Engagement',
          description:
            'Provide event information, answer FAQs, and promote ticket sales via voice or text messaging.',
        },
      ],
    },
  ];

  useEffect(() => {
    setCardTransforms(Array(9).fill({ x: 0, y: 0 }));

    if (!isHovering) {
      const interval = setInterval(() => {
        setActiveSection((prev) => (prev + 1) % services.length);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [isHovering, services.length]);

  useEffect(() => {
    let mouseTrailTimeout: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (mouseTrailRef.current) {
        const trail = mouseTrailRef.current;
        const rect = sectionRef.current?.getBoundingClientRect();

        if (rect) {
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          // Clear previous timeout
          window.clearTimeout(mouseTrailTimeout);

          // Show and position the trail
          trail.style.opacity = '1';
          trail.style.transform = `translate(${x}px, ${y}px)`;

          // Hide the trail after 1 second of no movement
          mouseTrailTimeout = window.setTimeout(() => {
            trail.style.opacity = '0';
          }, 1000);
        }
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (section) {
        section.removeEventListener('mousemove', handleMouseMove);
      }
      window.clearTimeout(mouseTrailTimeout);
    };
  }, []);

  const handleMouseMove = (
    e: React.TouchEvent | React.MouseEvent,
    cardIndex: number
  ) => {
    if (!sectionRef.current) return;

    let x, y;
    if ('touches' in e) {
      const touch = e.touches[0];
      const card = e.currentTarget.getBoundingClientRect();
      x = ((touch.clientX - card.left) / card.width) * 100;
      y = ((touch.clientY - card.top) / card.height) * 100;
    } else {
      const card = e.currentTarget.getBoundingClientRect();
      x = ((e.clientX - card.left) / card.width) * 100;
      y = ((e.clientY - card.top) / card.height) * 100;
    }

    setMousePosition({ x, y });
    setHoveredCard(cardIndex);

    const card = e.currentTarget.getBoundingClientRect();
    const centerX = card.left + card.width / 2;
    const centerY = card.top + card.height / 2;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const rotateX = -((clientY - centerY) / (card.height / 2)) * 10;
    const rotateY = ((clientX - centerX) / (card.width / 2)) * 10;

    setCardTransforms((prev) => {
      const newTransforms = [...prev];
      newTransforms[cardIndex] = { x: rotateY, y: rotateX };
      return newTransforms;
    });
  };

  const handleMouseLeave = (cardIndex: number) => {
    setHoveredCard(null);
    setCardTransforms((prev) => {
      const newTransforms = [...prev];
      newTransforms[cardIndex] = { x: 0, y: 0 };
      return newTransforms;
    });
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 relative overflow-hidden bg-black"
    >
      {/* Mouse trail effect */}
      <div
        ref={mouseTrailRef}
        className="fixed w-[400px] h-[400px] pointer-events-none transition-all duration-300 ease-out opacity-0"
        style={{
          background:
            'radial-gradient(circle, rgba(144,74,242,0.15) 0%, rgba(144,74,242,0.05) 30%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
        }}
      />

      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(144,74,242,0.15),transparent_40%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#904af2]/5 to-black opacity-30" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-[2] w-full">
        <div className="flex flex-col items-center gap-4 md:gap-6 mb-8 md:mb-16">
          <h2 className="text-xl md:text-3xl lg:text-4xl font-montserrat font-black text-center relative">
            <span className="gradient-text">3 AI VOICE AGENTS</span>
          </h2>
          <h3 className="text-xl md:text-3xl lg:text-4xl font-montserrat font-black text-center">
            BUILT FOR{' '}
            <span className="gradient-text relative inline-block">TATTOO</span>{' '}
            <span className="whitespace-nowrap">SHOPS, ARTISTS,</span>
            <br />
            AND EVENTS
          </h3>
        </div>

        <div className="relative perspective-[1000px]">
          <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mb-8 sm:mb-12">
            {services.map((service, index) => (
              <button
                key={index}
                onClick={() => setActiveSection(index)}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className={`relative px-4 sm:px-6 py-3 rounded-lg transition-all duration-500 overflow-hidden
                  ${
                    activeSection === index
                      ? 'bg-[#904af2]/20'
                      : 'bg-transparent hover:bg-[#904af2]/10'
                  }
                  group min-h-[48px] touch-manipulation w-full sm:w-auto`}
              >
                <span
                  className={`relative z-10 font-montserrat font-bold transition-colors duration-300 text-sm sm:text-base
                  ${
                    activeSection === index
                      ? 'text-white'
                      : 'text-gray-400 group-hover:text-white'
                  }`}
                >
                  {service.title}
                </span>
                {activeSection === index && (
                  <div className="absolute inset-0 bg-[#904af2]/20 animate-pulse" />
                )}
              </button>
            ))}
          </div>

          <div className="relative min-h-[800px] sm:min-h-[450px]">
            {services.map((service, serviceIndex) => (
              <div
                key={serviceIndex}
                className={`absolute inset-0 transition-all duration-700 transform
                  ${
                    activeSection === serviceIndex
                      ? 'opacity-100 translate-x-0 scale-100'
                      : serviceIndex < activeSection
                      ? 'opacity-0 -translate-x-full scale-95'
                      : 'opacity-0 translate-x-full scale-95'
                  }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                  {service.features.map((feature, featureIndex) => {
                    const Icon = feature.icon;
                    const cardIndex = serviceIndex * 3 + featureIndex;
                    const transform = cardTransforms[cardIndex] || {
                      x: 0,
                      y: 0,
                    };

                    return (
                      <div
                        key={featureIndex}
                        className="relative perspective-[1000px] transform-style-preserve-3d"
                      >
                        <div
                          className="relative bg-black/50 backdrop-blur-xl rounded-2xl border border-[#904af2]/20
                            hover:border-[#904af2]/40 transition-all duration-500 group overflow-hidden
                            transform-style-preserve-3d will-change-transform min-h-[250px]
                            p-6 sm:p-8"
                          style={{
                            transform: `
                              perspective(1000px)
                              rotateX(${transform.y}deg)
                              rotateY(${transform.x}deg)
                              scale3d(1, 1, 1)
                            `,
                            transition:
                              hoveredCard === cardIndex
                                ? 'transform 0.1s ease-out'
                                : 'transform 0.5s ease-out',
                          }}
                          onMouseMove={(e) => handleMouseMove(e, cardIndex)}
                          onTouchMove={(e) => handleMouseMove(e, cardIndex)}
                          onMouseEnter={() => setHoveredCard(cardIndex)}
                          onTouchStart={() => setHoveredCard(cardIndex)}
                          onMouseLeave={() => handleMouseLeave(cardIndex)}
                          onTouchEnd={() => handleMouseLeave(cardIndex)}
                        >
                          {hoveredCard === cardIndex && (
                            <div
                              className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                              style={{
                                background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(144,74,242,0.2) 0%, rgba(233,30,99,0.1) 25%, rgba(33,150,243,0.05) 50%, transparent 70%)`,
                                opacity: 1,
                              }}
                            />
                          )}

                          <div
                            className="absolute inset-0 bg-gradient-to-br from-[#904af2]/10 to-transparent opacity-0 
                            group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                          />
                          <div
                            className="absolute -inset-0.5 bg-[#904af2]/20 blur-xl opacity-0 
                            group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                          />

                          <div className="relative z-10 transform-style-preserve-3d">
                            <div
                              className="w-12 h-12 bg-[#904af2]/20 rounded-xl flex items-center justify-center mb-4
                              group-hover:scale-110 transition-transform duration-500 relative
                              transform translate-z-20"
                            >
                              <Icon className="w-6 h-6 text-[#904af2] group-hover:text-white transition-colors duration-500" />
                              <div
                                className="absolute inset-0 bg-[#904af2]/30 blur-xl opacity-0 
                                group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
                              />
                            </div>

                            <h4
                              className="text-lg font-bold mb-2 text-white/90 group-hover:text-white 
                              transition-colors duration-300 transform translate-z-10"
                            >
                              {feature.title}
                            </h4>

                            <p
                              className="text-base text-gray-400 group-hover:text-gray-300 
                              transition-colors duration-300 leading-relaxed"
                            >
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="block md:hidden text-center mt-16">
            <HologramButton
              onClick={onStartCall}
              className="w-full sm:w-auto min-h-[48px] touch-manipulation"
            >
              Try Voice Agent Demo
            </HologramButton>
          </div>
        </div>
      </div>
    </section>
  );
}
