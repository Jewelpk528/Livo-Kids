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

  // Subpage State
  const [subPage, setSubPage] = useState<'learn' | 'game'>('learn');
  const [targetNumber, setTargetNumber] = useState<string>('5');
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [incorrectAttempts, setIncorrectAttempts] = useState(0);

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

  const initGame = () => {
    // Keep game target numbers 1 to 10 for beautiful layout and easy counting
    const gameKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    const randomTarget = gameKeys[Math.floor(Math.random() * gameKeys.length)];
    const otherKeys = gameKeys.filter(k => k !== randomTarget);
    const shuffledOthers = [...otherKeys].sort(() => 0.5 - Math.random());
    const selectedOptions = [randomTarget, ...shuffledOthers.slice(0, 3)].sort(() => 0.5 - Math.random());
    
    setTargetNumber(randomTarget);
    setOptions(selectedOptions);
    setIncorrectAttempts(0);
    // Ask question
    speakText(`Let's count the items! How many are there?`);
  };

  const handleOptionClick = (numStr: string) => {
    if (numStr === targetNumber) {
      playSound('sparkle');
      speakText(`Yes! Excellent! There are ${targetNumber} ${NUMBER_DATA[targetNumber].word}!`);
      setScore(prev => {
        const nextScore = prev + 1;
        if (nextScore >= 5) {
          setShowTrophy(true);
          setShowAd(true);
          setSubPage('learn');
          return 0;
        }
        setTimeout(() => {
          initGame();
        }, 2200);
        return nextScore;
      });
    } else {
      playSound('pop');
      setIncorrectAttempts(prev => prev + 1);
      speakText(`That is ${numStr}. Let's count again! how many do you see?`);
    }
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
        className="flex flex-col flex-1 px-4 pt-4 pb-1 min-h-0"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9, translateY: 4 }}
              onClick={() => {
                playSound('pop');
                if (subPage === 'game') {
                  setSubPage('learn');
                } else {
                  onBack();
                }
              }}
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

        {/* Sub-navigation Switcher pills */}
        <div className="flex justify-center mb-4">
          <div className="bg-white/30 backdrop-blur-sm p-1 rounded-full flex gap-1 border border-white/20">
            <button
              onClick={() => { playSound('pop'); setSubPage('learn'); }}
              className={`px-4 py-1.5 rounded-full text-xs font-black transition-all ${
                subPage === 'learn' ? 'bg-white text-kids-pink shadow-md' : 'text-white hover:bg-white/10'
              }`}
            >
              📖 COUNT 1-20
            </button>
            <button
              onClick={() => { playSound('pop'); setSubPage('game'); initGame(); }}
              className={`px-4 py-1.5 rounded-full text-xs font-black transition-all ${
                subPage === 'game' ? 'bg-white text-emerald-800 shadow-md' : 'text-white hover:bg-white/10'
              }`}
            >
              🎮 COUNTING GAME
            </button>
          </div>
        </div>

        {/* Content View toggle */}
        {subPage === 'learn' ? (
          /* Grid */
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
        ) : (
          /* Counting Game display */
          <div className="flex-1 flex flex-col justify-start items-center relative py-2">
            {/* Scoreboard */}
            <div className="flex items-center gap-2 mb-4 bg-white/60 p-3 rounded-2xl border-2 border-white max-w-xs justify-center w-full shadow-md text-emerald-800 font-extrabold text-sm uppercase">
              <span>Goal: 5 Stars!</span>
              <div className="flex gap-1 ml-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={`text-xl transition-all duration-300 ${i < score ? 'scale-110 drop-shadow' : 'opacity-30'}`}>⭐</span>
                ))}
              </div>
            </div>

            {/* Emojis to count */}
            <div className="flex flex-col items-center justify-center flex-1 w-full max-h-[160px] bg-white/30 backdrop-blur-sm rounded-3xl p-4 border border-white/20 mb-6 relative">
              <div className="text-[10px] uppercase font-black tracking-wide text-rose-500 mb-2">Count these:</div>
              <motion.div 
                key={targetNumber}
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                onClick={() => speakText(`How many ${NUMBER_DATA[targetNumber].word} do you see?`)}
                className="flex flex-wrap items-center justify-center gap-3 select-none max-w-xs cursor-pointer"
              >
                {Array.from({ length: parseInt(targetNumber, 10) }).map((_, idx) => (
                  <motion.span 
                    key={idx}
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 1.5, delay: idx * 0.1, repeat: Infinity }}
                    className="text-4xl drop-shadow-sm filter saturate-120"
                  >
                    {NUMBER_DATA[targetNumber].emoji}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            {/* Answer Options buttons */}
            <div className="grid grid-cols-4 gap-2 w-full max-w-sm px-2">
              {options.map((numStr) => (
                <motion.button
                  key={numStr}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => handleOptionClick(numStr)}
                  className={`aspect-square rounded-2xl ${NUMBER_DATA[numStr].color} text-white font-black text-3xl flex items-center justify-center bold-card-shadow-blue shadow-md border-4 border-white/60 transition-all`}
                >
                  {numStr}
                </motion.button>
              ))}
            </div>

            <button 
              onClick={initGame} 
              className="mt-6 font-black text-[10px] tracking-widest text-[#006699] uppercase bg-white/40 px-4 py-2 rounded-full border border-white/40 hover:bg-white/60 transition-colors"
            >
              🔊 REPEAT COUNT DIRECTIVE
            </button>
          </div>
        )}
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
