import React, { useState } from 'react';
import { Palette, PaintBucket, ChevronLeft, Sparkles, Volume2, HelpCircle } from "lucide-react";
import { GenericBook, BookCategory } from './GenericBook';
import { useSound } from '../hooks/useSound';
import { speak as speakText } from '../lib/speech';
import { motion, AnimatePresence } from "motion/react";

interface ColorBookPageProps {
  onBack: () => void;
}

const bookData: BookCategory[] = [
  {
    category: "Basic Colors",
    icon: <Palette size={18} className="text-[#a352fc]" />,
    color: "bg-purple-50",
    theme: "text-purple-800",
    items: [
      { name: "Red", color: "bg-red-500", textColor: "text-white", border: "border-transparent" },
      { name: "Blue", color: "bg-blue-500", textColor: "text-white", border: "border-transparent" },
      { name: "Green", color: "bg-green-500", textColor: "text-white", border: "border-transparent" },
      { name: "Yellow", color: "bg-yellow-400", textColor: "text-gray-800", border: "border-transparent" },
      { name: "Orange", color: "bg-orange-500", textColor: "text-white", border: "border-transparent" },
      { name: "Purple", color: "bg-purple-500", textColor: "text-white", border: "border-transparent" },
      { name: "Pink", color: "bg-pink-400", textColor: "text-white", border: "border-transparent" },
      { name: "Brown", color: "bg-amber-800", textColor: "text-white", border: "border-transparent" },
      { name: "Black", color: "bg-black", textColor: "text-white", border: "border-transparent" },
      { name: "White", color: "bg-white", textColor: "text-gray-800", border: "border-gray-200" },
    ]
  },
  {
    category: "Magic Gradients",
    icon: <PaintBucket size={18} className="text-[#ff4da6]" />,
    color: "bg-pink-50",
    theme: "text-pink-800",
    items: [
      { name: "Sunset Glow", color: "bg-gradient-to-r from-orange-400 to-rose-500", textColor: "text-white", border: "border-transparent" },
      { name: "Ocean Breeze", color: "bg-gradient-to-r from-cyan-400 to-blue-500", textColor: "text-white", border: "border-transparent" },
      { name: "Cotton Candy", color: "bg-gradient-to-r from-pink-300 to-purple-400", textColor: "text-white", border: "border-transparent" },
      { name: "Forest Moss", color: "bg-gradient-to-r from-emerald-400 to-green-600", textColor: "text-white", border: "border-transparent" },
      { name: "Lemon Soda", color: "bg-gradient-to-r from-yellow-300 to-orange-400", textColor: "text-white", border: "border-transparent" },
      { name: "Grape Soda", color: "bg-gradient-to-r from-fuchsia-500 to-purple-800", textColor: "text-white", border: "border-transparent" },
      { name: "Silver Star", color: "bg-gradient-to-r from-slate-200 to-slate-400", textColor: "text-gray-800", border: "border-transparent" },
      { name: "Gold Sun", color: "bg-gradient-to-r from-amber-300 to-yellow-500", textColor: "text-white", border: "border-transparent" },
    ]
  }
];

interface PredictionQuestion {
  color1: { name: string; class: string };
  color2: { name: string; class: string };
  result: { name: string; class: string; emoji: string };
  options: { name: string; class: string }[];
}

const PREDICTION_QUESTIONS: PredictionQuestion[] = [
  {
    color1: { name: "Red", class: "bg-red-500 text-white" },
    color2: { name: "Yellow", class: "bg-yellow-400 text-gray-800" },
    result: { name: "Orange", class: "bg-orange-500 text-white", emoji: "🍊" },
    options: [
      { name: "Green", class: "bg-green-500" },
      { name: "Orange", class: "bg-orange-500" },
      { name: "Purple", class: "bg-purple-600" },
      { name: "Pink", class: "bg-pink-400" },
    ]
  },
  {
    color1: { name: "Blue", class: "bg-blue-600 text-white" },
    color2: { name: "Yellow", class: "bg-yellow-400 text-gray-800" },
    result: { name: "Green", class: "bg-green-500 text-white", emoji: "🥦" },
    options: [
      { name: "Red", class: "bg-red-500" },
      { name: "Purple", class: "bg-purple-600" },
      { name: "Green", class: "bg-green-500" },
      { name: "Brown", class: "bg-amber-800" },
    ]
  },
  {
    color1: { name: "Red", class: "bg-red-500 text-white" },
    color2: { name: "Blue", class: "bg-blue-600 text-white" },
    result: { name: "Purple", class: "bg-purple-600 text-white", emoji: "🍇" },
    options: [
      { name: "Orange", class: "bg-orange-500" },
      { name: "White", class: "bg-white border border-gray-200 text-gray-800" },
      { name: "Purple", class: "bg-purple-600" },
      { name: "Green", class: "bg-green-500" },
    ]
  },
  {
    color1: { name: "Red", class: "bg-red-500 text-white" },
    color2: { name: "White", class: "bg-white text-gray-800 border" },
    result: { name: "Pink", class: "bg-pink-400 text-white", emoji: "🌸" },
    options: [
      { name: "Black", class: "bg-black" },
      { name: "Pink", class: "bg-pink-400" },
      { name: "Blue", class: "bg-blue-600" },
      { name: "Yellow", class: "bg-yellow-400" },
    ]
  },
  {
    color1: { name: "Black", class: "bg-black text-white" },
    color2: { name: "White", class: "bg-white text-gray-800 border" },
    result: { name: "Grey", class: "bg-gray-400 text-white", emoji: "🌪️" },
    options: [
      { name: "Purple", class: "bg-purple-600" },
      { name: "Orange", class: "bg-orange-500" },
      { name: "Grey", class: "bg-gray-400" },
      { name: "Green", class: "bg-green-500" },
    ]
  },
  {
    color1: { name: "Blue", class: "bg-blue-600 text-white" },
    color2: { name: "White", class: "bg-white text-gray-800 border" },
    result: { name: "Light Blue", class: "bg-cyan-300 text-gray-800", emoji: "❄️" },
    options: [
      { name: "Light Blue", class: "bg-cyan-300" },
      { name: "Lime", class: "bg-lime-400" },
      { name: "Brown", class: "bg-amber-800" },
      { name: "Purple", class: "bg-purple-600" },
    ]
  },
  {
    color1: { name: "Yellow", class: "bg-yellow-400 text-gray-800" },
    color2: { name: "Green", class: "bg-green-500 text-white" },
    result: { name: "Lime", class: "bg-lime-400 text-slate-800", emoji: "🍏" },
    options: [
      { name: "Red", class: "bg-red-500" },
      { name: "Pink", class: "bg-pink-400" },
      { name: "Lime", class: "bg-lime-400" },
      { name: "Blue", class: "bg-blue-600" },
    ]
  },
  {
    color1: { name: "Orange", class: "bg-orange-500 text-white" },
    color2: { name: "Pink", class: "bg-pink-400 text-white" },
    result: { name: "Coral", class: "bg-rose-400 text-white", emoji: "🪸" },
    options: [
      { name: "Coral", class: "bg-rose-400" },
      { name: "Black", class: "bg-black" },
      { name: "Navy Blue", class: "bg-blue-900" },
      { name: "Yellow", class: "bg-yellow-400" },
    ]
  }
];

export const ColorBookPage = ({ onBack }: ColorBookPageProps) => {
  const { playSound } = useSound();
  const [subPage, setSubPage] = useState<'learn' | 'game'>('learn');

  // Prediction Game State
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [revealedResult, setRevealedResult] = useState<boolean>(false);
  const [incorrectSelection, setIncorrectSelection] = useState<string | null>(null);

  const initPredictorGame = () => {
    const randomIdx = Math.floor(Math.random() * PREDICTION_QUESTIONS.length);
    setCurrentQuestionIdx(randomIdx);
    setRevealedResult(false);
    setIncorrectSelection(null);
    const question = PREDICTION_QUESTIONS[randomIdx];
    speakText(`Let's match and predict the magic mix! What color do you get if we blend ${question.color1.name} and ${question.color2.name}?`);
  };

  const speakPrompt = () => {
    const question = PREDICTION_QUESTIONS[currentQuestionIdx];
    speakText(`Predict the mix! ${question.color1.name} plus ${question.color2.name} makes what color?`);
  };

  const handleOptionClick = (optionName: string) => {
    if (revealedResult) return;
    const question = PREDICTION_QUESTIONS[currentQuestionIdx];
    if (optionName === question.result.name) {
      playSound('sparkle');
      setRevealedResult(true);
      setIncorrectSelection(null);
      speakText(`Yes! Brilliant! ${question.color1.name} and ${question.color2.name} makes ${question.result.name}!`);
      setScore(prev => {
        const nextScore = prev + 1;
        if (nextScore >= 5) {
          setTimeout(() => {
            speakText("Phenomenal work! You predicted all color mixes perfectly!");
          }, 3200);
        }
        setTimeout(() => {
          const nextIdx = (currentQuestionIdx + 1) % PREDICTION_QUESTIONS.length;
          setCurrentQuestionIdx(nextIdx);
          setRevealedResult(false);
          setIncorrectSelection(null);
          const nextQuestion = PREDICTION_QUESTIONS[nextIdx];
          speakText(`Let's predict again! Mix ${nextQuestion.color1.name} and ${nextQuestion.color2.name}. What color do you predict?`);
        }, 3400);
        return nextScore >= 5 ? 0 : nextScore;
      });
    } else {
      playSound('pop');
      setIncorrectSelection(optionName);
      speakText(`Oops! That's ${optionName}. Try predicting another color!`);
    }
  };

  const handleBack = () => {
    playSound('pop');
    if (subPage === 'game') {
      setSubPage('learn');
    } else {
      onBack();
    }
  };

  // Shared Sub-navigation Switcher pills
  const subHeader = (
    <div className="flex justify-center mb-3 mt-1 px-3 z-10 select-none">
      <div className="bg-purple-100/90 p-1 rounded-full flex gap-1 border border-purple-200">
        <button
          onClick={() => { playSound('pop'); setSubPage('learn'); }}
          className={`px-4 py-1.5 rounded-full text-xs font-black transition-all ${
            subPage === 'learn' ? 'bg-purple-600 text-white shadow-md' : 'text-purple-700 hover:bg-purple-200/50'
          }`}
        >
          📖 LEARN COLORS
        </button>
        <button
          onClick={() => { playSound('pop'); setSubPage('game'); initPredictorGame(); }}
          className={`px-4 py-1.5 rounded-full text-xs font-black transition-all ${
            subPage === 'game' ? 'bg-purple-600 text-white shadow-md' : 'text-purple-700 hover:bg-purple-200/50'
          }`}
        >
          🔮 COLOR PREDICT
        </button>
      </div>
    </div>
  );

  const currentQuestion = PREDICTION_QUESTIONS[currentQuestionIdx];

  return (
    <div className="h-full bg-white relative overflow-hidden">
      {subPage === 'learn' ? (
        <GenericBook 
          title="Colors" 
          bookData={bookData} 
          onBack={handleBack} 
          completionMessage="Colorful!" 
          completionSubtext="You've learned all the colors and gradients!"
          subHeader={subHeader}
        />
      ) : (
        /* Dynamic Predictor Game view */
        <div className="h-full flex flex-col bg-gradient-to-b from-[#F2ECFF] to-white px-4 pt-3 pb-4">
          <div className="flex items-center justify-between mb-2 z-10">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleBack}
              className="bg-purple-100 text-purple-700 p-2 rounded-xl border border-purple-200"
            >
              <ChevronLeft size={20} />
            </motion.button>
            <div className="flex items-center gap-1.5 text-center">
              <PaintBucket size={20} className="text-purple-600 animate-bounce" />
              <h2 className="text-lg font-black text-purple-900 tracking-tight">COLOR PREDICTOR</h2>
            </div>
            <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-xl font-bold text-xs border border-purple-200">
              Score: {score}⭐
            </div>
          </div>

          {/* Render layout-switcher tabs */}
          {subHeader}

          {/* Core Game Body */}
          <div className="flex-1 flex flex-col items-center justify-around py-3">
            {/* Scoreboard Stars */}
            <div className="flex gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.span 
                  key={i} 
                  animate={i < score ? { scale: [1, 1.2, 1] } : {}}
                  className={`text-2xl transition-all duration-300 ${i < score ? 'scale-110 drop-shadow' : 'opacity-20'}`}
                >
                  ⭐
                </motion.span>
              ))}
            </div>

            {/* Prediction Mixer Visualizer */}
            <div className="w-full max-w-sm bg-white/60 border border-white/80 rounded-3xl p-4 shadow-md flex flex-col items-center relative overflow-hidden">
              <div className="text-[10px] font-black text-purple-800 tracking-wider uppercase mb-1">THE COLOR LAB MIXER</div>
              
              <div className="flex items-center justify-center gap-4 w-full py-4 px-2 relative">
                {/* Flask 1 */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  className={`w-14 h-14 rounded-full flex flex-col items-center justify-center text-xs font-black shadow-md border-2 border-white select-none ${currentQuestion.color1.class}`}
                >
                  <span className="text-[9px] uppercase tracking-tighter">{currentQuestion.color1.name}</span>
                </motion.div>

                {/* Plus sign */}
                <span className="text-2xl font-black text-purple-600 animate-pulse">+</span>

                {/* Flask 2 */}
                <motion.div
                  animate={{ y: [-3, 3, -3] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  className={`w-14 h-14 rounded-full flex flex-col items-center justify-center text-xs font-black shadow-md border-2 border-white select-none ${currentQuestion.color2.class}`}
                >
                  <span className="text-[9px] uppercase tracking-tighter">{currentQuestion.color2.name}</span>
                </motion.div>

                {/* Equals Arrow */}
                <span className="text-2xl font-black text-purple-600">➔</span>

                {/* Result Flask with Sparkles */}
                <AnimatePresence mode="wait">
                  {revealedResult ? (
                    <motion.div
                      key="result"
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: 1.1, rotate: 0 }}
                      exit={{ scale: 0 }}
                      className={`w-16 h-16 rounded-full flex flex-col items-center justify-center font-black text-xs shadow-lg border-2 border-white select-none relative ${currentQuestion.result.class}`}
                    >
                      <Sparkles className="absolute top-[-8px] right-[-8px] text-yellow-400 fill-yellow-400" size={16} />
                      <span className="text-xl mb-0.5">{currentQuestion.result.emoji}</span>
                      <span className="text-[8px] uppercase tracking-tighter font-black">{currentQuestion.result.name}</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="mystery"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-14 h-14 rounded-xl bg-gray-200 text-gray-500 border-2 border-dashed border-gray-400 flex items-center justify-center"
                    >
                      <HelpCircle size={24} className="animate-spin duration-3000" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Title directive */}
              <div className="text-center font-black text-purple-950 mt-1 text-sm leading-tight text-pretty px-2">
                Mix <span className="underline decoration-purple-400">{currentQuestion.color1.name}</span> and <span className="underline decoration-purple-400">{currentQuestion.color2.name}</span>.<br />
                Predict the fusion color!
              </div>
            </div>

            {/* Action Option Buttons (predicted answers) */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-sm px-2">
              {currentQuestion.options.map((option) => {
                const isSelectedAndWrong = incorrectSelection === option.name;
                const isSelectedAndCorrect = revealedResult && option.name === currentQuestion.result.name;

                return (
                  <motion.button
                    key={option.name}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleOptionClick(option.name)}
                    disabled={revealedResult}
                    className={`h-[72px] rounded-2xl flex items-center justify-center text-sm font-black text-white uppercase shadow border-2 border-white select-none relative overflow-hidden transition-all duration-300 ${
                      option.class
                    } ${
                      isSelectedAndWrong ? 'opacity-40 line-through scale-90 border-red-500 saturate-50' : ''
                    } ${
                      isSelectedAndCorrect ? 'ring-4 ring-yellow-400 scale-105 saturate-125 z-20' : ''
                    }`}
                  >
                    <span className="drop-shadow">{option.name}</span>
                    {isSelectedAndCorrect && (
                      <span className="absolute top-1 right-1 text-xs">⭐</span>
                    )}
                    {isSelectedAndWrong && (
                      <span className="absolute top-1 right-1 text-xs">❌</span>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Repeat trigger */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={speakPrompt}
              className="font-black text-[9px] tracking-widest text-purple-700 uppercase bg-purple-100/50 hover:bg-purple-100 p-2.5 px-4 rounded-full border border-purple-200 transition-colors"
            >
              🔊 REPLAY PREDICTION QUESTION
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
};
