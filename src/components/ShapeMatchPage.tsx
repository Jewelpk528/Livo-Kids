import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft } from 'lucide-react';
import { TrophyModal } from './TrophyModal';
import { useSound } from '../hooks/useSound';
import { AdBanner } from './AdBanner';

interface ShapeItem {
  id: string;
  name: string;
  emoji: string;
  color: string;
  targetColor: string;
  shadow: string;
}

const LEVELS: ShapeItem[][] = [
  [
    { id: 'apple', name: 'Apple', emoji: '🍎', color: 'bg-red-500', targetColor: 'bg-green-500', shadow: 'bold-card-shadow-pink' },
    { id: 'orange', name: 'Orange', emoji: '🍊', color: 'bg-orange-500', targetColor: 'bg-sky-500', shadow: 'bold-card-shadow-orange' },
    { id: 'heart', name: 'Heart', emoji: '💜', color: 'bg-fuchsia-500', targetColor: 'bg-lime-500', shadow: 'bold-card-shadow-purple' },
    { id: 'cat', name: 'Cat', emoji: '😺', color: 'bg-amber-400', targetColor: 'bg-pink-500', shadow: 'bold-card-shadow-orange' },
  ],
  [
    { id: 'car', name: 'Car', emoji: '🚗', color: 'bg-blue-500', targetColor: 'bg-pink-500', shadow: 'bold-card-shadow-blue' },
    { id: 'doll', name: 'Doll', emoji: '🪆', color: 'bg-pink-500', targetColor: 'bg-indigo-500', shadow: 'bold-card-shadow-pink' },
    { id: 'train', name: 'Train', emoji: '🚂', color: 'bg-slate-600', targetColor: 'bg-amber-500', shadow: 'bold-card-shadow-blue' },
    { id: 'snake', name: 'Snake', emoji: '🐍', color: 'bg-emerald-600', targetColor: 'bg-purple-500', shadow: 'bold-card-shadow-green' },
    { id: 'ball', name: 'Ball', emoji: '⚽', color: 'bg-cyan-500', targetColor: 'bg-slate-400', shadow: 'bold-card-shadow-blue' },
  ],
  [
    { id: 'fast-train', name: 'Fast Train', emoji: '🚄', color: 'bg-violet-500', targetColor: 'bg-green-500', shadow: 'bold-card-shadow-purple' },
    { id: 'letter-a', name: 'Letter A', emoji: '🅰️', color: 'bg-rose-500', targetColor: 'bg-blue-500', shadow: 'bold-card-shadow-pink' },
    { id: 'dog', name: 'Dog', emoji: '🐶', color: 'bg-amber-700', targetColor: 'bg-teal-500', shadow: 'bold-card-shadow-orange' },
    { id: 'bee', name: 'Bee', emoji: '🐝', color: 'bg-yellow-400', targetColor: 'bg-red-500', shadow: 'bold-card-shadow-orange' },
    { id: 'boat', name: 'Boat', emoji: '⛵', color: 'bg-sky-500', targetColor: 'bg-orange-500', shadow: 'bold-card-shadow-blue' },
  ],
  [
    { id: 'elephant', name: 'Elephant', emoji: '🐘', color: 'bg-gray-500', targetColor: 'bg-rose-500', shadow: 'bold-card-shadow-blue' },
    { id: 'banana', name: 'Banana', emoji: '🍌', color: 'bg-yellow-500', targetColor: 'bg-violet-500', shadow: 'bold-card-shadow-orange' },
    { id: 'watermelon', name: 'Watermelon', emoji: '🍉', color: 'bg-green-500', targetColor: 'bg-red-600', shadow: 'bold-card-shadow-green' },
    { id: 'helicopter', name: 'Helicopter', emoji: '🚁', color: 'bg-indigo-500', targetColor: 'bg-amber-500', shadow: 'bold-card-shadow-blue' },
  ],
  [
    { id: 'giraffe', name: 'Giraffe', emoji: '🦒', color: 'bg-orange-600', targetColor: 'bg-blue-600', shadow: 'bold-card-shadow-orange' },
    { id: 'ice-cream', name: 'Ice Cream', emoji: '🍦', color: 'bg-pink-400', targetColor: 'bg-emerald-500', shadow: 'bold-card-shadow-pink' },
    { id: 'rocket', name: 'Rocket', emoji: '🚀', color: 'bg-blue-700', targetColor: 'bg-purple-600', shadow: 'bold-card-shadow-purple' },
    { id: 'teddy', name: 'Teddy Bear', emoji: '🧸', color: 'bg-stone-500', targetColor: 'bg-yellow-500', shadow: 'bold-card-shadow-orange' },
  ]
];

export const ShapeMatchPage = ({ onBack }: { onBack: () => void }) => {
  const { playSound } = useSound();
  const [currentLevel, setCurrentLevel] = useState(0);
  const [matched, setMatched] = useState<string[]>([]);
  const [showTrophy, setShowTrophy] = useState(false);

  const shapes = LEVELS[currentLevel];

  const handleMatch = (id: string) => {
    if (matched.includes(id)) return;
    
    playSound('sparkle');
    const newMatched = [...matched, id];
    setMatched(newMatched);

    if (newMatched.length === shapes.length) {
      if (currentLevel === LEVELS.length - 1) {
        setTimeout(() => {
          playSound('sparkle');
          setShowTrophy(true);
        }, 500);
      } else {
        setTimeout(() => {
          playSound('pop');
          setCurrentLevel(prev => prev + 1);
          setMatched([]);
        }, 1500);
      }
    }
  };

  const reset = () => {
    setMatched([]);
    setCurrentLevel(0);
    setShowTrophy(false);
    playSound('pop');
  };

  return (
    <div className="h-full flex flex-col bg-[#A3E4FF] relative overflow-hidden">
      <div className="flex-1 flex flex-col px-4 pt-4 pb-1 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-2 z-10">
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9, translateY: 4 }}
              onClick={() => { playSound('pop'); onBack(); }}
              className="bg-white text-kids-blue p-2 rounded-xl border-b-2 border-blue-100"
            >
              <ChevronLeft size={20} strokeWidth={4} />
            </motion.button>
            <h1 className="text-xl font-black text-white drop-shadow-md tracking-tight">Shape Match</h1>
          </div>
          <div className="bg-white/30 backdrop-blur-sm px-3 py-1 rounded-xl text-white font-black text-xs border border-white/20">
            LEVEL {currentLevel + 1} / 5
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-6 sm:gap-12 relative z-10 pt-2">
          {/* Targets Area */}
          <div className={`grid ${shapes.length > 4 ? 'grid-cols-3' : 'grid-cols-2'} gap-4 sm:gap-6`}>
            {shapes.map((shape) => (
              <div 
                key={`target-${shape.id}`}
                id={`target-${shape.id}`}
                className="relative aspect-square flex flex-col items-center gap-2"
              >
                <div className={`w-full h-full rounded-[24px] sm:rounded-[32px] bg-white/20 border-4 border-dashed border-white/40 flex items-center justify-center text-4xl grayscale opacity-30`}>
                  {shape.emoji}
                </div>
                <AnimatePresence>
                  {matched.includes(shape.id) && (
                    <motion.div
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 0.9, rotate: 0 }}
                      className={`absolute inset-0 rounded-[24px] sm:rounded-[32px] ${shape.targetColor} ${shape.shadow} flex items-center justify-center text-4xl shadow-xl`}
                    >
                      {shape.emoji}
                    </motion.div>
                  )}
                </AnimatePresence>
                <span className={`text-[8px] sm:text-[10px] font-black uppercase tracking-tight text-white/60 ${matched.includes(shape.id) ? 'opacity-100' : 'opacity-0'}`}>
                  {shape.name}
                </span>
              </div>
            ))}
          </div>

          {/* Draggable Dock */}
          <div className="bg-white/80 backdrop-blur-md rounded-[32px] sm:rounded-[40px] p-4 sm:p-6 shadow-2xl border-4 border-white flex-1 mb-2">
            <p className="text-gray-400 font-bold text-center text-[10px] sm:text-xs uppercase tracking-widest mb-4 sm:mb-6">Drag shapes to match!</p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              {shapes.map((shape) => (
                !matched.includes(shape.id) && (
                  <DraggableShape 
                    key={`drag-${shape.id}`}
                    shape={shape}
                    onMatch={() => handleMatch(shape.id)}
                  />
                )
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="px-3 pb-4 relative z-[60]">
        <AdBanner />
      </div>

      <TrophyModal 
        isOpen={showTrophy}
        onClose={reset}
        onHome={onBack}
        title="YOU WIN!"
        subtitle="You matched all levels!"
        primaryActionText="PLAY AGAIN"
        bgClass="bg-kids-blue/90"
      />
    </div>
  );
};

const DraggableShape: React.FC<{ shape: ShapeItem; onMatch: () => void }> = ({ shape, onMatch }) => {
  const { playSound } = useSound();

  const handleDragEnd = (_: any, info: any) => {
    const targetElement = document.getElementById(`target-${shape.id}`);
    if (!targetElement) return;

    const targetRect = targetElement.getBoundingClientRect();
    const dragX = info.point.x;
    const dragY = info.point.y;

    const isWithinTarget = (
      dragX > targetRect.left - 20 &&
      dragX < targetRect.right + 20 &&
      dragY > targetRect.top - 20 &&
      dragY < targetRect.bottom + 20
    );

    if (isWithinTarget) {
      onMatch();
    } else {
      playSound('pop');
    }
  };

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.8}
      dragSnapToOrigin
      onDragStart={() => playSound('pop')}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1.1, zIndex: 100, rotate: 5 }}
      whileHover={{ scale: 1.05 }}
      className={`${shape.color} ${shape.shadow} w-20 h-20 sm:w-24 sm:h-24 rounded-[20px] sm:rounded-3xl flex items-center justify-center text-4xl shadow-xl cursor-grab active:cursor-grabbing border-4 border-white transition-shadow`}
    >
      {shape.emoji}
    </motion.div>
  );
};
