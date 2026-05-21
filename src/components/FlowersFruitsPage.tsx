import React from 'react';
import { Flower, Apple } from "lucide-react";
import { GenericBook, BookCategory } from './GenericBook';

interface FlowersFruitsPageProps {
  onBack: () => void;
}

const bookData: BookCategory[] = [
  {
    category: "Flowers",
    icon: (
      <img 
        src="/stickers/Rose-v1.png" 
        className="w-5 h-5 object-contain" 
        alt="" 
        referrerPolicy="no-referrer"
      />
    ),
    color: "bg-pink-50",
    theme: "text-pink-800",
    items: [
      { name: "Rose", color: "bg-red-50", image: "/stickers/Rose-v1.png", size: 165 },
      { name: "Lily", color: "bg-blue-50", image: "/stickers/Lily-v1.png", size: 145 },
      { name: "Tulip", color: "bg-purple-50", image: "/stickers/Tulip-v1.png", size: 145 },
      { name: "Daisy", color: "bg-gray-50", image: "/stickers/Daisy-v1.png", size: 140 },
      { name: "Orchid", color: "bg-fuchsia-50", image: "/stickers/Orchid-v1.png", size: 140 },
      { name: "Hibiscus", color: "bg-orange-50", image: "/stickers/Hibiscus-v1.png", size: 140 },
      { name: "Jasmine", color: "bg-neutral-50", image: "/stickers/Jasmine-v1.png", size: 140 },
      { name: "Marigold", color: "bg-amber-50", image: "/stickers/Marigold-v1.png", size: 140 },
    ]
  },
  {
    category: "Fruits",
    icon: (
      <img 
        src="/stickers/Apple-v1.png" 
        className="w-5 h-5 object-contain" 
        alt="" 
        referrerPolicy="no-referrer"
      />
    ),
    color: "bg-orange-50",
    theme: "text-orange-800",
    items: [
      { name: "Apple", color: "bg-red-50", image: "/stickers/Apple-v1.png", size: 200 },
      { name: "Banana", color: "bg-yellow-50", image: "/stickers/Banana-v1.png", size: 200 },
      { name: "Blueberry", color: "bg-blue-50", image: "/stickers/Blueberry-v1.png", size: 200 },
      { name: "Cherry", color: "bg-red-50", image: "/stickers/Cherry-v1.png", size: 175 },
      { name: "Grapes", color: "bg-purple-50", image: "/stickers/Grapes-v1.png", size: 175 },
      { name: "Mango", color: "bg-amber-50", image: "/stickers/Mango-v1.png", size: 200 },
      { name: "Orange", color: "bg-orange-50", image: "/stickers/Orange-v1.png", size: 200 },
      { name: "Pineapple", color: "bg-yellow-50", image: "/stickers/Painaple-v1.png", size: 200 },
      { name: "Strawberry", color: "bg-red-50", image: "/stickers/Strawberry-v1.png", size: 200 },
      { name: "Watermelon", color: "bg-green-50", image: "/stickers/Watermelon-v1.png", size: 150 },
    ]
  },
  {
    category: "Trees",
    icon: (
      <img 
        src="/stickers/Apple-v1-1.png" 
        className="w-5 h-5 object-contain" 
        alt="" 
        referrerPolicy="no-referrer"
      />
    ),
    color: "bg-green-50",
    theme: "text-green-800",
    items: [
      { name: "Apple", color: "bg-red-50", image: "/stickers/Apple.tree-v1.png", size: 189 },
      { name: "Bamboo", color: "bg-green-50", image: "/stickers/Bamboo-v1.png", size: 200 },
      { name: "Banyan", color: "bg-amber-50", image: "/stickers/Banyan.tree-v1.png", size: 180 },
      { name: "Mango", color: "bg-yellow-50", image: "/stickers/Mango.tree-v1.png", size: 180 },
      { name: "Maple", color: "bg-orange-50", image: "/stickers/Maple-v1.png", size: 180 },
      { name: "Neem", color: "bg-emerald-50", image: "/stickers/Neem-v1.png", size: 180 },
      { name: "Oak", color: "bg-stone-50", image: "/stickers/Oak-v1.png", size: 180 },
      { name: "Palm", color: "bg-yellow-50", image: "/stickers/Palm-v1.png", size: 180 },
      { name: "Peepal", color: "bg-green-50", image: "/stickers/Peepal-v1.png", size: 180 },
      { name: "Pine", color: "bg-blue-50", image: "/stickers/Pine-v1.png", size: 180 },
    ]
  }
];

export const FlowersFruitsPage = ({ onBack }: FlowersFruitsPageProps) => {
  return (
    <GenericBook 
      title="Flower & Fruits" 
      bookData={bookData} 
      onBack={onBack} 
      completionMessage="Wonderful!" 
      completionSubtext="Flowers and fruits are so colorful!"
    />
  );
};

