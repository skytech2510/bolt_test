import React from 'react';
import { HelpCircle, Book, MessageCircle, Video, ExternalLink, Search } from 'lucide-react';
import { motion } from 'framer-motion';

export function HelpCenter() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Search */}
      <div className="relative w-full max-w-2xl mx-auto mb-8">
        <input
          type="text"
          placeholder="Search help articles..."
          className="w-full bg-black/30 border border-zinc-800 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#904AF2] transition-all"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400" />
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <motion.a
          href="#getting-started"
          className="glass-panel p-4 rounded-xl hover-card flex items-center space-x-3"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-10 h-10 bg-[#904AF2]/10 rounded-lg flex items-center justify-center">
            <Book className="w-5 h-5 text-[#904AF2]" />
          </div>
          <div>
            <h3 className="font-medium">Getting Started</h3>
            <p className="text-sm text-zinc-400">Learn the basics</p>
          </div>
        </motion.a>

        <motion.a
          href="#tutorials"
          className="glass-panel p-4 rounded-xl hover-card flex items-center space-x-3"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-10 h-10 bg-[#FF3366]/10 rounded-lg flex items-center justify-center">
            <Video className="w-5 h-5 text-[#FF3366]" />
          </div>
          <div>
            <h3 className="font-medium">Video Tutorials</h3>
            <p className="text-sm text-zinc-400">Watch and learn</p>
          </div>
        </motion.a>

        <motion.a
          href="#support"
          className="glass-panel p-4 rounded-xl hover-card flex items-center space-x-3"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-emerald-500" />
          </div>
          <div>
            <h3 className="font-medium">Live Support</h3>
            <p className="text-sm text-zinc-400">Chat with us</p>
          </div>
        </motion.a>
      </div>

      {/* Popular Articles */}
      <div className="glass-panel p-6 rounded-xl">
        <h2 className="text-lg font-semibold mb-4">Popular Articles</h2>
        <div className="space-y-4">
          {[
            'How to optimize voice settings for better results',
            'Understanding call analytics and metrics',
            'Best practices for handling customer inquiries',
            'Troubleshooting common issues'
          ].map((article, index) => (
            <motion.a
              key={index}
              href={`#article-${index}`}
              className="block p-4 rounded-lg hover:bg-zinc-800/50 transition-all"
              whileHover={{ x: 4 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <HelpCircle className="w-5 h-5 text-[#904AF2]" />
                  <span>{article}</span>
                </div>
                <ExternalLink className="w-4 h-4 text-zinc-400" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <div className="glass-panel p-6 rounded-xl text-center">
        <h2 className="text-lg font-semibold mb-2">Need More Help?</h2>
        <p className="text-zinc-400 mb-4">Our support team is available 24/7 to assist you</p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-2 bg-[#904AF2] rounded-lg hover:bg-[#904AF2]/90 transition-all"
        >
          Contact Support
        </motion.button>
      </div>
    </motion.div>
  );
}