/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { Background } from './components/Background';
import { HomeView } from './components/HomeView';
import { DetailView } from './components/DetailView';
import { useSound } from './hooks/useSound';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'detail'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { playSound } = useSound();

  const handleSelectCategory = (id: string) => {
    playSound('whoosh');
    setSelectedCategory(id);
    setCurrentView('detail');
  };

  const handleBack = () => {
    playSound('whoosh');
    setCurrentView('home');
    setTimeout(() => setSelectedCategory(null), 300); // Clear after animation
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#f0f7ff] font-sans selection:bg-kids-blue selection:text-white">
      <div className="mobile-mockup bg-white relative shadow-2xl">
        <Background />
        
        <div className="absolute inset-x-0 bottom-0 h-full flex flex-col">
          <AnimatePresence mode="wait">
            {currentView === 'home' ? (
              <motion.div
                key="home"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
                className="flex-1 relative z-10"
              >
                <HomeView onSelectCategory={handleSelectCategory} />
              </motion.div>
            ) : (
              <motion.div
                key="detail"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
                className="flex-1 relative z-20"
              >
                {selectedCategory && (
                  <DetailView 
                    categoryId={selectedCategory} 
                    onBack={handleBack} 
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-24 h-1 bg-black/10 rounded-full z-50 pointer-events-none" />
      </div>
    </div>
  );
}
