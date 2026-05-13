import React from 'react';
import { PawPrint, Bird, Fish } from "lucide-react";
import { GenericBook, BookCategory } from './GenericBook';

interface AnimalsBookPageProps {
  onBack: () => void;
}

const bookData: BookCategory[] = [
  {
    category: "Animals",
    icon: <PawPrint size={18} className="text-orange-500" />,
    color: "bg-orange-50",
    theme: "text-orange-600",
    items: [
      { name: "Bear", color: "bg-orange-50", image: "/stickers/bear.png" },
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

