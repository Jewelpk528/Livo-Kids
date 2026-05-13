import React from 'react';
import { Flower, Apple } from "lucide-react";
import { GenericBook, BookCategory } from './GenericBook';

interface FlowersFruitsPageProps {
  onBack: () => void;
}

const bookData: BookCategory[] = [
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
  return (
    <GenericBook 
      title="Flowers & Fruits" 
      bookData={bookData} 
      onBack={onBack} 
      completionMessage="Wonderful!" 
      completionSubtext="Nature is beautiful, isn't it?"
    />
  );
};

