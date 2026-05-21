import React from 'react';
import { PawPrint, Bird, Fish } from "lucide-react";
import { GenericBook, BookCategory } from './GenericBook';

interface AnimalsBookPageProps {
  onBack: () => void;
}

const bookData: BookCategory[] = [
  {
    category: "Animals",
    icon: (
      <div className="relative w-6 h-6 flex items-center justify-center translate-y-[-1px]">
        <PawPrint size={18} className="text-orange-500 absolute" />
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
    ),
    color: "bg-orange-50",
    theme: "text-orange-600",
    items: [
      { name: "Panda", color: "bg-slate-50", image: "/stickers/Panda-v1.png" },
      { name: "Bear", color: "bg-orange-50", image: "/stickers/Bear-v1.png" },
      { name: "Tiger", color: "bg-amber-50", image: "/stickers/Tiger-v1.png" },
      { name: "Zebra", color: "bg-neutral-50", image: "/stickers/Zebra-v1.png" },
      { name: "Lion", color: "bg-orange-50", image: "/stickers/Lion-v1.png" },
      { name: "Elephant", color: "bg-slate-50", image: "/stickers/Elephant-v1.png" },
      { name: "Giraffe", color: "bg-yellow-50", image: "/stickers/Giraffe-v1.png" },
      { name: "Monkey", color: "bg-stone-50", image: "/stickers/Monkey-v1.png" },
    ]
  },
  {
    category: "Birds",
    icon: (
      <img 
        src="/stickers/Parrot-v1.png" 
        className="w-5 h-5 object-contain" 
        alt="" 
        referrerPolicy="no-referrer"
      />
    ),
    color: "bg-blue-50",
    theme: "text-blue-600",
    items: [
      { name: "Parrot", color: "bg-green-50", image: "/stickers/Parrot-v1.png" },
      { name: "Eagle", color: "bg-amber-50", image: "/stickers/Eagle-v1.png" },
      { name: "Owl", color: "bg-stone-50", image: "/stickers/Owl-v1.png" },
      { name: "Sparrow", color: "bg-orange-50", image: "/stickers/Sparrow-v1.png" },
      { name: "Pigeon", color: "bg-blue-50", image: "/stickers/Pigeon-v1.png" },
      { name: "Peacock", color: "bg-blue-50", image: "/stickers/Peacock-v1.png" },
      { name: "Kingfisher", color: "bg-blue-50", image: "/stickers/Kingfisher-v1.png" },
      { name: "Woodpecker", color: "bg-blue-50", image: "/stickers/Woodpecker-v1.png" },
      { name: "Penguin", color: "bg-slate-50", image: "/stickers/Penguin-v1.png" },
      { name: "Swan", color: "bg-sky-50", image: "/stickers/Swan-v1.png" },
    ]
  },
  {
    category: "Fish",
    icon: (
      <img 
        src="/stickers/Clownfish-v1.png" 
        className="w-5 h-5 object-contain" 
        alt="" 
        referrerPolicy="no-referrer"
      />
    ),
    color: "bg-cyan-50",
    theme: "text-cyan-600",
    items: [
      { name: "Goldfish", color: "bg-orange-50", image: "/stickers/Goldfish-v1.png" },
      { name: "Shark", color: "bg-slate-50", image: "/stickers/Shark-v1.png" },
      { name: "Whale", color: "bg-blue-50", image: "/stickers/Whale-v1.png" },
      { name: "Dolphin", color: "bg-cyan-50", image: "/stickers/Dolphine-v1.png" },
      { name: "Salmon", color: "bg-pink-50", image: "/stickers/Salmon-v1.png" },
      { name: "Clownfish", color: "bg-orange-50", image: "/stickers/Clownfish-v1.png" },
      { name: "Seahorse", color: "bg-yellow-50", image: "/stickers/Seahorse-v1.png" },
      { name: "Octopus", color: "bg-purple-50", image: "/stickers/Octopus-v1.png" },
      { name: "Starfish", color: "bg-red-50", image: "/stickers/Starfish-v1.png" },
      { name: "Jellyfish", color: "bg-indigo-50", image: "/stickers/Jellyfish-v1.png" },
    ]
  }
];

export const AnimalsBookPage = ({ onBack }: AnimalsBookPageProps) => {
  return (
    <GenericBook 
      title="Animals" 
      bookData={bookData} 
      onBack={onBack} 
      completionMessage="Great Job!" 
      completionSubtext="You are an animal expert!"
    />
  );
};

