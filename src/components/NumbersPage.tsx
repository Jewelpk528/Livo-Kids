import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Sparkles } from 'lucide-react';
import { TrophyModal } from './TrophyModal';
import { InterstitialAd } from './InterstitialAd';
import { useSound } from '../hooks/useSound';
import { AdBanner } from './AdBanner';
import { speak as speakText } from '../lib/speech';

interface NumbersPageProps {
  onBack: () => void;
}

const NUMBERS = Array.from({ length: 20 }, (_, i) => (i + 1).toString());

const NUMBER_DATA: Record<string, { word: string; emoji: string; color: string }> = {
  "1": { word: "Apple", emoji: "🍎", color: "bg-red-400" },
  "2": { word: "Balls", emoji: "⚽", color: "bg-blue-400" },
  "3": { word: "Cats", emoji: "🐱", color: "bg-orange-400" },
  "4": { word: "Dogs", emoji: "🐶", color: "bg-amber-600" },
  "5": { word: "Stars", emoji: "⭐", color: "bg-yellow-400" },
  "6": { word: "Fish", emoji: "🐟", color: "bg-cyan-400" },
  "7": { word: "Grapes", emoji: "🍇", color: "bg-purple-400" },
  "8": { word: "Hearts", emoji: "❤️", color: "bg-pink-400" },
  "9": { word: "Flowers", emoji: "🌸", color: "bg-rose-400" },
  "10": { word: "Pencils", emoji: "✏️", color: "bg-slate-400" },
  "11": { word: "Eggs", emoji: "🥚", color: "bg-orange-200" },
  "12": { word: "Balloons", emoji: "🎈", color: "bg-red-500" },
  "13": { word: "Butterflies", emoji: "🦋", color: "bg-blue-300" },
  "14": { word: "Leaves", emoji: "🍃", color: "bg-green-400" },
  "15": { word: "Candies", emoji: "🍬", color: "bg-pink-300" },
  "16": { word: "Birds", emoji: "🐦", color: "bg-sky-400" },
  "17": { word: "Cakes", emoji: "🍰", color: "bg-orange-300" },
  "18": { word: "Clouds", emoji: "☁️", color: "bg-blue-100" },
  "19": { word: "Frogs", emoji: "🐸", color: "bg-green-500" },
  "20": { word: "Suns", emoji: "☀️", color: "bg-yellow-500" },
};

export const NumbersPage = ({ onBack }: NumbersPageProps) => {
  const { playSound } = useSound();
  const [activeNumber, setActiveNumber] = useState<string | null>(null);
  const [showTrophy, setShowTrophy] = useState(false);
  const [showAd, setShowAd] = useState(false);

  const speak = (num: string, word: string) => {
    playSound('sparkle');
    speakText(`${num}. ${num === "1" ? "" : num} ${word}`);
  };

  const handleNumberClick = (num: string) => {
    if (activeNumber) return;
    
    playSound('pop');
    setActiveNumber(num);
    speak(num, NUMBER_DATA[num].word);

    setTimeout(() => {
      setActiveNumber(null);
    }, 2500);
  };

  const handleFinish = () => {
    playSound('sparkle');
    setShowTrophy(true);
    setShowAd(true);
  };

  return (
    <div className="h-full flex flex-col bg-[#FFDEE9] relative overflow-hidden">
      {/* Decoration */}
      <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
        <Sparkles size={100} className="text-white" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col flex-1 px-4 pt-4 pb-1"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9, translateY: 4 }}
              onClick={() => { playSound('pop'); onBack(); }}
              className="bg-kids-pink text-white p-2 rounded-xl"
            >
              <ChevronLeft size={20} strokeWidth={4} />
            </motion.button>
            <h1 className="text-xl font-black text-white drop-shadow-md">123 Book</h1>
          </div>
          
          <motion.button
            whileTap={{ scale: 0.9, translateY: 4 }}
            onClick={handleFinish}
            className="bg-kids-yellow text-white px-3 py-1.5 rounded-xl font-black text-xs flex items-center gap-1.5"
          >
            <Sparkles size={14} className="fill-current" />
            FINISH
          </motion.button>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar scrollbar-hide">
          <div className="grid grid-cols-4 gap-2 pb-4">
            {NUMBERS.map((num, i) => (
              <motion.button
                key={num}
                initial={{ scale: 0, rotate: 5 }}
                animate={{ 
                  scale: 1, 
                  rotate: 0,
                  y: [0, i % 2 === 0 ? 5 : -5, 0] 
                }}
                transition={{ 
                  scale: { delay: i * 0.02, type: "spring" },
                  y: { duration: 3 + Math.random(), repeat: Infinity, ease: "easeInOut" }
                }}
                whileHover={{ scale: 1.1, rotate: -2 }}
                whileTap={{ scale: 0.9, translateY: 6 }}
                onClick={() => handleNumberClick(num)}
                className={`aspect-square rounded-[24px] ${NUMBER_DATA[num].color} flex items-center justify-center text-3xl font-black text-white bold-card-shadow-blue shadow-lg border-4 border-white/50 transition-all overflow-hidden relative`}
              >
                <AnimatePresence mode="wait">
                  {activeNumber === num ? (
                    <motion.div
                      key="emoji"
                      initial={{ rotateY: 90, opacity: 0 }}
                      animate={{ rotateY: 0, opacity: 1 }}
                      exit={{ rotateY: -90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 flex flex-col items-center justify-center p-2 bg-white/20 backdrop-blur-sm"
                    >
                      <span className="text-3xl mb-1 drop-shadow-md">{NUMBER_DATA[num].emoji}</span>
                      <span className="text-[10px] uppercase font-black tracking-tighter text-white drop-shadow-sm line-clamp-1">{NUMBER_DATA[num].word}</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="num"
                      initial={{ rotateY: -90, opacity: 0 }}
                      animate={{ rotateY: 0, opacity: 1 }}
                      exit={{ rotateY: 90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="drop-shadow-md"
                    >
                      {num}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
      
      <div className="px-3 pb-4 relative z-[60]">
        <AdBanner />
      </div>

      <TrophyModal 
        isOpen={showTrophy}
        onClose={() => setShowTrophy(false)}
        onHome={onBack}
        title="AMAZING!"
        subtitle="You reached number 20!"
        primaryActionText="COUNT AGAIN"
        bgClass="bg-kids-blue/95"
      />

      <InterstitialAd isOpen={showAd} onClose={() => setShowAd(false)} />
    </div>
  );
};
