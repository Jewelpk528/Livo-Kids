import React from 'react';
import { motion } from "motion/react";
import { useSound } from '../hooks/useSound';
import { 
  BookOpen, 
  Hash, 
  Palette, 
  Flower, 
  Shapes as ShapesIcon, 
  PaintBucket
} from "lucide-react";
import { AdBanner } from './AdBanner';

interface CardProps {
  key?: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  shadowClass: string;
  onClick: () => void;
}

const LearningCard = ({ title, icon, color, shadowClass, onClick }: CardProps) => {
  const { playSound } = useSound();
  
  const handleClick = () => {
    playSound('pop');
    onClick();
  };

  return (
    <motion.button
      whileHover="hover"
      whileTap={{ scale: 0.98, translateY: 4 }}
      onClick={handleClick}
      className={`${color} ${shadowClass} rounded-[40px] p-5 flex flex-col items-center justify-center gap-2 aspect-square text-white cursor-pointer group active:translate-y-1 transition-all w-full overflow-hidden`}
    >
      <motion.div 
        variants={{
          hover: { 
            scale: 1.15, 
            rotate: [0, -10, 10, 0],
            y: -5,
            transition: { 
              rotate: { repeat: Infinity, duration: 0.4 },
              type: "spring",
              stiffness: 400,
              damping: 10
            }
          }
        }}
        animate={{ rotate: [0, -3, 3, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="bg-white w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shadow-inner"
      >
        <div className="text-gray-800 scale-110 sm:scale-125">
          {icon}
        </div>
      </motion.div>
      <span className="font-black text-lg sm:text-xl tracking-tight drop-shadow-sm text-center line-clamp-1">{title}</span>
    </motion.button>
  );
};

export const HomeView = ({ onSelectCategory }: { onSelectCategory: (id: string) => void }) => {
  const { playSound } = useSound();
  const categories = [
    { id: 'abc', title: 'ABC Book', icon: <BookOpen size={28} />, color: 'bg-theme-abc', shadowClass: 'bold-card-shadow-pink' },
    { id: '123', title: '123 Book', icon: <Hash size={28} />, color: 'bg-theme-123', shadowClass: 'bold-card-shadow-lime' },
    { id: 'animals', title: 'Animals', icon: (
      <img src="/animals_logo.png" className="w-10 h-10 object-contain" alt="Animals" referrerPolicy="no-referrer" />
    ), color: 'bg-theme-design', shadowClass: 'bold-card-shadow-orange' },
    { id: 'drawing', title: 'Flowers & Fruits', icon: <Flower size={28} />, color: 'bg-theme-drawing', shadowClass: 'bold-card-shadow-green' },
    { id: 'shape', title: 'Shapes', icon: <ShapesIcon size={28} />, color: 'bg-theme-shapes', shadowClass: 'bold-card-shadow-blue' },
    { id: 'color', title: 'Colors', icon: <PaintBucket size={28} />, color: 'bg-theme-colors', shadowClass: 'bold-card-shadow-purple' },
  ];

  return (
    <div className="h-full flex flex-col p-0 relative">
      <div className="flex-1 overflow-y-auto px-6 pt-4 pb-2">
        {/* Design Decoration - Blur Bubbles */}
        <div className="absolute top-[-20px] left-[-20px] w-48 h-48 bg-white opacity-20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-64 h-64 bg-yellow-200 opacity-20 rounded-full blur-3xl pointer-events-none" />

        {/* Header Logo */}
        <div className="flex flex-col items-center mb-4 z-10">
          <motion.div
             animate={{ rotate: -2 }}
             className="bg-white px-6 py-3 rounded-3xl shadow-xl transform -rotate-2 mb-2"
          >
            <h1 className="text-4xl font-black tracking-tight flex gap-2">
              <span className="text-[#FF6B6B]">LIVO</span>
              <span className="text-[#4D96FF]">KIDS</span>
            </h1>
          </motion.div>
          <p className="text-[#555] font-black text-xs uppercase tracking-[0.2em] mt-1 drop-shadow-sm">PreSchool Learning</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4 z-10 max-w-sm mx-auto w-full py-2">
          {categories.map((cat) => (
            <LearningCard 
              key={cat.id}
              title={cat.title}
              icon={cat.icon}
              color={cat.color}
              shadowClass={cat.shadowClass}
              onClick={() => onSelectCategory(cat.id)}
            />
          ))}
        </div>
        <div className="mt-8 pb-4">
          <AdBanner />
        </div>
      </div>
    </div>
  );
};
