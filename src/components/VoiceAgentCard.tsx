import { motion } from 'framer-motion';
import { Mic, Star, Settings, Trash2, BarChart2 } from 'lucide-react';

interface VoiceAgentCardProps {
  agent: {
    name: string;
    status: 'active' | 'inactive' | 'training';
    performance: number;
    callsToday: number;
    successRate: number;
    level: number;
  };
  onEdit: () => void;
  onDelete: () => void;
}

export function VoiceAgentCard({ agent, onEdit, onDelete }: VoiceAgentCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="glass-panel p-6 rounded-xl relative overflow-hidden group"
    >
      {/* Level Badge */}
      <div className="absolute top-4 right-4 bg-purple-600/10 px-2 py-1 rounded-full text-xs font-medium text-purple-400 flex items-center">
        <Star className="w-3 h-3 mr-1" />
        Level {agent.level}
      </div>

      {/* Agent Status Indicator */}
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-purple-600/10 rounded-lg flex items-center justify-center mr-4">
          <Mic className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h3 className="font-medium text-lg">{agent.name}</h3>
          <div className="flex items-center">
            <span className={`w-1.5 h-1.5 rounded-full ${
              agent.status === 'active' ? 'bg-green-500' : 'bg-zinc-500'
            } mr-2`}></span>
            <span className="text-sm text-zinc-400 capitalize">{agent.status}</span>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-[#0c0d0e] rounded-lg p-3">
          <div className="text-sm text-zinc-400 mb-1">Performance</div>
          <div className="text-lg font-medium">{agent.performance}%</div>
          <div className="w-full bg-zinc-800 rounded-full h-1 mt-2">
            <div 
              className="bg-purple-600 h-1 rounded-full"
              style={{ width: `${agent.performance}%` }}
            ></div>
          </div>
        </div>
        <div className="bg-[#0c0d0e] rounded-lg p-3">
          <div className="text-sm text-zinc-400 mb-1">Today's Calls</div>
          <div className="text-lg font-medium">{agent.callsToday}</div>
          <BarChart2 className="w-4 h-4 text-zinc-600 mt-2" />
        </div>
        <div className="bg-[#0c0d0e] rounded-lg p-3">
          <div className="text-sm text-zinc-400 mb-1">Success Rate</div>
          <div className="text-lg font-medium">{agent.successRate}%</div>
          <div className="w-full bg-zinc-800 rounded-full h-1 mt-2">
            <div 
              className="bg-green-500 h-1 rounded-full"
              style={{ width: `${agent.successRate}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <button
          onClick={onEdit}
          className="btn-ghost flex items-center text-sm"
        >
          <Settings className="w-4 h-4 mr-2" />
          Configure
        </button>
        <button
          onClick={onDelete}
          className="btn-ghost flex items-center text-sm text-red-400 hover:text-red-300"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </button>
      </div>

      {/* Progress to Next Level */}
      <div className="mt-6 pt-4 border-t border-zinc-800/50">
        <div className="flex justify-between items-center text-sm mb-2">
          <span className="text-zinc-400">Progress to Level {agent.level + 1}</span>
          <span className="text-purple-400">75%</span>
        </div>
        <div className="w-full bg-zinc-800 rounded-full h-1">
          <div className="bg-purple-600 h-1 rounded-full w-3/4"></div>
        </div>
      </div>
    </motion.div>
  );
}