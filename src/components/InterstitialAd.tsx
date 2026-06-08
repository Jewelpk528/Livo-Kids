import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Trophy, Star } from 'lucide-react';

interface InterstitialAdProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InterstitialAd = ({ isOpen, onClose }: InterstitialAdProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-[40px] w-full max-w-sm overflow-hidden relative shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors z-10"
            >
              <X size={20} className="text-gray-500" />
            </button>

            {/* Ad Content */}
            <div className="flex flex-col">
              <div className="bg-kids-yellow p-8 flex flex-col items-center justify-center relative overflow-hidden">
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute opacity-10"
                >
                  <Sparkles size={200} className="text-white" />
                </motion.div>
                
                <div className="bg-white p-6 rounded-[32px] shadow-lg mb-4 relative z-10">
                  <Star size={48} className="text-kids-yellow fill-current" />
                </div>
                <h3 className="text-white text-2xl font-black tracking-tight z-10">KIDS ACADEMY</h3>
                <span className="text-white/80 text-[10px] font-black uppercase tracking-widest z-10">Premium Content</span>
              </div>

              <div className="p-8 text-center bg-white flex flex-col items-center">
                <h2 className="text-xl font-black text-gray-800 mb-2">Unlock 100+ Games!</h2>
                <p className="text-gray-500 text-sm font-medium mb-8 leading-relaxed">
                  Join our premium club for more fun stickers, coloring pages, and exciting animal facts!
                </p>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="w-full bg-kids-pink text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-pink-200 border-b-4 border-pink-600 active:border-b-0 transition-all flex items-center justify-center gap-2"
                >
                  <Trophy size={20} />
                  TRY FOR FREE
                </motion.button>
                
                <button 
                  onClick={onClose}
                  className="mt-4 text-[10px] font-black text-gray-300 uppercase tracking-widest hover:text-gray-400 transition-colors"
                >
                  Continue with Ads
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
