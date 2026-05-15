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
      { name: "Rose", color: "bg-red-50", image: "/stickers/Rose-v1.png" },
      { name: "Lily", color: "bg-blue-50", image: "/stickers/Lily-v1.png" },
      { name: "Tulip", color: "bg-purple-50", image: "/stickers/Tulip-v1.png" },
      { name: "Daisy", color: "bg-gray-50", image: "/stickers/Daisy-v1.png" },
      { name: "Orchid", color: "bg-fuchsia-50", image: "/stickers/Orchid-v1.png" },
      { name: "Hibiscus", color: "bg-orange-50", image: "/stickers/Hibiscus-v1.png" },
      { name: "Jasmine", color: "bg-neutral-50", image: "/stickers/Jasmine-v1.png" },
      { name: "Marigold", color: "bg-amber-50", image: "/stickers/Marigold-v1.png" },
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
      { name: "Apple", color: "bg-red-50", image: "/stickers/Apple-v1.png" },
      { name: "Banana", color: "bg-yellow-50", image: "/stickers/Banana-v1.png" },
      { name: "Blueberry", color: "bg-blue-50", image: "/stickers/Blueberry-v1.png" },
      { name: "Cherry", color: "bg-red-50", image: "/stickers/Cherry-v1.png" },
      { name: "Grapes", color: "bg-purple-50", image: "/stickers/Grapes-v1.png" },
      { name: "Mango", color: "bg-amber-50", image: "/stickers/Mango-v1.png" },
      { name: "Orange", color: "bg-orange-50", image: "/stickers/Orange-v1.png" },
      { name: "Pineapple", color: "bg-yellow-50", image: "/stickers/Painaple-v1.png" },
      { name: "Strawberry", color: "bg-red-50", image: "/stickers/Strawberry-v1.png" },
      { name: "Watermelon", color: "bg-green-50", image: "/stickers/Watermelon-v1.png" },
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
      { name: "Apple Tree", color: "bg-red-50", image: "/stickers/Apple-v1-1.png" },
      { name: "Bamboo", color: "bg-green-50", image: "/stickers/Bamboo-v1.png" },
      { name: "Banyan", color: "bg-amber-50", image: "/stickers/Banyan-v1.png" },
      { name: "Mango Tree", color: "bg-yellow-50", image: "/stickers/Mango-v1-1.png" },
      { name: "Maple", color: "bg-orange-50", image: "/stickers/Maple-v1.png" },
      { name: "Neem", color: "bg-emerald-50", image: "/stickers/Neem-v1.png" },
      { name: "Oak", color: "bg-stone-50", image: "/stickers/Oak-v1.png" },
      { name: "Palm", color: "bg-yellow-50", image: "/stickers/Palm-v1.png" },
      { name: "Peepal", color: "bg-green-50", image: "/stickers/Peepal-v1.png" },
      { name: "Pine", color: "bg-blue-50", image: "/stickers/Pine-v1.png" },
    ]
  }
];

export const FlowersFruitsPage = ({ onBack }: FlowersFruitsPageProps) => {
  return (
    <GenericBook 
      title="Nature Book" 
      bookData={bookData} 
      onBack={onBack} 
      completionMessage="Wonderful!" 
      completionSubtext="Nature is beautiful, isn't it?"
    />
  );
};

