import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Sparkles, Home as HomeIcon } from 'lucide-react';

interface TrophyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onHome: () => void;
  title: string;
  subtitle: string;
  primaryActionText: string;
  bgClass?: string;
  accentClass?: string;
}

export const TrophyModal = ({
  isOpen,
  onClose,
  onHome,
  title,
  subtitle,
  primaryActionText,
  bgClass = "bg-kids-pink/90",
  accentClass = "bg-kids-yellow"
}: TrophyModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`absolute inset-0 z-[100] ${bgClass} backdrop-blur-md flex flex-col items-center justify-center p-8 text-center`}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
            transition={{ delay: 0.2, type: "spring" }}
            className={`${accentClass} p-8 rounded-[50px] shadow-2xl border-8 border-white mb-8`}
          >
            <Trophy size={80} sm={100} className="text-white" strokeWidth={3} />
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-2 tracking-tight drop-shadow-md">{title}</h2>
          <p className="text-white/80 font-bold text-lg sm:text-xl mb-12 uppercase tracking-widest">{subtitle}</p>
          
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <motion.button
              whileTap={{ scale: 0.9, translateY: 4 }}
              onClick={onClose}
              className="bg-white text-kids-pink px-8 py-4 rounded-full font-black text-xl shadow-xl border-b-8 border-pink-100 flex items-center justify-center gap-3 transition-all"
            >
              <Sparkles className="fill-current text-kids-yellow" />
              {primaryActionText}
            </motion.button>
            
            <motion.button
              whileTap={{ scale: 0.9, translateY: 4 }}
              onClick={onHome}
              className="bg-kids-blue text-white px-8 py-4 rounded-full font-black text-xl shadow-xl border-b-8 border-blue-700 flex items-center justify-center gap-3 transition-all"
            >
              <HomeIcon className="fill-current" />
              GO HOME
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
