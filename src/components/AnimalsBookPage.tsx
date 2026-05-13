import React, { useState } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { useSound } from '../hooks/useSound';
import { 
  ChevronLeft, 
  ChevronRight, 
  Volume2, 
  PawPrint, 
  Bird, 
  Fish, 
  Trees,
  CheckCircle2
} from "lucide-react";
import { AdBanner } from './AdBanner';
import { speak as speakText } from '../lib/speech';

interface AnimalsBookPageProps {
  onBack: () => void;
}

const bookData = [
  {
    category: "Animals",
    icon: <img src="/animals_logo.png" className="w-5 h-5 object-contain" alt="Animals" referrerPolicy="no-referrer" />,
    color: "bg-orange-50",
    theme: "text-orange-600",
    items: [
      { name: "Bear", color: "bg-orange-50", image: "https://images.unsplash.com/photo-1581333100576-b7396a2100a1?w=400&q=80" },
      { name: "Tiger", color: "bg-amber-50", image: "/stickers/tiger.png" },
      { name: "Panda", color: "bg-slate-50", image: "/stickers/panda.png" },
      { name: "Zebra", color: "bg-neutral-50", image: "/stickers/zebra.png" },
      { name: "Lion", color: "bg-orange-50", image: "/stickers/lion.png" },
      { name: "Elephant", color: "bg-slate-50", image: "/stickers/elephant.png" },
      { name: "Giraffe", color: "bg-yellow-50", image: "/stickers/giraffe.png" },
      { name: "Monkey", color: "bg-stone-50", image: "/stickers/monkey.png" },
    ]
  },
  {
    category: "Birds",
    icon: <Bird size={18} className="text-blue-500" />,
    color: "bg-blue-50",
    theme: "text-blue-600",
    items: [
      { name: "Parrot", color: "bg-green-50", image: "/stickers/parrot.png" },
      { name: "Eagle", color: "bg-amber-50", image: "/stickers/eagle.png" },
      { name: "Owl", color: "bg-stone-50", image: "/stickers/owl.png" },
      { name: "Sparrow", color: "bg-orange-50", image: "/stickers/sparrow.png" },
      { name: "Pigeon", color: "bg-blue-50", image: "/stickers/pigeon.png" },
      { name: "Peacock", color: "bg-blue-50", image: "/stickers/peacock.png" },
      { name: "Kingfisher", color: "bg-blue-50", image: "/stickers/kingfisher.png" },
      { name: "Woodpecker", color: "bg-blue-50", image: "/stickers/woodpecker.png" },
      { name: "Penguin", color: "bg-slate-50", image: "/stickers/penguin.png" },
      { name: "Swan", color: "bg-sky-50", image: "/stickers/swan.png" },
    ]
  },
  {
    category: "Fish",
    icon: <Fish size={18} className="text-cyan-500" />,
    color: "bg-cyan-50",
    theme: "text-cyan-600",
    items: [
      { name: "Goldfish", color: "bg-orange-50", image: "/stickers/goldfish.png" },
      { name: "Shark", color: "bg-slate-50", image: "/stickers/shark.png" },
      { name: "Whale", color: "bg-blue-50", image: "/stickers/whale.png" },
      { name: "Dolphin", color: "bg-cyan-50", image: "/stickers/dolphin.png" },
      { name: "Salmon", color: "bg-pink-50", image: "/stickers/salmon.png" },
      { name: "Clownfish", color: "bg-orange-50", image: "/stickers/clownfish.png" },
      { name: "Seahorse", color: "bg-yellow-50", image: "/stickers/seahorse.png" },
      { name: "Octopus", color: "bg-purple-50", image: "/stickers/octopus.png" },
      { name: "Starfish", color: "bg-red-50", image: "/stickers/starfish.png" },
      { name: "Jellyfish", color: "bg-indigo-50", image: "/stickers/jellyfish.png" },
    ]
  },
  {
    category: "Trees",
    icon: <Trees size={18} className="text-green-500" />,
    color: "bg-green-50",
    theme: "text-green-600",
    items: [
      { name: "Oak", color: "bg-green-50", image: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=400&q=80" },
      { name: "Pine", color: "bg-emerald-50", image: "https://images.unsplash.com/photo-1510133768164-a8f7e4d4e3dc?w=400&q=80" },
      { name: "Maple", color: "bg-red-50", image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=400&q=80" },
      { name: "Banyan", color: "bg-green-50", image: "https://images.unsplash.com/photo-1623869768652-32a768e7afae?w=400&q=80" },
      { name: "Palm", color: "bg-yellow-50", image: "https://images.unsplash.com/photo-1505504845144-cdb0ce7777a0?w=400&q=80" },
      { name: "Bamboo", color: "bg-lime-50", image: "https://images.unsplash.com/photo-1564754516752-ec06709848f9?w=400&q=80" },
      { name: "Mango", color: "bg-amber-50", image: "https://images.unsplash.com/photo-1591073113125-e46713c829ed?w=400&q=80" },
      { name: "Apple", color: "bg-red-50", image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&q=80" },
      { name: "Neem", color: "bg-green-50", image: "https://images.unsplash.com/photo-1647466100523-be126742636a?w=400&q=80" },
      { name: "Peepal", color: "bg-stone-50", image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=400&q=80" },
    ]
  }
];

export const AnimalsBookPage = ({ onBack }: AnimalsBookPageProps) => {
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
                whileTap={{ scale: 1.05 }} // 5% zoom in animation
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
                      {page.category === "Animals" ? <PawPrint size={40} /> : 
                       page.category === "Birds" ? <Bird size={40} /> : 
                       page.category === "Fish" ? <Fish size={40} /> : 
                       <Trees size={40} />}
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
