import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Lock, CreditCard } from 'lucide-react';

interface CheckoutPageProps {
  planId: string;
  planName: string;
  planPrice: string;
  onBack: () => void;
}

export function CheckoutPage({
  planId,
  planName,
  planPrice,
  onBack,
}: CheckoutPageProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to process checkout'
      );
      console.error('Checkout error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="flex items-center text-zinc-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Plans
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl border border-zinc-800/50 p-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Checkout</h1>
            <p className="text-zinc-400">
              Complete your subscription to {planName}
            </p>
          </div>

          <div className="mb-8 p-6 bg-black/30 rounded-xl border border-zinc-800/50">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between items-center mb-4">
              <span>{planName} Plan</span>
              <span className="text-xl font-bold">{planPrice}/month</span>
            </div>
            <div className="text-sm text-zinc-400">
              Your subscription will begin immediately after successful payment
            </div>
          </div>

          <div className="space-y-6 mb-8">
            <div className="flex items-center gap-3 text-sm text-zinc-400">
              <Shield className="w-4 h-4 text-[#904af2]" />
              <span>
                Your payment is secured by industry-standard encryption
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm text-zinc-400">
              <Lock className="w-4 h-4 text-[#904af2]" />
              <span>
                Your data is protected and never stored on our servers
              </span>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 text-red-500 rounded-lg text-sm">
              {error}
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCheckout}
            disabled={loading}
            className="w-full bg-[#904af2] text-white py-4 rounded-xl font-medium relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
            <div className="flex items-center justify-center gap-2">
              <CreditCard className="w-5 h-5" />
              {loading ? 'Processing...' : 'Proceed to Payment'}
            </div>
          </motion.button>

          <p className="text-center text-sm text-zinc-500 mt-4">
            By proceeding, you agree to our Terms of Service and Privacy Policy
          </p>
        </motion.div>
      </div>
    </div>
  );
}
