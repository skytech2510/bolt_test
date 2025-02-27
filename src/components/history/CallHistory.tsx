import React from 'react';
import { Phone, User, Clock, Check, X, MoreVertical, Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface Call {
  id: string;
  caller: string;
  time: string;
  duration: string;
  status: 'completed' | 'missed' | 'failed';
  recording?: string;
}

const calls: Call[] = [
  {
    id: '1',
    caller: '+1 (555) 123-4567',
    time: '10:30 AM',
    duration: '4m 12s',
    status: 'completed',
    recording: 'call-1.mp3'
  },
  {
    id: '2',
    caller: '+1 (555) 987-6543',
    time: '11:15 AM',
    duration: '2m 45s',
    status: 'completed'
  },
  {
    id: '3',
    caller: '+1 (555) 456-7890',
    time: '2:20 PM',
    duration: '-',
    status: 'missed'
  },
  {
    id: '4',
    caller: '+1 (555) 234-5678',
    time: '4:45 PM',
    duration: '1m 30s',
    status: 'failed'
  }
];

export function CallHistory() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <input
            type="text"
            placeholder="Search calls..."
            className="w-full bg-black/30 border border-zinc-800 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#904AF2] transition-all"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
        </div>
        <div className="flex gap-2">
          <select className="bg-black/30 border border-zinc-800 rounded-lg px-3 py-2">
            <option>All Calls</option>
            <option>Completed</option>
            <option>Missed</option>
            <option>Failed</option>
          </select>
          <select className="bg-black/30 border border-zinc-800 rounded-lg px-3 py-2">
            <option>Today</option>
            <option>Yesterday</option>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
          </select>
        </div>
      </div>

      {/* Calls List */}
      <div className="glass-panel rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left p-4 text-sm font-medium text-zinc-400">Caller</th>
                <th className="text-left p-4 text-sm font-medium text-zinc-400">Time</th>
                <th className="text-left p-4 text-sm font-medium text-zinc-400">Duration</th>
                <th className="text-left p-4 text-sm font-medium text-zinc-400">Status</th>
                <th className="text-right p-4 text-sm font-medium text-zinc-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {calls.map((call) => (
                <tr key={call.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/20">
                  <td className="p-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-[#904AF2]/10 rounded-lg flex items-center justify-center mr-3">
                        <User className="w-4 h-4 text-[#904AF2]" />
                      </div>
                      <span>{call.caller}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-zinc-400 mr-2" />
                      {call.time}
                    </div>
                  </td>
                  <td className="p-4">{call.duration}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      call.status === 'completed' ? 'bg-green-500/10 text-green-500' :
                      call.status === 'missed' ? 'bg-yellow-500/10 text-yellow-500' :
                      'bg-red-500/10 text-red-500'
                    }`}>
                      {call.status === 'completed' ? <Check className="w-3 h-3 mr-1" /> :
                       call.status === 'missed' ? <Phone className="w-3 h-3 mr-1" /> :
                       <X className="w-3 h-3 mr-1" />}
                      {call.status.charAt(0).toUpperCase() + call.status.slice(1)}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-zinc-400">
          Showing 1-4 of 120 calls
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-black/30 border border-zinc-800 rounded-lg hover:bg-zinc-800 transition-colors">
            Previous
          </button>
          <button className="px-3 py-1 bg-[#904AF2] rounded-lg hover:bg-[#904AF2]/90 transition-colors">
            Next
          </button>
        </div>
      </div>
    </motion.div>
  );
}