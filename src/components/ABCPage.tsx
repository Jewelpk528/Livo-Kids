import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Sparkles } from 'lucide-react';
import { TrophyModal } from './TrophyModal';
import { InterstitialAd } from './InterstitialAd';
import { useSound } from '../hooks/useSound';
import { AdBanner } from './AdBanner';
import { speak as speakText } from '../lib/speech';

interface ABCPageProps {
  onBack: () => void;
}

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const WORDS: Record<string, { word: string; emoji: string; color: string; image?: string }> = {
  A: { word: "Apple", emoji: "🍎", color: "bg-red-400", image: "/stickers/Apple-v1.png" },
  B: { word: "Banana", emoji: "🍌", color: "bg-yellow-400", image: "/stickers/Banana-v1.png" },
  C: { word: "Cherry", emoji: "🍒", color: "bg-red-500", image: "/stickers/Cherry-v1.png" },
  D: { word: "Dolphin", emoji: "🐬", color: "bg-blue-300", image: "/stickers/Dolphine-v1.png" },
  E: { word: "Elephant", emoji: "🐘", color: "bg-gray-400", image: "/stickers/Elephant-v1.png" },
  F: { word: "Fish", emoji: "🐟", color: "bg-cyan-400", image: "/stickers/Clownfish-v1.png" },
  G: { word: "Giraffe", emoji: "🦒", color: "bg-yellow-500", image: "/stickers/Giraffe-v1.png" },
  H: { word: "Horse", emoji: "🐴", color: "bg-brown-600" },
  I: { word: "Ice Cream", emoji: "🍦", color: "bg-pink-300" },
  J: { word: "Jellyfish", emoji: "🪼", color: "bg-purple-300", image: "/stickers/Jellyfish-v1.png" },
  K: { word: "Kingfisher", emoji: "🐦", color: "bg-blue-400", image: "/stickers/Kingfisher-v1.png" },
  L: { word: "Lion", emoji: "🦁", color: "bg-orange-400", image: "/stickers/Lion-v1.png" },
  M: { word: "Monkey", emoji: "🐒", color: "bg-amber-800", image: "/stickers/Monkey-v1.png" },
  N: { word: "Nature", emoji: "🌳", color: "bg-green-600" },
  O: { word: "Owl", emoji: "🦉", color: "bg-indigo-500", image: "/stickers/Owl-v1.png" },
  P: { word: "Panda", emoji: "🐼", color: "bg-gray-700", image: "/stickers/Panda-v1.png" },
  Q: { word: "Queen", emoji: "👸", color: "bg-purple-600" },
  R: { word: "Rose", emoji: "🌹", color: "bg-pink-50", image: "/stickers/Rose-v1.png" },
  S: { word: "Shark", emoji: "🦈", color: "bg-slate-500", image: "/stickers/Shark-v1.png" },
  T: { word: "Tiger", emoji: "🐯", color: "bg-orange-600", image: "/stickers/Tiger-v1.png" },
  U: { word: "Unicorn", emoji: "🦄", color: "bg-fuchsia-500" },
  V: { word: "Vulture", emoji: "🦅", color: "bg-stone-600" },
  W: { word: "Whale", emoji: "🐳", color: "bg-blue-600", image: "/stickers/Whale-v1.png" },
  X: { word: "Xylophone", emoji: "🪘", color: "bg-rose-500", image: "https://images.unsplash.com/photo-1594121516032-6804868087bd?w=400&q=80" },
  Y: { word: "Yak", emoji: "🐂", color: "bg-amber-900" },
  Z: { word: "Zebra", emoji: "🦓", color: "bg-zinc-800", image: "/stickers/Zebra-v1.png" },
};

export const ABCPage = ({ onBack }: ABCPageProps) => {
  const { playSound } = useSound();
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const [showTrophy, setShowTrophy] = useState(false);
  const [showAd, setShowAd] = useState(false);

  const speak = (letter: string, word: string) => {
    playSound('sparkle');
    speakText(`${letter} is for ${word}`);
  };

  const handleLetterClick = (letter: string) => {
    if (activeLetter) return;
    
    playSound('pop');
    setActiveLetter(letter);
    speak(letter, WORDS[letter].word);

    setTimeout(() => {
      setActiveLetter(null);
    }, 2500);
  };

  const handleFinish = () => {
    playSound('sparkle');
    setShowTrophy(true);
    setShowAd(true);
  };

  return (
    <div className="h-full flex flex-col bg-[#A3E4FF] relative overflow-hidden">
      {/* Cartoon Decoration */}
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
            <h1 className="text-xl font-black text-white drop-shadow-md">ABC Book</h1>
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
            {ALPHABET.map((letter, i) => (
              <motion.button
                key={letter}
                initial={{ scale: 0, rotate: -5 }}
                animate={{ 
                  scale: 1, 
                  rotate: 0,
                  y: [0, i % 2 === 0 ? -5 : 5, 0] 
                }}
                transition={{ 
                  scale: { delay: i * 0.02, type: "spring" },
                  y: { duration: 3 + Math.random(), repeat: Infinity, ease: "easeInOut" }
                }}
                whileHover={{ scale: 1.1, rotate: 2 }}
                whileTap={{ scale: 0.9, translateY: 6 }}
                onClick={() => handleLetterClick(letter)}
                className={`aspect-square rounded-[24px] ${WORDS[letter].color} flex items-center justify-center text-3xl font-black text-white bold-card-shadow-blue shadow-lg border-4 border-white/50 transition-all overflow-hidden relative ${letter === 'Y' ? 'col-start-2' : ''}`}
              >
                <AnimatePresence mode="wait">
                  {activeLetter === letter ? (
                    <motion.div
                      key="emoji"
                      initial={{ rotateY: 90, opacity: 0 }}
                      animate={{ rotateY: 0, opacity: 1 }}
                      exit={{ rotateY: -90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 flex flex-col items-center justify-center p-2 bg-white/20 backdrop-blur-sm"
                    >
                      {WORDS[letter].image ? (
                        <div className="w-full h-1/2 mb-1 relative flex items-center justify-center translate-y-1">
                          <img 
                            src={WORDS[letter].image} 
                            alt={WORDS[letter].word}
                            className="max-w-[95%] max-h-[95%] object-contain drop-shadow-md z-10"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        </div>
                      ) : (
                        <span className="text-4xl mb-1 drop-shadow-md">{WORDS[letter].emoji}</span>
                      )}
                      <span className="text-[10px] uppercase font-black tracking-tighter text-white drop-shadow-sm">{WORDS[letter].word}</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="letter"
                      initial={{ rotateY: -90, opacity: 0 }}
                      animate={{ rotateY: 0, opacity: 1 }}
                      exit={{ rotateY: 90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="drop-shadow-md"
                    >
                      {letter}
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
        title="FANTASTIC!"
        subtitle="You learned all your ABCs!"
        primaryActionText="KEEP READING"
      />

      <InterstitialAd isOpen={showAd} onClose={() => setShowAd(false)} />
    </div>
  );
};
