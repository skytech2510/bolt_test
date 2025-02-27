import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Send } from 'lucide-react';
import { HologramButton } from './buttons/ButtonEffects';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    question: "How Long Does It Take?",
    answer: "The setup is quick and easy! Our team will guide you through every step to make sure Roxy integrates smoothly with your scheduling tools.",
    category: "Setup"
  },
  {
    question: "How Secure Is My Data with Blackwork?",
    answer: "Your data security is our top priority. Blackwork.ai uses advanced encryption to protect your information. Roxy only accesses the data she needs, ensuring your clients' privacy and your studio's confidentiality remain safe.",
    category: "Security"
  },
  {
    question: "How Much Does It Cost?",
    answer: "We offer flexible pricing to fit studios of all sizes. The first 200 tattoo shops can claim Roxy for free. For additional features and larger studios, we have various pricing tiers. Contact us for more details tailored to your needs.",
    category: "Pricing"
  },
  {
    question: "Is Roxy easy to set up and use?",
    answer: "Roxy is user-friendly and easy to set up. Our team will guide you through the installation, and she integrates smoothly with your current scheduling tools. No tech skills needed!",
    category: "Setup"
  },
  {
    question: "How does the AI voice agent handle complex tattoo inquiries?",
    answer: "Our AI is specifically trained on tattoo industry terminology and can handle detailed questions about styles, techniques, and pricing. It provides accurate information while knowing when to escalate complex queries to human staff.",
    category: "Technology"
  },
  {
    question: "What booking features are included?",
    answer: "The system handles appointment scheduling, rescheduling, cancellations, and waitlist management. It automatically sends confirmation emails and reminder notifications to reduce no-shows.",
    category: "Features"
  },
  {
    question: "Is the AI voice agent available 24/7?",
    answer: "Yes, our AI assistant operates round-the-clock, ensuring your studio never misses a booking opportunity and clients can get information anytime.",
    category: "Service"
  },
  {
    question: "How does the system handle multiple artists' schedules?",
    answer: "Each artist can maintain their own calendar, availability, and booking preferences. The AI intelligently manages scheduling conflicts and distributes bookings based on artist specialties.",
    category: "Features"
  },
  {
    question: "What languages are supported?",
    answer: "Currently, our AI assistant is fluent in English, Spanish, and French, with more languages being added regularly to serve diverse client bases.",
    category: "Service"
  }
];

export function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [customQuestion, setCustomQuestion] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomQuestion('');
    setEmail('');
    setName('');
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(144,74,242,0.15),transparent_70%)]" />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#904af2]/5 to-black opacity-50" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10 px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-black mb-4">
            <span className="text-white">FREQUENTLY</span>{' '}
            <span className="gradient-text">ASKED QUESTIONS</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Get instant answers about our AI voice agents and how they can transform your tattoo business
          </p>
        </div>

        <div className="space-y-4 mb-16">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="group relative bg-black/40 backdrop-blur-xl rounded-xl border border-[#904af2]/20
                hover:border-[#904af2]/40 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#904af2]/0 via-[#904af2]/5 to-[#904af2]/0
                opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full text-left p-6 flex items-center justify-between"
              >
                <span className="text-lg font-medium text-white/90 group-hover:text-white transition-colors">
                  {faq.question}
                </span>
                <div className="ml-4 transform transition-transform duration-300">
                  {activeIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-[#904af2]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#904af2]" />
                  )}
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out
                  ${activeIndex === index ? 'max-h-96' : 'max-h-0'}`}
              >
                <div className="p-6 pt-0 text-gray-400">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-black/40 backdrop-blur-xl rounded-xl border border-[#904af2]/20 p-8">
          <h3 className="text-2xl font-montserrat font-black mb-6">
            <span className="gradient-text">ASK</span> A QUESTION
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-black/40 border border-[#904af2]/20 rounded-lg
                    focus:border-[#904af2] focus:ring-2 focus:ring-[#904af2]/20 transition-all duration-300
                    placeholder:text-gray-600 text-white"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-black/40 border border-[#904af2]/20 rounded-lg
                    focus:border-[#904af2] focus:ring-2 focus:ring-[#904af2]/20 transition-all duration-300
                    placeholder:text-gray-600 text-white"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="question" className="block text-sm font-medium text-gray-400 mb-2">
                Your Question
              </label>
              <textarea
                id="question"
                value={customQuestion}
                onChange={(e) => setCustomQuestion(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-black/40 border border-[#904af2]/20 rounded-lg
                  focus:border-[#904af2] focus:ring-2 focus:ring-[#904af2]/20 transition-all duration-300
                  placeholder:text-gray-600 text-white resize-none"
                placeholder="Type your question here..."
              />
            </div>

            <div className="flex justify-end">
              <HologramButton>
                <span className="flex items-center gap-2">
                  Send Question
                  <Send className="w-4 h-4" />
                </span>
              </HologramButton>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}