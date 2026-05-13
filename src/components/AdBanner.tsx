import React from 'react';
import { motion } from 'motion/react';
import { Speaker } from 'lucide-react';

export const AdBanner = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-white/40 backdrop-blur-md border-t border-white/20 py-1.5 flex items-center justify-center gap-3 overflow-hidden shrink-0"
    >
      <div className="bg-kids-yellow text-[9px] font-black px-1.5 py-0.5 rounded text-white shadow-sm flex-shrink-0">AD</div>
      <div className="flex-1 flex items-center gap-2 overflow-hidden max-w-[200px]">
        <motion.div 
          animate={{ x: [200, -200] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="whitespace-nowrap text-[9px] font-bold text-gray-500/60 uppercase tracking-[0.15em] flex items-center gap-8 shrink-0"
        >
          <span>🌟 Unlock Premium Magic!</span>
          <span>🎨 New Stickers Available!</span>
          <span>🎮 More Games Coming Soon!</span>
        </motion.div>
      </div>
      <Speaker size={10} className="text-gray-300 mr-2 flex-shrink-0" />
    </motion.div>
  );
};
