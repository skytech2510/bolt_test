import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  changeLabel: string;
  icon: React.ReactNode;
  sparklineData?: number[];
}

export function MetricCard({ title, value, change, changeLabel, icon, sparklineData }: MetricCardProps) {
  const isPositive = change >= 0;

  const renderSparkline = () => {
    if (!sparklineData) return null;

    const max = Math.max(...sparklineData);
    const min = Math.min(...sparklineData);
    const range = max - min;
    const points = sparklineData.map((value, index) => {
      const x = (index / (sparklineData.length - 1)) * 100;
      const y = 100 - ((value - min) / range) * 100;
      return `${x},${y}`;
    }).join(' ');

    return (
      <div className="absolute bottom-0 left-0 right-0 h-12 opacity-20">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="sparkline-gradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d={`M 0,100 L ${points} L 100,100 Z`}
            fill="url(#sparkline-gradient)"
            className="text-purple-400"
          />
          <polyline
            points={points}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-purple-400"
          />
        </svg>
      </div>
    );
  };

  return (
    <motion.div
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="glass-panel p-6 rounded-xl relative overflow-hidden group"
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 bg-purple-600/10 rounded-lg flex items-center justify-center group-hover:bg-purple-600/20 transition-colors">
            {icon}
          </div>
          <div className={`flex items-center ${
            isPositive ? 'text-emerald-400' : 'text-red-400'
          } bg-white/5 px-2 py-1 rounded-lg`}>
            {isPositive ? (
              <TrendingUp className="w-4 h-4 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 mr-1" />
            )}
            <span className="text-sm font-medium">{Math.abs(change)}%</span>
          </div>
        </div>
        
        <div className="space-y-1">
          <h4 className="text-sm font-medium text-zinc-400">{title}</h4>
          <div className="text-2xl font-semibold">{value}</div>
          <div className="text-xs text-zinc-400">{changeLabel}</div>
        </div>
      </div>

      {renderSparkline()}

      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </motion.div>
  );
}