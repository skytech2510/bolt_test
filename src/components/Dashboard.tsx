import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trophy, Target, Zap } from 'lucide-react';
import { VoiceAgentCard } from './VoiceAgentCard';
import { CreateAgentModal } from './CreateAgentModal';
import { loadVoiceAgents, deleteVoiceAgent } from '../lib/supabase';
import type { VoiceAgent } from '../types/VoiceAgent';

export function Dashboard() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [agents, setAgents] = useState<VoiceAgent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadAgents = async () => {
    try {
      setLoading(true);
      const data = await loadVoiceAgents();
      console.log('sfefefe');
      setAgents(data);
    } catch (err) {
      console.error('Error loading voice agents:', err);
      setError('Failed to load voice agents');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAgents();
  }, []);

  const handleDeleteAgent = async (id: string) => {
    try {
      await deleteVoiceAgent(id);
      setAgents((prev) => prev.filter((agent) => agent.id !== id));
    } catch (err) {
      console.error('Error deleting voice agent:', err);
      setError('Failed to delete voice agent');
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/10 text-red-500 p-4 rounded-lg text-sm"
        >
          {error}
        </motion.div>
      )}

      {/* Achievement Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-6 rounded-xl flex items-center justify-between"
      >
        <div className="flex items-center space-x-6">
          <div className="w-12 h-12 bg-purple-600/10 rounded-xl flex items-center justify-center">
            <Trophy className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h2 className="text-lg font-medium mb-1">Level 3 Achieved!</h2>
            <p className="text-sm text-zinc-400">
              Your main agent has handled over 1,000 calls successfully.
            </p>
          </div>
        </div>
        <button className="btn-ghost">View Achievements</button>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel p-6 rounded-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-purple-600/10 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-sm text-green-400">↑ 12%</span>
          </div>
          <div className="text-2xl font-medium mb-1">92%</div>
          <div className="text-sm text-zinc-400">Average Success Rate</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-6 rounded-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-purple-600/10 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-sm text-green-400">↑ 8%</span>
          </div>
          <div className="text-2xl font-medium mb-1">1,247</div>
          <div className="text-sm text-zinc-400">Total Calls This Month</div>
        </motion.div>

        {/* Create New Agent Card */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onClick={() => setShowCreateModal(true)}
          className="glass-panel p-6 rounded-xl border border-purple-600/20 hover:border-purple-600/40 transition-all group"
        >
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 bg-purple-600/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-600/20 transition-all">
              <Plus className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="font-medium mb-2">Create New Agent</h3>
            <p className="text-sm text-zinc-400">
              Add another voice agent to your team
            </p>
          </div>
        </motion.button>
      </div>

      {/* Voice Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {agents.map((agent, index) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (index + 1) }}
          >
            <VoiceAgentCard
              agent={{
                name: agent.name,
                status: agent.status,
                performance:
                  Math.round(
                    (agent.successful_calls / agent.total_calls) * 100
                  ) || 0,
                callsToday: agent.total_calls,
                successRate:
                  Math.round(
                    (agent.successful_calls / agent.total_calls) * 100
                  ) || 0,
                level: agent.level,
              }}
              onEdit={() => {}}
              onDelete={() => handleDeleteAgent(agent.id)}
            />
          </motion.div>
        ))}
      </div>

      {showCreateModal && (
        <CreateAgentModal
          onClose={() => setShowCreateModal(false)}
          onCreate={async (data) => {
            console.log(data);
            try {
              await loadAgents(); // Reload agents after creation
              setShowCreateModal(false);
            } catch (err) {
              console.error('Error creating agent:', err);
              setError('Failed to create voice agent');
            }
          }}
        />
      )}
    </div>
  );
}
