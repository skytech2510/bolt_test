import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, ArrowLeft } from 'lucide-react';
import { ElegantButton } from './buttons/ButtonEffects';
import { CheckoutPage } from './CheckoutPage';
export function PricingPlans() {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: import.meta.env.VITE_STRIPE_SECRET_KEY,
  };
  console.log(options);
  const [selectedPlan, setSelectedPlan] = useState<{
    id: string;
    name: string;
    price: string;
  } | null>(null);

  const plans = [
    {
      id: 'price_basic',
      name: 'Basic',
      price: '$49',
      period: 'per month',
      description: 'Perfect for small tattoo shops',
      features: [
        'AI Voice Assistant',
        'Basic Call Handling',
        'Email Support',
        'Up to 100 Calls/Month',
        'Basic Analytics',
      ],
      highlight: false,
    },
    {
      id: 'price_professional',
      name: 'Professional',
      price: '$99',
      period: 'per month',
      description: 'Most popular for growing studios',
      features: [
        'Everything in Basic, plus:',
        'Advanced Call Management',
        'Priority Support',
        'Up to 500 Calls/Month',
        'Detailed Analytics',
        'Custom Voice Training',
        'Calendar Integration',
      ],
      highlight: true,
    },
    {
      id: 'price_enterprise',
      name: 'Enterprise',
      price: '$199',
      period: 'per month',
      description: 'For large tattoo businesses',
      features: [
        'Everything in Professional, plus:',
        'Unlimited Calls',
        'Multiple Voice Agents',
        'Dedicated Account Manager',
        'Custom Integration',
        'Advanced AI Training',
        'Multi-Location Support',
      ],
      highlight: false,
    },
  ];

  const handleBackToDashboard = () => {
    window.location.href = '/';
  };

  if (selectedPlan) {
    return (
        <CheckoutPage
          planId={selectedPlan.id}
          planName={selectedPlan.name}
          planPrice={selectedPlan.price}
          onBack={() => setSelectedPlan(null)}
        />
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={handleBackToDashboard}
          className="mb-8 flex items-center text-zinc-400 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Dashboard
        </motion.button>

        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-montserrat font-black mb-4"
          >
            Choose Your <span className="gradient-text">Plan</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Select the perfect plan for your tattoo studio and start
            transforming your client communication today
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-2xl backdrop-blur-xl border ${
                plan.highlight
                  ? 'border-[#904af2] bg-[#904af2]/10'
                  : 'border-zinc-800/50 bg-black/40'
              } p-8 flex flex-col`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#904af2] text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-400 ml-2">{plan.period}</span>
                </div>
                <p className="text-gray-400">{plan.description}</p>
              </div>

              <div className="flex-grow">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          plan.highlight ? 'bg-[#904af2]' : 'bg-purple-600/20'
                        }`}
                      >
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <ElegantButton
                onClick={() =>
                  setSelectedPlan({
                    id: plan.id,
                    name: plan.name,
                    price: plan.price,
                  })
                }
                className={`w-full justify-center ${
                  plan.highlight ? '' : 'bg-transparent border border-[#904af2]'
                }`}
              >
                Get Started
              </ElegantButton>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
