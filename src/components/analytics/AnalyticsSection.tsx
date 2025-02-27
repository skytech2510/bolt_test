import React from 'react';
import { motion } from 'framer-motion';
import { GaugeCluster } from '../charts/GaugeCluster';
import { MetricCard } from '../charts/MetricCard';
import { Phone, Clock, Users, MessageSquare, BarChart2, Target, Activity, Zap, TrendingUp } from 'lucide-react';

export function AnalyticsSection() {
  const metrics = [
    {
      title: "Success Rate",
      value: 92,
      icon: <Target className="w-5 h-5 text-emerald-400" />,
      color: "emerald",
      trend: "+8%",
      description: "Successful call completion rate"
    },
    {
      title: "Customer Satisfaction",
      value: 85,
      icon: <Users className="w-5 h-5 text-purple-400" />,
      color: "purple",
      trend: "+12%",
      description: "Based on post-call surveys"
    },
    {
      title: "Agent Efficiency",
      value: 78,
      icon: <Zap className="w-5 h-5 text-blue-400" />,
      color: "blue",
      trend: "+5%",
      description: "Task completion speed"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold mb-2">Analytics Dashboard</h2>
        <p className="text-zinc-400">Real-time insights and performance metrics</p>
      </motion.div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-panel p-6 rounded-xl relative overflow-hidden group"
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br from-${metric.color}-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}></div>
            
            {/* Content */}
            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-10 h-10 bg-black/30 rounded-lg flex items-center justify-center">
                  {metric.icon}
                </div>
                <span className={`text-${metric.color}-400 text-sm font-medium bg-${metric.color}-400/10 px-2 py-1 rounded-full`}>
                  {metric.trend}
                </span>
              </div>

              {/* Metric Value */}
              <div className="mb-4">
                <h3 className="text-sm text-zinc-400 mb-1">{metric.title}</h3>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-bold">{metric.value}%</span>
                </div>
                <p className="text-xs text-zinc-500 mt-1">{metric.description}</p>
              </div>

              {/* Progress Bar */}
              <div className="relative pt-4">
                <div className="w-full h-1.5 bg-black/30 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.value}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    className={`h-full bg-${metric.color}-400 rounded-full relative`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20"></div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Total Calls"
          value="1,247"
          change={12}
          changeLabel="vs. last month"
          icon={<Phone className="w-5 h-5 text-purple-400" />}
          sparklineData={[30, 45, 25, 60, 35, 45, 40, 50, 55, 45, 60, 45]}
          onClick={() => console.log('View call details')}
        />
        
        <MetricCard
          title="Average Duration"
          value="4m 32s"
          change={-3}
          changeLabel="vs. last month"
          icon={<Clock className="w-5 h-5 text-purple-400" />}
          sparklineData={[40, 35, 45, 30, 25, 35, 40, 45, 35, 30, 35, 40]}
          onClick={() => console.log('View duration details')}
        />
        
        <MetricCard
          title="Active Users"
          value="892"
          change={8}
          changeLabel="vs. last month"
          icon={<Users className="w-5 h-5 text-purple-400" />}
          sparklineData={[25, 35, 45, 50, 55, 45, 40, 45, 50, 45, 55, 60]}
          onClick={() => console.log('View user details')}
        />
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-6 rounded-xl relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-medium mb-1 flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2 text-purple-400" />
                  Conversation Analysis
                </h3>
                <p className="text-sm text-zinc-400">Key conversation metrics</p>
              </div>
              <div className="bg-purple-600/10 px-3 py-1 rounded-full text-purple-400 text-sm">
                Last 24 hours
              </div>
            </div>
            
            <div className="space-y-4">
              {[
                { label: 'Average Response Time', value: '1.8s', change: '+0.2s', trend: 'up' },
                { label: 'First Response Rate', value: '92%', change: '+5%', trend: 'up' },
                { label: 'Resolution Rate', value: '88%', change: '+3%', trend: 'up' }
              ].map((metric, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-600/10 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-purple-400" />
                    </div>
                    <span className="text-sm text-zinc-400">{metric.label}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="font-medium">{metric.value}</span>
                    <span className="text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded-full">
                      {metric.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-panel p-6 rounded-xl relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-medium mb-1 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-blue-400" />
                  Goal Progress
                </h3>
                <p className="text-sm text-zinc-400">Monthly targets</p>
              </div>
              <div className="bg-blue-600/10 px-3 py-1 rounded-full text-blue-400 text-sm">
                This Month
              </div>
            </div>
            
            <div className="space-y-6">
              {[
                { label: 'Call Volume', target: '2,000', current: '1,247', percent: 62, color: 'purple' },
                { label: 'Customer Satisfaction', target: '95%', current: '92%', percent: 97, color: 'green' },
                { label: 'Response Time', target: '2s', current: '1.8s', percent: 90, color: 'blue' }
              ].map((goal, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full bg-${goal.color}-400`}></div>
                      <span className="text-zinc-400">{goal.label}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span>{goal.current}</span>
                      <span className="text-zinc-500">/</span>
                      <span className="text-zinc-400">{goal.target}</span>
                    </div>
                  </div>
                  <div className="relative h-2 bg-zinc-800/50 rounded-full overflow-hidden">
                    <div
                      className={`absolute inset-y-0 left-0 bg-gradient-to-r from-${goal.color}-600 to-${goal.color}-400 rounded-full transition-all duration-1000`}
                      style={{ width: `${goal.percent}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20"></div>
                    </div>
                  </div>
                  <div className="text-right text-xs text-zinc-400">
                    {goal.percent}% completed
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}