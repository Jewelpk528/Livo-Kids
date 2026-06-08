import React, { useState } from 'react';
import { motion } from "motion/react";
import { useSound } from '../hooks/useSound';
import { ABCPage } from './ABCPage';
import { ShapeMatchPage } from './ShapeMatchPage';
import { NumbersPage } from './NumbersPage';
import { ColorBookPage } from './ColorBookPage';
import { AdBanner } from './AdBanner';
import { 
  ChevronLeft, 
  Volume2, 
  Sparkles,
  BookOpen, 
  Hash, 
  Flower, 
  Shapes as ShapesIcon, 
  PaintBucket,
  PawPrint,
  Apple
} from "lucide-react";
import { AnimalsBookPage } from './AnimalsBookPage';
import { FlowersFruitsPage } from './FlowersFruitsPage';

interface DetailViewProps {
  categoryId: string;
  onBack: () => void;
}

export const DetailView = ({ categoryId, onBack }: DetailViewProps) => {
  const { playSound } = useSound();
  const [isPlaying, setIsPlaying] = useState(false);
  
  const contentMap: Record<string, { title: string; color: string; bg: string; icon: React.ReactNode; shadow: string }> = {
    abc: { title: 'ABC Book', color: 'text-kids-pink', bg: 'bg-theme-abc', icon: <BookOpen size={80} strokeWidth={2.5} className="text-white" />, shadow: 'bold-card-shadow-pink' },
    '123': { title: '123 Book', color: 'text-kids-green', bg: 'bg-theme-123', icon: <Hash size={80} />, shadow: 'bold-card-shadow-lime' },
    animals: { title: 'Animals', color: 'text-kids-orange', bg: 'bg-theme-design', icon: (
      <div className="relative w-24 h-24 flex items-center justify-center">
        <PawPrint size={72} className="text-white absolute scale-110" />
        <img 
          src="/animals_logo.png" 
          className="w-full h-full object-contain relative z-10" 
          alt="" 
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      </div>
    ), shadow: 'bold-card-shadow-orange' },
    drawing: { title: 'Flower & Fruits', color: 'text-kids-green', bg: 'bg-theme-drawing', icon: (
      <div className="relative w-28 h-28 flex items-center justify-center">
        <Flower size={56} className="text-pink-300 absolute left-0 top-0 z-10 drop-shadow-md animate-pulse" strokeWidth={2.5} />
        <Apple size={52} className="text-red-300 absolute right-0 bottom-0 z-20 drop-shadow-md" strokeWidth={2.5} />
      </div>
    ), shadow: 'bold-card-shadow-green' },
    shape: { title: 'Shapes', color: 'text-kids-blue', bg: 'bg-theme-shapes', icon: <ShapesIcon size={80} />, shadow: 'bold-card-shadow-blue' },
    color: { title: 'Colors', color: 'text-kids-purple', bg: 'bg-theme-colors', icon: <PaintBucket size={80} />, shadow: 'bold-card-shadow-purple' },
  };

  const current = contentMap[categoryId] || contentMap.abc;

  if (isPlaying) {
    if (categoryId === 'abc') return <ABCPage onBack={() => setIsPlaying(false)} />;
    if (categoryId === 'shape') return <ShapeMatchPage onBack={() => setIsPlaying(false)} />;
    if (categoryId === '123') return <NumbersPage onBack={() => setIsPlaying(false)} />;
    if (categoryId === 'color') return <ColorBookPage onBack={() => setIsPlaying(false)} />;
    if (categoryId === 'animals') return <AnimalsBookPage onBack={() => setIsPlaying(false)} />;
    if (categoryId === 'drawing') return <FlowersFruitsPage onBack={() => setIsPlaying(false)} />;
  }

  return (
    <div className="h-full flex flex-col bg-white relative overflow-hidden">
      {/* Design Decoration */}
      <div className="absolute top-[-20px] left-[-20px] w-48 h-48 bg-[#A3E4FF] opacity-10 rounded-full blur-3xl z-0" />
      
      <div className="flex-1 flex flex-col relative z-10 min-h-0">
        {/* Header */}
        <div className="flex justify-between items-center p-6 mb-2 relative z-10">
          <motion.button
            whileHover={{ x: -2 }}
            whileTap={{ scale: 0.9, translateY: 4 }}
            onClick={() => {
              playSound('pop');
              onBack();
            }}
            className={`${current.bg} text-white p-3 rounded-2xl ${current.shadow} shadow-lg transition-all`}
          >
            <ChevronLeft size={32} strokeWidth={4} />
          </motion.button>
          <span className={`text-2xl sm:text-3xl font-black ${current.color} tracking-tight drop-shadow-sm`}>{current.title}</span>
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => playSound('sparkle')}
            className="bg-gray-50 text-gray-400 p-3 rounded-2xl border-2 border-gray-100 shadow-sm"
          >
            <Volume2 size={32} strokeWidth={3} />
          </motion.button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-start pt-4 relative">
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
            animate={{ scale: 0.88, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", damping: 12, stiffness: 100 }}
            className={`w-full max-w-[240px] aspect-square rounded-[50px] ${current.bg} flex items-center justify-center text-white ${current.shadow} relative overflow-hidden shadow-2xl shadow-black/10`}
          >
            <div className="relative z-10 flex flex-col items-center">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                {current.icon}
              </motion.div>
              <motion.div
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-3 flex gap-2 items-center"
              >
                 <Sparkles size={18} fill="currentColor" />
                 <span className="text-2xl font-black tracking-tighter">
                  READY!
                </span>
                 <Sparkles size={18} fill="currentColor" />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.3 }}
             className="mt-6 text-center relative z-10 px-4"
          >
            <h2 className={`text-2xl font-black ${current.color} tracking-tight`}>Let's Play!</h2>
            <p className="text-[#555] mt-1 font-bold text-sm uppercase tracking-wide opacity-60">
              Adventure Awaits
            </p>
          </motion.div>
        </div>

        {/* Action Button and Ad Banner */}
        <div className="px-6 pb-6 mt-auto flex flex-col gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98, translateY: 4 }}
            onClick={() => {
              playSound('sparkle');
              setIsPlaying(true);
            }}
            className={`w-full py-4 rounded-[32px] ${current.bg} text-white font-black text-2xl ${current.shadow} mb-2 tracking-tight flex items-center justify-center gap-3 transition-all`}
          >
            <Sparkles size={24} fill="currentColor" />
            START
            <Sparkles size={24} fill="currentColor" />
          </motion.button>
          
          <div className="w-full">
            <AdBanner />
          </div>
        </div>
      </div>
    </div>
  );
};
