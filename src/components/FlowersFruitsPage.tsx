import React, { useState } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { useSound } from '../hooks/useSound';
import { 
  ChevronLeft, 
  ChevronRight, 
  Volume2, 
  Flower, 
  Apple,
  CheckCircle2
} from "lucide-react";
import { AdBanner } from './AdBanner';
import { speak as speakText } from '../lib/speech';

interface FlowersFruitsPageProps {
  onBack: () => void;
}

const bookData = [
  {
    category: "Flowers",
    icon: <Flower size={18} className="text-pink-500" />,
    color: "bg-pink-50",
    theme: "text-pink-800",
    items: [
      { name: "Rose", color: "bg-red-50", image: "/stickers/rose.png" },
      { name: "Lily", color: "bg-blue-50", image: "/stickers/lily.png" },
      { name: "Tulip", color: "bg-purple-50", image: "/stickers/tulip.png" },
      { name: "Daisy", color: "bg-gray-50", image: "/stickers/daisy.png" },
      { name: "Orchid", color: "bg-fuchsia-50", image: "/stickers/orchid.png" },
      { name: "Hibiscus", color: "bg-orange-50", image: "/stickers/hibiscus.png" },
      { name: "Jasmine", color: "bg-neutral-50", image: "/stickers/jasmine.png" },
      { name: "Marigold", color: "bg-amber-50", image: "/stickers/marigold.png" },
    ]
  },
  {
    category: "Fruits",
    icon: <Apple size={18} className="text-red-500" />,
    color: "bg-orange-50",
    theme: "text-orange-800",
    items: [
      { name: "Apple", color: "bg-red-50", image: "/stickers/apple.png" },
      { name: "Banana", color: "bg-yellow-50", image: "/stickers/banana.png" },
      { name: "Blueberry", color: "bg-blue-50", image: "/stickers/blueberry.png" },
      { name: "Cherry", color: "bg-red-50", image: "/stickers/cherry.png" },
      { name: "Grapes", color: "bg-purple-50", image: "/stickers/grapes.png" },
      { name: "Mango", color: "bg-amber-50", image: "/stickers/mango.png" },
      { name: "Orange", color: "bg-orange-50", image: "/stickers/orange.png" },
      { name: "Pineapple", color: "bg-yellow-50", image: "/stickers/pineapple.png" },
      { name: "Strawberry", color: "bg-red-50", image: "/stickers/strawberry.png" },
      { name: "Watermelon", color: "bg-green-50", image: "/stickers/watermelon.png" },
    ]
  }
];

export const FlowersFruitsPage = ({ onBack }: FlowersFruitsPageProps) => {
  const { playSound } = useSound();
  const [currentPage, setCurrentPage] = useState(0);

  const speak = (text: string) => {
    playSound('pop');
    speakText(text);
  };

  const handleNext = () => {
    if (currentPage < bookData.length - 1) {
      playSound('whoosh');
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      playSound('whoosh');
      setCurrentPage(prev => prev - 1);
    }
  };

  const page = bookData[currentPage];

  return (
    <div className="h-full flex flex-col bg-white relative overflow-hidden">
      <div className="flex-1 flex flex-col px-3 pt-3 pb-1">
        {/* Header */}
        <div className="flex justify-between items-center mb-2 relative z-10">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              playSound('pop');
              onBack();
            }}
            className="bg-gray-100 p-2 rounded-xl"
          >
            <ChevronLeft size={20} />
          </motion.button>
          
          <div className="flex items-center gap-1.5">
             <div className="p-1.5 rounded-lg bg-gray-50 flex items-center justify-center">
               {page.icon}
             </div>
             <h2 className={`text-xl font-black ${page.theme}`}>{page.category}</h2>
          </div>

          <div className="bg-gray-100 px-3 py-1 rounded-xl font-bold text-xs text-gray-500">
            {currentPage + 1}/{bookData.length}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto px-1 scrollbar-hide">
          <motion.div 
            key={currentPage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="grid grid-cols-2 gap-1.5"
          >
            {page.items.map((item, idx) => (
              <motion.button
                key={item.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileTap={{ scale: 1.05 }}
                onClick={() => speak(item.name)}
                className={`${item.color} p-0 rounded-2xl shadow-sm border border-black/5 flex flex-col items-stretch overflow-hidden h-[100px] relative active:shadow-inner transition-shadow`}
              >
                <div className="flex-1 w-full relative overflow-hidden flex items-center justify-center p-2">
                   <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-contain z-10"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                   />
                   <div className="absolute inset-0 flex items-center justify-center opacity-20">
                      {page.category === "Flowers" ? <Flower size={40} /> : <Apple size={40} />}
                   </div>
                </div>
                <div className="py-1 text-center bg-white/80 backdrop-blur-sm">
                  <span className="font-black text-[9px] text-gray-800 uppercase tracking-wider truncate px-1">{item.name}</span>
                </div>
                <div className="absolute top-1 right-1 p-0.5 bg-white/50 rounded-full text-gray-600 opacity-60">
                  <Volume2 size={10} />
                </div>
              </motion.button>
            ))}
          </motion.div>
          
          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-3 mb-2">
             <motion.button
               whileTap={{ scale: 0.9 }}
               onClick={handlePrev}
               disabled={currentPage === 0}
               className={`flex-1 mr-1 p-2 rounded-xl font-black text-xs flex items-center justify-center gap-1 ${
                 currentPage === 0 ? 'bg-gray-50 text-gray-300' : 'bg-gray-100 text-gray-800'
               }`}
             >
               <ChevronLeft size={16} /> PREV
             </motion.button>
             <motion.button
               whileTap={{ scale: 0.9 }}
               onClick={handleNext}
               disabled={currentPage === bookData.length - 1}
               className={`flex-1 ml-1 p-2 rounded-xl font-black text-xs flex items-center justify-center gap-1 ${
                 currentPage === bookData.length - 1 ? 'bg-gray-100 text-gray-300' : 'bg-theme-abc text-white'
               }`}
             >
               NEXT <ChevronRight size={16} />
             </motion.button>
          </div>

          {/* Completion State */}
          {currentPage === bookData.length - 1 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-50 p-6 rounded-3xl mb-4 text-center border-2 border-green-200"
            >
              <div className="flex justify-center mb-2">
                <CheckCircle2 className="text-green-500" size={48} />
              </div>
              <h3 className="text-xl font-black text-green-700">All Done!</h3>
              <p className="text-green-600 font-bold opacity-75">You've learned them all!</p>
            </motion.div>
          )}

        </div>
      </div>
      <div className="px-3 pb-4 relative z-[60]">
        <AdBanner />
      </div>
    </div>
  );
};
